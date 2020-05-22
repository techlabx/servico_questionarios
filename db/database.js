const queries = require('./queries')

// =================  Questionários =================
//Lista os questionários
async function listarQuestionarios (req, res) {
  try {
    // Função que pega os questionário do BD
    let listagem = queries.getAllQuest();
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
    let perguntas = queries.getAllPerg(questionario);
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
    // Inicia o questionario do tipo correto
    // Armazenar o questionario em cache

    res.status(200).send("Devolver o session_id do questionario");
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
    var resposta = req.body.answer;

    // Recuperar o questionario em cache
    // processar ultima resposta recebida

    if (!ultima_mensagem) {

      // Atualizar cache 
      
      res.status(200).send({
        session_id: session_id,
        question: 'Você já...',
        options: [],
        last_message: false
      });
    } else {

      // Remover do cache

      let infos_direcionamento = queries.getAllDirec(); 
      res.status(200).send({
        session_id: session_id,
        result: 'Faça isso e aquilo',
        infos: infos_direcionamento
      });
    }
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Erro ao pedir próxima questão. Consulte o console do server para mais detalhes'});
  }
  
}


module.exports = {
  listarQuestionarios,
  criarQuestionario,
  // criarQuestoes,
  listarQuestoes,
  proximaQuestao,
  iniciarQuestionario
}