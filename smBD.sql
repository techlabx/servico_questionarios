CREATE TABLE questionario(
	nome VARCHAR(250),
	descricao VARCHAR(1000) NOT NULL,
	
	CONSTRAINT pk_questionario PRIMARY KEY (nome)
);

CREATE TABLE pergunta(
	idPerg SERIAL,
	questOrigPerg VARCHAR(250),
	conteudoPerg VARCHAR(800) NOT NULL,
	
	CONSTRAINT pk_pergunta PRIMARY KEY (idPerg),
	CONSTRAINT fk_pergunta FOREIGN KEY (questOrigPerg) 
			    REFERENCES questionario (nome) ON DELETE CASCADE
);

CREATE TABLE direcionamento(
	idDirec SERIAL,
	--questOrigDirec VARCHAR(250),
	conteudoDirec VARCHAR(800) NOT NULL,

	CONSTRAINT pk_direcionamento PRIMARY KEY (idDirec)
	--CONSTRAINT fk_direcionamento FOREIGN KEY (questOrigDirec)
			   --REFERENCES questionario (nome) ON DELETE SET NULL
);




INSERT INTO questionario VALUES ('SRQ-20', 'Teste que avalia o sofrimento mental. As questões são relacionadas a certas dores e problemas que podem ter lhe incomodado nos últimos 30 dias.');
								  
INSERT INTO questionario VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Blabla');




INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Você tem dores de cabeça frequentes?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem falta de apetite?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Dorme mal?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Assusta-se com facilidade?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem tremores nas mãos?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Sente-se nervoso(a), tenso(a) ou preocupado(a)?');

INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem má digestão?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem dificuldades de pensar com clareza?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem se sentido triste ultimamente?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem chorado mais do que costume?');
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Encontra dificuldades para realizar com satisfação suas atividades diárias?');	
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem dificuldades para tomar decisões?');				
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'É incapaz de desempenhar um papel útil em sua vida?');				
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem perdido o interesse pelas coisas?');				
			
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem dificuldades no serviço (seu trabalho é penoso, lhe causa sofrimento?)');			
		
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Você se sente uma pessoa inútil, sem préstimo?');			
		
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Tem tido ideia de acabar com a vida?');			
		
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Sente-se cansado(a) o tempo todo?');			
		
INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Você se cansa com facilidade?');			

INSERT INTO pergunta (questOrigPerg, conteudoPerg) 
	        VALUES ('SRQ-20', 'Têm sensações desagradáveis no estomago?');
			
		
		
INSERT INTO pergunta (questOrigPerg, conteudoPerg)
			VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Você desejou estar morto(a) ou desejou poder dormir e nunca mais acordar?');
					
INSERT INTO pergunta (questOrigPerg, conteudoPerg)
			VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Você já pensou realmente em se matar?');
					 
INSERT INTO pergunta (questOrigPerg, conteudoPerg)
			VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Você tem pensado em como poderia fazer isso?');
					
INSERT INTO pergunta (questOrigPerg, conteudoPerg)
			VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Você teve esses pensamentos e teve alguma intenção de colocá-los em prática?');
					
INSERT INTO pergunta (questOrigPerg, conteudoPerg)
			VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Você já começou a elaborar ou já elaborou os detalhes de como se matar? Você pretende executar esse plano?');
					
INSERT INTO pergunta (questOrigPerg, conteudoPerg)
			VALUES ('Avaliação do Risco de Suicídio de Columbia', 'Você já fez alguma coisa, começou a fazer algo ou planejou fazer alguma coisa para acabar com sua vida?');	
					
					
					
					
INSERT INTO direcionamento	(conteudoDirec) VALUES ('GAPSI');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('Apoia USP');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('UBS');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('USF');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('Matriciamento');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('CAPS (II ou AD)');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('UPA');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('Santa Casa');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('Transporte');	

INSERT INTO direcionamento	(conteudoDirec) VALUES ('SAMU');	
