// frontend/src/app/page.tsx
"use client";

import { useState } from "react";
import InsumoList from "../components/InsumoList";
import InsumoForm from "../components/InsumoForm"; // 1. Importe o formulário

export default function HomePage() {
  // Este estado servirá como uma "chave" para forçar a remontagem da lista
  const [listKey, setListKey] = useState(0);

  // Esta função será passada para o formulário
  const handleInsumoAdded = () => {
    // Ao adicionar um insumo, mudamos a chave, o que força o InsumoList
    // a ser recriado e, consequentemente, a buscar os dados novamente.
    setListKey((prevKey) => prevKey + 1);
  };

  return (
    <main>
      <h1>Estoque em Brasa</h1>
      {/* 2. Adicione o formulário e passe a função para ele */}
      <InsumoForm onInsumoAdded={handleInsumoAdded} />
      <hr /> {/* Uma linha para separar visualmente */}
      {/* 3. Adicione a `key` ao InsumoList */}
      <InsumoList key={listKey} />
    </main>
  );
}
