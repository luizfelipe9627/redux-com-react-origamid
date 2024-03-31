import createAsyncSlice from "./helper/createAsyncSlice";
import { createSelector } from "react-redux";

// Criado uma constante chamada slice que recebe o retorno da função createAsyncSlice, que recebe um objeto contendo as configurações padrões do slice.
const slice = createAsyncSlice({
  name: "photos", // Nome do slice.

  // Estado inicial do slice.
  initialState: {
    cache: 5000, // Define o estado inicial do cache como 5000, ou seja, 5 segundos.
  },

  // FetchConfig é uma função que recebe a url e configuração da requisição atráves do payload ou seja, o que será passado para a requisição.
  fetchConfig: () => ({
    url: "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=10&_user=0", // URL da requisição.
    // Configuração da requisição.
    options: {
      method: "GET", // O método GET é utilizado para puxar/obter informações do servidor.
      cache: "no-store", // Está dizendo que não queremos que a requisição seja armazenada em cache no navegador.
    },
  }),
});

// Criado uma função chamada getOverFiveKg que recebe o estado e retorna os cachorros que pesam mais de 5kg.
export const getOverFiveKg = (state) => {
  const { data } = state.photos; // Desestruturado a propriedade data presente dentro da propriedade photos do estado.

  const overFiveKg = data?.filter(({ peso }) => peso >= 5); // Acessa a propriedade data do estado e caso data não seja true(ou seja não tenha dados) usa o filter para retornar os cachorros que pesam igual ou mais de 5kg, como parâmetro é passado o peso de cada cachorro presente na propriedade data e armazena o resultado na constante overFiveKg.

  // Criado uma constante chamada transformPound que atráves do map irá retornar um novo array com as fotos dos cachorros que pesam mais de 5kg e o peso deles em libras. O ? é utilizado para verificar se a constante overFiveKg é true, se for ele irá retornar o map, caso contrário irá retornar null.
  const transformPound = overFiveKg?.map((photo) => ({
    ...photo, // Retorna todas as propriedades do cachorro.
    peso: Math.floor(photo.peso * 2.2), // Altera o peso do cachorro para libras, multiplicando o peso do cachorro por 2.2 e arredondando o resultado para baixo.
  }));

  return transformPound; // Retorna os cachorros que pesam mais de 5kg e o peso deles em libras.
};

export const fetchPhotos = slice.asyncAction; // Criado uma constante chamada fetchPhotos que recebe a função asyncAction do slice.

export default slice.reducer; // Exportando o reducer do slice.
