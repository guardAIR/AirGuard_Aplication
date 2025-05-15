DROP DATABASE IF EXISTS airguard;

CREATE DATABASE airguard;
USE airguard;

CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    endereco VARCHAR(200) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(8) NOT NULL
);

CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    email VARCHAR(200) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkEndereco INT,
    fkEmpresaMatriz INT,
    CONSTRAINT uc_empresa_cnpj UNIQUE (cnpj),
    CONSTRAINT uc_empresa_email UNIQUE (email)
);

CREATE TABLE contatoEmpresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_contato VARCHAR(100) NOT NULL,
    numero_contato VARCHAR(15) NOT NULL,
    fkEmpresa INT NOT NULL
);

CREATE TABLE cargo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(13) NOT NULL,
    fkEmpresa INT NOT NULL,
    fkCargo INT NOT NULL,
    fkEndereco INT,
    CONSTRAINT uc_usuario_cpf UNIQUE (cpf),
    CONSTRAINT uc_usuario_email UNIQUE (email)
);

CREATE TABLE credenciais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_login VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT NOT NULL,
    CONSTRAINT uc_credenciais_login UNIQUE (usuario_login)
);

CREATE TABLE areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_area VARCHAR(100) NOT NULL,
    fkEmpresa INT NOT NULL
);

CREATE TABLE sensor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    localizacao VARCHAR(100) NOT NULL,
    status_sensor VARCHAR(50) NOT NULL,
    fkAreas INT NOT NULL,
    CONSTRAINT chk_status_sensor CHECK (status_sensor IN ('inativo', 'manutencao', 'ativo'))
);

CREATE TABLE leituraSensor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    concentracao_gas FLOAT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT NOT NULL
);

CREATE TABLE alerta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    concentracao_gas FLOAT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    nivel_alerta VARCHAR(7) NOT NULL,
    mensagem_alerta VARCHAR(200),
    fkLeituraSensor INT NOT NULL,
    CONSTRAINT chk_nivel_alerta CHECK (nivel_alerta IN ('baixo', 'medio', 'alto', 'critico'))
);

ALTER TABLE empresa
ADD CONSTRAINT fk_endereco_empresa
FOREIGN KEY (fkEndereco) REFERENCES endereco(id);

ALTER TABLE empresa
ADD CONSTRAINT fk_matriz_empresa
FOREIGN KEY (fkEmpresaMatriz) REFERENCES empresa(id);

ALTER TABLE contatoEmpresa
ADD CONSTRAINT fk_empresa_contato
FOREIGN KEY (fkEmpresa) REFERENCES empresa(id);

ALTER TABLE usuario
ADD CONSTRAINT fk_empresa_usuario
FOREIGN KEY (fkEmpresa) REFERENCES empresa(id);

ALTER TABLE usuario
ADD CONSTRAINT fk_cargo_usuario
FOREIGN KEY (fkCargo) REFERENCES cargo(id);

ALTER TABLE usuario
ADD CONSTRAINT fk_endereco_usuario
FOREIGN KEY (fkEndereco) REFERENCES endereco(id);

ALTER TABLE credenciais
ADD CONSTRAINT fk_usuario_credenciais
FOREIGN KEY (fkUsuario) REFERENCES usuario(id);

ALTER TABLE areas
ADD CONSTRAINT fk_empresa_area
FOREIGN KEY (fkEmpresa) REFERENCES empresa(id);

ALTER TABLE sensor
ADD CONSTRAINT fk_area_sensor
FOREIGN KEY (fkAreas) REFERENCES areas(id);

ALTER TABLE leituraSensor
ADD CONSTRAINT fk_sensor_leituraSensor
FOREIGN KEY (fkSensor) REFERENCES sensor(id);

ALTER TABLE alerta
ADD CONSTRAINT fk_leituraSensor_alerta
FOREIGN KEY (fkLeituraSensor) REFERENCES leituraSensor(id);

DESC endereco;
DESC empresa;
DESC contatoEmpresa;
DESC cargo;
DESC usuario;
DESC credenciais;
DESC areas;
DESC sensor;
DESC leituraSensor;
DESC alerta;