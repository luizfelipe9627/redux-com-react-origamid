// Importa a biblioteca React.
import React from "react";

// Cria um componente chamado Head que recebe as propriedades title e description.
const Head = ({ title, description }) => {
  // O useEffect é acionado toda vez que o componente é montado ou atualizado pela primeira vez ou quando o valor das propriedades title e description mudarem.
  React.useEffect(() => {
    document.title = title + " | Dogs"; // Muda o título da página.
    // Muda a descrição da página e se não tiver descrição, deixa em branco.
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", description || "");
  }, [title, description]);

  return <></>;
};

export default Head; // Exporta o componente Head.
