// frontend/src/components/InsumoForm.tsx
"use client";

import React, { useState } from "react";
import { addInsumo } from "@/services/api";
import Insumo from "@/types/insumo";

interface InsumoFormProps {
  onInsumoAdded: () => void; // Função para notificar o componente pai
}

export default function InsumoForm({ onInsumoAdded }: InsumoFormProps) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [unidadeMedida, setUnidadeMedida] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o recarregamento da página
    setIsSubmitting(true);
    setError(null);

    if (!nome || quantidade <= 0 || !unidadeMedida) {
      setError("Por favor, preencha todos os campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const novoInsumo: Omit<Insumo, "_id"> = {
        nome,
        quantidade,
        unidadeMedida,
      };
      await addInsumo(novoInsumo);

      // Limpa o formulário
      setNome("");
      setQuantidade(0);
      setUnidadeMedida("");

      // Avisa o componente pai que um insumo foi adicionado
      onInsumoAdded();
    } catch (err) {
      setError("Falha ao adicionar o insumo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Insumo</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Unidade de Medida:</label>
        <input
          type="text"
          value={unidadeMedida}
          onChange={(e) => setUnidadeMedida(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adicionando..." : "Adicionar Insumo"}
      </button>
    </form>
  );
}
