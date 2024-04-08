import { PASSWORD_RESET } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "loginPasswordReset", // Define o nome do slice como loginPasswordReset.

  // Define a função fetchConfig que recebe um objeto contendo login, key e password como parâmetro e retorna um objeto contendo a função PASSWORD_RESET e os parâmetros login, key e password, sendo essa função responsável por fazer o reset da senha.
  fetchConfig: ({ login, key, password }) =>
    PASSWORD_RESET({
      login,
      key,
      password: password.value,
    }),
});

export const fetchLoginPasswordReset = slice.asyncAction; // Exporta a função asyncAction do slice e renomeia para fetchLoginPasswordReset.

export default slice.reducer; // Exporta o reducer do slice.
