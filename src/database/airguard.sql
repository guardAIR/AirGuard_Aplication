-- Exculindo o database se já existir
DROP DATABASE IF EXISTS air_guard;

-- Criando usuário air guard
CREATE USER 'webdataviz' IDENTIFIED BY 'Sptech#2024';
GRANT INSERT, SELECT, DELETE, UPDATE ON air_guard.* TO 'webdataviz';
GRANT INSERT, SELECT ON air_guard.* TO 'dataquino';

-- Criando o banco de dados
CREATE DATABASE air_guard;

-- Colocando o banco de dados em uso
USE air_guard;

-- Criando as tabelas
CREATE TABLE empresa (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    cnpj VARCHAR(18),
    nome_fantasia VARCHAR(100),
    razao_social VARCHAR(150),
    foto_perfil VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    codigo_empresa VARCHAR(10)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    nome VARCHAR(50),
    sobrenome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isADM boolean default false,
    fkempresa INT
);

CREATE TABLE endereco (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    logradouro VARCHAR(100),
    cep VARCHAR(8),
    estado VARCHAR(25),
    cidade VARCHAR(45),
    bairro VARCHAR(45),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    fkempresa INT
);

CREATE TABLE contato (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	telefone VARCHAR(15),
    fkempresa INT
);

CREATE TABLE area (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	nome VARCHAR(50),
    foto_perfil VARCHAR(255),
    fkempresa INT
);

CREATE TABLE sensor (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	eixo_x INT,
    eixo_y INT,
    fkarea INT
);

CREATE TABLE alerta (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	mensagem VARCHAR(255),
    nivel_alerta VARCHAR(255),
    fkleitura INT
);

CREATE TABLE leitura (
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	concentracao_gas FLOAT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    fksensor INT
);

-- Fazendo os acertos das chaves estrangeiras
ALTER TABLE usuario
ADD CONSTRAINT foreign_key_empresa_usuario
FOREIGN KEY(fkempresa) REFERENCES empresa(id);

ALTER TABLE endereco
ADD CONSTRAINT foreign_key_empresa_endereco
FOREIGN KEY(fkempresa) REFERENCES empresa(id);

ALTER TABLE contato
ADD CONSTRAINT foreign_key_empresa_contato
FOREIGN KEY(fkempresa) REFERENCES empresa(id);

ALTER TABLE area
ADD CONSTRAINT foreign_key_empresa_area
FOREIGN KEY(fkempresa) REFERENCES empresa(id);

ALTER TABLE sensor
ADD CONSTRAINT foreign_key_area_sensor
FOREIGN KEY(fkarea) REFERENCES area(id);

ALTER TABLE leitura
ADD CONSTRAINT foreign_key_sensor_leitura
FOREIGN KEY(fksensor) REFERENCES sensor(id);

ALTER TABLE alerta
ADD CONSTRAINT foreign_key_leitura_alerta
FOREIGN KEY(fkleitura) REFERENCES leitura(id);

-- Inserindo empresas (matriz e filial)
INSERT INTO empresa (cnpj, nome_fantasia, razao_social, foto_perfil, data_cadastro, codigo_empresa)
VALUES	('11222333000144', 'Metais Alfa Ltda - Matriz', 'Metais Alfa Indústria e Comércio Ltda', NULL, '2023-01-15', 'MA001'),
				('55666777000188', 'Metais Alfa - Filial Forjaria', 'Metais Alfa Indústria e Comércio Ltda - Forjaria', NULL, '2023-05-20', 'MA002');

-- Inserindo endereços das empresas
INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep, fkempresa)
VALUES	('Rua das Palmeiras', '100', 'Bloco A', 'Centro', 'São Paulo', 'SP', '01010010', 1),
				('Rua da Indústria', '1500', 'Galpão 3', 'Distrito Industrial', 'Campinas', 'SP', '13013013', 2);

-- Inserindo contatos das empresas
INSERT INTO contato (telefone, fkempresa)
VALUES	('11987654321', 1),
		('19912345678', 2);

-- Inserindo usuários vinculados a empresas
INSERT INTO usuario (nome, sobrenome, email, senha, data_cadastro, fkempresa, isADM)
VALUES	('Carlos', 'Pereira', 'carlos.pereira@metaisalfa.com', 'senhaEng789', '2023-01-16', 1),
				('Beatriz', 'Oliveira', 'beatriz.oliveira@metaisalfa.com', 'senhaTec012', '2023-05-21', 2),
				('Fernando', 'Martins', 'fernando.martins@metaisalfa.com', 'senhaSup345', '2023-02-10', 1, 1);

