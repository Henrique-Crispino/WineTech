// function logar() {
// 	var username_saved = "winetech";
// 	var password_saved = "saoroque";

// 	var usuario = document.getElementById("username");
// 	var senha = document.getElementById("password");

// 	if (usuario.value == username_saved && senha.value == password_saved) {
// 		window.location.href = "../Dashboard/index.html";
// 	} else {
// 		alert(`Senha e/ou Usuário inválido!`);
// 	}
// }

function toHome() {
	window.location.href = "./index.html";
}

function logar() {
	// aguardar();

	var emailVar = username.value;
	var senhaVar = password.value;

	if (emailVar == "" || senhaVar == "") {
		alertaErro.style.display = "block";
		mensagem_erro.innerHTML = "Os campos não podem estar em branco";
		setInterval(sumirMensagem, 4000);
		console.log(`erro de campos em branco`);
		return false;
	} else {
		setInterval(sumirMensagem, 5000);
	}

	console.log("FORM LOGIN: ", emailVar);
	console.log("FORM SENHA: ", senhaVar);

	fetch("/usuarios/autenticar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			emailServer: emailVar,
			senhaServer: senhaVar,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO entrar()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));
					sessionStorage.ID_USUARIO = json.idUsuario;
					sessionStorage.ID_EMPRESA = json.fkEmpresa;
					sessionStorage.NOME_USUARIO = json.nome;
					sessionStorage.ADEGAS = JSON.stringify(json.adegas);

					setTimeout(function () {
						window.location = "../dashboard/dashboard.html";
					}, 1000); // apenas para exibir o loading
				});
			} else {
				console.log("Houve um erro ao tentar realizar o login!");

				resposta.text().then((texto) => {
					console.error(texto);
					// finalizarAguardar(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});

	return false;
}

function sumirMensagem() {
	alertaErro.style.display = "none";
}
