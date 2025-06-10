var database = require("../database/config");

function getAlertaById(fkEmpresa) {
    var instrucaoSql = `
        SELECT 
            e.id AS id,
            a.nome AS nome,
            l.concentracao_gas AS concentracao
        FROM 
            empresa e
        INNER JOIN
            area a ON e.id = a.fkEmpresa
        INNER JOIN
            sensor s ON a.id = s.fkarea
        INNER JOIN
            leitura l ON s.id = l.fksensor
        WHERE e.id = ${fkEmpresa};`

    console.log("Executando a instrução SQL (exibir todos os alertas pelo id da empresa): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAllByFkEmpresa(fkEmpresa) {
    var instrucaoSql = `
        SELECT * FROM area WHERE fkEmpresa = ${fkEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMediaAreaById(id) {
    var instrucaoSql = `
        SELECT AVG(ultimas_leituras.concentracao_gas) AS ultimaMedia
        FROM (
            SELECT l.concentracao_gas
            FROM leitura l
            JOIN sensor s ON l.fksensor = s.id
            WHERE s.fkarea = ${id}
            AND l.data_hora = (
                SELECT MAX(l2.data_hora)
                FROM leitura l2
                WHERE l2.fksensor = l.fksensor
            )
        ) AS ultimas_leituras;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getSensorsAndReads(fkarea) {
    var instrucaoSql = `
        SELECT  
            l.fksensor,
            l.data_hora,
            l.concentracao_gas,
            s.eixo_x,
            s.eixo_y,
            s.fkarea
        FROM leitura l
        INNER JOIN sensor s ON s.id = l.fksensor
        INNER JOIN (
            SELECT fksensor, MAX(data_hora) AS ultima_leitura
            FROM leitura
            GROUP BY fksensor
        ) u ON l.fksensor = u.fksensor AND l.data_hora = u.ultima_leitura
        WHERE s.fkarea = ${fkarea};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaCOPorHoraPorID(areaID) {
    var instrucaoSql = `
        SELECT HOUR(data_hora) AS hora, ROUND(AVG(concentracao_gas), 0) AS media_gas
        FROM leitura lei
        INNER JOIN sensor sen ON sen.id = lei.fksensor
        INNER JOIN area ar ON ar.id = sen.fkarea
        WHERE ar.id = ${areaID} AND DATE(data_hora) = CURDATE()
        GROUP BY hora;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function medicaoSensores(fkarea) {
    var instrucaoSql = `
        SELECT  
           DISTINCT
           s.id,
           l.concentracao_gas,
           max(l.data_hora),
           FROM sensor s
           INNER JOIN leitura l
           ON s.id = l.fksensor
           GROUP BY s.id, l.concentracao_gas
        ) WHERE s.fkarea = ${fkarea};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getUltimasLeiturasPorArea(fkarea) {
    let instrucaoSql = `
        SELECT s.id AS sensor_id, l.concentracao_gas
        FROM sensor s
        INNER JOIN leitura l ON s.id = l.fksensor
        WHERE s.fkarea = ${fkarea}
        AND l.data_hora = (
            SELECT MAX(l2.data_hora)
            FROM leitura l2
            WHERE l2.fksensor = s.id
        );
    `;
    return database.executar(instrucaoSql);
}

function getUltimasLeiturasTotais() {
    let instrucaoSql = `
                SELECT s.id AS sensor_id, l.concentracao_gas, s.fkArea
                    FROM sensor s
                    INNER JOIN leitura l ON s.id = l.fksensor
                    WHERE l.data_hora = (
                        SELECT MAX(l2.data_hora)
                        FROM leitura l2
                    WHERE l2.fksensor = s.id
                );
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    getAllByFkEmpresa,
    getMediaAreaById,
    getSensorsAndReads,
    getAlertaById,
    buscarMediaCOPorHoraPorID,
    getUltimasLeiturasPorArea,
    getUltimasLeiturasTotais
}
