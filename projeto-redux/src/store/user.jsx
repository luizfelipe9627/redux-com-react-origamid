import createAsyncSlice from "./helper/createAsyncSlice";
import { USER_GET } from "../Api";
import { fetchToken, resetTokenState } from "./token";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "user", // Define o nome do slice como user.

  fetchConfig: (token) => USER_GET(token), // Define a função fetchConfig que recebe o token do usuário como parâmetro, fazendo a requisição e retornando os dados do usuário que tem o token passado como parâmetro.
});

export const fetchUser = slice.asyncAction; // Exporta a ação fetchToken do slice.

const { resetState: resetUserState, fetchError } = slice.actions; // Desestrutura as ações do slice, pegando a ação resetState e mudando o nome para resetUserState para não sobrescrever a ação resetState do slice createAsyncSlice.

// Criado uma função thunk chamada userLogin que recebe o user como parâmetro retorna uma função assíncrona que recebe como parâmetro a função dispatch, responsável por despachar ações para a store. Essa função é responsável por fazer o login do usuário.
export const userLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user)); // Despacha a ação fetchToken, responsável por fazer o login do usuário através do token e desestrutura o retorno da função fetchToken, armazenando o valor do payload na constante payload.

  // Se o payload conter o token, ou seja, se o usuário foi autenticado, executa o if fazendo o login do usuário.
  if (payload.token) {
    window.localStorage.setItem("token", payload.token); // Armazena o token do usuário no localStorage.

    await dispatch(fetchUser(payload.token)); // Despacha a ação fetchUser, responsável por pegar os dados do usuário através do token do usuário, passando o token do usuário como parâmetro.
  }
};

// Criado uma função thunk chamada userLogout que retorna uma função assíncrona que recebe como parâmetro a função dispatch, responsável por despachar ações para a store. Essa função é responsável por fazer o logout do usuário.
export const userLogout = () => async (dispatch) => {
  dispatch(resetUserState()); // Está despachando a ação resetUserState que é responsável por limpar os dados do usuário.
  dispatch(resetTokenState()); // Está despachando a ação resetTokenState que é responsável por limpar o token do usuário.
  window.localStorage.removeItem("token"); // Remove o token do usuário do localStorage caso exista.
};

// Criado uma função thunk chamada autoLogin que retorna uma função assíncrona que recebe como parâmetro a função dispatch, responsável por despachar ações para a store e getState, responsável por pegar o estado atual da store. Essa função é responsável por fazer o login automático do usuário quando a página é recarregada.
export const autoLogin = () => async (dispatch, getState) => {
  const { token } = getState(); // Desestrutura o token do estado atual da store.

  // Se dentro do estado token existir a propriedade data e dentro da propriedade data existir a propriedade token, executa o if.
  if (token?.data?.token) {
    const { type } = await dispatch(fetchUser(token.data.token)); // Desestrutura o type do retorno da função fetchUser, responsável por pegar os dados do usuário através do token do usuário, passando o token do usuário como parâmetro.

    // Se o type da ação for igual a fetchError.type, ou seja, se a ação de pegar os dados do usuário através do token do usuário retornar um erro, executa o if.
    if (type === fetchError.type) {
      dispatch(userLogout()); // Despacha a ação userLogout, responsável por fazer o logout do usuário.
    }
  }
};

export default slice.reducer; // Exporta o reducer do slice.
