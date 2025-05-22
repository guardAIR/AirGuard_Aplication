var database = require("../database/config");

function buscarMaioresCO() {
    var instrucaoSql = `
        SELECT a.nome AS nome_area, 
               ROUND(AVG(l.concentracao_gas), 2) AS ppm 
        FROM leitura l
        JOIN sensor s ON l.fksensor = s.id
        JOIN area a ON s.fkarea = a.id
        GROUP BY a.nome
        ORDER BY ppm DESC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaioresCO
};