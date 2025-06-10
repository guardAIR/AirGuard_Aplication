var database = require("../database/config");

function buscarMaioresCO(idempresa) {
    var instrucaoSql = `
SELECT
    ultima_leitura_sensor.nome_area_sub AS nome_area, 
    ROUND(AVG(ultima_leitura_sensor.ultima_concentracao_gas_sub), 2) AS ppm 
FROM (

    SELECT
        a.id AS id_area_sub,
        a.nome AS nome_area_sub,
        MAX(l_final.concentracao_gas) AS ultima_concentracao_gas_sub
    FROM
        area a
    INNER JOIN
        sensor s ON a.id = s.fkarea  
    LEFT JOIN (
        
        SELECT
            fksensor,
            MAX(data_hora) AS max_data_hora
        FROM
            leitura
        GROUP BY
            fksensor
    ) AS max_info ON s.id = max_info.fksensor 
    LEFT JOIN
        leitura l_final ON max_info.fksensor = l_final.fksensor
                       AND max_info.max_data_hora = l_final.data_hora
	WHERE a.fkempresa = ${idempresa}
    GROUP BY
        a.id, a.nome, s.id 
) AS ultima_leitura_sensor
GROUP BY
    ultima_leitura_sensor.id_area_sub, ultima_leitura_sensor.nome_area_sub 
ORDER BY 
    ppm DESC 
LIMIT 5; 
    `;

    return database.executar(instrucaoSql);
}

function listarAreasLimite(idempresa) {
    var instrucaoSql = `
        SELECT
                ultima_leitura_sensor.nome_area_sub AS nome_area, 
                ROUND(AVG(ultima_leitura_sensor.ultima_concentracao_gas_sub), 2) AS ppm 
            FROM (

                SELECT
                    a.id AS id_area_sub,
                    a.nome AS nome_area_sub,
                    MAX(l_final.concentracao_gas) AS ultima_concentracao_gas_sub
                FROM
                    area a
                INNER JOIN
                    sensor s ON a.id = s.fkarea  
                LEFT JOIN (
                    
                    SELECT
                        fksensor,
                        MAX(data_hora) AS max_data_hora
                    FROM
                        leitura
                    GROUP BY
                        fksensor
                ) AS max_info ON s.id = max_info.fksensor 
                LEFT JOIN
                    leitura l_final ON max_info.fksensor = l_final.fksensor
                                AND max_info.max_data_hora = l_final.data_hora
                WHERE a.fkempresa = ${idempresa}
                GROUP BY
                    a.id, a.nome, s.id 
            ) AS ultima_leitura_sensor
            GROUP BY
                ultima_leitura_sensor.id_area_sub, ultima_leitura_sensor.nome_area_sub;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaioresCO,
    listarAreasLimite
};