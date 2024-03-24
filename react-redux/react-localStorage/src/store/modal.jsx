import { createSlice } from "@reduxjs/toolkit";

// O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
const slice = createSlice({
  name: "modal", // O nome do slice.
  initialState: false, // Define o estado inicial da store como false.
  // O reducer do slice que será responsável por alterar o estado da store.
  reducers: {
    abrir: () => true, // O reducer abrir retorna true, fazendo com que o estado da store seja true.
    fechar: () => false, // O reducer fechar retorna false, fazendo com que o estado da store seja false.
  },
});

export const { abrir, fechar } = slice.actions; // Exporta as ações do slice.
export default slice.reducer; // Exporta o reducer do slice.
