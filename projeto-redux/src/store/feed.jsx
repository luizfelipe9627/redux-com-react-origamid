import { PHOTOS_GET } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "feed", // Define o nome do slice como feed.

  // O estado inicial da store.
  initialState: {
    list: [], // Define o list como uma array vazia, sendo responsável por armazenar as fotos.
    pages: 1, // Define o pages como 1, sendo responsável por armazenar a página atual.
    infinite: true, // Define o infinite como true, sendo responsável por fazer mais páginas serem carregadas quando o usuário chegar no final da página.
  },

  // Alem dos reducers padrões, adiciona os reducers adicionais.
  reducers: {
    // Criada uma função chamada addPhotos que recebe o estado e a ação como parâmetros. Essa função é responsável por adicionar as fotos.
    addPhotos(state, action) {
      state.list.push(...action.payload); // Acessa a propriedade list dentro do estado e adiciona cada uma das fotos passadas pelo payload na array list.

      if (action.payload.length === 0) state.infinite = false; // Se o payload for uma array vazia, ou seja, não tiver mais fotos, acessa a propriedade infinite dentro do estado e a define como false.
    },

    // Criada uma função chamada addPage que recebe o estado como parâmetro. Essa função é responsável por incrementar/adicionar mais uma página.
    addPage(state) {
      state.pages++; // Acessa a propriedade pages dentro do estado e incrementa mais uma página.
    },

    // Está sobrepondo o reducer padrão resetState no createAsyncSlice, para que o estado seja resetado de forma personalizada.
    resetState(state) {
      state.list = []; // Acessa a propriedade list dentro do estado e a define como uma array vazia.
      state.pages = 1; // Acessa a propriedade pages dentro do estado e a define como 1.
      state.infinite = true; // Acessa a propriedade infinite dentro do estado e a define como true.

      state.data = null; // Acessa a propriedade data dentro do estado e a define como null.
      state.loading = false; // Acessa a propriedade loading dentro do estado e a define como false.
      state.error = null; // Acessa a propriedade error dentro do estado e a define como null.
    },
  },

  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user }),
});

export const fetchFeed = slice.asyncAction; // Exporta a função asyncAction do slice.

export const { addPhotos, addPage, resetState: resetFeedState } = slice.actions; // Exporta as ações do slice, renomeando a ação resetState para resetFeedState.

// Criado uma função thunk chamada loadNewPhotos que recebe um objeto contendo o total que é o total de fotos a serem carregadas e o usuário que é o usuário que postou as fotos que retorna uma função assíncrona que recebe dois parâmetros, o dispatch que é responsável por despachar ações para a store e o getState que é responsável por pegar o estado atual da store. Essa função é responsável por carregar novas fotos.
export const loadNewPhotos =
  ({ total = 6, user }) =>
  async (dispatch, getState) => {
    const { feed } = getState(); // Desestrutura o feed do estado atual da store.

    dispatch(addPage()); // Despacha a ação addPage, responsável por incrementar/adicionar mais uma página.

    // Está desestruturando o retorno da função fetchFeed que retorna um objeto contendo o payload que é a foto/dado recebida da API. Despacha a ação fetchFeed passando um objeto com a propriedade page acessa o estado feed e pega a propriedade pages, e a propriedade total que é o total de fotos a serem carregadas.
    const { payload } = await dispatch(
      fetchFeed({ page: feed.pages, total, user }),
    );

    dispatch(addPhotos(payload)); // Despacha a ação addPhotos, passando o payload que é a foto/dado recebida da API. Essa ação é responsável por adicionar as fotos.
  };

export default slice.reducer; // Exporta o reducer do slice.
