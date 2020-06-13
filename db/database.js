const redis = require("redis");
const bluebird = require("bluebird");
const ESSerializer = require('esserializer');
const axios = require('axios');

const queries = require('./queries');
const questionarios = require("../common/questionarios");

bluebird.promisifyAll(redis);
const cache = redis.createClient(6379, "redis");

cache.on("error", function(error) {
  console.error(error);
});

async function initCache() {
  await cache.set("last_session_id", "-1");
}

initCache();

// =================  Questionários =================
//Lista os questionários
async function listarQuestionarios (req, res) {
  try {
    // Função que pega os questionário do BD
    let listagem = await queries.getAllQuest();
    res.send(listagem);
  } catch (err) {
    console.log(err);
    res.status(400).json({error: 'Erro ao listar questionário. Consulte o console do server para mais detalhes'});
  }

}

//Cria no BD um questionário
async function criarQuestionario (req, res) {
  try {
    //Precisamos discutir o formato, pode ser um JSON com o nome do questionário:
    // {
    //   nome: "nome do questionário",
    // }
    let questionario = {
      "nome": req.body.nome,
      "descricao": req.body.descricao
    }

    let resultado = queries.createQuest(questionario);
    res.send(resultado);
  } catch (err) {
    res.status(400).json({error: 'Erro ao criar questionário. Consulte o console do server para mais detalhes'})
  }
}

// =================  Questões =================
//Lista as questõe de um questionário dado um id/nome
async function listarQuestoes (req, res) {
  try {
    var questionario = req.body.nome;
    let perguntas = await queries.getAllPerg(questionario);
    res.send(perguntas);
  } catch (err) {
    res.status(400).json({error: 'Erro ao listar questoes do questionário. Consulte o console do server para mais detalhes'})
  }
}

// == Precisa de conexao com o banco, mas parece que nao vamos usar isso aqui
//
//Dado um id/nome de questionário, cria questões
// async function criarQuestoes (req, res) {
//   try  {
//     var nomeQuestionario = req.body.nome;
//     var questoes = req.body.questoes; //Um array de questões
//     //Exemplo--> questoes: [{id: 10, pergunta: "Você já pensou em se suicidar?"}, {}, {}] //Um vetor de perguntas
//     res.send('Aqui uma função que cria questões no BD relacionadas a um questionário');
//   } catch (err) {
//     res.status(400).json({error: 'Erro ao criar questoes de um questionário. Consulte o console do server para mais detalhes'})
//   }
// }

async function iniciarQuestionario(req, res) {
  try {

    // Criar um session_id pra ele
    let last_id = await cache.getAsync("last_session_id");
    last_id = parseInt(last_id);
    new_id = last_id + 1;

    await cache.set('last_session_id', new_id.toString());

    let nome_questionario = req.params.name;
    let flag = 0;

    // Inicia o questionario do tipo correto
    if (nome_questionario == "Columbia") {
      q = new questionarios.Columbia(new_id);
    }
    else if (nome_questionario == "SRQ-20") {
      q = new questionarios.SRQ20(new_id);
    }
    else {
      throw "Tipo de questionario inválido."
    }

    //Isso aqui pode dar problema caso o questionário não seja encontrado, né?
    //Como podemos contornar isso?
    let tcle = ["Olá!", `A seguir, você irá preencher o questionário ${nome_questionario}.`,
    "Antes de iniciá-lo, gostaríamos de saber se você teria interesse em enviar suas respostas diretamente para o banco de dados o APOIA USP.",
    "Queremos esclarecer que esses dados serão sigilosos e restritos aos funcionário do serviço.",
    "Se você desejar compartilhar seus dados entenderemos que, caso haja necessidade, o serviço poderá entrar em contato com você através do seu e-mail USP fornecido na inscrição.",
    "Se você desejar NÃO compartilhar seus dados, isso não trará nenhum prejuízo para você, contudo, não conseguiremos entrar em contato para oferecer nosso serviço de Atenção Psicossocial."];

    console.log(tcle);

    var flagCompart;

    // Armazenar o questionario em cache
    await cache.set(`${nome_questionario}_${new_id}`, ESSerializer.serialize(q));

    res.status(200).send({
        session_id: new_id,
        intro: tcle
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Erro ao iniciar questionário. Consulte o console do server para mais detalhes'});
  }
}

//Recebe a resposta e passa a proxima questão
async function proximaQuestao (req, res) {
  try {
    var questionario = req.params.name;
    var session_id = req.params.session_id;
    var resposta = req.body.answer.toLowerCase().replace("ã", "a");

    // Recuperar o questionario em cache
    let q = await cache.getAsync(`${questionario}_${session_id}`);
    q = ESSerializer.deserialize(q, [questionarios.Columbia, questionarios.SRQ20]);

    let prox_pergunta = "";
    if(resposta == "li e aceito compartilhar meus dados" ||
       resposta == "li e nao desejo compartilhar meus dados"){

        if(resposta == "li e aceito compartilhar meus dados") flagCompart = true;
        else flagCompart = false;

        prox_pergunta = q.leProximaPergunta();
    }
    else {
      if (resposta != "sim" && resposta != "nao") {
        prox_pergunta = q.leProximaPergunta();
        res.status(200).send({
          session_id: session_id,
          question: prox_pergunta,
          options: ["Sim", "Não"],
          last_message: false
        });
      }
      else {
        q.respondePergunta(resposta);
        prox_pergunta = q.leProximaPergunta();
      }
    }

    console.log(prox_pergunta);

    let ultima_mensagem = false;
    let resultado;

    if (prox_pergunta == "Fim do questionário") {
      ultima_mensagem = true;
      resultado = q.calculaResultado();
      if(flagCompart == 1) await sendMail(questionario, q, resultado[0]);
    }

    if (!ultima_mensagem) {
      // Atualizar cache
      await cache.set(`${questionario}_${session_id}`, ESSerializer.serialize(q));

      res.status(200).send({
        session_id: session_id,
        question: prox_pergunta,
        options: ["Sim", "Não"],
        last_message: false
      });
    } else {

      // Remover do cache
      res.status(200).send({
        session_id: session_id,
        options: [],
        result: resultado[1]
      });
    }

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Erro ao pedir próxima questão. Consulte o console do server para mais detalhes'});
  }

}

async function sendMail(nome_questionario, obj_questionario, result_quest) {

    payload = {
      "usuario": {
        "nome": "Usuario nao identificado",
        "nusp": "000000000"
      },
      "questionario": {
        "nome": nome_questionario,
        "respostas": {}
    },
      "resultado": result_quest
    }

    let i;
    for (i = 1; i <= Object.keys(obj_questionario.respostas).length; i++) {
      payload.questionario.respostas[i] = {"pergunta": "", "resposta": ""};
      payload.questionario.respostas[i].pergunta = obj_questionario.perguntas[i];
      payload.questionario.respostas[i].resposta = obj_questionario.respostas[i];
    }

    await axios.post('http://servico_email:8080/email/relatorio/enviar', payload)
    .then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    })
}


module.exports = {
  listarQuestionarios,
  criarQuestionario,
  // criarQuestoes,
  listarQuestoes,
  proximaQuestao,
  iniciarQuestionario
}
