// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./Input.module.css";

// Criado um componente chamado Input que está recebendo as props label, type e name.
const Input = ({ label, type, name, value, onChange, onBlur, error }) => {
  // Retorna uma div que contém um label e um input.
  return (
    <div className={styles.wrapper}>
      {/* Está renderizando o label que está recebendo o name como ID. */}
      <label htmlFor={name} className={styles.label}>
        {/* Está renderizando a props label. */}
        {label}
      </label>
      {/* Cria um input com o type e name recebidos como props. */}
      <input
        className={styles.input}
        type={type}
        name={name}
        id={name}
        // O valor do input é o valor do estado value, ou seja, o que está sendo digitado no input.
        value={value}
        // Quando houver uma alteração no input, a função onChange responsável por atualizar o estado value será chamada.
        onChange={onChange}
        // Quando o input perde o foco executa a função onBlur.
        onBlur={onBlur}
      />
      {/* Se error for verdadeiro, ou seja, se o input estiver inválido, renderiza um parágrafo com a classe error e com a mensagem do estado. */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input; // Exportando o componente Input.
