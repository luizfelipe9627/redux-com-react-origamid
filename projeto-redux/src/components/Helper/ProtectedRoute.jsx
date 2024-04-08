// Importa a biblioteca React.
import React from "react";

// Importa o componente da biblioteca React Router DOM.
import { Navigate } from "react-router-dom";

// Importa o hook useSelector do React Redux.
import { useSelector } from "react-redux";

// Criado um componente chamado ProtectedRoute que recebe uma propriedade chamada children.
const ProtectedRoute = ({ children }) => {
  const { data } = useSelector((state) => state.user); // Está desestruturando o state.user para pegar a propriedade data. O useSelector é responsável por acessar o estado global da aplicação.

  // Verifica se o data é true, ou seja, se o usuário está logado, se for executa o if.
  if (data) {
    return children; // Se o data for true, ou seja, se o usuário estiver logado, retorna o children, ou seja, o componente que foi passado como filho.
  } // Senão se o data for null, ou seja, se o usuário não estiver logado, executa o else if.
  else if (data === null) {
    return <Navigate to="/login" />; // Se o login for false, ou seja, se o usuário não estiver logado, retorna o componente Navigate que redireciona o usuário para a rota: /login.
  } // Caso nenhuma das condições acima seja atendida, executa o else.
  else {
    return <></>; // Se o login for null, ou seja, se o usuário não tiver feito login ainda, retorna um fragmento vazio.
  }
};

export default ProtectedRoute; // Exporta o componente ProtectedRoute.
