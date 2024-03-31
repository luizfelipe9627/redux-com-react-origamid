import { createSlice } from "@reduxjs/toolkit";

//* > Formulário
/*
  - O estado do campo de formulário geralmente será gerenciado localmente. Porém podemos despachar o estado para o Redux caso o mesmo seja necessário para utilizarmos globalmente.
*/

// O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
const slice = createSlice({
  name: "date", // Nome do slice.

  // Estado inicial do slice, que é um objeto com a propriedade formData que é um objeto vazio.
  initialState: {
    formData: {},
  },

  // Reducers do slice, que são funções que alteram o estado da store.
  reducers: {
    // Função chamada adicionarDatas que recebe o estado da store e a action que é a ação que foi disparada.
    adicionarDatas(state, action) {
      state.formData = action.payload; // Altera o estado da store, atribuindo o valor do payload da action ao estado formData.
    },
  },
});

export const { adicionarDatas } = slice.actions; // Exporta as actions do slice, que são funções que disparam ações.

export default slice.reducer; // Exporta o reducer do slice.
