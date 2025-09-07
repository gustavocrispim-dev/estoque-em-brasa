const Insumo = require("../models/insumo");

// adicionar insumos
const addInsumo = async (req, res) => {
  const { nome, quantidade, unidadeMedida } = req.body;

  try {
    // Cria uma nova instância do modelo Insumo
    const novoInsumo = new Insumo({ nome, quantidade, unidadeMedida });

    // Salva o novo insumo no banco de dados
    await novoInsumo.save();

    // Retorna o insumo recém-criado com um status de sucesso
    res.status(201).json(novoInsumo);
  } catch (error) {
    // Retorna um erro caso algo dê errado
    res
      .status(500)
      .json({ message: "Erro ao adicionar insumo", error: error.message });
  }
};

//Listar insumos
const getAllInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find();
    res.status(200).json(insumos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar insumo", error: error.message });
  }
};

// Controlador para atualizar um insumo existente
const updateInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const insumo = await Insumo.findByIdAndUpdate(id, req.body, { new: true });

    if (!insumo) {
      return res.status(404).json({ message: "Insumo não encontrado" });
    }

    res.status(200).json(insumo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar insumo", error: error.message });
  }
};

// Controlador para deletar um insumo
const deleteInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const insumo = await Insumo.findByIdAndDelete(id);

    if (!insumo) {
      return res.status(404).json({ message: "Insumo não encontrado" });
    }

    res.status(200).json({ message: "Insumo removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao remover insumo", error: error.message });
  }
};

module.exports = {
  addInsumo,
  getAllInsumos,
  updateInsumo,
  deleteInsumo,
};
