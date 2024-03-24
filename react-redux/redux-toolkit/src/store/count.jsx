import { createAction } from "@reduxjs/toolkit";

//* > createAction
/*
  - O createAction facilita a criação de ações e constantes com uma única função.
*/

export const incrementar = createAction("INCREMENTAR"); // O createAction está sendo responsável por criar uma ação chamada "INCREMENTAR" que será responsável por incrementar o estado da store. O createAction recebe uma string como parâmetro, que será o valor da propriedade type do objeto action.
export const reduzir = createAction("REDUZIR"); // O createAction está sendo responsável por criar uma ação chamada "DECREMENTAR" que será responsável por reduzir o estado da store. O createAction recebe uma string como parâmetro, que será o valor da propriedade type do objeto action.

// Criado uma função chamada count que recebe dois parâmetros, state e action. O state é o estado atual da store, e o action é a ação que será executada para alterar o estado da store.
function count(state = 0, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o tipo da ação seja igual a string "INCREMENTAR", será executado o bloco de código abaixo.
    case incrementar.type:
      return state + 1; // Retorna o estado atual mais 1.
    // Caso o tipo da ação seja igual a string "REDUZIR", será executado o bloco de código abaixo.
    case reduzir.type:
      return state - 1; // Retorna o estado atual menos 1.
    // Caso o valor da propriedade type não corresponda a nenhum dos casos acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

export default count; // Exporta a função count.
