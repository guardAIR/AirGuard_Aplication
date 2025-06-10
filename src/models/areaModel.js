var database = require("../database/config");

function getAlertaById(fkEmpresa) {
    var instrucaoSql = `
        select 
	        e.id as 'id',
            a.nome as 'nome',
            l.concentracao_gas as 'concentracao'
        from 
	        empresa e
        inner join
	        area a on e.id = a.${fkEmpresa}
        inner join
	        sensor s on a.id = s.fkarea
        inner join
	        leitura l on s.id = l.fksensor;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAllByFkEmpresa(fkEmpresa) {
    var instrucaoSql = `
        select * from area where fkEmpresa = ${fkEmpresa};
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


function buscarMediaCOPorHoraPorID(areaID){
    var instrucaoSql = `
        select hour(data_hora) hora, round(avg(concentracao_gas), 0) media_gas from leitura lei
        inner join sensor sen on sen.id = lei.fksensor
        inner join area ar on ar.id = sen.fkarea
        where ar.id = ${areaID} and date(data_hora) = curdate()
        group by hora;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    getAllByFkEmpresa,
    getMediaAreaById,
    getSensorsAndReads,
    getAlertaById,
    buscarMediaCOPorHoraPorID
}
