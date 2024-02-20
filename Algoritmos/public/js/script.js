// Variavel que define se modal do simulador está aberto ou fechado
var showBottle = 0;
var escolheGarrafa = 0;
var contaLinhas = 1;

//Variaveis do simulador
var nomeCliente;
var randomNumber = Math.floor(Math.random() * 7);
var randomVinhos = [
	"Cabernet Sauvignon",
	"Chardonnay",
	"Rosé de Provence",
	"Prosecco",
	"Pinot Noir",
	"Sauvignon Blanc",
	"Zinfandel",
	"Cava",
];
var tipo_vinho = randomVinhos[randomNumber];
var tamanhoSala;
var quantBarris;
var precoVinho;

//Variavel que acompanha o botao enter para ser acionada a funcao apenas quando o simulador estiver aberto
document.addEventListener("keydown", function (event) {
	if (event.keyCode !== 13 || showBottle !== 1) return;
	console.log("enter");
	nomeCliente = document.getElementById("text05");
	tamanhoSala = document.getElementById("text15");
	quantBarris = document.getElementById("text18");
	precoVinho = document.getElementById("text22");

	var custoTotal = (tamanhoSala.value / 15) * 70 * 2.5;
	var custoCorrigido = custoTotal.toFixed(0);
	var prejuizoTotal = quantBarris.value * 0.111111111 * precoVinho.value;
	var prejuizoCorrigido = prejuizoTotal.toFixed(0);
	var calcAmortizacao = custoTotal / prejuizoTotal;
	var tempoAmortizacao = Math.round(calcAmortizacao);
	var manutencao = custoTotal * 0.2572;
	var manutencaoCorrigida = manutencao.toFixed(0);

	focus32();
	document.getElementById(`text32`).blur();

	if (contaLinhas == 1) {
		text06.innerHTML += `${nomeCliente.value}, que nome interessante.`;
		text06.classList.add("textLine");
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text07.innerHTML += `Me conte ${nomeCliente.value}, qual vinicola você está representando atualmente?`;
			text07.classList.add("textLine");
		}, 2000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			focus8();
		}, 4000);
		contaLinhas++;
	} else if (contaLinhas == 2) {
		focus32();
		document.getElementById(`text32`).blur();
		text09.innerHTML += `Uau, essa vinicola produz um excelente ${tipo_vinho}.`;
		text09.classList.add("textLine");
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text10.innerHTML += `Poderia me contar um pouco sobre o processo de vocês?`;
			text10.classList.add("textLine");
		}, 2000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text11.innerHTML += `Qual o tamanho médio de safra que vocês colhem anualmente? (em ton)`;
			text11.classList.add("textLine");
		}, 4000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			focus12();
		}, 6000);
		contaLinhas++;
	} else if (contaLinhas == 3) {
		focus32();
		document.getElementById(`text32`).blur();
		text13.innerHTML += `Interessante!`;
		text13.classList.add("textLine");
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text14.innerHTML += `E qual o tamanho da sala de barricas que vocês possuem? (em m²)`;
			text14.classList.add("textLine");
		}, 2000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			focus15();
		}, 4000);
		contaLinhas++;
	} else if (contaLinhas == 4) {
		focus32();
		document.getElementById(`text32`).blur();
		text16.innerHTML += `Humm, deixa eu ver aqui...`;
		text16.classList.add("textLine");
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text17.innerHTML += `Vocês possuem quantas barricas ao todo nessa sala? (em unid)`;
			text17.classList.add("textLine");
		}, 2000);
		setTimeout(() => {
			focus18();
		}, 4000);
		contaLinhas++;
	} else if (contaLinhas == 5) {
		focus32();
		document.getElementById(`text32`).blur();
		text19.innerHTML += `Nossa, vocês devem ter barricas até o teto rsrs.`;
		text19.classList.add("textLine");
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text20.innerHTML += `Brincadeiras a parte...`;
			text20.classList.add("textLine");
		}, 2000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text21.innerHTML += `Na sua cartela de vinhos, qual o preço médio das garrafas?`;
			text21.classList.add("textLine");
		}, 4000);
		setTimeout(() => {
			focus22();
		}, 6000);
		contaLinhas++;
	} else if (contaLinhas == 6) {
		focus32();
		document.getElementById(`text32`).blur();
		text23.innerHTML += `Você sabia que um barril de carvalho deixa escapar uns 25 litros por ano?`;
		text23.classList.add("textLine");
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text24.innerHTML += `Pois é, calcula só o prejuizo que você tem.`;
			text24.classList.add("textLine");
		}, 2000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text25.innerHTML += "Quase R$" + prejuizoCorrigido + " por ano!";
			text25.classList.add("textLine");
		}, 4000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text26.innerHTML += ``;
			text26.classList.add("textLine");
		}, 5000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text27.innerHTML +=
				"Aí você pensa, que tal investir uns R$" +
				custoCorrigido +
				" num projeto top da WineTech";
			text27.classList.add("textLine");
		}, 6000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text28.innerHTML += `pra sua vinícola?`;
			text28.classList.add("textLine");
		}, 8000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text29.innerHTML +=
				"Com esse investimento, você recupera em uns " +
				tempoAmortizacao +
				" anos.";
			text29.classList.add("textLine");
		}, 10000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text30.innerHTML +=
				"Depois disso, você só fica com a manutenção, que sai por volta de R$" +
				manutencaoCorrigida;
			text30.classList.add("textLine");
		}, 12000);
		setTimeout(() => {
			focus32();
			document.getElementById(`text32`).blur();
			text31.innerHTML += `ao ano.`;
			text31.classList.add("textLine");
		}, 14000);
		contaLinhas = 1;
	}
});

