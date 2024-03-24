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

    //* > Prepare
    /*
      - No createSlice, podemos dividir o reducer em 2 métodos, reducer e prepare. O prepare é utilizado para preparar o objeto criado pela ação. Só é possível retornar através do prepare, as propriedades {payload, meta, error}.  
    */

    // Criado um reducer chamado somar.
    somar: {
      // O reducer somar recebe como parâmetro o estado da store e a ação, dentro do reducer é feito a alteração do estado da store.
      reducer: (state, action) => state + action.payload, // Incrementa o estado da store com o valor do payload passado na ação.

      // O prepare é uma função responsável por preparar a ação antes de ser enviada para o reducer, ele recebe como parâmetro o payload e retorna um objeto com o payload e a propriedade meta com o valor somar.
      prepare: (payload) => ({ payload, meta: "local" }),
    },
  },
});

export const { incrementar, reduzir, somar } = slice.actions; // Exporta as ações do slice.
export default slice.reducer; // Exporta o reducer do slice.
