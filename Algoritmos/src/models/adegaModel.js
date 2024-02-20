var database = require("../database/config");

function buscarAdegaPorEmpresa(vinicolaId) {
	instrucaoSql = `select * from adega a where fkVinicola = ${vinicolaId}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrar(vinicolaId, descricao) {
	instrucaoSql = `insert into (descricao, fkVinicola) adega values (${descricao}, ${vinicolaId})`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	buscarAdegaPorEmpresa,
	cadastrar,
};