//Acompanha o scroll da tela e chama funcao
window.onscroll = function () {
	esvaziar_garrafa();
};

function esvaziar_garrafa() {
	//Seleciona elementos para manipulação
	var imagemGarrafa = document.getElementById("garrafa-frente");
	var topoPagina = document.documentElement.scrollTop;
	var alturaPagina = document.documentElement.scrollHeight;
	var alturaJanela = window.innerHeight;

	//calculos do scroll
	var alturaScroll = alturaPagina - alturaJanela;
	var porcentagemAltura = (topoPagina / alturaScroll) * 100;
	escolheGarrafa = parseInt(porcentagemAltura * 0.94);

	// Se modal tiver aberto finaliza a função
	if (showBottle == 1) return;

	//utiliza a conta do scroll para definir a imagem usada
	console.log(escolheGarrafa);
	imagemGarrafa.src = `./assets/imagensPaginaPrincipal/Simulador-Financeiro/Garrafa-esvaziando/${escolheGarrafa}.png`;
}

function chamaModal() {
	// Se modal tiver aberto finaliza a função
	if (showBottle == 1) return;

	//Seleciona elementos para manipulação
	var divModal = document.getElementById("modal");
	var divGarrafa = document.getElementById("bottle");
	var textoGarrafa = document.getElementById("texto_simulador");
	var imagemGarrafa = document.getElementById("garrafa-frente");
	var sombraGarrafa = document.getElementById("garrafa-tras");
	var closeModal = document.getElementById("fechar_modal_simulador");

	//Troca imagem da garrafa, esconde a imagem "sombra" e define valores de estilo iniciais para trabalhar a animação
	imagemGarrafa.src =
		"assets/imagensPaginaPrincipal/Simulador-Financeiro/modal.png";
	sombraGarrafa.style = "display: none;";
	imagemGarrafa.style = "height: auto; width: 4.5%;padding-right: 5.9%";

	//Faz a movimentação e crescimento da garrafa do modal
	setTimeout(() => {
		divGarrafa.style = "animation: 1s linear 0s 1 normal both movebottle1;";
		imagemGarrafa.style = "animation: 1s linear 0s 1 normal both growbottle1;";
	}, 10);

	// Define valores de estilo do modal após rodar a animação
	setTimeout(() => {
		divGarrafa.style =
			"justify-content: center;align-items: center;padding-right: 0%;top: 38vh";
		imagemGarrafa.style = "width: 60%;height: auto;";
		closeModal.style = "display: flex";
		textoGarrafa.style = "display: flex";
	}, 1000);

	setTimeout(() => {
		text01.innerHTML = `Olá, seja bem vindo a WineTech!`;
		text01.classList.add("textLine");
	}, 2000);

	setTimeout(() => {
		text02.innerHTML = `Nosso simulador funciona como um bate-papo, basta digitar sua resposta`;
		text02.classList.add("textLine");
	}, 4000);

	setTimeout(() => {
		text03.innerHTML = `e pressionar enter para enviar.`;
		text03.classList.add("textLine");
	}, 6000);

	setTimeout(() => {
		text04.innerHTML = `Para iniciar a sua simulação me diga, qual o seu nome?`;
		text04.classList.add("textLine");
	}, 8000);

	setTimeout(focus5, 10000);

	// Altera a variavel que controla o mostrar do modal
	showBottle = 1;

	//mostra botao de fechar modal
}

