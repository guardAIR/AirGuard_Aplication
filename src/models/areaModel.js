var database = require("../database/config");

function getAllByFkEmpresa(fkEmpresa){
    var instrucaoSql = `
        select * from area where fkEmpresa = ${fkEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getAllByFkEmpresa
}
