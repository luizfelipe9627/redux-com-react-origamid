import createAsyncSlice from "./helper/createAsyncSlice";
import { TOKEN_POST } from "../Api";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "token", // Define o nome do slice como token.

  // O estado inicial da store.
  initialState: {
    // Acessa o estado token e dentro dele acessa o objeto data, e dentro do objeto data acessa a propriedade token.
    data: {
      token: window.localStorage.getItem("token") || null, // Caso exista o token no localStorage, então o token recebe o valor do token armazenado no localStorage, caso contrário, o token recebe null.
    },
  },

  fetchConfig: (user) => TOKEN_POST(user), // Define a função fetchConfig que recebe um usuário como parâmetro e retorna a função TOKEN_POST passando os dados do usuário como parâmetro e retornando o token do usuário.
});

export const fetchToken = slice.asyncAction; // Exporta a ação fetchToken do slice.

export const { resetState: resetTokenState } = slice.actions; // Desestrutura as ações do slice, pegando a ação resetState e mudando o nome para resetTokenState para não sobrescrever a ação resetState do slice createAsyncSlice.

export default slice.reducer; // Exporta o reducer do slice.