function fechaModal() {
	// Se modal tiver fechado finaliza a função
	if (showBottle == 0) return;

	//Seleciona elementos para manipulação
	var divModal = document.getElementById("modal");
	var divGarrafa = document.getElementById("bottle");
	var textoGarrafa = document.getElementById("texto_simulador");
	var imagemGarrafa = document.getElementById("garrafa-frente");
	var sombraGarrafa = document.getElementById("garrafa-tras");
	var closeModal = document.getElementById("fechar_modal_simulador");

	//esconde botao de fechar modal
	closeModal.style = "display: none";
	textoGarrafa.style = "display: none";
	texto_simulador.innerHTML = resetSimulador;
	contaLinhas = 1;

	//Faz a movimentação e encolhimento da garrafa do modal
	setTimeout(() => {
		divGarrafa.style = "animation: 1s linear 0s 1 normal both movebottle2;";
		imagemGarrafa.style = "animation: 1s linear 0s 1 normal both growbottle2;";
	}, 10);

	//Troca imagem da garrafa, mostra a imagem "sombra" e define valores de estilo iniciais após rodar a animação
	setTimeout(() => {
		imagemGarrafa.style = "height: 180px; width: auto; padding-right: 0%";
		imagemGarrafa.src = `../assets/imagensPaginaPrincipal/Simulador-Financeiro/Garrafa-esvaziando/${escolheGarrafa}.png`;

		divGarrafa.style =
			"justify-content: end;align-items: normal;padding-right: 0%;top: 65vh;";
		sombraGarrafa.style = "display: show;";
	}, 950);

	// Altera a variavel que controla o mostrar do modal
	showBottle = 0;
}

function tela_login() {
	window.location.href = "./login.html";
}

function sobre_vinhos(tipo_vinho) {
	var modal = document.getElementById("modal_tipo_vinhos");
	var tipo = tipo_vinho;

	if (tipo == "Cabernet Sauvignon") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/cabernet-sauvignon.png";
		tipo_uva.innerHTML = `Cabernet Sauvignon`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Tinto`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 16ºC a 20ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Carnes vermelhas, 	queijos duros, massas com molho de tomate e pratos condimentados.`;
	} else if (tipo == "Chardonnay") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/chardonnay.png";
		tipo_uva.innerHTML = `Chardonnay`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Branco`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 8ºC a 12ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Frutos do mar, aves, massas leves, queijos macios e saladas.`;
	} else if (tipo == "Rosé de Provence") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/rose-de-provence.png";
		tipo_uva.innerHTML = `Rosé de Provence`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Rosé`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 8ºC a 12ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Saladas, carnes brancas, frutos do mar, queijos leves, churrasco e comidas de verão.`;
	} else if (tipo == "Prosecco") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/prosecco.png";
		tipo_uva.innerHTML = `Prosecco`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Espumante`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 5ºC a 10ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Aperitivos, frutos do mar, canapés, queijos suaves e sobremesas leves.`;
	} else if (tipo == "Pinot Noir") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/pinot-noir.png";
		tipo_uva.innerHTML = `Pinot Noir`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Tinto`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 16ºC a 20ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Carnes vermelhas, 	queijos duros, massas com molho de tomate e pratos condimentados.`;
	} else if (tipo == "Sauvignon Blanc") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/sauvignon-blanc.png";
		tipo_uva.innerHTML = `Sauvignon Blanc`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Branco`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 8ºC a 12ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Frutos do mar, aves, massas leves, queijos macios e saladas.`;
	} else if (tipo == "Zinfandel") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/zinfandel.png";
		tipo_uva.innerHTML = `Zinfandel`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Rosé`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 8ºC a 12ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Saladas, carnes brancas, frutos do mar, queijos leves, churrasco e comidas de verão.`;
	} else if (tipo == "Cava") {
		imagem_tipo_vinho.src =
			"./assets/imagensPaginaPrincipal/tipos-vinho/cava.png";
		tipo_uva.innerHTML = `Cava`;
		tipo_vinho.innerHTML = `<b>Tipo:</b> Espumante`;
		temperatura_servico.innerHTML = `<b>Temperatura de Serviço:</b> 5ºC a 10ºC`;
		harmonizacao_vinho.innerHTML = `<b>Harmonização:</b> Aperitivos, frutos do mar, canapés, queijos suaves e sobremesas leves.`;
	}

	modal.style = "display: flex";
}

