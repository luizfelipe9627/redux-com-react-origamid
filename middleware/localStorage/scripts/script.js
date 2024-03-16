// Criado uma função chamada getLocalStorage, que recebe dois parâmetros, key que é a chave que será utilizada para buscar o valor no localStorage, e initial que é o valor que será retornado caso não haja valor armazenado no localStorage.
function getLocalStorage(key, initial) {
  // O try é responsável por tentar executar o bloco de código, e caso haja erro, o catch é responsável por capturar o erro e executar o bloco de código correspondente.
  try {
    return JSON.parse(window.localStorage.getItem(key)) || initial; // Está retornando o valor armazenado no localStorage em JSON, que está armazenado na chave passada no parâmetro key, e caso não exista, retorna o valor passado no parâmetro initial.
  } catch (error) {
    return initial; // Retorna o valor passado no parâmetro initial.
  }
}

// Criado um objeto chamado initialState, que contém três propriedades, loading, data e error, que são responsáveis por armazenar o estado inicial da aplicação/store.
const initialState = {
  loading: false,
  data: getLocalStorage("data", null), // A propriedade data está recebendo o retorno da função getLocalStorage, que recebe como parâmetro a string "data" e o valor null.
  error: null,
};

// Criado uma função chamada reducer, que recebe dois parâmetros, state que é o estado inicial da aplicação/store, e action que é a ação que será executada para alterar o estado da aplicação/store.
function reducer(state = initialState, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a string "FETCH_STARTED" que é quando a requisição é iniciada, será executado o bloco de código abaixo.
    case "FETCH_STARTED":
      return { ...state, loading: true }; // Retorna um novo objeto, que contém o estado atual, e a propriedade loading com o valor true para indicar que a requisição foi iniciada.
    // Caso o valor da propriedade type seja igual a string "FETCH_SUCCESS" que é quando a requisição é bem sucedida, será executado o bloco de código abaixo.
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null }; // Retorna um novo objeto, que contém a propriedade data armazenando o resultado da requisição passado no payload, a propriedade loading com o valor false para indicar que a requisição não está mais em andamento, e a propriedade error com o valor null para indicar que não houve erro.
    // Caso o valor da propriedade type seja igual a string "FETCH_ERROR" que é quando a requisição é bem sucedida, será executado o bloco de código abaixo.
    case "FETCH_ERROR":
      return { data: null, loading: false, error: action.payload }; // Retorna um novo objeto, que contém a propriedade data com o valor null para indicar que não houve resultado na requisição, a propriedade loading com o valor false para indicar que a requisição não está mais em andamento, e a propriedade error armazenando a mensagem de erro passada no payload.
    // Caso o valor da propriedade type não corresponda a nenhum dos casos acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

// Criado uma função middleware chamada thunk, que recebe três parâmetros, o store que é a store da aplicação, next que é a função que irá chamar o próximo middleware, e action que é a ação que será executada para alterar o estado da aplicação/store.
const thunk = (store) => (next) => (action) => {
  // Se o tipo da ação for uma função, executa o bloco de if abaixo.
  if (typeof action === "function") {
    return action(store.dispatch, store.getState); // Quando a ação for uma função, irá retornar a função action, que recebe como parâmetro a função dispatch, que é responsável por disparar uma ação para alterar o estado da aplicação/store, e a função getState, que é responsável por retornar o estado atual da aplicação/store.
  }

  return next(action); // Retorna a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada, sendo assim irá retornar a ação que está sendo utilizada para alterar o estado da store.
};

//* > localStorage
/*
  - Gravar algo no localStorage é um side-effect, assim como a manipulação do DOM. Para isso podemos criar um middleware que irá lidar com a situação.
*/

// Criado uma função middleware chamada localStorage, que recebe três parâmetros, o store que é a store da aplicação, next que é a função que irá chamar o próximo middleware, e action que é a ação que será executada para alterar o estado da aplicação/store.
const localStorage = (store) => (next) => (action) => {
  const result = next(action); // Criado uma constante chamada result, que recebe a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada.

  // Se a propriedade localStorage da ação for diferente de undefined, ou seja, se a ação tiver a propriedade localStorage, executa o bloco de if abaixo.
  if (action.localStorage !== undefined) {
    // O setItem é responsável por armazenar um valor no localStorage, e recebe dois parâmetros, o primeiro é o nome da chave que será armazenada no localStorage, e o segundo é o valor que será armazenado no localStorage.
    window.localStorage.setItem(
      action.localStorage, // Está definindo o nome da chave que será armazenada no localStorage, que é passada na propriedade localStorage da ação.
      JSON.stringify(action.payload), // Está transformando o objeto passado no action.payload em uma string, pois o localStorage só aceita strings.
    );
  }

  return result; // Retorna o resultado da função next, que é a ação que está sendo utilizada para alterar o estado da store.
};

const { applyMiddleware, compose } = Redux; // Desestruturado o objeto Redux, para pegar as funções applyMiddleware e compose.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Criado uma constante chamada composeEnhancers, que recebe a função window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ que já contém a função compose, ou caso não exista, recebe some a função compose.

const enchancer = composeEnhancers(applyMiddleware(thunk, localStorage)); // Criado uma constante chamada enchancer, que recebe a função composeEnhancers responsável por passar mais de um enhancer(ou middleware) para a store, e passa como parâmetro a função applyMiddleware, que é responsável por aplicar o/os middleware/s na store.

const store = Redux.createStore(reducer, enchancer); // O store pode receber até três parâmetros, sendo o primeiro o reducer, o segundo o estado inicial(sendo opcional) da store, e o terceiro um middleware(ou segundo caso não tenha sido passado o estado inicial).

// Criado uma função assincrona chamada fetchUrl, que recebe dois parâmetros, dispatch que é a função responsável por disparar uma ação para alterar o estado da aplicação/store, e url que é a url da requisição.
function fetchUrl(url) {
  // Tem que ser retornado uma função ao invés de um objeto, para que o middleware thunk consiga executar a função.
  // Retorna uma função assíncrona que recebe como parâmetro a função dispatch.
  return async (dispatch) => {
    // O try é responsável por tentar executar o bloco de código, e caso haja erro, o catch é responsável por capturar o erro e executar o bloco de código correspondente.
    try {
      dispatch({ type: "FETCH_STARTED" }); // A função dispatch está disparando uma ação do tipo "FETCH_STARTED", que indica que a requisição foi iniciada.

      const data = await fetch(url); // A variável data recebe o resultado da requisição, que é feita através da função fetch passando como parâmetro a url da requisição.
      const json = await data.json(); // A variável json recebe o resultado da requisição, que é convertido para json através da função json.

      dispatch({ type: "FETCH_SUCCESS", payload: json, localStorage: "data" }); // A função dispatch está disparando uma ação do tipo "FETCH_SUCCESS" e como payload está passando o resultado da requisição, e a propriedade localStorage com o valor "data".
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message }); // A função dispatch está disparando uma ação do tipo "FETCH_ERROR", que indica que houve erro na requisição.
    }
  };
}

const state = store.getState(); // A constante state recebe o estado atual da store.

// Se data for igual a null, ou seja, se não houver resultado na requisição, executa o bloco de if abaixo.
if (state.data === null) {
  store.dispatch(fetchUrl("https://dogsapi.origamid.dev/json/api/photo")); // A função dispatch está disparando uma ação passando como parâmetro a função fetchUrl, que é responsável por realizar a requisição, que recebe como parâmetro a url da requisição.
}
