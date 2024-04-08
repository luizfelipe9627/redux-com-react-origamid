import createAsyncSlice from "./helper/createAsyncSlice";
import { COMMENT_POST } from "../Api";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "photoComments", // Define o nome do slice como photoComments.

  fetchConfig: ({ id, comment }) => COMMENT_POST(id, { comment }), // Define a função fetchConfig que recebe o id e o comentário como parâmetro e retorna a função COMMENT_POST passando o id e o comentário como parâmetro, essa função é responsável por enviar o comentário para a API.
});

export const fetchPhotoComments = slice.asyncAction; // Exporta a ação asyncAction do slice e renomeia para fetchPhotoComments.

export default slice.reducer; // Exporta o reducer do slice.
