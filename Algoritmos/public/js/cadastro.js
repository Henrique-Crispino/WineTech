function toLogin() {
	window.location.href = "./login.html";
}

function cadastrar() {
	// aguardar();

	//Recupere o valor da nova input pelo nome do id
	// Agora vá para o método fetch logo abaixo
	var nomeVar = input_nome.value;
	var telefoneVar = input_telefone_responsavel.value;
	var cnpjVar = input_cnpj.value;
	var emailVar = input_email.value;
	var senhaVar = input_senha.value;
	var confirmacaoSenhaVar = input_confirmacao_senha.value;

	console.log(nomeVar, telefoneVar, cnpjVar, emailVar, senhaVar);

	if (
		nomeVar == "" ||
		telefoneVar == "" ||
		cnpjVar == "" ||
		emailVar == "" ||
		senhaVar == "" ||
		confirmacaoSenhaVar == ""
	) {
		alertaErro.style.display = "block";
		mensagem_erro.innerHTML = "Por favor preencha todos os campos!!";
		console.log(`erro de campos`);

		setInterval(sumirMensagem, 4000);
		return false;
	} else if (nomeVar.length <= 1) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Nome inválido<br><br>O campo nome deve conter mais de 01 caractere";

		setInterval(sumirMensagem, 4000);
		return false;
	} else if (telefoneVar.length <= 10) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
		"Telefone inválido<br><br>O campo telefone deve conter 11 caracteres";s

		setInterval(sumirMensagem, 4000);
		return false;
	} else if (cnpjVar.length <= 13) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"CNPJ inválido<br><br>O campo CNPJ deve conter 14 caracteres";

		setInterval(sumirMensagem, 4000);
		return false;
	} else if (emailVar.indexOf("@") < 0 || emailVar.indexOf(".") < 0) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Email inválido<br><br>O email deve conter os caracteres @ e .";

		setInterval(sumirMensagem, 4000);
		return false;
	} else if (senhaVar.length <= 5) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"senha inválido<br><br>A senha deve conter ao menos 06 caracteres";

		setInterval(sumirMensagem, 4000);
		return false;
		lit;
	} else if (confirmacaoSenhaVar != senhaVar) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Confirmação de senha inválida<br><br>Ambas as senhas devem ser iguais";

		setInterval(sumirMensagem, 4000);
		return false;
	} else {
		setInterval(sumirMensagem, 4000);
	}

	console.log(`cadastrar do cadastro`);
	// Enviando o valor da nova input
	fetch("/usuarios/cadastrar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			// crie um atributo que recebe o valor recuperado aqui
			// Agora vá para o arquivo routes/usuario.js
			nomeServer: nomeVar,
			telefoneServer: telefoneVar,
			cnpjServer: cnpjVar,
			emailServer: emailVar,
			senhaServer: senhaVar,
		}),
	})
		.then(function (resposta) {
			console.log(`then do cadastrar do cadastro`);
			console.log("resposta cadastro: ", resposta);

			if (resposta.ok) {
				console.log(`if do then do cadastrar do cadastro`);
				// cardErro.style.display = "block";

				// mensagem_erro.innerHTML =
				// 	"Cadastro realizado com sucesso! Redirecionando para tela de Login...";

				setTimeout(() => {
					window.location = "login.html";
				}, "2000");

				// limparFormulario();
				// finalizarAguardar();
			} else {
				throw "Houve um erro ao tentar realizar o cadastro!";
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
			// finalizarAguardar();
		});

	return false;
}

function listar() {
	fetch("/empresas/listar", {
		method: "GET",
	})
		.then(function (resposta) {
			resposta.json().then((empresas) => {
				empresas.forEach((empresa) => {
					listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
				});
			});
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});
}

function sumirMensagem() {
	alertaErro.style.display = "none";
}
