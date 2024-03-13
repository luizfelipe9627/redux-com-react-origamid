/*  
  - Para cada funcionalidade da aplicação, é criado um arquivo que contém: 

  1. Constantes que armazenam as ações que serão executadas.
  2. Funções que retornam um objeto com a propriedade type, ou seja, a ação que será executada.
  3. O estado inicial da funcionalidade.
  4. O reducer que é uma função que recebe o estado atual e a ação que será executada, e retorna um novo estado.
  5. O export do reducer.
*/

// Criado as constantes para ações das aulas.
const COMPLETAR_AULA = "aulas/COMPLETAR_AULA";
const COMPLETAR_CURSO = "aulas/COMPLETAR_CURSO";
const RESETAR_CURSO = "aulas/RESETAR_CURSO";

// Criado as contantes que armazenam as funções do contador, retornando um objeto com a propriedade type, ou seja, a ação que será executada e o payload, que é o valor que será passado para o estado. O export é para que possa ser importado em outros arquivos.
export const completarAula = (id) => ({ type: COMPLETAR_AULA, payload: id });
export const completarCurso = () => ({ type: COMPLETAR_CURSO });
export const resetarCurso = () => ({ type: RESETAR_CURSO });

const initialState = [
  {
    id: 1,
    nome: "Design",
    completa: true,
  },
  {
    id: 2,
    nome: "HTML",
    completa: false,
  },
  {
    id: 3,
    nome: "CSS",
    completa: false,
  },
  {
    id: 4,
    nome: "JavaScript",
    completa: false,
  },
];

// Criado uma constante chamada reducer que recebe o retorno da função immer.produce, que é responsável por criar um novo reducer com as alterações necessárias. Recebe como primeiro parâmetro o estado da store, e como segundo parâmetro a ação que será despachada pela store, responsável por alterar o estado da store. Depois da função produce, é passado o estado inicial da store.
const reducer = immer.produce((state, action) => {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual ao valor da constante COMPLETAR_AULA, irá executar o bloco de código abaixo.
    case COMPLETAR_AULA:
      const index = state.findIndex((item) => item.id === action.payload); // A constante index recebe o valor do índice do array que contém o objeto com o id igual ao valor da propriedade payload do objeto action.

      // Se o valor da constante index for diferente de NaN e o valor do estado no índice da constante index for verdadeiro ou seja existir, irá executar o bloco de código abaixo.
      if (!isNaN(index) && state[index]) {
        state[index].completa = true; // Acessa o objeto do array que contém o id igual ao valor da propriedade payload do objeto action, e altera o valor da propriedade completa para true.
      }

      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
    // Caso o valor da propriedade type seja igual ao valor da constante COMPLETAR_CURSO, irá executar o bloco de código abaixo.
    case COMPLETAR_CURSO:
      // Tem que ser o forEach e não o map, pois o map retorna um novo array, e o forEach apenas percorre o array, que é o que queremos fazer.
      state.forEach((aula) => (aula.completa = true)); // O forEach é responsável por percorrer o array state, e para cada item/aula do array, irá acessar o objeto e alterar o valor da propriedade completa para true.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
    // Caso o valor da propriedade type seja igual ao valor da constante RESETAR_CURSO, irá executar o bloco de código abaixo.
    case RESETAR_CURSO:
      // Tem que ser o forEach e não o map, pois o map retorna um novo array, e o forEach apenas percorre o array, que é o que queremos fazer.
      state.forEach((aula) => (aula.completa = false)); // O forEach é responsável por percorrer o array state, e para cada item/aula do array, irá acessar o objeto e alterar o valor da propriedade completa para false.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
  }
}, initialState);

export default reducer; // Exporta a função reducer para que possa ser importada em outros arquivos.
