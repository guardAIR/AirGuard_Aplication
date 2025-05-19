var express = require("express");
var router = express.Router();

const areaController = require('../controllers/areaController');

router.get('/getAllById/:id', function(req, res){
    areaController.getAllByFkEmpresa(req, res);
})

module.exports = router;