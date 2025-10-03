// backend/src/routes/insumoRoutes.js

const express = require("express");
const router = express.Router();

// Importa todas as funções do controller
const {
  getInsumos,
  addInsumo,
  updateInsumo,
  deleteInsumo,
} = require("../controllers/insumoController");

// Rotas para a raiz /api/insumos
// GET para buscar todos, POST para criar um novo
router.route("/").get(getInsumos).post(addInsumo);

// Rotas para um item específico via ID -> /api/insumos/:id
// PUT para atualizar, DELETE para deletar
router.route("/:id").put(updateInsumo).delete(deleteInsumo);

module.exports = router;
