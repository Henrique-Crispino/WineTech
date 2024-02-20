var database = require("../database/config");

function autenticar(email, senha) {
	console.log(`autenticar do model`);
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		email,
		senha
	);
	var instrucao = `
        select idUsuario, fkVinicola, nome from usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, telefone, cnpj, email, senha) {
	console.log(`cadastrar do model`);
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		telefone,
		cnpj,
		email,
		senha
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucao = `
        select idVinicola from vinicola where CNPJ = '${cnpj}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database
		.executar(instrucao)

		.then((result) => {
			const idVinicola = result[0].idVinicola;
			// console.log(`idempresa: `, idEmpresa);

			return cadastrarUsuario(idVinicola, nome, telefone, email, senha);
		});
}

function cadastrarUsuario(idVinicola, nome, telefone, email, senha) {
	var instrucao = `INSERT INTO usuario (fkVinicola, nome, telefone, email, senha, validacao) values (${idVinicola}, '${nome}', '${telefone}', '${email}', '${senha}', 0);`;

	return database.executar(instrucao);
}

module.exports = {
	autenticar,
	cadastrar,
};
