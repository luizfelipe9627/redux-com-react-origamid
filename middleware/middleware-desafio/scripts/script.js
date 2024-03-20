import store from "./store/configureStore.js"; // Importa a store da aplicação do arquivo configureStore.js.
import { tokenFetch } from "./store/token.js"; // Importa a função tokenFetch do arquivo token.js.;
import { userFetch } from "./store/user.js"; // Importa a função userFetch do arquivo user.js.

async function login(user) {
  let state = store.getState(); // Está criando uma constante chamada state que recebe o estado atual da store.

  // Se a propriedade token dentro do objeto data do estado for igual a null ou seja, se não existir um token, então executa o if.
  if (state.token.data === null) {
    await store.dispatch(tokenFetch(user)); // Dispara a função tokenFetch, que é responsável por fazer a requisição do token, passando como parâmetro um objeto com o username e password atualizando o estado da store para o resultado da requisição.
    state = store.getState(); // Atualiza a constante state com o estado atual da store, para que a próxima requisição seja feita com o token que foi retornado na requisição, evitando assim que o token seja nulo e o usuário não seja encontrado.
  }

  await store.dispatch(userFetch(state.token.data)); // Dispara a função userFetch, que é responsável por fazer a requisição do usuário, passando como parâmetro o token que está armazenado no estado da store.
}

login({ username: "dog", password: "dog" }); // Chama a função login, passando um objeto com o username e password.
