/*  
  - Para cada funcionalidade da aplicação, é criado um arquivo que contém: 

  1. Constantes que armazenam as ações que serão executadas.
  2. Funções que retornam um objeto com a propriedade type, ou seja, a ação que será executada.
  3. O estado inicial da funcionalidade.
  4. O reducer que é uma função que recebe o estado atual e a ação que será executada, e retorna um novo estado.
  5. O export do reducer.
*/

// Criado as constantes para ações do aluno.
const INCREMENTAR_TEMPO = "aluno/INCREMENTAR_TEMPO";
const REDUZIR_TEMPO = "aluno/REDUZIR_TEMPO";
const MODIFICAR_EMAIL = "aluno/MODIFICAR_EMAIL";

// Criado as contantes que armazenam as funções do contador, retornando um objeto com a propriedade type, ou seja, a ação que será executada e o payload, que é o valor que será passado para o estado. O export é para que possa ser importado em outros arquivos.
export const incrementarTempo = () => ({ type: INCREMENTAR_TEMPO });
export const reduzirTempo = () => ({ type: REDUZIR_TEMPO });
export const modificarEmail = (email) => ({
  type: MODIFICAR_EMAIL,
  payload: email,
});

// Criado o estado inicial do aluno.
const initialState = {
  nome: "André Rafael",
  email: "andre@origamid.com",
  diasRestantes: 120,
};

// Criado uma constante chamada reducer que recebe o retorno da função immer.produce, que é responsável por criar um novo reducer com as alterações necessárias. Recebe como primeiro parâmetro o estado da store, e como segundo parâmetro a ação que será despachada pela store, responsável por alterar o estado da store. Depois da função produce, é passado o estado inicial da store.
const reducer = immer.produce((state, action) => {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual ao valor da constante INCREMENTAR_TEMPO, irá executar o bloco de código abaixo.
    case INCREMENTAR_TEMPO:
      state.diasRestantes++; // Incrementa(acrescenta 1) o valor da propriedade diasRestantes do objeto state.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
    // Caso o valor da propriedade type seja igual ao valor da constante REDUZIR_TEMPO, irá executar o bloco de código abaixo.
    case REDUZIR_TEMPO:
      state.diasRestantes--; // Decrementa(tira 1) o valor da propriedade diasRestantes do objeto state.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
    // Caso o valor da propriedade type seja igual ao valor da constante MODIFICAR_EMAIL, irá executar o bloco de código abaixo.
    case MODIFICAR_EMAIL:
      state.email = action.payload; // Altera o valor da propriedade email do objeto state para o valor passado como payload do objeto action.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
  }
}, initialState);

export default reducer; // Exporta a função reducer para que possa ser importada em outros arquivos.
