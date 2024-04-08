import createAsyncSlice from "./helper/createAsyncSlice";
import { STATS_GET } from "../Api";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "userStats", // Define o nome do slice como userStats.

  fetchConfig: () => STATS_GET(), // Define a função fetchConfig que retorna a função STATS_GET que é responsável por fazer a requisição à API e retornar as estatísticas do usuário.
});

export const fetchUserStats = slice.asyncAction; // Exporta a ação asyncAction do slice e renomeia para fetchStats.

export default slice.reducer; // Exporta o reducer do slice.
