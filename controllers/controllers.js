//Get methods
async function homeGet (req, res) {
  res.send('home');
}

async function testGet (req, res) {
  res.send('test working');
}

async function questionariosGet (req, res) {
  res.send('questionarios get');
}

async function questoesGet (req, res) {
  res.send('questoes get');
}

//Post methods
async function questionariosPost (req, res) {
  res.send('questionarios post');
}

async function questoesPost (req, res) {
  res.send('questoes post');
}

//Put methods
async function questionariosPut (req, res) {
  res.send('questionarios Put');
}

async function questoesPut (req, res) {
  res.send('questoes Put');
}

//Delete methods
async function questionariosDelete (req, res) {
  res.send('questionarios Delete');
}

async function questoesDelete (req, res) {
  res.send('questoes Delete');
}


module.exports = {
  homeGet,
  testGet,
  questionariosGet,
  questoesGet,
  questionariosPost,
  questoesPost,
  questionariosPut,
  questoesPut,
  questionariosDelete,
  questoesDelete,
}