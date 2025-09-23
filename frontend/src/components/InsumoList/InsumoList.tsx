"use client";

import React, { useState } from "react";
import { addInsumo } from "@/services/api";

const InsumoForm = () => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addInsumo({
        nome,
        quantidade: Number(quantidade),
        unidadeMedida,
      });
      // Limpar o formulário após o sucesso
      setNome("");
      setQuantidade("");
      setUnidadeMedida("");
      alert("Insumo adicionado com sucesso!");
    } catch (error) {
      alert("Erro ao adicionar insumo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
        margin: "20px 0",
      }}
    >
      <h2>Adicionar Insumo</h2>
      <input
        type="text"
        placeholder="Nome do Insumo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Unidade de Medida (ex: kg, un)"
        value={unidadeMedida}
        onChange={(e) => setUnidadeMedida(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adicionando..." : "Adicionar Insumo"}
      </button>
    </form>
  );
};

export default InsumoForm;
