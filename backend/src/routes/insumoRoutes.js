const express = require("express");
const router = express.Router();
const { getInsumos, addInsumo } = require("../controllers/insumoController");

// Rota para listar todos os insumos e para adicionar um novo insumo
router.route("/").get(getInsumos).post(addInsumo);

// Futuramente, as rotas para um insumo específico (update/delete) virão aqui
// Ex: router.route('/:id').put(updateInsumo).delete(deleteInsumo);

module.exports = router;