function controle_temperatura() {
	var modal_controle = document.getElementById("modal_controle_adega");
	var closeModal = document.getElementById("fechar_modal_adega");

	closeModal.style = "display: flex";
	modal_controle.style = "display: flex";
}

function fechar_modais() {
	var modal_tipos = document.getElementById("modal_tipo_vinhos");
	var modal_controle = document.getElementById("modal_controle_adega");

	modal_tipos.style = "display: none";
	modal_controle.style = "display: none";
}

window.addEventListener("click", (e) => {
	var modal_tipos = document.getElementById("modal_tipo_vinhos");
	var modal_controle = document.getElementById("modal_controle_adega");
	if (e.target == modal_tipos || e.target == modal_controle) {
		fechar_modais();
	}
});

function focus5() {
	document.getElementById(`text05`).focus();
}
function focus8() {
	document.getElementById(`text08`).focus();
}
function focus12() {
	document.getElementById(`text12`).focus();
}
function focus15() {
	document.getElementById(`text15`).focus();
}
function focus18() {
	document.getElementById(`text18`).focus();
}
function focus22() {
	document.getElementById(`text22`).focus();
}
function focus30() {
	document.getElementById(`text30`).focus();
}
function focus32() {
	document.getElementById(`text32`).focus();
}

var resetSimulador = `
		< div id = "line01" class="lines" >
			<div id="text01" class="">
			</div>
			   </div >
				<div id="line02" class="lines">
               <div id="text02" class="">
               </div>
			   </div>
				<div id="line03" class="lines">
               <div id="text03" class="">
               </div>
			   </div>
				<div id="line04" class="lines">
               <div id="text04" class="">
               </div>
			   </div>
				 <div id="line05" class="lines">
               <input id="text05" class="inputLine"></input>
            </div>
				<div id="line06" class="lines">
					 <div id="text06" class="">
					 </div>
				 </div>
				 <div id="line07" class="lines">
               <div id="text07" class="">
               </div>
			   </div>
				<div id="line08" class="lines">
               <input id="text08" class="inputLine"></input>
            </div>
				<div id="line09" class="lines">
               <div id="text09" class="">
               </div>
			   </div>
				<div id="line10" class="lines">
               <div id="text10" class="">
               </div>
			   </div>
				 <div id="line11" class="lines">
               <div id="text11" class="">
               </div>
			   </div>
				<div id="line12" class="lines">
               <input id="text12" class="inputLine"></input>
            </div>
				<div id="line13" class="lines">
               <div id="text13" class="">
               </div>
			   </div>
				<div id="line14" class="lines">
               <div id="text14" class="">
               </div>
			   </div>
				<div id="line15" class="lines">
               <input id="text15" class="inputLine"></input>
            </div>
				<div id="line16" class="lines">
               <div id="text16" class="">
               </div>
			   </div>
				<div id="line17" class="lines">
               <div id="text17" class="">
               </div>
			   </div>
				<div id="line18" class="lines">
               <input id="text18" class="inputLine"></input>
            </div>
				<div id="line19" class="lines">
               <div id="text19" class="">
               </div>
			   </div>
				<div id="line20" class="lines">
               <div id="text20" class="">
               </div>
			   </div>
				<div id="line21" class="lines">
               <div id="text21" class="">
               </div>
            </div>
				<div id="line22" class="lines">
               <input id="text22" class="inputLine"></input>
               </div>
				<div id="line23" class="lines">
               <div id="text23" class="">
               </div>
				</div>
				<div id="line24" class="lines">
               <div id="text24" class="">
               </div>
				</div>
				<div id="line25" class="lines">
               <div id="text25" class="">
               </div>
				</div>
				<div id="line26" class="lines">
               <div id="text26" class="">
               </div>
				</div>
				<div id="line27" class="lines">
               <div id="text27" class="">
               </div>
				</div>
				<div id="line28" class="lines">
               <div id="text28" class="">
               </div>
				</div>
				<div id="line29" class="lines">
               <div id="text29" class="">
               </div>
				</div>
				<div id="line30" class="lines">
               <div id="text30" class="">
               </div>
				</div>
				<div id="line31" class="lines">
               <div id="text31" class="">
               </div>
				</div>
				<div id="line32" class="lines">
               <input id="text32" class="inputLine"></input>
				</div>
				<div id="line33" class="lines">
               <input id="text33" class="inputLine"></input>
				</div>
				<div id="line34" class="lines">
               <input id="text34" class="inputLine"></input>
				</div>
	`;
