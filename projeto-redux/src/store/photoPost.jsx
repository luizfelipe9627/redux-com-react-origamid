import { PHOTO_POST } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "photoPost", // Define o nome do slice como photoPost.

  fetchConfig: ({ formData, token }) => PHOTO_POST({ formData, token }), // Define a função fetchConfig que recebe um objeto contendo formData, que é o objeto com os dados dos campos do formulário, e o token do usuário, o PHOTO_POST é uma função que recebe como parâmetro o formData e o token, responsável por fazer enviar os dados para a API.
});

export const photoPost = slice.asyncAction; // Exporta a função asyncAction do slice.

export default slice.reducer; // Exporta o reducer do slice.
