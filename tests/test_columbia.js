"use strict"

const { Columbia } = require("../commom/questionarios");

let mockup_resposta =[
    {
        1: "nao",
        2: "nao",
        3: "nao"
    },
    {
        1: "sim",
        2: "sim",
        3: "nao",
        4: "nao",
        5: "nao",
        6: "nao"
    },
    {
        1: "sim",
        2: "sim",
        3: "sim",
        4: "nao",
        5: "nao",
        6: "nao"
    },
    {
        1: "sim",
        2: "sim",
        3: "sim",
        4: "sim",
        5: "sim",
        6: "sim"
    }
]

let id = 0
mockup_resposta.forEach(resposta => {

    console.log(`Iniciando resposta ${id} ================================`);
    let q = new Columbia(id);

    let indice_resposta = 1;
    let texto = '';

    do {
        texto = q.leProximaPergunta();
        console.log(`P: ${texto}`);
        if (texto != "Fim do questionario") {
            console.log(`R: ${resposta[indice_resposta]}`)
            q.respondePergunta(resposta[indice_resposta]);
            indice_resposta++;
        }
    } while (texto != "Fim do questionario");
    let resultado = q.calculaResultado()
    console.log(`Resultado: ${resultado}`);
    console.log(`Fim da resposta ${id} ===================================`)
    console.log();
    id++;
});
