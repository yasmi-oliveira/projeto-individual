
var database = require("../database/config");

function adicionar(qtd_acertos, username) {
    var instrucao = `
        INSERT INTO quiz (fkserie, fkusuario, qtd_acertos) VALUES
            ((SELECT idserie FROM serie WHERE idserie=1), (select idusuario from usuario where username =  '${username}'), ${qtd_acertos});
    `;

    return database.executar(instrucao);
}

function getMinAndMaxScore(username) {
    var instrucao = `
        SELECT MIN(qtd_acertos) AS minPontuacao, MAX(qtd_acertos) AS maxPontuacao
        FROM quiz
        WHERE fkusuario = (SELECT idusuario FROM usuario WHERE username='${username}');
    `;

    return database.executar(instrucao);
}

module.exports = {
    adicionar: adicionar,
    getMinAndMaxScore: getMinAndMaxScore
};
