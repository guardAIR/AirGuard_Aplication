var areaModel = require("../models/areaModel");


function getAllByFkEmpresa(req, res){
    var fkEmpresa = req.params.id;

    areaModel.getAllByFkEmpresa(fkEmpresa).then((resultado) => {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).json([]);
        }
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as áreas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function getMediaAreaById(req, res){
    var id = req.params.id;

    areaModel.getMediaAreaById(id).then((resultado) => {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
          console.log("Este é o resultado: ", resultado);
        } else {
          console.log("Erro está no controller")
          res.status(204).json([]);
        }
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as áreas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
    getAllByFkEmpresa,
    getMediaAreaById
}