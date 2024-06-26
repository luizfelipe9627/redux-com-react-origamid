import { createSlice } from "@reduxjs/toolkit";

//* > JS Doc
/*
  - O JS Doc é uma forma de documentar o código, é uma forma de documentar o código para que outras pessoas possam entender o que o código faz.
  - Para criar um comentário JS Doc, é necessário utilizar a barra dupla e um asterisco, e para finalizar é necessário utilizar um asterisco e uma barra. Por exemplo: /** *\/.
*/

/**
 * Cria um slice com uma função assíncrona.
 * @param {Object} config
 * @param {String} config.name - Nome do slice.
 * @param {Object} config.initialState - Estado inicial do slice.
 * @param {Object} config.reducers - Reducers adicionais.
 * @param {Function} config.fetchConfig - Função que retorna a configuração da requisição.
 */

//* > createAsyncSlice
/*
  - Toda vez que identificamos um padrão sendo repetido, existe uma oportunidade de otimização do código através de uma função.
*/

// Criado uma função chamada createAsyncSlice que recebe como parâmetro um objeto chamado config que tem o objetivo de evitar a repetição de código.
const createAsyncSlice = (config) => {
  // O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
  const slice = createSlice({
    name: config.name, // O nome do slice.
    // Como estado inicial da store, está sendo criado um objeto com as propriedades data, loading e error.
    initialState: {
      data: null, // Define o estado inicial da store como null.
      loading: false, // Define o estado inicial da store como false.
      error: null, // Define o estado inicial da store como null.
      ...config.initialState, // Está desestruturando o initialState do config, caso seja passado um novo initialState, ele será mesclado com o initialState padrão.
    },
    // O reducer do slice.
    reducers: {
      // Criado a ação fetchStarted que recebe o estado como parâmetro, responsável por indicar que a requisição foi iniciada.
      fetchStarted(state) {
        state.loading = true; // Define o estado de loading como true.
      },

      // Criado a ação fetchSuccess que recebe o estado e a ação como parâmetro, responsável por indicar que a requisição foi bem sucedida.
      fetchSuccess(state, action) {
        state.data = action.payload; // Define o estado de data com o que foi retornado pela payload.
        state.loading = false; // Define o estado de loading como false.
        state.error = null; // Define o estado de error como null.
      },

      // Criado a ação fetchError que recebe o estado e a ação como parâmetro, responsável por indicar que a requisição falhou.
      fetchError(state, action) {
        state.loading = false; // Define o estado de loading como false.
        state.data = null; // Define o estado de data como null.
        state.error = null; // Define o estado de error como null.
      },
      ...config.reducers, // Está desestruturando o reducers do config, caso seja passado um novo reducers, ele será mesclado com o reducers padrão.
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions; // Desestrutura as ações do slice.

  // Criado uma função chamada asyncAction que recebe um payload como parâmetro e retorna uma função assíncrona que recebe o dispatch(é uma função que dispara uma ação) como parâmetro. O export é responsável por exportar a função fetchToken.
  const asyncAction = (payload) => async (dispatch) => {
    // O try é responsável por tentar executar o código, caso ocorra algum erro, o catch é responsável por capturar o erro.
    try {
      dispatch(fetchStarted()); // Dispara a ação fetchStarted, indicando que a requisição foi iniciada.

      const { url, options } = config.fetchConfig(payload); // Desestrutura o retorno da função fetchConfig do config, passando o payload como parâmetro.

      const response = await fetch(url, options); // O fetch é responsável por fazer a requisição para a url passada como parâmetro, tendo como opções as options passadas como parâmetro, quando a requisição for concluída, o retorno será armazenado na constante response. O await é responsável por aguardar a requisição ser concluída.

      const data = await response.json(); // O await é responsável por aguardar a resposta da requisição ser convertida para json, quando a resposta for convertida, o retorno será armazenado na constante data.

      return dispatch(fetchSuccess(data)); // Retorna a ação fetchSuccess com o data como payload, indicando que a requisição foi bem sucedida.
    } catch (error) {
      return dispatch(fetchError(error.message)); // Retorna a ação fetchError com o error.message como payload, indicando que a requisição falhou.
    }
  };

  return { ...slice, asyncAction }; // Está retornando um objeto que contém o slice desestruturado ou seja, as ações e reducers do slice e a função asyncAction que é responsável por fazer a requisição.
};

export default createAsyncSlice; // Exporta a função createAsyncSlice.
