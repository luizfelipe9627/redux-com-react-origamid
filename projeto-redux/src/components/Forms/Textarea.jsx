// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./Textarea.module.css";

// Criado um componente chamado Textarea que está recebendo a propriedade error e o resto das propriedades(...props).
const Textarea = ({ error, ...props }) => {
  // Retorna uma div que contém um label e um Textarea.
  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        // Desestrutura o props pegando apenas o que está sendo utilizado(no caso o name, id, value, placeholder e onChange) que são passados como propriedades do componente Textarea no arquivo PhotoCommentsForm.jsx.
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Textarea; // Exportando o componente Textarea.
