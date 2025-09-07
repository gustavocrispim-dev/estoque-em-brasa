// server.js
const connectDB = require("./db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// conectar o banco

connectDB();

// Middleware
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do Estoque em Brasa está rodando!");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
