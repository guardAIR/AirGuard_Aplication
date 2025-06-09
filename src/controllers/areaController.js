var areaModel = require("../models/areaModel");

function getAlertaById(req, res) {

  const fkEmpresa = req.params.fkEmpresa;

  areaModel.getAlertaById(fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro ao buscar alertas pelo fkEmpresa");
    })
}


function getAllByFkEmpresa(req, res) {
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

function getMediaAreaById(req, res) {
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

function getSensorsAndRead(req, res) {
  var id = req.params.fkarea;

  areaModel.getSensorsAndReads(id).then((resultado) => {
    console.log("Este é o resultado: ", resultado);
    res.status(200).json(resultado);
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os sensores: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}

function buscarMediaCOPorHoraPorID(req, res) {
  var areaID = req.params.idarea

  areaModel.buscarMediaCOPorHoraPorID(areaID).then((resultado) => {
    console.log("Este é o resultado: ", resultado);
    res.status(200).json(resultado);
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os sensores: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}

function ultimasLeiturasPorArea(req, res) {
    var fkarea = req.params.fkarea;
    areaModel.getUltimasLeiturasPorArea(fkarea)
        .then(resultado => {
            res.status(200).json(resultado);
        }).catch(erro => {
            console.error("Erro ao buscar leituras por área:", erro);
            res.status(500).json({ erro: erro });
        });
}




module.exports = {
  getAllByFkEmpresa,
  getMediaAreaById,
  getSensorsAndRead,
  getAlertaById,
  buscarMediaCOPorHoraPorID,
  ultimasLeiturasPorArea
}