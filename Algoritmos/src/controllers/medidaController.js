var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
	var idAdega = req.params.idAdega;

	medidaModel
		.buscarUltimasMedidasTemp(idAdega)
		.then(function (resultadoTemp) {
			if (resultadoTemp.length > 0) {
				medidaModel
					.buscarUltimasMedidasUmid(idAdega)
					.then(function (resultadoUmid) {
						if (resultadoUmid.length > 0) {
							res.json({
								medidaTemperatura: resultadoTemp,
								medidaUmidade: resultadoUmid,
							});
						} else {
							res.status(204).send("Nenhum resultado encontrado!");
						}
					});
			} else {
				res.status(204).send("Nenhum resultado encontrado!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao buscar as ultimas medidas.",
				erro.sqlMessage
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function buscarMedidasEmTempoReal(req, res) {
	var idAdega = req.params.idAdega;

	console.log(`Recuperando medidas em tempo real`);

	medidaModel
		.buscarMedidasEmTempoReal(idAdega)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao buscar as ultimas medidas.",
				erro.sqlMessage
			);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	buscarUltimasMedidas,
	buscarMedidasEmTempoReal,
};
