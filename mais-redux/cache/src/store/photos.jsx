import createAsyncSlice from "./helper/createAsyncSlice";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "photos", // Nome do slice.

  // Estado inicial do slice.
  initialState: {
    cache: 5000, // Define o estado inicial do cache como 5000, ou seja, 5 segundos.
  },

  // FetchConfig é uma função que recebe a url e configuração da requisição atráves do payload ou seja, o que será passado para a requisição.
  fetchConfig: () => ({
    url: "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0", // URL da requisição.
    // Configuração da requisição.
    options: {
      method: "GET", // O método GET é utilizado para puxar/obter informações do servidor.
      cache: "no-store", // Está dizendo que não queremos que a requisição seja armazenada em cache no navegador.
    },
  }),
});

export const fetchPhotos = slice.asyncAction; // Criado uma constante chamada fetchPhotos que recebe a função asyncAction do slice.

export default slice.reducer; // Exportando o reducer do slice.