-- Inserindo áreas nas empresas
INSERT INTO area (nome, foto_perfil, fkempresa)
VALUES	('Área de Fundição', NULL, 1),
				('Laboratório Metalúrgico', NULL, 1),
				('Setor de Laminação', NULL, 2),
				('Pátio de Matéria Prima', NULL, 2);

-- Inserindo sensores nas áreas
-- Inserindo sensores nas áreas
INSERT INTO sensor (eixo_x, eixo_y, fkarea)
VALUES	(200, 100, 1),
				(500, 100, 1),
				(200, 300, 1),
				(500, 300, 1),
				(200, 100, 2),
				(500, 100, 2),
				(200, 300, 2),
				(500, 300, 2),
				(200, 100, 3),
				(500, 100, 3),
				(200, 300, 3),
				(500, 300, 3),
				(200, 100, 4),
				(500, 100, 4),
				(200, 300, 4),
				(500, 300, 4);

CREATE VIEW vwUsuario AS
SELECT u.id AS id, u.nome AS NomeUsuario, u.sobrenome AS SobrenomeUsuario, u.email AS EmailUsuario, u.senha AS SenhaUsuario, u.data_cadastro AS dtCadastro, u.fkempresa AS idEmpresa, e.nome_fantasia AS NomeEmpresa, isADM
FROM usuario u
INNER JOIN empresa e ON u.fkempresa = e.id;

SELECT * from usuario;
SELECT NomeUsuario, SobrenomeUsuario, EmailUsuario, dtCadastro, NomeEmpresa, SenhaUsuario FROM vwUsuario WHERE id = 1;

SELECT
    l.data_hora AS DataHoraLeitura,
    l.concentracao_gas AS Concentracao,
    s.id AS IDSensor,
    a.nome AS NomeArea
FROM
    leitura l
INNER JOIN
    sensor s ON l.fksensor = s.id
INNER JOIN
    area a ON s.fkarea = a.id;

SELECT
    a.id AS IDAlerta,
    a.nivel_alerta AS Nivel,
    a.mensagem AS Mensagem,
    l.concentracao_gas AS ConcentracaoRegistrada,
    s.id AS IDSensor,
    ar.nome AS NomeArea,
    e.nome_fantasia AS NomeEmpresa
FROM
    alerta a
INNER JOIN
    leitura l ON a.fkleitura = l.id
INNER JOIN
    sensor s ON l.fksensor = s.id
INNER JOIN
    area ar ON s.fkarea = ar.id
INNER JOIN
    empresa e ON ar.fkempresa = e.id;


SELECT
    a.id AS ID_Alerta,
    l.data_hora AS HoraAlerta,
    a.nivel_alerta AS NivelAlerta,
    CONCAT('X:', s.eixo_x, ' Y:', s.eixo_y) AS LocalSensor,
    l.data_hora AS HoraLeituraProxima,
    l.concentracao_gas AS LeituraProxima
FROM
    alerta a
INNER JOIN
    leitura l ON a.fkleitura = l.id
INNER JOIN
    sensor s ON l.fksensor = s.id;

CREATE VIEW vw_alerta AS
SELECT
	CASE
		WHEN l.concentracao_gas < 25 THEN 'Cuidado: o nível de gás está se aproximando do limite estipulado.'
		WHEN l.concentracao_gas < 30 THEN 'Cuidado: o nível de gás está consideravelmente alto.'
		WHEN l.concentracao_gas < 39 THEN 'Cuidado: o nível de gás está no limite.'
		ELSE 'ALERTA CRÍTICO: o nível de gás ultrapassou o limite seguro!'
	END AS mensagem,
	CASE
		WHEN l.concentracao_gas < 25 THEN 'baixo'
		WHEN l.concentracao_gas < 30 THEN 'médio'
		WHEN l.concentracao_gas < 39 THEN 'alto'
		ELSE 'crítico'
	END AS nivel_alerta,
	l.id AS fkleitura
FROM leitura l
LEFT JOIN alerta a ON l.id = a.fkleitura
WHERE l.concentracao_gas > 20
AND a.fkleitura IS NULL;

CREATE VIEW vw_alertaLeitura AS
	SELECT a.id as alertaId, a.mensagem as mensagem, a.nivel_alerta as nivel, l.id as leituraId, l.concentracao_gas as concentração
    from alerta a
	inner join leitura l on a.fkleitura = l.id;
