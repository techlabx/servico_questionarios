const express = require('express');
const router = express.Router();

//Require controller modules
const controllers = require('../controllers/controllers.js');

//Get
router.get('/', controllers.homeGet);
router.get('/test', controllers.testGet);
router.get('/questionarios', controllers.questionariosGet);
router.get('/questoes', controllers.questoesGet);

//Post
router.post('/questionarios', controllers.questionariosPost);
router.post('/questoes', controllers.questoesPost);


//Put
router.put('/questionarios', controllers.questionariosPut);
router.put('/questoes', controllers.questoesPut);

//Delete
router.delete('/questionarios', controllers.questionariosDelete);
router.delete('/questoes', controllers.questoesDelete);


module.exports = router;