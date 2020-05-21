const express = require('express');

//Simple router
const router = express.Router();

const queries = require('../db/queries');

//Validating the provided name
/*function isValidName(req, res, next){
    //isNaN
    if((req.params.nome)) return next();
    else next(new Error('Nome inválido.'));
}*/

function validQuest(questionario){
    const hasName = typeof questionario.nome == 'string' && questionario.nome.trim() != '';
    //const hasDesc = typeof questionario.desc == 'string' && questionario.desc.trim() != '';

    return hasName;
}


//Router handlers

// ------------------------------------------------------------------- Questionario

router.get('/', (req, res) => {
    queries.getAllQuest().then(questionario => {
        res.json(questionario);
    })
});

router.post('/', (req, res, next) => {
    if(validQuest(req.body)){
        //Insert into DB
        queries.createQuest(req.body).then(questionarios => {
            res.json(questionarios[0]);
        });
    }
    else next(new Error('Questionário inválido.'));
});

router.put('/:nome', (req, res, next) => {
    if(validQuest(req.body)){
        //Update the quest
        queries.updateQuest(req.params.nome, req.body).then(questionarios => {
            res.json(questionarios[0]);
        });
    }
    else next(new Error('Questionário inválido. Impossível atualizar.'));
});

router.delete('/:nome', (req, res) => {
    queries.deleteQuest(req.params.nome).then(() => {
        res.json({
            deleted: true
        });
    });
});

/*router.get('/:nome', (req, res, next) => {
    queries.getOneQuest(req.params.nome).then(questionario =>{
        if(questionario) res.json(questionario);
        else next();
    })
});*/


// ------------------------------------------------------------------- Pergunta

router.get('/:nome', (req, res) => {
    queries.getAllPerg(req.params.nome).then(questionario =>{
        res.json(questionario);
        
    })
});

// ------------------------------------------------------------------- Direcionamento

router.get('/:nome/direcionamentos', (req, res) => {
    queries.getAllDirec().then(questionario => {
        res.json(questionario);
    })
})


//Making it available in another file
module.exports = router;