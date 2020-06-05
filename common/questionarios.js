class Columbia {
    constructor (id) {
        this.id = id;

        this.perguntas = {
            1: "Voce desejou estar morto/a ou desejou poder dormir e nunca mais acordar?",
            2: "Voce ja pensou realmente em se matar?",
            3: "Voce tem pensado em como poderia fazer isso",
            4: "Voce teve esses pensamentos e teve intecao de coloca-los em pratica?",
            5: "Voce ja comecou a elaborar ou ja elaborou os detalhes de como se matar? Voce pretende executar esse plano?",
            6: "Voce ja fez alguma coisa, comecou a fazer algo ou planejou fazer alguma coisa para acabar com a sua vida?",
            7: "Fim do questionário"
        };

        this.fluxo = {
            1: {
                "sim": 2,
                "nao": 2
            },
            2: {
                "sim": 3,
                "nao": 6
            },
            3: {
                "sim": 4,
                "nao": 4
            },
            4: {
                "sim": 5,
                "nao": 5
            },
            5: {
                "sim": 6,
                "nao": 6
            },
            6: {
                "sim": 7,
                "nao": 7
            }
        };

        this.pergunta_atual = 1;

        this.respostas = {
            1: "nao",
            2: "nao",
            3: "nao",
            4: "nao",
            5: "nao",
            6: "nao"
        };
        
        this.columbia_resultado = {
            0: "sem risco",
            1: "risco baixo",
            2: "risco medio",
            3: "risco alto"
        }

        this.resultado = 0;
    
        return this.id;
    }

    leProximaPergunta() {
        if (this.pergunta_atual <= Object.keys(this.perguntas).length) {
            return this.perguntas[this.pergunta_atual];
        }
        else {
            throw Error("Nao ha mais perguntas para responder");
        }
    }

    respondePergunta(resposta) {
        this.respostas[this.pergunta_atual] = resposta;
        this.pergunta_atual = this.fluxo[this.pergunta_atual][resposta]; 
    }

    calculaResultado() {
        if (this.respostas[6] == "sim") {
            return this.columbia_resultado[3];
        }
        else if (this.respostas[3] == "sim" || this.respostas[4] == "sim" || this.respostas[5] == "sim") {
            return this.columbia_resultado[2];
        }
        else if (this.respostas[1] == "sim" || this.respostas[2] == "sim") {
            return this.columbia_resultado[1];
        }
        else {
            return this.columbia_resultado[0];
        }
    }
}

class SRQ20 {
    constructor (id) {
        this.id = id;

        this.perguntas = {
            1: "Você tem dores de cabeca frequente?",
            2: "Tem falta de apetite",
            3: "Dorme mal?",
            4: "Assusta-se com facilidade?",
            5: "Tem tremores nas maos?",
            6: "Sente-se nervoso(a), tenso(a) ou preocupado(a)?",
            7: "Tem má digestão?",
            8: "Tem dificuldades de pensar com clareza?",
            9: "Tem se sentido triste ultimamente?",
            10: "Tem chorado mais do que costume?",
            11: "Encontra dificuldades para realizar com satisfação suas atividades diárias?",
            12: "Tem dificuldades para tomar decisões?",
            13: "E incapaz de desempenhar um papel útil em sua vida?",
            14: "Tem perdido o interesse pelas coisas?",
            15: "Tem dificuldades no serviço (seu trabalho é penoso, lhe causa sofrimento)?",
            16: "Você se sente uma pessoa inutil, sem préstimo?",
            17: "Tem tido ideia de acabar com a vida?",
            18: "Sente-se cansado (a) o tempo todo?",
            19: "Voce se cansa com facilidade?",
            20: "Tem sensações desagradáveis no estomago?",
            21: "Fim do questionário"
        };

        this.pergunta_atual = 1;

        this.respostas = {
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
        };
        
        this.resultado = 0;
        return this.id;
    }

    leProximaPergunta() {
        if (this.pergunta_atual <= Object.keys(this.perguntas).length) {
            return this.perguntas[this.pergunta_atual];
        }
        else {
            throw Error("Nao ha mais perguntas para responder");
        }
    }

    respondePergunta(resposta) {
        if (resposta == "sim") {
            this.resultado++;
        }
        this.respostas[this.pergunta_atual] = resposta;
        this.pergunta_atual++; 
    }

    calculaResultado() {
        let resultado = `${this.resultado}\n`;
        if (this.resultado >= 7) {
            resultado += "Indica sofrimento psiquico\n";
        }
        else {
            resultado += "Nao indica sofrimento psiquico\n";
        }
        if (this.respostas['17'] == "sim") {
            resultado += "Indica risco de suicidio";
        }
        return resultado;
    }
}

module.exports = { Columbia, SRQ20 };
