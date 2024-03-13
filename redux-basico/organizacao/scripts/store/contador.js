/*  
  - Para cada funcionalidade da aplicação, é criado um arquivo que contém: 

  1. Constantes que armazenam as ações que serão executadas.
  2. Funções que retornam um objeto com a propriedade type, ou seja, a ação que será executada.
  3. O estado inicial da funcionalidade.
  4. O reducer que é uma função que recebe o estado atual e a ação que será executada, e retorna um novo estado.
  5. O export do reducer.
*/

// Criado as constantes para ações do contador.
const INCREMENTAR = "contador/INCREMENTAR";
const REDUZIR = "contador/REDUZIR";

// Criado as contantes que armazenam as funções do contador, retornando um objeto com a propriedade type, ou seja, a ação que será executada. O export é para que possa ser importado em outros arquivos.
export const incrementar = () => ({ type: INCREMENTAR });
export const reduzir = () => ({ type: REDUZIR });

// Criado o estado inicial do contador.
const initialState = 0;

// Criado uma constante chamada reducer que recebe o retorno da função immer.produce, que é responsável por criar um novo reducer com as alterações necessárias. Recebe como primeiro parâmetro o estado da store, e como segundo parâmetro a ação que será despachada pela store, responsável por alterar o estado da store. Depois da função produce, é passado o estado inicial da store.
const reducer = immer.produce((state, action) => {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a constante INCREMENTAR, irá executar o bloco de código abaixo.
    case INCREMENTAR:
      return state + 1; // Retorna o estado atual mais 1.
    // Caso o valor da propriedade type seja igual a string "REDUZIR", será executado o bloco de código abaixo.
    case REDUZIR:
      return state - 1; // Retorna o estado atual menos 1.
    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}, initialState);

export default reducer; // Exporta a função reducer para que possa ser importada em outros arquivos.
