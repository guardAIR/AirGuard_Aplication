var express = require("express");
var router = express.Router();

var rankingController = require("../controllers/rankingController");

router.get("/maiores-co/:ID_EMPRESA", function (req, res) {
    rankingController.listarMaioresCO(req, res);
});

router.get("/areaslimite/:ID_EMPRESA", function (req, res) {
    rankingController.listarAreasLimite(req, res);
});

module.exports = router;