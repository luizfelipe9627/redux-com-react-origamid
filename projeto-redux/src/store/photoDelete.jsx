import createAsyncSlice from "./helper/createAsyncSlice";
import { PHOTO_DELETE } from "../Api";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "photoDelete", // Define o nome do slice como photoDelete.

  fetchConfig: ({ id }) => PHOTO_DELETE(id), // Define a função fetchConfig que recebe o id como parâmetro e retorna a função PHOTO_DELETE que é responsável por fazer a requisição à API e deletar a foto selecionada.
});

export const fetchPhotoDelete = slice.asyncAction; // Exporta a ação asyncAction do slice e renomeia para photoDelete.

export default slice.reducer; // Exporta o reducer do slice.
