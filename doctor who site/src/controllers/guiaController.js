
var guiaModel = require("../models/guiaModels");

function cadastrarAvaliacao(req, res) {
    var avaliacao = req.body.avaliacaoSelecionadaServer;
    var fktemp = req.body.paginaAtualServer;
    var fkusuario= req.body.fkusuarioServer;

    guiaModel.cadastrarAvaliacao( fkusuario ,avaliacao, fktemp)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao cadastrar avaliação:", erro);
            res.status(500).json(erro);
        });
}


function obterDadosDoGrafico(req, res) {
    guiaModel.obterDadosDoGrafico()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error("Erro ao buscar dados do gráfico:", error);
            res.status(500).json(error);
        });
}




module.exports = {
    cadastrarAvaliacao,
    obterDadosDoGrafico
};

