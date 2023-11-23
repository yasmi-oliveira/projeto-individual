
var express = require("express");

var router = express.Router();

var guiaController = require("../controllers/guiaController");

router.post("/cadastrar-avaliacao", function (req, res) {
    guiaController.cadastrarAvaliacao(req, res);
});

// No seu arquivo de roteamento (guiaRoutes.js)
router.get("/dados-do-grafico", function (req, res) {
    guiaController.obterDadosDoGrafico(req, res);
});


module.exports = router;



