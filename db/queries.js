const knex = require('./knex'); // The connection

module.exports = {

    // ------------------------------------------------------------------- Questionario
    
    // SELECT * FROM questionario; (1)
    async getAllQuest(){
        return await knex('questionario');
    },

    // INSERT INTO questionario VALUES (..., ...);
    async createQuest(questionario){
        return await knex('questionario').insert(questionario, '*');
    },

    // UPDATE questionario SET nome = '...', descricao = '...' WHERE nome = '...';
    async updateQuest(nome, questionario){
        return await knex('questionario').where('nome', nome).update(questionario, '*');
    },

    //DELETE FROM questionario WHERE nome = '...';
    async deleteQuest(nome){
        return await knex('questionario').where('nome', nome).del();
    },

    // SELECT * FROM questionario WHERE nome = '...';
    /*getOneQuest(nome){
        return knex('questionario').where('nome', nome).first();
    },*/


    // ------------------------------------------------------------------- Pergunta

    // SELECT * FROM pergunta WHERE fk_pergunta = '...';
    async getAllPerg(nome){
        return await knex('pergunta').where('questorigperg', nome);
    },



    // ------------------------------------------------------------------- Direcionameto

    // SELECT * FROM direcionamento;
    async getAllDirec(){
        return await knex('direcionamento');
    }

}
