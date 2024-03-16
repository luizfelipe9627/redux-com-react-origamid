import getLocalStorage from "../helper/getLocalStorage.js"; // Importa a função getLocalStorage do arquivo getLocalStorage.js.

// Criado as constantes para ações do fetch do token.
const TOKEN_FETCH_STARTED = "token/FETCH_STARTED";
const TOKEN_FETCH_SUCCESS = "token/FETCH_SUCCESS";
const TOKEN_FETCH_ERROR = "token/FETCH_ERROR";

// Criado as contantes que armazenam as funções do fetch do token, retornando um objeto com a propriedade type, ou seja, a ação que será executada e o payload, que é o valor que será passado para o estado.
const tokenFetchStarted = () => ({ type: TOKEN_FETCH_STARTED });
const tokenFetchSuccess = (token) => ({
  type: TOKEN_FETCH_SUCCESS,
  payload: token,
  localStorage: "token", // Adicionado a propriedade localStorage, que é responsável por definir a chave que será utilizada para armazenar o token no localStorage.
});
const tokenFetchError = (error) => ({
  type: TOKEN_FETCH_ERROR,
  payload: error,
});

// Criado a função tokenFetch, que recebe um parâmetro user, que é o usuário que será utilizado para fazer a requisição. O export é responsável por exportar a função tokenFetch.
export const tokenFetch = (user) => {
  // Retorna uma função assíncrona(ou seja, que irá retornar uma promessa), que recebe um parâmetro dispatch, que é a função que irá disparar a ação, e getState, que é a função que irá retornar o estado atual da aplicação/store.
  return async (dispatch) => {
    try {
      dispatch(tokenFetchStarted()); // Dispara a ação tokenFetchStarted, que indica que a requisição foi iniciada. A execução do tokenFetchStarted está retornando um objeto com a propriedade type.

      // Está criando uma constante chamada response, que recebe o resultado da requisição, que é feita através da função fetch, recebendo dois parâmetros, a url da requisição e um objeto com as configurações da requisição. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.
      const response = await fetch(
        "https://dogsapi.origamid.dev/json/jwt-auth/v1/token", // URL da requisição.
        // Objeto com as configurações da requisição.
        {
          method: "POST", // O método POST é utilizado para enviar dados para o servidor.
          // O headers é responsável por enviar os cabeçalhos da requisição, e recebe um objeto com as configurações dos cabeçalhos.
          headers: {
            "Content-Type": "application/json", // O cabeçalho Content-Type é responsável por informar o tipo de conteúdo que está sendo enviado na requisição, nesse caso está informando que está sendo enviado um json.
          },
          body: JSON.stringify(user), // O body é responsável por enviar os dados da requisição, mandando como parâmetro o usuário que será utilizado para fazer a requisição, e transformando o objeto em uma string.
        },
      );

      const { token } = await response.json(); // Se tudo ocorrer bem, desestrutura o token do resultado da requisição, que é convertido para json através da função json. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.

      dispatch(tokenFetchSuccess(token)); // Dispara a ação tokenFetchSuccess, que indica que a requisição foi bem sucedida, passando como parâmetro o token que foi retornado na requisição que é passado no payload. A execução do tokenFetchSuccess está retornando um objeto com a propriedade type, que é a ação que será executada, e o payload, que é o valor que será passado para o estado e o localStorage, que é responsável por definir a chave que será utilizada para armazenar o token no localStorage.
    } catch (error) {
      dispatch(tokenFetchError(error.message)); // Dispara a ação tokenFetchError, que indica que houve erro na requisição, passando a mensagem de erro no payload. A execução do tokenFetchError está retornando um objeto com a propriedade type, que é a ação que será executada, e o payload, que é o valor que será passado para o estado.
    }
  };
};

// Criado um objeto chamado initialState, que contém três propriedades, loading, data e error, que são responsáveis por armazenar o estado inicial da aplicação/store.
const initialState = {
  loading: false,
  data: getLocalStorage("token", null), // A propriedade data está recebendo o retorno da função getLocalStorage, que recebe dois parâmetros, a string "token" que é a chave que será utilizada para buscar o valor no localStorage, e o valor null que é o valor inicial.
  error: null,
};

// Criado uma função chamada token, que recebe dois parâmetros, state que é o estado inicial da aplicação/store, e action que é a ação que será executada para alterar o estado da aplicação/store.
function token(state = initialState, action) {
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a constante TOKEN_FETCH_STARTED que é quando a requisição é iniciada, será executado o bloco de código abaixo.
    case TOKEN_FETCH_STARTED:
      return { ...state, loading: true }; // Retorna um novo objeto, que contém o estado atual, e a propriedade loading com o valor true para indicar que a requisição foi iniciada.
    // Caso o valor da propriedade type seja igual a constante TOKEN_FETCH_SUCCESS que é quando a requisição é bem sucedida, será executado o bloco de código abaixo.
    case TOKEN_FETCH_SUCCESS:
      return { data: action.payload, loading: false, error: null }; // Retorna um novo objeto, que contém a propriedade data armazenando o resultado da requisição passado no payload, a propriedade loading com o valor false para indicar que a requisição não está mais em andamento, e a propriedade error com o valor null para indicar que não houve erro.
    // Caso o valor da propriedade type seja igual a constante TOKEN_FETCH_ERROR que é quando a requisição é bem sucedida, será executado o bloco de código abaixo.
    case TOKEN_FETCH_ERROR:
      return { data: null, loading: false, error: action.payload }; // Retorna um novo objeto, que contém a propriedade data com o valor null para indicar que não houve resultado na requisição, a propriedade loading com o valor false para indicar que a requisição não está mais em andamento, e a propriedade error armazenando a mensagem de erro passada no payload.
    // Caso o valor da propriedade type não corresponda a nenhum dos casos acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

export default token; // Exporta o reducer token.
