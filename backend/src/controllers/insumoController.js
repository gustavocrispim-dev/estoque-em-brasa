const Insumo = require("../models/insumo");

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

module.exports = {
  addInsumo,
};
