// Criado uma função chamada reducer, que recebe dois parâmetros, state que é o estado inicial da aplicação/store, e action que é a ação que será executada para alterar o estado da aplicação/store.
function reducer(state = 0, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a string "INCREMENTAR", irá executar o bloco de código abaixo.
    case "INCREMENTAR":
      return state + 1; // Retorna o estado atual mais 1.
    // Caso o valor da propriedade type seja igual a string "REDUZIR", será executado o bloco de código abaixo.
    case "REDUZIR":
      return state - 1; // Retorna o estado atual menos 1.
    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

const { applyMiddleware, compose } = Redux; // Desestruturado o objeto Redux, para pegar as funções applyMiddleware e compose.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Criado uma constante chamada composeEnhancers, que recebe a função window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ que já contém a função compose, ou caso não exista, recebe some a função compose.

const enchancer = composeEnhancers(applyMiddleware()); // Criado uma constante chamada enchancer, que recebe a função composeEnhancers responsável por passar mais de um enhancer(ou middleware) para a store, e passa como parâmetro a função applyMiddleware, que é responsável por aplicar o/os middleware/s na store.

const store = Redux.createStore(reducer, enchancer); // O store pode receber até três parâmetros, sendo o primeiro o reducer, o segundo o estado inicial(sendo opcional) da store, e o terceiro um middleware(ou segundo caso não tenha sido passado o estado inicial).
