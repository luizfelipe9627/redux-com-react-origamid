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

//* > Função middleware
/*
  - A função middleware é uma função que recebe três parâmetros, store que é a store da aplicação, next que é a função que irá chamar o próximo middleware, e action que é a ação que será executada para alterar o estado da aplicação/store.
  - Dentro do Middleware possuímos acesso a store, next e action. Assim podemos ter acesso ao estado atual via store.getState() e também podemos despachar ações com action.dispatch().
*/

// Criado uma função middleware chamada logger, que recebe três parâmetros, store, next e action.
const logger = (store) => (next) => (action) => {
  console.group(action.type); // Cria um grupo no console, com o nome do tipo da ação.
  console.log("ACTION: ", action); // Exibe no console o objeto action que foi disparado.
  console.log("PREV_STATE: ", store.getState()); // Exibe no console sempre o estado anterior da store, antes da nova ação ser executada.

  const result = next(action); // Criado uma constante chamada result, que recebe a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada.

  console.log("NEW_STATE: ", store.getState()); // Exibe no console sempre o estado atual da store, após a ação ser executada.
  console.groupEnd();

  return result; // Retorna o resultado da função next, que é a ação que está sendo utilizada para alterar o estado da store.
};

// Criado uma função middleware chamada reduzirMiddle, que recebe três parâmetros, store, next e action.
const reduzirMiddle = (store) => (next) => (action) => {
  // Se o tipo da ação for igual a string "REDUZIR", executa o bloco de if abaixo.
  if (action.type === "REDUZIR") {
    window.alert("Reduziu");
  }

  return next(action); // Retorna a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada, sendo assim irá retornar a ação que está sendo utilizada para alterar o estado da store.
};

//* > Compose
/*
  - O segundo ou terceiro argumento de createStore é considerado um enhancer. Assim como um middleware, a função do devtools também é um enhancer da store. Para passarmos mais de um, devemos utilizar a função Redux.compose().
*/

const { applyMiddleware, compose } = Redux; // Desestruturado o objeto Redux, para pegar as funções applyMiddleware e compose.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Criado uma constante chamada composeEnhancers, que recebe a função window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ que já contém a função compose, ou caso não exista, recebe some a função compose.

//* > applyMiddleware
/*
  - O Middleware ocorre entre o momento que a ação é disparada e antes dela chegar ao reducer. Ele é aplicado através da função Redux.applyMiddleware.
*/

const enchancer = composeEnhancers(applyMiddleware(logger, reduzirMiddle)); // Criado uma constante chamada enchancer, que recebe a função composeEnhancers responsável por passar mais de um enhancer(ou middleware) para a store, e passa como parâmetro a função applyMiddleware, que é responsável por aplicar o/os middleware/s na store.

const store = Redux.createStore(reducer, enchancer); // O store pode receber até três parâmetros, sendo o primeiro o reducer, o segundo o estado inicial(sendo opcional) da store, e o terceiro um middleware(ou segundo caso não tenha sido passado o estado inicial).

store.dispatch({ type: "INCREMENTAR" }); // Dispara a ação de incrementar, alterando o estado da store.
store.dispatch({ type: "INCREMENTAR" }); // Dispara a ação de incrementar, alterando o estado da store.
store.dispatch({ type: "INCREMENTAR" }); // Dispara a ação de incrementar, alterando o estado da store.
store.dispatch({ type: "REDUZIR" }); // Dispara a ação de reduzir, alterando o estado da store.
