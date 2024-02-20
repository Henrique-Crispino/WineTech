let proximaAtualizacao;

var container_menu = document.getElementsByClassName("container_menu_bar")[0];
var icone_menu = document.getElementsByClassName("ph-list")[0];

function ver_menu() {
	container_menu.style.display = "flex";
}

function fechar_menu() {
	container_menu.style.display = "none";
}

function sair() {
	sessionStorage.clear();
	window.location = "../login.html";
}

function obterDadosGrafico(idAdega) {
	// alterarTitulo(idAdega);

	if (proximaAtualizacao != undefined) {
		clearTimeout(proximaAtualizacao);
	}

	fetch(`/medidas/ultimas/${idAdega}`, { cache: "no-store" })
		.then(function (response) {
			if (response.ok) {
				// console.log(response);
				response.json().then(function (resposta) {
					// console.log(
					// 	`Dados recebidos em obterGraficos: ${JSON.stringify(resposta)}`
					// );
					resposta.medidaTemperatura.reverse();
					resposta.medidaUmidade.reverse();

					plotarGrafico(resposta, idAdega);
				});
			} else {
				console.error("Nenhum dado encontrado ou erro na API");
			}
		})
		.catch(function (error) {
			console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
		});
}

function exibirAdegasDoUsuario() {
	var adegas = JSON.parse(sessionStorage.ADEGAS);
	// console.log(`exibirAdegasDoUsuario:`, adegas);
	adegas.forEach((item) => {
		document.getElementById("select_adegas").innerHTML += `
				<option value="${item.idAdega}" onselect="trocarAdega(${item.idAdega})">${item.nome}</option>
            `;
	});
	adegaAtual = adegas[0].idAdega;
	obterDadosGrafico(adegaAtual);
}

function trocarAdega(idAdega) {
	adegaAtual = idAdega.value;

	fechar_menu();
	destruirGraficos(adegaAtual);
}

function destruirGraficos(idAdega) {
	chart_coluna.destroy();
	chart_pizza.destroy();
	chart_ocorrencia.destroy();

	chart_coluna = "";
	chart_pizza = "";
	chart_ocorrencia = "";

	obterDadosGrafico(idAdega);
}

