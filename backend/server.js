// server.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

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
