// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./Image.module.css";

// Cria um componente chamado Image que recebe as props, sendo elas: alt e src.
const Image = ({ ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true); // Cria uma constante chamada skeleton e uma função atualizadora chamada setSkeleton. O valor inicial de skeleton é true.

  // Criado uma função chamada handleLoad que recebe o evento target(elemento que disparou o evento).
  function handleLoad({ target }) {
    setSkeleton(false); // Seta o valor de skeleton para false para que o skeleton desapareça.
    target.style.opacity = 1; // Pega o elemento que disparou o evento e seta a propriedade opacity com o valor 1, fazendo com que a imagem apareça.
  }

  return (
    <div className={styles.wrapper}>
      {/* Se skeleton for true, cria um elemento div com a classe skeleton(efeito de carregamento) */}
      {skeleton && <div className={styles.skeleton}></div>}
      {/* Cria uma imagem que recebe um evento onLoad que quando tiver a imagem 100% carregada executa a função handleLoad, e o spread operator que pega todas as props passadas no componenete e passa para o elemento img. */}
      <img onLoad={handleLoad} className={styles.img} {...props} />
    </div>
  );
};

export default Image; // Exporta o componente Image.
