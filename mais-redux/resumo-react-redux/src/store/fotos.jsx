import { createSlice } from "@reduxjs/toolkit";

// Criado uma constante chamada slice que recebe a função createSlice do toolkit, que recebe um objeto com as configurações do slice.
const slice = createSlice({
  name: "fotos", // Nome do slice.

  // Estado inicial do slice.
  initialState: {
    loading: false, // O estado loading inicia como false, ou seja, não está carregando.
    data: null, // O estado data inicia como null, ou seja, não possui data.
    error: null, // O estado error inicia como null, ou seja, não possui erro.
  },

  // Funções reducers que alteram o estado.
  reducers: {
    // Criado uma função chamada fetchStarted, responsável por indicar que a solicitação dos data foi iniciada.
    fetchStarted(state) {
      state.loading = true; // Altera o estado loading para true, ou seja, está solicitando os data.
    },

    // Criado uma função chamada fetchSuccess, responsável por indicar que a solicitação dos data foi concluída com sucesso.
    fetchSucess(state, action) {
      state.loading = false; // Altera o estado loading para false, ou seja, não está carregando.
      state.data = action.payload; // Altera o estado data para os data que foram capturados.
      state.error = null; // Altera o estado error para null, ou seja, não possui erro.
    },

    // Criado uma função chamada fetchError, responsável por indicar que a solicitação dos data teve algum erro/problema.
    fetchError(state, action) {
      state.loading = false; // Altera o estado loading para false, ou seja, não está carregando.
      state.data = null; // Altera o estado data para null, ou seja, não possui data.
      state.error = action.payload; // Altera o estado error para o erro que foi capturado.
    },
  },
});

const { fetchStarted, fetchSucess, fetchError } = slice.actions; // Está desestruturando as funções/ações reducers do slice que serão utilizadas.

// Criado uma função assíncrona thunk(é uma função que retorna outra função) chamada fetchFotos que recebe a página de fotos como parâmetro e retorna uma função assíncrona que recebe o dispatch(é uma função que dispara uma ação) como parâmetro. O export é responsável por exportar a função fetchFotos.
export const fetchFotos =
  (page = 1) =>
  async (dispatch) => {
    // O try é responsável por tentar executar o código, e o catch é responsável por capturar o erro caso ocorra.
    try {
      dispatch(fetchStarted()); // Dispara a ação fetchStarted, que indica que a requisição dos dados foi iniciada.

      // O fetch faz uma requisição para a url passada como parâmetro, e o await é responsável por esperar a resposta da requisição, quando a resposta for concluída, o retorno será armazenado na constante response.
      const response = await fetch(
        // A url da requisição, que recebe como parâmetro a página que será solicitada.
        `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=9&_user=0`,
        {
          cache: "no-store", // Define que os dados não serão armazenados em cache, ou seja, sempre será feita uma nova requisição.
        },
      );

      const data = await response.json(); // O json é responsável por converter a resposta da requisição para json, e o await é responsável por aguardar a resposta ser convertida, quando a resposta for convertida, o retorno será armazenado na constante data.

      dispatch(fetchSucess(data)); // Dispara a ação fetchSucess, passando os dados como payload, indicando que a requisição foi bem sucedida.
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

// Criado uma função chamada selecOverFiveYears que recebe o estado como parâmetro, essa função é responsável por filtrar as fotos que possuem mais de 5 anos.
export const selecOverFiveYears = (state) => {
  return state.fotos.data?.filter((foto) => foto.idade >= 5); // Caso o valor da proprieadade data seja true, ou seja, exista dados, então irá filtrar e retornar as fotos que possuem maior ou igual a 5 anos.
};

export default slice.reducer; // Exporta o reducer do slice.
