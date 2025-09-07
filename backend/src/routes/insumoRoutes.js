// backend/src/routes/insumoRoutes.js
const express = require("express");
const router = express.Router();
const { addInsumo } = require("../controllers/insumoController");

// Rota para adicionar um novo insumo
router.post("/", addInsumo);

module.exports = router;
