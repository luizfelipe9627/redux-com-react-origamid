import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementar, reduzir } from "./store/contador";

const Contador = () => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const contador = useSelector((state) => state.contador); // O useSelector é uma função que recebe um parâmetro que é o estado da store, e retorna o estado contador, armazenando o retorno na constante contador.

  return (
    <div>
      {/* Adiciona um evento de clique no botão que ao ser acionado, dispara a função anônima que retorna o disparo da action incrementar. */}
      <button onClick={() => dispatch(incrementar())}>+</button>
      {/* Adiciona um evento de clique no botão que ao ser acionado, dispara a função anônima que retorna o disparo da action reduzir. */}
      <button onClick={() => dispatch(reduzir())}>-</button>
      <p>{contador}</p>
    </div>
  );
};

export default Contador;
