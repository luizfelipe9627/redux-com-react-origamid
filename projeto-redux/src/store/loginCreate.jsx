import createAsyncSlice from "./helper/createAsyncSlice";
import { USER_POST } from "../Api";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "loginCreate", // Define o nome do slice como loginCreate.

  // Define a função fetchConfig que recebe um objeto contendo username, email e password como parâmetro e retorna a função USER_POST passando o username, email e password como parâmetro, essa função é responsável por enviar os dados do usuário que está se cadastrando para a API.
  fetchConfig: ({ username, email, password }) =>
    USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
});

export const fetchLoginCreate = slice.asyncAction; // Exporta a ação asyncAction do slice e renomeia para fetchloginCreate.

export default slice.reducer; // Exporta o reducer do slice.
