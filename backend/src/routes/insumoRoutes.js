// backend/src/routes/insumoRoutes.js
const express = require("express");
const router = express.Router();
const {
  addInsumo,
  getAllInsumos,
  updateInsumo,
  deleteInsumo,
} = require("../controllers/insumoController");

// Rota para adicionar um novo insumo
router.post("/", addInsumo);

router.get("/", getAllInsumos);

router.put("/:id", updateInsumo);

router.delete("/:id", deleteInsumo);

module.exports = router;
