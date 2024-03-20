import { useSelector, useDispatch } from "react-redux";

const App = () => {
  //* > useSelector
  /* 
    - O hook useSelector é utilizado para termos acesso ao estado do Redux em qualquer local da nossa aplicação.
  */

  const state = useSelector((state) => state); // Está executando o hook useSelector que é responsável por acessar o estado da store, recebe como parâmetro uma função que retorna o estado da store e retorna o estado que desejamos acessar, no caso o proprio estado e armazena na constante state.

  console.log(state); // Está imprimindo no console o estado da store.

  // * > useDispatch
  /*
    -O hook useDispatch é utilizado para despacharmos ações para a nossa store.
  */

  const dispatch = useDispatch(); // Está executando o hook useDispatch que é responsável por acessar o dispatch da store que dispara as ações, e armazena na constante dispatch.

  // Criado uma função chamada incrementar que é responsável por incrementar o estado da store.
  function incrementar() {
    dispatch({ type: "INCREMENTAR" }); // Está chamando a função dispatch que recebe como parâmetro um objeto que possui a propriedade type que é responsável por identificar a ação que será executada, e no caso está chamando a ação INCREMENTAR.
  }

  return (
    <div>
      {/* Está imprimindo na tela o estado atual da store. */}
      <h1>Total: {state}</h1>
      {/* A cada clique no botão, a função incrementar é chamada. */}
      <button onClick={() => incrementar()}>Incrementar</button>
    </div>
  );
};

export default App;
