const knex = require('./knex'); // The connection

module.exports = {

    // ------------------------------------------------------------------- Questionario
    
    // SELECT * FROM questionario; (1)
    getAllQuest(){
        return knex('questionario');
    },

    // INSERT INTO questionario VALUES (..., ...);
    createQuest(questionario){
        return knex('questionario').insert(questionario, '*');
    },

    // UPDATE questionario SET nome = '...', descricao = '...' WHERE nome = '...';
    updateQuest(nome, questionario){
        return knex('questionario').where('nome', nome).update(questionario, '*');
    },

    //DELETE FROM questionario WHERE nome = '...';
    deleteQuest(nome){
        return knex('questionario').where('nome', nome).del();
    },

    // SELECT * FROM questionario WHERE nome = '...';
    /*getOneQuest(nome){
        return knex('questionario').where('nome', nome).first();
    },*/


    // ------------------------------------------------------------------- Pergunta

    // SELECT * FROM pergunta WHERE fk_pergunta = '...';
    getAllPerg(nome){
        return knex('pergunta').where('questorigperg', nome);
    },



    // ------------------------------------------------------------------- Direcionameto

    // SELECT * FROM direcionamento;
    getAllDirec(){
        return knex('direcionamento');
    }

}