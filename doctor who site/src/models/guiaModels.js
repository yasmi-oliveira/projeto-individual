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
            if (totalVotos == 0) {
                // se não houver votos, insere um novo
                return inserirAvaliacao(fkusuario, avaliacao, fktemp);
            } else {
                // se já houver votos, atualiza o existente
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
      
        SELECT COUNT(fkusuario) AS count, avaliacao
        FROM avaliacao
        GROUP BY avaliacao;
    `;

    return database.executar(instrucao);
}

module.exports = {
    cadastrarAvaliacao,
    obterDadosDoGrafico
};