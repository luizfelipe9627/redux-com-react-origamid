import { combineReducers } from "@reduxjs/toolkit"; // Importa o combineReducers da biblioteca redux.
import createAsyncSlice from "./helper/createAsyncSlice";
import getLocalStorage from "./helper/getLocalStorage";

// Criado uma constante chamada token que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice que quando passado para a função createAsyncSlice, retorna um novo slice.
const token = createAsyncSlice({
  name: "token", // O nome do slice.
  // Está sobrepondo o initialState, que é responsável por definir o estado inicial da store, e está passando um novo objeto.
  initialState: {
    // A propriedade data é responsável por armazenar os dados da requisição.
    data: {
      token: getLocalStorage("token", null), // Está atribuindo o valor do localStorage da chave token, e caso não exista, retorna null na propriedade token.
    },
  },
  // Está sobrescrevendo a função reducers, do createAsyncSlice, que é responsável por criar os reducers do slice, e está retornando um objeto vazio.
  reducers: {
    // Criado um reducer chamado fetchSuccess.
    fetchSuccess: {
      // O reducer recebe como parâmetro o estado da store e a ação, dentro do reducer é feito a alteração do estado da store.
      reducer(state, action) {
        state.data = action.payload; // Define o estado de data com o que foi retornado pela payload.
        state.loading = false; // Define o estado de loading como false.
        state.error = action.payload; // Define o estado de error com o que foi retornado pela payload.
      },

      // O prepare é uma função responsável por preparar a ação antes de ser enviada para o reducer, ele recebe como parâmetro o payload e retorna um objeto com o payload e a propriedade meta com o valor somar.
      prepare(payload) {
        // Retorna um objeto com duas propriedades, payload e meta.
        return {
          payload, // O payload é responsável por enviar os dados da requisição.
          // O meta é responsável por enviar informações adicionais, nesse caso está enviando o localStorage.
          meta: {
            // O localStorage é responsável por salvar os dados no navegador, e recebe um objeto contendo a chave e o valor.
            localStorage: {
              key: "token", // A chave do localStorage é token.
              value: payload.token, // O valor do localStorage é o token que foi retornado na requisição.
            },
          },
        };
      },
    },
  },
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

export default reducer; // Exporta o reducer.

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

// Criado uma função chamada autoLogin que retorna uma função assíncrona que recebe como parâmetro o dispatch que é responsável por disparar uma ação e o getState que é responsável por acessar o estado atual da store.
export const autoLogin = () => async (dispatch, getState) => {
  const state = getState(); // A constante state recebe o estado atual da store.

  const { token } = state.login.token.data; // Está desestruturando o token que está presente da propriedade data do estado.

  // Se o token for true, ou seja exsistir, ele executa o bloco de código do if.
  if (token) {
    await dispatch(fetchUser(token)); // Dispara uma ação fazendo com que a função fetchUser responsável por puxar o usuário seja acionada, passando como parâmetro o token do usuário.
  }
};