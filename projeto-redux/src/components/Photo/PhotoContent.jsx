// Importa a biblioteca React.
import React from "react";

// Importa o componente da biblioteca React Router DOM.
import { Link } from "react-router-dom";

// Importa o CSS Module.
import styles from "./PhotoContent.module.css";

// Importa o componente.
import PhotoComments from "./PhotoComments";
import PhotoDelete from "./PhotoDelete";

// Importa o helper.
import Image from "../Helper/Image";

// Importa o hook useSelector do React Redux.
import { useSelector } from "react-redux";

// Cria um componente chamado PhotoContent que recebe a propriedade data e single.
const PhotoContent = ({ single }) => {
  const photoContentRef = React.useRef(null); // Cria uma referência para o elemento photoContentRef. O valor inicial é null.

  const { photo, comments } = useSelector((state) => state.photo.data); // Está desestruturando o state.photo para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  const { data } = useSelector((state) => state.user); // Está desestruturando o state.user para pegar a propriedade data. O useSelector é responsável por acessar o estado global da aplicação.

  return (
    // Se o single for verdadeiro, ou seja se for uma foto única, então renderiza a classe single, se não renderiza uma string vazia, ou seja, não renderiza nada.
    <div
      className={`${styles.photo} ${single ? styles.single : ""}`}
      ref={photoContentRef}
    >
      <div className={styles.img}>
        {/* Renderiza o componente Image passando as propriedades src e alt. */}
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {/* Se o usuário estiver logado e o nome do usuário for igual ao nome do autor da foto, executa o if. */}
            {data && data.username === photo.author ? (
              // Renderiza o componente PhotoDelete passando a propriedade id com o valor do id da foto.
              <PhotoDelete id={photo.id} />
            ) : (
              // Se não, cria um link para o perfil do usuário que postou a foto.
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}

            {/* Exibe o total de visualizações da foto. */}
            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            {/* Criado um link que acessa a foto quando o usuário clicar no título. */}
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            {/* Faz uma condição para exibir a idade da foto no singular ou plural conforme o valor da idade. */}
            <li>
              {photo.idade} {photo.idade === 1 ? "ano" : "anos"}
            </li>
          </ul>
        </div>
      </div>
      {/* chamado o componente PhotoComments passando as propriedades id e comments. */}
      {/* Passa a propriedade single com o valor de single para que o componente PhotoComments saiba se é uma foto única ou não. */}
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
};

export default PhotoContent; // Exporta o componente PhotoContent.
