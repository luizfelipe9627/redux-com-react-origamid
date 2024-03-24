import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "./helper/createAsyncSlice";

// Criado uma constante chamada token que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const token = createAsyncSlice({
  name: "token", // O nome do slice.
  // A função fetchConfig é responsável por retornar um objeto contendo a url e as opções da requisição.
  fetchConfig: (user) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token", // URL da requisição.
    options: {
      method: "POST", // O método POST é utilizado para enviar dados para o servidor.
      headers: {
        "Content-Type": "application/json", // O cabeçalho Content-Type é responsável por informar o tipo de conteúdo que está sendo enviado na requisição, nesse caso está informando que está sendo enviado um json.
      },
      body: JSON.stringify(user), // O body é responsável por enviar os dados da requisição, mandando como parâmetro o user que será utilizado para fazer a requisição, e transformando o objeto em uma string.
    },
  }),
});

// Criado uma constante chamada user que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice de usuário.
const user = createAsyncSlice({
  name: "user", // O nome do slice.
  // A função fetchConfig é responsável por retornar um objeto contendo a url e as opções da requisição, que recebe o token como parâmetro.
  fetchConfig: (token) => ({
    url: "https://dogsapi.origamid.dev/json/api/user", // URL da requisição.
    options: {
      method: "GET", // O método GET é utilizado para buscar dados no servidor.
      headers: {
        Authorization: "Bearer " + token, // O cabeçalho Authorization é responsável por informar que o usuário está autenticado, e recebe como valor o token do usuário.
      },
    },
  }),
});

// O combineReducers está recebendo um objeto que contém o token e o user, e está retornando um novo reducer que combina os reducers do token e do user e armazena na constante reducer.
const reducer = combineReducers({
  token: token.reducer, // O reducer do token.
  user: user.reducer, // O reducer do user.
});

const fetchToken = token.asyncAction; // Acessa a função asyncAction do slice e armazena na constante fetchToken.
const fetchUser = user.asyncAction; // Acessa a função asyncAction do slice e armazena na constante fetchUser.

// Criado uma função chamada login que recebe um usuário como parâmetro e retorna uma função assíncrona que recebe o dispatch(é uma função que dispara uma ação) como parâmetro. O export é responsável por exportar a função login.
export const login = (user) => async (dispatch) => {
  // O try é responsável por tentar executar o código, caso ocorra algum erro, o catch é responsável por capturar o erro.
  try {
    const { payload } = await dispatch(fetchToken(user)); // Está desestruturando o payload da ação fetchToken que foi disparada, e armazenando na constante payload.

    // Se o payload.token existir, dispara a ação fetchUser passando como parâmetro o token que foi retornado na requisição.
    if (payload.token !== undefined) {
      await dispatch(fetchUser(payload.token)); // Dispara a ação fetchUser passando como parâmetro o token que foi retornado na requisição.
    }
  } catch (error) {
    console.error(error); // Se ocorrer algum erro, é exibido no console o erro.
  }
};

export default reducer; // Exporta o reducer.
