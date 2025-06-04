var express = require("express");
var router = express.Router();

const areaController = require('../controllers/areaController');

router.get('/getAlertaById/:id', function(req, res){
    areaController.getAlertaById(req, res);
})

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

module.exports = router;