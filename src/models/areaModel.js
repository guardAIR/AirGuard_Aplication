var database = require("../database/config");

function deleteAlertaById(alertaId) {
    var instrucaoSql = `
        DELETE FROM alerta WHERE id = ${alertaId}
    `;

    console.log("Executando a instrução SQL (deletar o alerta pelo id): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAlertaById(fkEmpresa) {
    var instrucaoSql = `
        SELECT
            ar.nome AS nome,
            l.concentracao_gas AS concentracao,
            DATE_FORMAT(l.data_hora, "%H:%i:%s") AS data_hora
        FROM
            alerta a
        INNER JOIN
            leitura l ON a.fkleitura = l.id
        INNER JOIN
            sensor s ON l.fksensor = s.id
        INNER JOIN
            area ar ON s.fkarea = ar.id
        INNER JOIN
            empresa e ON ar.fkempresa = e.id
        INNER JOIN (
            SELECT
                s_sub.fkarea AS area_id_da_subquery,
                MAX(l_sub.data_hora) AS max_data_hora_por_area
            FROM
                leitura l_sub
            INNER JOIN
                sensor s_sub ON l_sub.fksensor = s_sub.id
            INNER JOIN
                alerta al_sub ON al_sub.fkleitura = l_sub.id 
            WHERE l_sub.data_hora >= NOW() - INTERVAL 24 HOUR 
            GROUP BY
                s_sub.fkarea 
        ) AS max_alertas_por_area
            ON ar.id = max_alertas_por_area.area_id_da_subquery
            AND l.data_hora = max_alertas_por_area.max_data_hora_por_area
        WHERE e.id = ${fkEmpresa}
        ORDER BY
        l.data_hora DESC;`;

    console.log("Executando a instrução SQL (exibir todos os alertas pelo id da empresa): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAllByFkEmpresa(fkEmpresa) {
    var instrucaoSql = `
        SELECT * FROM area WHERE fkEmpresa = ${fkEmpresa}
        order by id DESC;
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
        select  
        l.fksensor,
        l.data_hora,
        l.concentracao_gas,
        s.eixo_x,
        s.eixo_y,
        s.fkarea
        from leitura l
        inner join sensor s on s.id = l.fksensor
        inner join (
            select fksensor, max(data_hora) as ultima_leitura
            from leitura
            group by fksensor
        ) u on l.fksensor = u.fksensor and l.data_hora = u.ultima_leitura
        where s.fkarea = ${fkarea} and l.data_hora = u.ultima_leitura;
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

function getUltimasLeiturasTotais(fkArea) {
    let instrucaoSql = `
                SELECT s.id AS sensor_id, l.concentracao_gas, s.fkArea
                    FROM sensor s
                    INNER JOIN leitura l ON s.id = l.fksensor
                    WHERE l.data_hora = (
                        SELECT MAX(l2.data_hora)
                        FROM leitura l2
                    WHERE l2.fksensor = s.id
                ) AND s.fkarea = ${fkArea};
    `;
    return database.executar(instrucaoSql);
}

function exibirAlertasPorArea(fkEmpresa, idArea) {
    let instrucaoSql = `
        SELECT 
            e.id AS id,
            s.id AS idSensor,
            al.id AS idAlerta,
            a.nome AS nome,
            l.concentracao_gas AS concentracao,
            DATE_FORMAT(l.data_hora, '%H:%i:%s') AS data_hora
        FROM 
			alerta al 
		INNER JOIN
			leitura l ON al.fkleitura = l.id
		INNER JOIN 
			sensor s ON l.fksensor = s.id
		INNER JOIN
			area a ON s.fkarea = a.id
		INNER JOIN
			empresa e ON a.fkempresa = e.id
		WHERE
			e.id = ${fkEmpresa} AND a.id = ${idArea} AND DAY(l.data_hora) = DAY(CURRENT_TIMESTAMP())
        ORDER BY l.data_hora DESC;
    `;
    return database.executar(instrucaoSql);
}

function exibirQuantidadeDeAlertasPorHorario(idArea) {
    let instrucaoSql = `
        SELECT
            count(*) AS quantidade,
            hour(l.data_hora) AS horario
        FROM
            alerta a
        INNER JOIN
            leitura l on l.id = a.fkleitura
        INNER JOIN
            sensor s on s.id = l.fksensor
        INNER JOIN
            area ar on ar.id = s.fkarea
        WHERE 
            WEEK(data_hora) = WEEK(current_timestamp) AND ar.id = ${idArea}
        GROUP BY
            hour(l.data_hora);
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
    getUltimasLeiturasTotais,
    exibirAlertasPorArea,
    exibirQuantidadeDeAlertasPorHorario,
    deleteAlertaById
}




































































/*
SELECT 
    id,
    nome,
    idAlerta,
    sensorID,
    data_hora,
    concentracao
FROM (
    SELECT 
        e.id AS id,
        a.nome AS nome,
        a.id AS idAlerta,
        s.id AS sensorID,
        DATE_FORMAT(l.data_hora, "%H:%i:%s") AS data_hora,
        l.concentracao_gas AS concentracao,
        ROW_NUMBER() OVER (PARTITION BY a.id ORDER BY l.data_hora DESC, l.id DESC) AS rn
    FROM 
        alerta al 
    INNER JOIN leitura l ON al.fkleitura = l.id
    INNER JOIN sensor s ON l.fksensor = s.id
    INNER JOIN area a ON s.fkarea = a.id
    INNER JOIN empresa e ON a.fkempresa = 2
    WHERE
        e.id = 2
        AND DATE(l.data_hora) = CURDATE()
) AS sub
WHERE rn = 1;

*/