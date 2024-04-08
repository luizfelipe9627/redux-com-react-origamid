// Importa a biblioteca React.
import React from "react";

// Importa o componente da biblioteca React Router DOM.
import { useParams } from "react-router-dom";

// Importa o componente.
import Feed from "../Feed/Feed";

// Importa o helper.
import Head from "../Helper/Head";

// Cria um componente chamado UserProfile.
const UserProfile = () => {
  // O useParams é um hook que retorna um objeto com os parâmetros da rota dinâmica. Nesse caso o id do usuário.
  const { user } = useParams(); // Desestrutura o retorno da função useParams e armazena o id do usuário na constante user.

  return (
    <section className="container mainContainer">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title={user} />
      
      <h1 className="title">{user}</h1>
      {/* Renderiza o componente Feed passando o id do usuário como parâmetro. */}
      <Feed user={user} />
    </section>
  );
};

export default UserProfile; // Exporta o componente UserProfile.
