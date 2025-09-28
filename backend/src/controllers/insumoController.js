const Insumo = require("../models/Insumo");

// @desc    Listar todos os insumos
// @route   GET /api/insumos
const getInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find();
    res.json(insumos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Adicionar um novo insumo
// @route   POST /api/insumos
const addInsumo = async (req, res) => {
  const { nome, quantidade, unidadeMedida } = req.body;
  const insumo = new Insumo({
    nome,
    quantidade,
    unidadeMedida,
  });

  try {
    const newInsumo = await insumo.save();
    res.status(201).json(newInsumo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Adicione aqui as funções para update e delete quando as criarmos

module.exports = {
  getInsumos,
  addInsumo,
};
