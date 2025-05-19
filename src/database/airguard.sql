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
CREATE TABLE empresa
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    cnpj VARCHAR(18),
    nome_fantasia VARCHAR(100),
    razao_social VARCHAR(150),
    foto_perfil VARCHAR(255),
    data_cadastro DATE,
    codigo_empresa VARCHAR(10),
    fkmatriz INT
);

CREATE TABLE usuario
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    nome VARCHAR(50),
    sobrenome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255),
    data_cadastro DATE,
    fkempresa INT
);

CREATE TABLE endereco
(
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

CREATE TABLE contato
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	telefone VARCHAR(15),
    fkempresa INT
);

CREATE TABLE area
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	nome VARCHAR(50),
    foto_perfil VARCHAR(255),
    fkempresa INT
);

CREATE TABLE sensor
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	eixo_x INT,
    eixo_y INT,
    fkarea INT
);

CREATE TABLE alerta
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	mensagem VARCHAR(50),
    nivel_alerta VARCHAR(50),
    fkleitura INT
);

CREATE TABLE leitura
(
	id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
	concentracao_gas FLOAT,
    data_hora DATETIME,
    fksensor INT
);

-- Fazendo os acertos das chaves estrangeiras
ALTER TABLE empresa
ADD CONSTRAINT foreign_key_empresa_matriz
FOREIGN KEY(fkmatriz) REFERENCES empresa(id);

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