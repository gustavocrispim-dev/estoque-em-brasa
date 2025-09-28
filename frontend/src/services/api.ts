import axios from "axios";
import Insumo from "@/types/insumo";

// Define a URL base da sua API
const API_URL = "http://localhost:3001/api/insumos";

// Função para buscar todos os insumos
export const getAllInsumos = async (): Promise<Insumo[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar insumos:", error);
    return [];
  }
};

// Função para adicionar um novo insumo
export const addInsumo = async (insumoData: Omit<Insumo, "_id">) => {
  try {
    const response = await axios.post(API_URL, insumoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar insumo:", error);
    throw error;
  }
};

// Função para atualizar um insumo existente
export const updateInsumo = async (
  id: string,
  insumoData: Partial<Omit<Insumo, "_id">>
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, insumoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar insumo:", error);
    throw error;
  }
};

// Função para deletar um insumo
export const deleteInsumo = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar insumo:", error);
    throw error;
  }
};
