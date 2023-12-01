var quizModels = require("../models/quizModels");

function adicionar(req, res) {
    var qtd_acertos = req.body.respostacorretaServer; 
    var username = req.body.usernameServer;

    quizModels.adicionar(qtd_acertos, username)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("erro ao cadastrar pontos:", erro);
            res.status(500).json({ erro: "Erro ao cadastrar pontos." });
        });
}

function maiorMenorPontuação(req, res) {
    var username = req.params.username;

    quizModels.maiorMenorPontuação(username)
        .then(resultado => {
            if (resultado.length > 0) {
                var minPontuacao = resultado[0].minPontuacao;
                var maxPontuacao = resultado[0].maxPontuacao;
                res.json({ minPontuacao, maxPontuacao });
            } else {
                res.status(404).json({ error: "Pontuações não encontradas para o usuário." });
            }
        })
        .catch(erro => {
            console.error("Erro ao obter pontuações:", erro);
            res.status(500).json({ erro: "Erro ao obter pontuações." });
        });
}

module.exports = {
    adicionar: adicionar,
   maiorMenorPontuação:maiorMenorPontuação
};
