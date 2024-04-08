// Importa a biblioteca React.
import React from "react";

// Cria um componente chamado Error.
const Error = ({error}) => {
  if (!error) return null; // Se o error for null, retorna null, ou seja, não mostra nada.

  // Retorna um parágrafo com a mensagem de erro.
  return <p style={{color: "#F31", margin: "1rem 0"}}>
    {error}
  </p>;
};

export default Error; // Exporta o componente Error.
