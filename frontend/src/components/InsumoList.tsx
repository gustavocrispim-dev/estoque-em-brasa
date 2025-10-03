"use client";

import React, { useState, useEffect } from "react";
import { getAllInsumos, deleteInsumo, updateInsumo } from "@/services/api";
import Insumo from "@/types/insumo";

const InsumoList = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsumos = async () => {
    try {
      setLoading(true);
      const data = await getAllInsumos();
      setInsumos(data);
    } catch (err) {
      setError("Não foi possível carregar os insumos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsumos();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar este insumo?")) {
      try {
        await deleteInsumo(id);
        fetchInsumos(); // Atualiza a lista após a exclusão
      } catch (error) {
        setError("Erro ao deletar insumo.");
      }
    }
  };

  const handleUpdate = async (id: string, currentQuantidade: number) => {
    const newQuantidade = window.prompt(
      "Digite a nova quantidade:",
      currentQuantidade.toString()
    );
    if (newQuantidade !== null && !isNaN(Number(newQuantidade))) {
      try {
        await updateInsumo(id, { quantidade: Number(newQuantidade) });
        fetchInsumos(); // Atualiza a lista após a edição
      } catch (error) {
        setError("Erro ao atualizar insumo.");
      }
    }
  };

  if (loading) {
    return <div>Carregando insumos...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Lista de Insumos</h2>
      {insumos.length === 0 ? (
        <p>Nenhum insumo encontrado. Adicione um novo insumo.</p>
      ) : (
        <ul>
          {insumos.map((insumo) => (
            <li key={insumo._id}>
              {insumo.nome} - {insumo.quantidade} {insumo.unidadeMedida}
              <button
                onClick={() => handleUpdate(insumo._id, insumo.quantidade)}
                style={{ marginLeft: "10px" }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(insumo._id)}
                style={{ marginLeft: "10px" }}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsumoList;
