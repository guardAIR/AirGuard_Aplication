var areaModel = require("../models/areaModel");

function deleteAlertaById(req, res) {
  
  const alertaId = req.params.alertaId;

  areaModel.deleteAlertaById(alertaId)
    .then(function(resposta) {
      res.json(resposta);
    })
    .catch(function(error) {
      console.error("Erro ao deletar alerta");
    })
}

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

function ultimasLeiturasTotais(req, res) {
  let fkArea = req.params.fkarea;

    areaModel.getUltimasLeiturasTotais(fkArea)
        .then(resultado => {
            res.status(200).json(resultado);
        }).catch(erro => {
            console.error("Erro ao buscar leituras por área:", erro);
            res.status(500).json({ erro: erro });
        });
}

function exibirAlertasPorArea(req, res) {

  const fkEmpresa = req.params.fkEmpresa;
  const idArea = req.params.idArea;

  areaModel.exibirAlertasPorArea(fkEmpresa, idArea)
    .then(function(resultado) {
      res.json(resultado);
    })
    .catch(function(erro) {
      console.log("Erro ao exibir os alertas por área: ", erro);
    })
}

function exibirQuantidadeDeAlertasPorHorario(req, res) {

  const idArea = req.params.idArea;

  areaModel.exibirQuantidadeDeAlertasPorHorario(idArea)
    .then(function(resultado) {
      res.json(resultado);
    })
    .catch(function(erro) {
      console.log("Erro ao exibir quantidade de alertas por horário", erro);
    })
}


module.exports = {
  getAllByFkEmpresa,
  getMediaAreaById,
  getSensorsAndRead,
  getAlertaById,
  buscarMediaCOPorHoraPorID,
  ultimasLeiturasPorArea,
  ultimasLeiturasTotais,
  exibirAlertasPorArea,
  exibirQuantidadeDeAlertasPorHorario,
  deleteAlertaById
}