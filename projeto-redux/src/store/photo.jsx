// Importa o método PHOTO_GET do arquivo Api.
import { PHOTO_GET } from "../Api";

const FETCH_PHOTO_STARTED = "photo/fetchStarted"; // Criado uma constante chamada FETCH_PHOTO_STARTED que recebe a string "photo/fetchStarted".
const FETCH_PHOTO_SUCCESS = "photo/fetchSuccess"; // Criado uma constante chamada FETCH_PHOTO_SUCCESS que recebe a string "photo/fetchSuccess".
const FETCH_PHOTO_ERROR = "photo/fetchError"; // Criado uma constante chamada FETCH_PHOTO_ERROR que recebe a string "photo/fetchError".

// Criado uma função chamada fetchPhotoStarted que retorna um objeto contendo o tipo da ação. Essa função é responsável por indicar que a requisição foi iniciada.
const fetchPhotoStarted = () => ({
  type: FETCH_PHOTO_STARTED, // Define o tipo da ação com o valor da constante FETCH_PHOTO_STARTED.
});

// Criado uma função chamada fetchPhotoSuccess que recebe um parâmetro chamado data e retorna um objeto com a propriedade type que recebe a constante FETCH_PHOTO_SUCCESS e a propriedade payload que recebe o valor do parâmetro data. Essa função é responsável por indicar que a requisição foi bem-sucedida.
const fetchPhotoSuccess = (data) => ({
  type: FETCH_PHOTO_SUCCESS, // Define o tipo da ação com o valor da constante FETCH_PHOTO_SUCCESS.
  payload: data, // Define como payload o valor do parâmetro data, que é a foto que foi recebida da API.
});

// Criado uma função chamada fetchPhotoError que recebe um parâmetro chamado error e retorna um objeto com a propriedade type que recebe a constante FETCH_PHOTO_ERROR e a propriedade payload que recebe o valor do parâmetro error. Essa função é responsável por indicar que a requisição falhou.
const fetchPhotoError = (error) => ({
  type: FETCH_PHOTO_ERROR, // Define o tipo da ação com o valor da constante FETCH_PHOTO_ERROR.
  payload: error, // Define como payload o valor do parâmetro error, que é o erro que foi recebido da API.
});

// Criado um objeto chamado initialState, responsável por armazenar o estado inicial do reducer.
const initialState = {
  data: null, // Define a propriedade data como null, que irá armazenar a foto/dado recebida da API.
  loading: false, // Define a propriedade loading como false, que indica que a requisição ainda não foi iniciada.
  error: null, // Define a propriedade error como null, que indica que não houve erro na requisição.
};

// Criado uma função chamada photo que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um objeto, e o segundo é a ação que será despachada pela store, responsável por alterar o estado da store.
export default function photo(state = initialState, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a constante FETCH_PHOTO_STARTED, irá executar o bloco de código abaixo.
    case FETCH_PHOTO_STARTED:
      return {
        ...state, // Desestrutura o estado atual assim mantendo as propriedades data, loading e error com os valores atuais.
        data: null, // Define a propriedade data do estado atual como null, ou seja, não há foto/dado recebida da API.
        loading: true, // Define a propriedade loading do estado atual como true, ou seja, a requisição foi iniciada.
        error: null, // Define a propriedade error do estado atual como null, ou seja, não houve erro na requisição.
      };
    // Caso o valor da propriedade type seja igual a constante FETCH_PHOTO_SUCCESS, irá executar o bloco de código abaixo.
    case FETCH_PHOTO_SUCCESS:
      return {
        ...state, // Desestrutura o estado atual assim mantendo as propriedades data, loading e error com os valores atuais.
        data: action.payload, // Define a propriedade data do estado atual como o valor da propriedade payload do objeto action que é a foto/dado recebida da API.
        loading: false, // Define a propriedade loading do estado atual como false, ou seja, a requisição não foi iniciada.
        error: null, // Define a propriedade error do estado atual como null, ou seja, não houve erro na requisição.
      };

    // Caso o valor da propriedade type seja igual a constante FETCH_PHOTO_ERROR, irá executar o bloco de código abaixo.
    case FETCH_PHOTO_ERROR:
      return {
        ...state, // Desestrutura o estado atual assim mantendo as propriedades data, loading e error com os valores atuais.
        data: null, // Define a propriedade data do estado atual como null, ou seja, não há foto/dado recebida da API.
        loading: false, // Define a propriedade loading do estado atual como false, ou seja, a requisição não foi iniciada.
        error: action.payload, // Define a propriedade error do estado atual como o valor da propriedade payload do objeto action.
      };

    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

// Criado uma função thunk chamada fetchPhoto que recebe o id da foto como parâmetro retorna uma função assíncrona que recebe como parâmetro a função dispatch, responsável por despachar ações para a store. Essa função é responsável por pegar atráves do id da foto, a foto/dado da API.
export const fetchPhoto = (id) => async (dispatch) => {
  // O try é responsável por tentar executar o bloco de código, caso ocorra algum erro, o bloco de código dentro do catch será executado.
  try {
    dispatch(fetchPhotoStarted()); // Despacha a ação fetchPhotoStarted, responsável por indicar que a requisição foi iniciada.

    const { url, options } = PHOTO_GET(id); // Desestrutura o retorno da função PHOTO_GET e armazena a url e as options nas constantes url e options. Passa o id da foto como parâmetro da função PHOTO_GET.

    const response = await fetch(url, options); // A função fetch é responsável por realizar a requisição à API, passando a url e as options como parâmetros. O await é responsável por aguardar a resposta da requisição.

    const data = await response.json(); // Está pegando a resposta da requisição, convertendo a resposta em json e armazenando na constante data.

    // Se a resposta da API for igual a false, executa o if, se não continua o código abaixo.
    if (response.ok === false) {
      throw new Error(data.message); // O throw new Error lança um erro e exibe a mensagem de erro que retornou da API.
    }

    dispatch(fetchPhotoSuccess(data)); // Despacha a ação fetchPhotoSuccess, responsável por indicar que a requisição foi bem-sucedida, passando a foto/dado recebida da API como parâmetro.
  } catch (error) {
    dispatch(fetchPhotoError(error.message)); // Despacha a ação fetchPhotoError, responsável por indicar que a requisição falhou, passando a mensagem de erro como parâmetro.
  }
};
