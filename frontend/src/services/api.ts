import axios from "axios";

// Define a URL base da sua API
const API_URL = "http://localhost:3001/api/insumos";

// Definição de tipo para os dados do insumo
interface Insumo {
  _id?: string;
  nome: string;
  quantidade: number;
  unidadeMedida: string;
}

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
