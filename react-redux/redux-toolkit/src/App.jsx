import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementar, reduzir } from "./store/countSlice.js";
import { abrir, fechar } from "./store/modal.js";

const App = () => {
  const { countSlice, modal } = useSelector((state) => state); // O useSelector é responsável por acessar o estado da store. Recebe o estado da store como parâmetro e retorna o estado da store.

  const dispatch = useDispatch(); // O useDispatch é responsável por acessar o dispatch da store. Recebe a ação que será executada como parâmetro e retorna a ação que será executada.

  return (
    <div>
      {/* Se modal for true, ou seja se ele estiver aberto, irá mostrar o h1 com o valor de countSlice. */}
      {modal && <h1>Total: {countSlice}</h1>}

      {/* Ao clicar nos botões ele irá executar a função anônima que irá executar a função dispatch fazendo com que a ação passada como parâmetro seja executada e o estado da store seja alterado. */}
      <button onClick={() => dispatch(incrementar())}>Incrementar</button>
      <button onClick={() => dispatch(reduzir())}>Reduzir</button>
      <button onClick={() => dispatch(abrir())}>Abrir</button>
      <button onClick={() => dispatch(fechar())}>Fechar</button>
    </div>
  );
};

export default App;
