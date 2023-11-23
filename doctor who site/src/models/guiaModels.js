// // models/guiaModel.js

// var database = require("../database/config");

// function cadastrarAvaliacao(fkusuario, avaliacao, fktemp) {
//     var instrucao = `
//         -- Sua instrução SQL para cadastrar a avaliação
//         INSERT INTO avaliacao (fkusuario, avaliacao, fktemp) VALUES ( (select idusuario from usuario where username='${fkusuario}'),${avaliacao}, ${fktemp});
//     `;

//     return database.executar(instrucao);
// }

// module.exports = {
//     cadastrarAvaliacao
// };


// models/guiaModel.js

var database = require("../database/config");

function verificarVotoExistente(fkusuario, fktemp) {
    var instrucao = `
        SELECT COUNT(*) AS totalVotos
        FROM avaliacao
        WHERE fkusuario = (SELECT idusuario FROM usuario WHERE username='${fkusuario}')
        AND fktemp = ${fktemp};
    `;

    return database.executar(instrucao)
        .then(resultado => resultado[0].totalVotos);
}

function cadastrarAvaliacao(fkusuario, avaliacao, fktemp) {
    return verificarVotoExistente(fkusuario, fktemp)
        .then(totalVotos => {
            if (totalVotos === 0) {
                // Se não houver votos, insere um novo
                return inserirAvaliacao(fkusuario, avaliacao, fktemp);
            } else {
                // Se já houver votos, atualiza o existente
                return atualizarAvaliacao(fkusuario, avaliacao, fktemp);
            }
        });
}

function inserirAvaliacao(fkusuario, avaliacao, fktemp) {
    var instrucao = `
        INSERT INTO avaliacao (fkusuario, avaliacao, fktemp)
        VALUES ((SELECT idusuario FROM usuario WHERE username='${fkusuario}'), ${avaliacao}, ${fktemp});
    `;

    return database.executar(instrucao);
}

function atualizarAvaliacao(fkusuario, avaliacao, fktemp) {
    var instrucao = `
        UPDATE avaliacao
        SET avaliacao = ${avaliacao}
        WHERE fkusuario = (SELECT idusuario FROM usuario WHERE username='${fkusuario}')
        AND fktemp = ${fktemp};
    `;

    return database.executar(instrucao);
}

function obterDadosDoGrafico() {
    var instrucao = `
        -- Sua consulta SQL para obter dados do gráfico
        SELECT COUNT(avaliacao) AS count, avaliacao
        FROM avaliacao
        GROUP BY avaliacao;
    `;

    return database.executar(instrucao);
}

module.exports = {
    cadastrarAvaliacao,
    obterDadosDoGrafico
};