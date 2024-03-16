import getLocalStorage from "../helper/getLocalStorage.js"; // Importa a função getLocalStorage do arquivo getLocalStorage.js.

// Criado as constantes para ações do fetch do user.
const USER_FETCH_STARTED = "user/FETCH_STARTED";
const USER_FETCH_SUCCESS = "user/FETCH_SUCCESS";
const USER_FETCH_ERROR = "user/FETCH_ERROR";

// Criado as contantes que armazenam as funções do fetch do user, retornando um objeto com a propriedade type, ou seja, a ação que será executada e o payload, que é o valor que será passado para o estado.
const userFetchStarted = () => ({ type: USER_FETCH_STARTED });
const userFetchSuccess = (user) => ({
  type: USER_FETCH_SUCCESS,
  payload: user,
});
const userFetchError = (error) => ({
  type: USER_FETCH_ERROR,
  payload: error,
});

// Criado a função userFetch, que recebe um parâmetro token, que é o token que será utilizado para localizar o usuário. O export é responsável por exportar a função userFetch.
export const userFetch = (token) => {
  // Retorna uma função assíncrona(ou seja, que irá retornar uma promessa), que recebe um parâmetro dispatch, que é a função que irá disparar a ação, e getState, que é a função que irá retornar o estado atual da aplicação/store.
  return async (dispatch) => {
    try {
      dispatch(userFetchStarted()); // Dispara a ação userFetchStarted, que indica que a requisição foi iniciada. A execução do userFetchStarted está retornando um objeto com a propriedade type.

      // Está criando uma constante chamada response, que recebe o resultado da requisição, que é feita através da função fetch, recebendo dois parâmetros, a url da requisição e um objeto com as configurações da requisição. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.
      const response = await fetch(
        "https://dogsapi.origamid.dev/json/api/user", // URL da requisição.
        // Objeto com as configurações da requisição.
        {
          method: "GET", // O método GET é utilizado para buscar/puxar dados no servidor.
          headers: {
            Authorization: "Bearer" + token, // O cabeçalho Authorization é responsável por enviar o token de autenticação, que é passado no parâmetro user, e é concatenado com a string "Bearer " para indicar o tipo de autenticação.
          },
        },
      );

      const data = await response.json(); // Se tudo ocorrer bem, o resultado da requisição é convertido para json através da função json e armazenado na constante data. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.

      dispatch(userFetchSuccess(data)); // Dispara a ação userFetchSuccess, que indica que a requisição foi bem sucedida, passando como parâmetro o data que foi retornado na requisição que é passado no payload. A execução do userFetchSuccess está retornando um objeto com a propriedade type.
    } catch (error) {
      dispatch(userFetchError(error.message)); // Dispara a ação userFetchError, que indica que houve erro na requisição, passando a mensagem de erro no payload. A execução do userFetchError está retornando um objeto com a propriedade type, que é a ação que será executada, e o payload, que é o valor que será passado para o estado.
    }
  };
};

// Criado um objeto chamado initialState, que contém três propriedades, loading, data e error, que são responsáveis por armazenar o estado inicial da aplicação/store.
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Criado uma função chamada user, que recebe dois parâmetros, state que é o estado inicial da aplicação/store, e action que é a ação que será executada para alterar o estado da aplicação/store.
function user(state = initialState, action) {
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a constante USER_FETCH_STARTED que é quando a requisição é iniciada, será executado o bloco de código abaixo.
    case USER_FETCH_STARTED:
      return { ...state, loading: true }; // Retorna um novo objeto, que contém o estado atual, e a propriedade loading com o valor true para indicar que a requisição foi iniciada.
    // Caso o valor da propriedade type seja igual a constante USER_FETCH_SUCCESS que é quando a requisição é bem sucedida, será executado o bloco de código abaixo.
    case USER_FETCH_SUCCESS:
      return { data: action.payload, loading: false, error: null }; // Retorna um novo objeto, que contém a propriedade data armazenando o resultado da requisição passado no payload, a propriedade loading com o valor false para indicar que a requisição não está mais em andamento, e a propriedade error com o valor null para indicar que não houve erro.
    // Caso o valor da propriedade type seja igual a constante USER_FETCH_ERROR que é quando a requisição é bem sucedida, será executado o bloco de código abaixo.
    case USER_FETCH_ERROR:
      return { data: null, loading: false, error: action.payload }; // Retorna um novo objeto, que contém a propriedade data com o valor null para indicar que não houve resultado na requisição, a propriedade loading com o valor false para indicar que a requisição não está mais em andamento, e a propriedade error armazenando a mensagem de erro passada no payload.
    // Caso o valor da propriedade type não corresponda a nenhum dos casos acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

export default user; // Exporta o reducer user.
