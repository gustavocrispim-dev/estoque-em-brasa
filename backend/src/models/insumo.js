const mongoose = require("mongoose");

const insumoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  quantidade: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  unidadeMedida: {
    type: String,
    required: true,
    trim: true,
  },
  dataAdicao: {
    type: Date,
    default: Date.now,
  },
  dataValidade: {
    type: Date,
    default: Date.now,
  },
});

const insumo = mongoose.model("insumo", insumoSchema);

module.exports = insumo;
