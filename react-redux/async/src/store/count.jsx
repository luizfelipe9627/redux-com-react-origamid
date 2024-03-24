import { createSlice } from "@reduxjs/toolkit";

// O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
const slice = createSlice({
  name: "count", // O nome do slice.
  // Como estado inicial da store, está sendo criado um objeto com a propriedade total.
  initialState: 0, // Define o estado inicial da store como 0.
  // O reducer do slice.
  reducers: {
    // O reducer incrementar recebe como parâmetro o estado da store e retorna o novo estado da store.
    incrementar: (state) => state + 1, // Incrementa o estado da store em 1.
    // O reducer reduzir recebe como parâmetro o estado da store e retorna o novo estado da store.
    reduzir: (state) => state - 1, // Reduz o estado da store em 1.
  },
});

export const { incrementar, reduzir } = slice.actions; // Exporta as ações do slice.
export default slice.reducer; // Exporta o reducer do slice.
