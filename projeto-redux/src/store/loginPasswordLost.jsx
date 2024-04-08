import { PASSWORD_LOST } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "loginPasswordLost", // Define o nome do slice como loginPasswordLost.

  // Define a função fetchConfig que recebe um objeto contendo o login e a url como parâmetro e retorna a função PASSWORD_LOST passando o login e a url como parâmetro, essa função é responsável por enviar o email de recuperação de senha.
  fetchConfig: ({ login, url }) =>
    PASSWORD_LOST({
      login,
      url,
    }),
});

export const fetchLoginPasswordLost = slice.asyncAction; // Exporta a função asyncAction do slice e renomeia para fetchLoginPasswordLost.

export default slice.reducer; // Exporta o reducer do slice.
