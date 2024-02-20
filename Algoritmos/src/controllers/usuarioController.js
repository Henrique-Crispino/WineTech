var usuarioModel = require("../models/usuarioModel");
var adegaModel = require("../models/adegaModel");

function autenticar(req, res) {
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;
	console.log(`autenticar do controller`);

	if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está indefinida!");
	} else {
		usuarioModel
			.autenticar(email, senha)
			.then(function (resultadoAutenticar) {
				console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
				console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

				if (resultadoAutenticar.length == 1) {
					console.log(resultadoAutenticar);

					adegaModel
						.buscarAdegaPorEmpresa(resultadoAutenticar[0].fkVinicola)
						.then((resultadoAdegas) => {
							if (resultadoAdegas.length > 0) {
								res.json({
									idUsuario: resultadoAutenticar[0].idUsuario,
									idEmpresa: resultadoAutenticar[0].fkVinicola,
									nome: resultadoAutenticar[0].nome,
									adegas: resultadoAdegas,
								});
							} else {
								res.status(204).json({ aquarios: [] });
							}
						});
				} else if (resultadoAutenticar.length == 0) {
					res.status(403).send("Email e/ou senha inválido(s)");
				} else {
					res.status(403).send("Mais de um usuário com o mesmo login e senha!");
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrar(req, res) {
	console.log(`cadastrar do controller`);
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nome = req.body.nomeServer;
	var telefone = req.body.telefoneServer;
	var cnpj = req.body.cnpjServer;
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;

	// Faça as validações dos valores
	if (nome == undefined) {
		res.status(400).send("Seu nome está undefined!");
	} else if (telefone == undefined) {
		res.status(400).send("Seu telefone está undefined!");
	} else if (cnpj == undefined) {
		res.status(400).send("Seu CNPJ está undefined!");
	} else if (email == undefined) {
		res.status(400).send("Seu email está undefined");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está undefined");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrar(nome, telefone, cnpj, email, senha)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	autenticar,
	cadastrar,
};
