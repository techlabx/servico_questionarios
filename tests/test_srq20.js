"use strict"

const { SRQ20 } = require("../commom/questionarios");

let mockup_resposta =[
    {
        1: "nao",
        2: "nao",
        3: "nao",
        4: "nao",
        5: "nao",
        6: "nao",
        7: "nao",
        8: "nao",
        9: "nao",
        10: "nao",
        11: "nao",
        12: "nao",
        13: "nao",
        14: "nao",
        15: "nao",
        16: "nao",
        17: "nao",
        18: "nao",
        19: "nao",
        20: "nao"
    },
    {
        1: "sim",
        2: "sim",
        3: "sim",
        4: "sim",
        5: "sim",
        6: "sim",
        7: "sim",
        8: "sim",
        9: "sim",
        10: "sim",
        11: "sim",
        12: "sim",
        13: "sim",
        14: "sim",
        15: "sim",
        16: "sim",
        17: "sim",
        18: "sim",
        19: "sim",
        20: "sim"
    }
] 

let id = 0
mockup_resposta.forEach(resposta => {
    
    console.log(`Iniciando resposta ${id} ================================`);
    let q = new SRQ20(id);
    
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
