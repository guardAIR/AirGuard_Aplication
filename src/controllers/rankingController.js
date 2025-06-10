var rankingModel = require("../models/rankingModel");

function listarMaioresCO(req, res) {
    rankingModel.buscarMaioresCO(req.params.ID_EMPRESA)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAreasLimite(req, res) {
    rankingModel.listarAreasLimite(req.params.ID_EMPRESA)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

module.exports = {
    listarMaioresCO,
    listarAreasLimite
};