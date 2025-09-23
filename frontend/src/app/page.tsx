import React from "react";
import InsumoList from "@/components/InsumoList/InsumoList";

export default function HomePage() {
  return (
    <main>
      <h1>Estoque em Brasa</h1>
      <p>Seu sistema de controle de insumos</p>
      <InsumoList />
    </main>
  );
}
