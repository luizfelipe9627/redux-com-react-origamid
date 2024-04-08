// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import UserPost from "./endpoints/UserPost";
import TokenPost from "./endpoints/TokenPost";
import PhotoPost from "./endpoints/PhotoPost";
import PhotoGet from "./endpoints/PhotoGet";

// Criado um componente chamado Api.
const Api = () => {
  // Retorna uma div com os componentes UserPost, TokenPost, PhotoPost e PhotoGet.
  return (
    <div>
      <h2>USER POST - Publica o usuário</h2>
      <UserPost />
      <h2>TOKEN POST - Publica o Token</h2>
      <TokenPost />
      <h2>PHOTO POST - Publica a Foto</h2>
      <PhotoPost />
      <h2>PHOTO GET - Pega a Foto</h2>
      <PhotoGet />
    </div>
  );
};

export default Api; // Exporta o componente Api.
