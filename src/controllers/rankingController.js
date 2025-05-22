var rankingModel = require("../models/rankingModel");

function listarMaioresCO(req, res) {
    rankingModel.buscarMaioresCO()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarMaioresCO
};