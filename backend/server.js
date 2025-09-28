const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const insumoRoutes = require("./src/routes/insumoRoutes");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite que o servidor aceite JSON no corpo da requisição

// Rota principal da API
app.use("/api/insumos", insumoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
