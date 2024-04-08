// Importa a biblioteca React.
import React from "react";

// Importa o helper.
import Image from "../Helper/Image";

// Importa o CSS Module.
import styles from "./FeedPhotosItem.module.css";

// Importa o hook useDispatch e useSelector do React Redux.
import { useDispatch } from "react-redux";
import { openModal } from "../../store/ui";
import { fetchPhoto } from "../../store/photo";

// Cria um componente chamado FeedPhotosItem que recebe a propriedade photo definida no componente FeedPhotos.
const FeedPhotosItem = ({ photo }) => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  function handleClick() {
    dispatch(openModal()); // Dispara a action openModal que é responsável por abrir o modal.
    dispatch(fetchPhoto(photo.id)); // Dispara a action fetchPhoto que é responsável por buscar a foto na api, passando o id da foto como parâmetro.
  }

  return (
    // Cria uma tag li que recebe a propriedade className com o valor de styles.photo e um evento de clique que ao ser acionado chamado a função handleClick.
    <li className={styles.photo} onClick={handleClick}>
      {/* Renderiza o componente Image passando as propriedades src e alt. */}
      <Image src={photo.src} alt={photo.title} />
      {/* Cria uma tag span que recebe a propriedade acessos criado na API. */}
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem; // Exporta o componente FeedPhotosItem.
