// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import FeedPhotosItem from "./FeedPhotosItem";

// Importa os helpers.
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

// Importa o CSS Module.
import styles from "./FeedPhotos.module.css";

// Importa o hook useSelector do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Cria um componente chamado FeedPhotos.
const FeedPhotos = () => {
  const { list } = useSelector((state) => state.feed); // Está desestruturando o state.feed para pegar a propriedade list. O useSelector é responsável por acessar o estado global da aplicação.

  return (
    <ul className={`${styles.feed} animaLeft`}>
      {/* Percorre o array list e retorna o componente FeedPhotosItem com as props e seus valores. */}
      {list.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          // Está passando a foto como prop para o componente FeedPhotosItem.
          photo={photo}
        />
      ))}
    </ul>
  );
};

export default FeedPhotos; // Exporta o componente FeedPhotos.
