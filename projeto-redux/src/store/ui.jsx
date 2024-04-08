import { createSlice } from "@reduxjs/toolkit";

// O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
const slice = createSlice({
  name: "ui", // O nome do slice é ui.

  // Estado inicial do slice.
  initialState: {
    modal: false, // Define o estado de modal como false, ou seja, não está aberto.
  },

  reducers: {
    // Criado a ação openModal que recebe o estado como parâmetro, responsável por abrir o modal.
    openModal(state) {
      state.modal = true; // Define o estado de modal como true, ou seja, está aberto.
    },

    // Criado a ação closeModal que recebe o estado como parâmetro, responsável por fechar o modal.
    closeModal(state) {
      state.modal = false; // Define o estado de modal como false, ou seja, não está aberto.
    },
  },
});

export const { openModal, closeModal } = slice.actions; // Exporta as ações do slice.

export default slice.reducer; // Exporta o reducer do slice.
