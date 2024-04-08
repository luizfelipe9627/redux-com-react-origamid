// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./Button.module.css";

// Criado um componente chamado Button que está recebendo a props children desestruturada e o resto das props com o spread operator(...).
const Button = ({ children, ...props }) => {
  // Retorna um button.
  return (
    // O spread operator(...props) está passando todas as props que contém sua chave e valor iguais para o button.
    <button {...props} className={styles.button}>
      {/* Está renderizando a props children desestruturada, que é o conteúdo do botão. */}
      {children}
    </button>
  );
};

export default Button; // Exportando o componente Button.
