// backend/insumos.test.js
require("dotenv").config();

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const insumoRoutes = require("./src/routes/insumoRoutes"); // Ajuste o caminho se necessário

// Configuração do App Express para o teste
const app = express();
app.use(express.json());
app.use("/api/insumos", insumoRoutes);

// Variável para guardar o ID do insumo criado para usar em outros testes
let insumoId;

// Conexão com um banco de dados de teste ANTES de todos os testes
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Desconexão APÓS todos os testes
afterAll(async () => {
  // Opcional: Limpar o insumo criado durante o teste
  if (insumoId) {
    await request(app).delete(`/api/insumos/${insumoId}`);
  }
  await mongoose.connection.close();
});

// Bloco de testes para a API de Insumos
describe("API de Insumos", () => {
  // Teste para a rota POST (Criar Insumo)
  it("deve criar um novo insumo com categoria", async () => {
    const res = await request(app).post("/api/insumos").send({
      nome: "Tomate para Teste",
      quantidade: 10,
      unidadeMedida: "kg",
      categoria: "insumo",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.categoria).toBe("insumo");

    // Guarda o ID para usar nos próximos testes
    insumoId = res.body._id;
  });

  // Teste para a rota GET (Listar Insumos)
  it("deve listar todos os insumos", async () => {
    const res = await request(app).get("/api/insumos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Teste para a rota PUT (Atualizar Insumo)
  it("deve atualizar um insumo existente", async () => {
    const res = await request(app).put(`/api/insumos/${insumoId}`).send({
      quantidade: 20,
      categoria: "outros",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.quantidade).toBe(20);
    expect(res.body.categoria).toBe("outros");
  });

  // Teste para a rota DELETE (Deletar Insumo)
  it("deve deletar um insumo existente", async () => {
    const res = await request(app).delete(`/api/insumos/${insumoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Insumo removido com sucesso");
  });
});
