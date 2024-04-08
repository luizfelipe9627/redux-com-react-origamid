// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./Footer.module.css";

// Importa e transforma a imagem em um componente nomeado como Dogs.
import { ReactComponent as Dogs } from "../assets/svg/dogs-footer.svg";

// Criado um componente chamado Footer.
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer; // Exportando o componente Footer.
