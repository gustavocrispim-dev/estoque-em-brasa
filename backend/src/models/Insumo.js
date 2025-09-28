const mongoose = require("mongoose");

const insumoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  unidadeMedida: { type: String, required: true },
});

const Insumo = mongoose.model("Insumo", insumoSchema);

module.exports = Insumo;
