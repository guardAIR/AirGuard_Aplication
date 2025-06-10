var express = require("express");
var router = express.Router();

const areaController = require('../controllers/areaController');

router.get('/getAlertaById/:fkEmpresa', function (req, res){
    areaController.getAlertaById(req, res);
});

router.get('/getAllById/:id', function(req, res){
    areaController.getAllByFkEmpresa(req, res);
})

router.get('/getMediaAreaById/:id', function(req, res){
    areaController.getMediaAreaById(req, res);
})

router.get('/getSensorsAndRead/:fkarea', function(req, res){
    areaController.getSensorsAndRead(req, res)
})

router.get('/buscarMediaCOPorHoraPorID/:idarea', function (req, res){
    areaController.buscarMediaCOPorHoraPorID(req, res);
})

router.get('/ultimasLeituras/:fkarea', function(req, res){
    areaController.ultimasLeiturasPorArea(req, res);
});


router.get('/ultimasLeiturasTotais/', function(req, res){
    areaController.ultimasLeiturasTotais(req, res);
});

router.get('/exibirAlertasPorArea/:fkEmpresa/:idArea', function(req, res) {
    areaController.exibirAlertasPorArea(req, res);
});

router.get('/exibirQuantidadeDeAlertasPorHorario/:idArea', function(req, res) {
    areaController.exibirQuantidadeDeAlertasPorHorario(req, res);
})

module.exports = router;