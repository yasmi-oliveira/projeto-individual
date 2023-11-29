var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/quizController");

router.post("/adicionar", function (req, res) {
    usuarioController.adicionar(req, res);
})

router.get("/minmax/:username", function (req, res) {
    usuarioController.maiorMenorPontuação(req, res);
});

module.exports = router;