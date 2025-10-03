const mongoose = require("mongoose");

const insumoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  unidadeMedida: { type: String, required: true },
  categoria: {
    type: String,
    required: true,
    enum: ["insumo", "embalagem", "utensílio", "outros"],
  },
});

module.exports =
  mongoose.models.Insumo || mongoose.model("Insumo", insumoSchema);
