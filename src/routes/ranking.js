var express = require("express");
var router = express.Router();

var rankingController = require("../controllers/rankingController");

router.get("/maiores-co", function (req, res) {
    rankingController.listarMaioresCO(req, res);
});

module.exports = router;