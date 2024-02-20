var express = require("express");
var router = express.Router();

var adegaControllers = require("../controllers/adegaControllers");

router.get("/:empresaId", function (req, res) {
    adegaControllers.buscarAquariosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
    adegaControllers.cadastrar(req, res);
})

module.exports = router;