function plotarGrafico(resposta, idAdega) {
	console.log("iniciando plotagem do gráfico...");

	var bar_ocorrencias_dia = {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					label: "Temperatura",
					data: [],
					borderWidth: 1,
					backgroundColor: "#FF6384",
				},
				{
					label: "Umidade",
					data: [],
					borderWidth: 1,
					backgroundColor: "#FFCE56",
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: "#FFF",
					},
				},
				x: {
					ticks: {
						color: "#FFF",
					},
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	};
	var column_total_ocorrencias = {
		type: "bar",
		data: {
			labels: ["Temperatura", "Umidade"],
			datasets: [
				{
					label: "Total de Alertas",
					data: [],
					backgroundColor: ["#FF6384", "#FFCE56"],
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: "#FFF",
					},
				},
				x: {
					ticks: {
						color: "#FFF",
					},
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	};
	var pizza_total_ocorrencias = {
		type: "pie",
		data: {
			labels: ["Temperatura (%)", "Umidade (%)"],
			datasets: [
				{
					label: "Porcentagem de Alertas",
					data: [], // Valores percentuais para cada categoria
					backgroundColor: ["#FF6384", "#FFCE56"],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: "#FFF",
					},
				},
				x: {
					ticks: {
						color: "#FFF",
					},
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	};
	var linha_ocorrencias_data = document.getElementById("linhas_data_hora");
	linha_ocorrencias_data.innerHTML = ``;
	var linha_ocorrencias_id = document.getElementById("linhas_id");
	linha_ocorrencias_id.innerHTML = ``;
	var linha_ocorrencias_temp = document.getElementById("linhas_temperatura");
	linha_ocorrencias_temp.innerHTML = ``;
	var linha_ocorrencias_umid = document.getElementById("linhas_umidade");
	linha_ocorrencias_umid.innerHTML = ``;

	var temp_min = document.getElementById("tempMin");
	var temp_max = document.getElementById("tempMax");
	var umid_min = document.getElementById("umidMin");
	var umid_max = document.getElementById("umidMax");

	var tempAtual = document.getElementById("tempAtual");
	var umidAtual = document.getElementById("umidAtual");

	var temperaturaAtual = Number(
		resposta.medidaTemperatura[0].temperatura
	).toFixed(1);
	var umidadeAtual = Number(resposta.medidaUmidade[0].umidade).toFixed(0);
	var modal_alerta = document.getElementById("alerta");
	var imagem_alerta = document.getElementById("imagem_alerta");
	if(intervalo_alerta == 0){
		if (
			temperaturaAtual >= 18 ||
			temperaturaAtual <= 12 ||
			umidadeAtual >= 80 ||
			umidadeAtual <= 70
		) {
			modal_alerta.style = `display: flex;`;
			imagem_alerta.src = `../assets/ImagensDashboard/critico.png`;
		} else if (
			temperaturaAtual >= 16.5 ||
			temperaturaAtual <= 13.5 ||
			umidadeAtual >= 77 ||
			umidadeAtual <= 73
		) {
			modal_alerta.style = `display: flex;`;
			imagem_alerta.src = `../assets/ImagensDashboard/alerta.png`;
		}
	}

	var marcadorTemperatura = document.getElementById("marcador_temp");
	var positionLeftTemp = (temperaturaAtual - 12) * 2.783334;
	if (temperaturaAtual <= 12) {
		marcadorTemperatura.style = "left: 3.4%";
	} else if (temperaturaAtual >= 18) {
		marcadorTemperatura.style = "left: 20.1%";
	} else {
		marcadorTemperatura.style = `left: ${3.4 + positionLeftTemp}%`;
	}
	tempAtual.innerHTML = temperaturaAtual;

	var marcadorUmidade = document.getElementById("marcador_umid");
	var positionLeftUmid = (umidadeAtual - 70) * 1.67;
	if (umidadeAtual <= 70) {
		marcadorUmidade.style = "left: 28.2%";
	} else if (umidadeAtual >= 80) {
		marcadorUmidade.style = "left: 44.9%";
	} else {
		marcadorUmidade.style = `left: ${28.2 + positionLeftUmid}%`;
	}
	umidAtual.innerHTML = umidadeAtual;

	var tempMinima = 100;
	var tempMaxima = 0;
	var umidMinima = 100;
	var umidMaxima = 0;
	var ocorrencias_temp = 0;
	var ocorrencias_umid = 0;
	var total_ocorrencias = 0;
	var porcent_temp = 0;
	var porcent_umid = 0;

	var ultima_data = resposta.medidaTemperatura[0].data_grafico;

	var dados_dias_temp = [0, 0, 0, 0, 0, 0, 0];
	var dados_dias_umid = [0, 0, 0, 0, 0, 0, 0];
	var dados_dias_labels = ["", "", "", "", "", "", ""];
	var indice_dias = 6;
	var data_anterior = ultima_data;

	// Inserindo valores recebidos em estrutura para plotar o gráfico
	for (i = 0; i < resposta.medidaTemperatura.length; i++) {
		var registroTemp = resposta.medidaTemperatura[i];
		var registroUmid = resposta.medidaUmidade[i];

		if (registroTemp.data_grafico != data_anterior) {
			if (indice_dias >= 0) {
				indice_dias -= 1;
			}
		}
		dados_dias_labels[indice_dias] = registroTemp.data_grafico;
		data_anterior = registroTemp.data_grafico;

		if (registroTemp.temperatura >= 17.5 || registroTemp.temperatura <= 12.5) {
			ocorrencias_temp += 1;
			dados_dias_temp[indice_dias] += 1;
			linha_ocorrencias_data.innerHTML += `<span>${registroTemp.data_grafico} / ${registroTemp.hora_grafico}</span><br />`;
			linha_ocorrencias_id.innerHTML += `<span>${registroTemp.id}</span><br />`;
			linha_ocorrencias_temp.innerHTML += `<span>${Number(
				registroTemp.temperatura
			).toFixed(1)} °C</span><br />`;
			linha_ocorrencias_umid.innerHTML += `<span>${Number(
				registroUmid.umidade
			).toFixed(0)} %</span><br />`;
		}

		if (registroUmid.umidade >= 78 || registroUmid.umidade <= 72) {
			ocorrencias_umid += 1;
			dados_dias_umid[indice_dias] += 1;
			linha_ocorrencias_data.innerHTML += `<span>${registroUmid.data_grafico} / ${registroUmid.hora_grafico}</span><br />`;
			linha_ocorrencias_id.innerHTML += `<span>${registroUmid.id}</span><br />`;
			linha_ocorrencias_temp.innerHTML += `<span>${Number(
				registroTemp.temperatura
			).toFixed(1)} °C</span><br />`;
			linha_ocorrencias_umid.innerHTML += `<span>${Number(
				registroUmid.umidade
			).toFixed(0)} %</span><br />`;
		}

		if (registroTemp.data_grafico == ultima_data) {
			if (registroTemp.temperatura >= tempMaxima) {
				tempMaxima = Number(registroTemp.temperatura);
			}
			if (registroTemp.temperatura <= tempMinima) {
				tempMinima = Number(registroTemp.temperatura);
			}
			if (registroUmid.umidade >= umidMaxima) {
				umidMaxima = Number(registroUmid.umidade);
			}
			if (registroUmid.umidade <= umidMinima) {
				umidMinima = Number(registroUmid.umidade);
			}
		}
	}

	// adiciona as medicoes máxima e minimas das ultimas
	temp_min.innerHTML = tempMinima.toFixed(1);
	temp_max.innerHTML = tempMaxima.toFixed(1);
	umid_min.innerHTML = umidMinima.toFixed(0);
	umid_max.innerHTML = umidMaxima.toFixed(0);

	total_ocorrencias = ocorrencias_temp + ocorrencias_umid;
	porcent_temp = ((ocorrencias_temp / total_ocorrencias) * 100).toFixed(1);
	porcent_umid = ((ocorrencias_umid / total_ocorrencias) * 100).toFixed(1);

	pizza_total_ocorrencias.data.datasets[0].data = [porcent_temp, porcent_umid];

	column_total_ocorrencias.data.datasets[0].data = [
		ocorrencias_temp,
		ocorrencias_umid,
	];

	bar_ocorrencias_dia.data.labels = dados_dias_labels;
	bar_ocorrencias_dia.data.datasets[0].data = dados_dias_temp;
	bar_ocorrencias_dia.data.datasets[1].data = dados_dias_umid;

	if (chart_coluna != "" || chart_pizza != "" || chart_ocorrencia != "") {
		chart_coluna.data.datasets[0].data = [
			ocorrencias_temp,
			ocorrencias_umid,
		];
		chart_coluna.update();

		chart_pizza.data.datasets[0].data = [porcent_temp, porcent_umid];
		chart_pizza.update();

		chart_ocorrencia.data.labels = dados_dias_labels;
		chart_ocorrencia.data.datasets[0].data = dados_dias_temp;
		chart_ocorrencia.data.datasets[1].data = dados_dias_umid;
		chart_ocorrencia.update();
	} else {
		// Adicionando gráfico criado em div na tela
		chart_coluna = new Chart(
			document.getElementById("grafico_coluna_chamado"),
			column_total_ocorrencias
		);
		chart_pizza = new Chart(
			document.getElementById("grafico_pizza_chamado"),
			pizza_total_ocorrencias
		);
		chart_ocorrencia = new Chart(
			document.getElementById("grafico_ocorrencia"),
			bar_ocorrencias_dia
		);
	}
	proximaAtualizacao = setTimeout(() => obterDadosGrafico(idAdega), 2000);
	// setTimeout(() => obterDadosGrafico(idAdega), 2000);
}

function fechar_alerta() {
	var modal_alerta = document.getElementById("alerta");

	intervalo_alerta = 1
	modal_alerta.style = `display: none;`;

	setTimeout(() => {
		intervalo_alerta = 0;
	}, 300000);
}

var intervalo_alerta = 0;

var adegaAtual = 0;
var chart_coluna = "";
var chart_pizza = "";
var chart_ocorrencia = "";

window.onload = exibirAdegasDoUsuario();
