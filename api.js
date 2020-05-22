const express = require('express');
const router = express.Router();

//Require database modules
const db = require('./db/database.js');

//Routes
// =================  Questionários =================
router.get('/questionarios/lista', db.listarQuestionarios);
router.post('/questionarios', db.criarQuestionario);

// =================  Questões =================
router.put('/questoes', db.listarQuestoes);
// router.post('/questoes', db.criarQuestoes);

// =================  Preenchimento questionário =================
router.post('/questionarios/:name/begin', db.iniciarQuestionario);
router.put('/questionarios/:name/:session_id/proxima', db.proximaQuestao);
module.exports = router;