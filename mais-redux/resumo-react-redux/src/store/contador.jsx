import { createSlice } from "@reduxjs/toolkit";

//* > 3. Redudcer
/*
  - O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.

*/

// Criado uma constante chamada slice que recebe a função createSlice do toolkit, que recebe um objeto com as configurações do slice.
const slice = createSlice({
  name: "contador", // Nome do slice.
  // Estado inicial do slice.
  initialState: 0, // O estado inicial é 0.
  // Funções reducers que alteram o estado.
  reducers: {
    // Criado uma função chamada incrementar, que recebe como parâmetro o estado e retorna o estado mais 1.
    incrementar: (state) => state + 1,
    // Criado uma função chamada reduzir, que recebe como parâmetro o estado e retorna o estado menos 1.
    reduzir: (state) => state - 1,
  },
});

export const { incrementar, reduzir } = slice.actions; // Exporta as funções/ações reducers do slice.

export default slice.reducer; // Exporta o reducer do slice.
