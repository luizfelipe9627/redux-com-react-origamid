// Importa a biblioteca React.
import React from "react";

// Criado uma constante chamada types que contém um objeto com os tipos de validação do formulário.
const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    message:
      "A senha precisa ter 1 caracter maiúsculo, 1 minúsculo e 1 dígito. Com no mínimo 8 caracteres.",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize números apenas.",
  },
};

// Criado um hook chamado useForm responsável por criar um estado reativo para o formulário.
const useForm = (type) => {
  const [value, setValue] = React.useState(""); // Cria um estado chamado value e uma função para atualizar esse estado chamada setValue. O valor inicial do estado é uma string vazia.
  const [error, setError] = React.useState(null); // Cria um estado chamado error e uma função para atualizar esse estado chamada setError. O valor inicial do estado é nulo(null).

  // Criado uma função chamada validate responsável por validar o formulário e atualizar o estado error.
  function validate(value) {
    // Se o tipo for falso, ou seja vazio, retorna true fazendo com que o formulário não seja validado.
    if (type === false) return true;
    // Se o valor do estado value for igual a 0, retorna true ou seja, o formulário está vazio.
    if (value.length === 0) {
      setError("Preencha um valor."); // Atualiza o estado error com a mensagem "Preencha um valor.".
      return false; // Retorna false para indicar que o formulário está vazio.
    }
    // Se não, se o objeto types contém o tipo passado como parâmetro(o value) da função e o regex do tipo(contido no objeto types) não passar no teste do método test, retorna false.
    else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message); // Atualiza o estado error com a mensagem do tipo de validação.
      return false; // Retorna false para indicar que o formulário está inválido.
    } else {
      setError(null); // Atualiza o estado error com o valor nulo(null).
      return true; // Retorna true para indicar que o formulário está válido.
    }
  }

  // Criado uma função chamada onChange responsável por atualizar o estado value.
  function onChange({ target }) {
    // Se o estado error for true ele executa o if.
    if (error) {
      validate(target.value); // Executa a função validate passando o valor(o que foi digitado) do target(elemento que disparou o evento) como parâmetro.
    }

    setValue(target.value); // Atualiza o estado value pelo value(o que foi digitado) do target(elemento que disparou o evento).
  }

  // Retorna como objeto o valor do estado value, a função para atualizar esse estado setValue e error a função onChange, validate e onBlur.
  return {
    value,
    setValue,
    onChange,
    error,
    // Executa a função validate e passa o valor do estado value como parâmetro quando o input é alterado.
    validate: () => validate(value),
    // Executa a onBlur e passa função validate colocando o valor do estado value como parâmetro quando o input perde o foco.
    onBlur: () => validate(value),
  };
};

export default useForm; // Exportando o hook useForm.
