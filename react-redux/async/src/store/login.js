import { createSlice } from "@reduxjs/toolkit";

// O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
const slice = createSlice({
  name: "login", // O nome do slice.
  // O estado inicial é um objeto com dois objetos, token e user, que possuem três propriedades, loading, data e error.
  initialState: {
    token: {
      loading: false,
      data: null,
      error: null,
    },
    user: {
      loading: false,
      data: null,
      error: null,
    },
  },
  // O reducers é um objeto que contém as ações que serão responsáveis por alterar o estado da store.
  reducers: {
    // Criado a ação fetchTokenStarted que recebe o estado como parâmetro, responsável por indicar que a requisição foi iniciada.
    fetchTokenStarted(state) {
      state.token.loading = true; // Altera o estado da propriedade loading do token para true.
    },

    // Criado a ação fetchTokenSucess que recebe o estado e a ação como parâmetro, responsável por indicar que a requisição foi bem sucedida.
    fetchTokenSucess(state, action) {
      state.token.loading = false; // Altera o estado da propriedade loading do token para false.
      state.token.data = action.payload; // Altera o estado da propriedade data do token para o payload passado como parâmetro na ação.
      state.token.error = null; // Altera o estado da propriedade error do token para null.
    },

    // Criado a ação fetchTokenError que recebe o estado e a ação como parâmetro, responsável por indicar que a requisição falhou.
    fetchTokenError(state, action) {
      state.token.loading = false; // Altera o estado da propriedade loading do token para false.
      state.token.data = null; // Altera o estado da propriedade data do token para null.
      state.token.error = action.payload; // Altera o estado da propriedade error do token para o payload passado como parâmetro na ação.
    },

    // Criado a ação fetchUserStarted que recebe o estado como parâmetro, responsável por indicar que a requisição foi iniciada.
    fetchUserStarted(state) {
      state.user.loading = true; // Altera o estado da propriedade loading do user para true.
    },

    // Criado a ação fetchUserSucess que recebe o estado e a ação como parâmetro, responsável por indicar que a requisição foi bem sucedida.
    fetchUserSucess(state, action) {
      state.user.loading = false; // Altera o estado da propriedade loading do user para false.
      state.user.data = action.payload; // Altera o estado da propriedade data do user para o payload passado como parâmetro na ação.
      state.user.error = null; // Altera o estado da propriedade error do user para null.
    },

    // Criado a ação fetchUserError que recebe o estado e a ação como parâmetro, responsável por indicar que a requisição falhou.
    fetchUserError(state, action) {
      state.user.loading = false; // Altera o estado da propriedade loading do user para false.
      state.user.data = null; // Altera o estado da propriedade data do user para null.
      state.user.error = action.payload; // Altera o estado da propriedade error do user para o payload passado como parâmetro na ação.
    },
  },
});

const {
  fetchTokenStarted,
  fetchTokenSucess,
  fetchTokenError,
  fetchUserStarted,
  fetchUserSucess,
  fetchUserError,
} = slice.actions; // Está desestruturando as ações do slice.

// Criado uma função chamada fetchToken que recebe um usuário como parâmetro e retorna uma função assíncrona que recebe o dispatch(é uma função que dispara uma ação) como parâmetro. O export é responsável por exportar a função fetchToken.
export const fetchToken = (user) => async (dispatch) => {
  // O try é responsável por tentar executar o código, caso ocorra algum erro, o catch é responsável por capturar o erro.
  try {
    dispatch(fetchTokenStarted()); // Dispara a ação fetchTokenStarted, indicando que a requisição foi iniciada.

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

    const data = await response.json(); // Criado uma constante chamada data, que recebe o resultado da requisição, que é convertido para json através da função json. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.

    return dispatch(fetchTokenSucess(data)); // Dispara a ação fetchTokenSucess passando como parâmetro os dados que foram retornados na requisição.
  } catch (error) {
    dispatch(fetchTokenError(error.message)); // Dispara a ação fetchTokenError passando como parâmetro a mensagem de erro do catch.
  }
};

// Criado uma função chamada fetchUser que recebe um token como parâmetro e retorna uma função assíncrona que recebe o dispatch(é uma função que dispara uma ação) como parâmetro. O export é responsável por exportar a função fetchUser.
export const fetchUser = (token) => async (dispatch) => {
  // O try é responsável por tentar executar o código, caso ocorra algum erro, o catch é responsável por capturar o erro.
  try {
    dispatch(fetchUserStarted()); // Dispara a ação fetchUserStarted, indicando que a requisição foi iniciada.

    // Está criando uma constante chamada response, que recebe o resultado da requisição, que é feita através da função fetch, recebendo dois parâmetros, a url da requisição e um objeto com as configurações da requisição. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/api/user", // URL da requisição.
      // Objeto com as configurações da requisição.
      {
        method: "GET", // O método GET é utilizado para buscar dados no servidor.
        // O headers é responsável por enviar os cabeçalhos da requisição, e recebe um objeto com as configurações dos cabeçalhos.
        headers: {
          Authorization: "Bearer " + token, // O cabeçalho Authorization é responsável por enviar o token de autenticação, que é utilizado para acessar os dados do usuário.
        },
      },
    );

    const data = await response.json(); // Criado uma constante chamada data, que recebe o resultado da requisição, que é convertido para json através da função json. O await é responsável por esperar a requisição ser finalizada para prosseguir com a execução do código.

    return dispatch(fetchUserSucess(data)); // Dispara a ação fetchUserSucess passando como parâmetro os dados que foram retornados na requisição.
  } catch (error) {
    dispatch(fetchUserError(error.message)); // Dispara a ação fetchUserError passando como parâmetro a mensagem de erro do catch.
  }
};

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
    console.log(error);
  }
};

export default slice.reducer; // Exporta o reducer do slice.
