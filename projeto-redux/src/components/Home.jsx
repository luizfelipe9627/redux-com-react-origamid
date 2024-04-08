// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import Feed from "./Feed/Feed";

// Importa o helper.
import Head from "./Helper/Head";

// Criado um componente chamado Home.
const Home = () => {
  return (
    <section className="container mainContainer">
      {/*Chama o componente Head e passa as props title e description que são usadas para mudar o título da página e a descrição da página.*/}
      <Head
        title="Fotos"
        description="Home do site Dogs, com o feed de fotos."
      />
      <Feed />
    </section>
  );
};

export default Home; // Exportando o componente Home.
