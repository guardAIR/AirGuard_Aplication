var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT NomeUsuario, SobrenomeUsuario, EmailUsuario, dtCadastro, NomeEmpresa, idEmpresa, id FROM vwUsuario WHERE EmailUsuario = '${email}' AND SenhaUsuario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, email, senha, codigoEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, senha, codigoEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    const pegaId = `SELECT id FROM empresa WHERE codigo_empresa = '${codigoEmpresa}';`;

    return database.executar(pegaId).then(resultado => {
        if (resultado.length === 0) {
            throw new Error("Código da empresa inválido ou não encontrado.");
        }

        const fkEmpresa = resultado[0].id;

        var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, data_cadastro, fkempresa) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', NOW(), ${fkEmpresa});
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    });
}

module.exports = {
    autenticar,
    cadastrar
};