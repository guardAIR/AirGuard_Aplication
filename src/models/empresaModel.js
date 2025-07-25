var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, nomeFantasia, cnpj, codigo) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, nome_fantasia, cnpj, codigo_empresa) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${codigo}')`;

  return database.executar(instrucaoSql);
}

function obterTodas(){
  var instrucaoSql = `
    select nome_fantasia, cnpj, DATE_FORMAT(data_cadastro, '%d/%m/%Y') data_cadastro, codigo_empresa, cep, telefone from empresa emp
      left join endereco en on en.fkempresa = emp.id
      left join contato cont on cont.fkempresa = emp.id;
  `;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, obterTodas };
