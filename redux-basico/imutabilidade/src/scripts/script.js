// Criado uma constante chamada initialState que recebe um objeto com duas propriedades, name e age, que são responsáveis por armazenar o nome e a idade de uma pessoa.
let initialState = {
  name: "John Doe",
  age: 25,
};

// Criado uma função chamada reducer que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um número, e o segundo é a ação que será despachada pela store, responsável por alterar o estado da store.
function reducer(state = initialState, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a "CHANGE_NAME", irá executar o bloco de código abaixo.
    case "CHANGE_NAME":
      //* > Imutabilidade
      /*
        - O estado da store não pode ser alterado diretamente, para alterar o estado da store é necessário criar um novo objeto com as alterações necessárias.
        - A função reducer deve sempre retornar um estado novo, quando este for modificado.
        -  Nunca modifique o estado diretamente (ele deve ser imutável). O conceito de mutabilidade interfere principalmente em como lidamos com objetos e arrays.
      */

      return { ...state, name: action.payload }; // Retorna um novo objeto com o operador spread que copia todas as propriedades do objeto state, e altera o valor da propriedade name para o valor da propriedade payload do objeto action.
    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

// Criado uma constante chamada store que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro o reducer, que são responsáveis por alterar o estado da store. E como segundo parâmetro, recebe a extensão do devtools do redux para o navegador caso exista.
const store = Redux.createStore(
  reducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.dispatch({ type: "CHANGE_NAME", payload: "Mary Doe" }); // Despacha uma ação para a store, que é responsável por alterar o estado da store, e recebe um objeto com duas propriedades, type e payload, que são responsáveis por informar o tipo da ação e o valor que será alterado no estado da store.
store.dispatch({ type: "CHANGE_NAME", payload: "Jane Doe" }); // Despacha uma ação para a store, que é responsável por alterar o estado da store, e recebe um objeto com duas propriedades, type e payload, que são responsáveis por informar o tipo da ação e o valor que será alterado no estado da store.
store.dispatch({ type: "CHANGE_NAME", payload: "Peter Doe" }); // Despacha uma ação para a store, que é responsável por alterar o estado da store, e recebe um objeto com duas propriedades, type e payload, que são responsáveis por informar o tipo da ação e o valor que será alterado no estado da store.

//* > Immer e Reducer
/*
  - O immer também pode ser utilizado para trabalhar com reducers.
  - O immer nos permite trabalhar com reducers de forma mais simples.
*/

// Está sobrescrevendo a constante initialState com um novo objeto com duas propriedades, name e age, que são responsáveis por armazenar o nome e a idade de uma pessoa.
initialState = {
  name: "Luiz Henrique",
  age: 18,
};

// Criado uma constante chamada reducerWithImmer que recebe o retorno da função immer.produce, que é responsável por criar um novo reducer com as alterações necessárias. Recebe como primeiro parâmetro o estado da store, e como segundo parâmetro a ação que será despachada pela store, responsável por alterar o estado da store. Depois da função produce, é passado o estado inicial da store.
const reducerWithImmer = immer.produce((state, action) => {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    case "CHANGE_AGE":
      state.age = action.payload; // Altera o valor da propriedade age do objeto state para o valor da propriedade payload do objeto action.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
    case "CHANGE_NAME":
      state.name = action.payload; // Altera o valor da propriedade name do objeto state para o valor da propriedade payload do objeto action.
      break; // O break tem que ser utilizado para que o código não continue executando os outros cases.
  }
}, initialState);

// Criado uma constante chamada storeWithImmer que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro o reducerWithImmer, que são responsáveis por alterar o estado da store. E como segundo parâmetro, recebe a extensão do devtools do redux para o navegador caso exista.
const storeWithImmer = Redux.createStore(
  reducerWithImmer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// Despacha uma ação para a store, que é responsável por alterar o estado da store, e recebe um objeto com duas propriedades, type e payload, que são responsáveis por informar o tipo da ação e o valor que será alterado no estado da store.
storeWithImmer.dispatch({ type: "CHANGE_AGE", payload: 25 });
storeWithImmer.dispatch({ type: "CHANGE_NAME", payload: "Leandro" });
storeWithImmer.dispatch({ type: "CHANGE_AGE", payload: 35 });
storeWithImmer.dispatch({ type: "CHANGE_NAME", payload: "Maria" });
