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

function listarAreasLimite() {
    var instrucaoSql = `
        SELECT
    status_calculado.mensagem_status AS status_nivel,
    COUNT(*) AS numero_de_areas
FROM (
    SELECT
        a.id AS id_area,
        CASE
            WHEN ROUND(AVG(l.concentracao_gas), 2) <= 20 THEN 'Seguro'
            WHEN ROUND(AVG(l.concentracao_gas), 2) <= 30 THEN 'Atenção'
            WHEN ROUND(AVG(l.concentracao_gas), 2) <= 39 THEN 'Alerta'
            ELSE 'Perigoso'
        END AS mensagem_status
    FROM area a
    JOIN sensor s ON s.fkarea = a.id
    JOIN leitura l ON l.fksensor = s.id
    GROUP BY a.id, a.nome
) AS status_calculado
GROUP BY status_calculado.mensagem_status
ORDER BY
    CASE status_calculado.mensagem_status
        WHEN 'Seguro' THEN 1
        WHEN 'Atenção' THEN 2
        WHEN 'Alerta' THEN 3
        ELSE 'Perigoso' 
    END;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaioresCO,
    listarAreasLimite
};