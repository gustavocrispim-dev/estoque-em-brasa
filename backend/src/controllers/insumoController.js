// backend/src/controllers/insumoController.js

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

// @desc    Atualizar um insumo
// @route   PUT /api/insumos/:id
const updateInsumo = async (req, res) => {
  try {
    const insumo = await Insumo.findById(req.params.id);

    if (!insumo) {
      return res.status(404).json({ message: "Insumo não encontrado" });
    }

    // Atualiza os campos que foram enviados no corpo da requisição
    insumo.nome = req.body.nome || insumo.nome;
    insumo.quantidade = req.body.quantidade || insumo.quantidade;
    insumo.unidadeMedida = req.body.unidadeMedida || insumo.unidadeMedida;

    const updatedInsumo = await insumo.save();
    res.json(updatedInsumo);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// @desc    Deletar um insumo
// @route   DELETE /api/insumos/:id
const deleteInsumo = async (req, res) => {
  try {
    const insumo = await Insumo.findById(req.params.id);

    if (!insumo) {
      return res.status(4404).json({ message: "Insumo não encontrado" });
    }

    await insumo.deleteOne();
    res.json({ message: "Insumo removido com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Exporta todas as funções
module.exports = {
  getInsumos,
  addInsumo,
  updateInsumo, // Garantir que está sendo exportado
  deleteInsumo, // Garantir que está sendo exportado
};
