// =================  Questionários =================
//Lista os questionários
async function listarQuestionarios (req, res) {
  try {
    // Função que pega os questionário do BD
    res.send('Aqui será chamada a função que pega os questionários do BD');
  } catch (err) {
    res.status(400).json({error: 'Erro ao listar questionário. Consulte o console do server para mais detalhes'})
  }
  
}

//Cria no BD um questionário
async function criarQuestionario (req, res) {
  try {
    //Precisamos discutir o formato, pode ser um JSON com o nome do questionário: 
    // {
    //   nome: "nome do questionário",
    // }
    var nome = req.body.nome;
    res.send('Aqui receberemos um JSON com os dados a serem inseridos no BD');
  } catch (err) {
    res.status(400).json({error: 'Erro ao criar questionário. Consulte o console do server para mais detalhes'})
  }
}

// =================  Questões =================
//Lista as questõe de um questionário dado um id/nome
async function listarQuestoes (req, res) {
  try {
    var questionario = req.body.nome;
    res.send([
      {
        name: 'Columbia'
      },
      {
        name: 'Esqueci o nome do outro, dps coloco'
      }
    ]);
  } catch (err) {
    res.status(400).json({error: 'Erro ao listar questoes do questionário. Consulte o console do server para mais detalhes'})
  }
}

//Dado um id/nome de questionário, cria questões
async function criarQuestoes (req, res) {
  try  {
    var nomeQuestionario = req.body.nome;
    var questoes = req.body.questoes; //Um array de questões
    //Exemplo--> questoes: [{id: 10, pergunta: "Você já pensou em se suicidar?"}, {}, {}] //Um vetor de perguntas
    res.send('Aqui uma função que cria questões no BD relacionadas a um questionário');
  } catch (err) {
    res.status(400).json({error: 'Erro ao criar questoes de um questionário. Consulte o console do server para mais detalhes'})
  }
}

//Recebe a resposta e passa a proxima questão
async function proximaQuestao (req, res) {
  try {
    var questionario = req.params.name;
    var session_id = req.params.session_id;
    var resposta = req.body.answer;

    //Processamento do banco de dados
    if (!ultima_mensagem) {
      res.status(200).send({
        session_id: 123,
        question: 'Você já...',
        options: [],
        last_message: false
      });
    } else {
      res.status(200).send({
        session_id: 123,
        result: 'Faça isso e aquilo',
        infos: [
          {
            name: 'Santa Casa',
            tel: '(16)33334444',
            address: 'Endereço da Santa Casa'
          },
          {
            name: 'Outro lugar',
            tel: '(16)33334444',
            address: 'Endereço do outro lugar'
          },
        ]
      });
    }
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Erro ao pedir próxima questão. Consulte o console do server para mais detalhes'});
  }
  
}

async function iniciarQuestionario(req, res) {
  try {
    //Inicia o questionario com req.params.name
    res.status(200).send("Qq eu mando aqui? Ok?");
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Erro ao iniciar questionário. Consulte o console do server para mais detalhes'});
  }
}

module.exports = {
  listarQuestionarios,
  criarQuestionario,
  criarQuestoes,
  listarQuestoes,
  proximaQuestao,
}