import store from "./store/configureStore.js"; // Está importando a store da aplicação.
import { incrementar, reduzir } from "./store/contador.js"; // Está importando as funções incrementar e reduzir do contador do arquivo.

// O subscribe é executado todas as vezes que uma ação é despachada, ou seja sempre que o método dispatch é executado, fazendo com que execute a função anônima que é responsável por exibir o estado atual da store no console.
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementar()); // O dispatch é responsável por despachar/emitir a ação que será executada pelo reducer, e recebe como parâmetro a função incrementar que retorna um objeto com a propriedade type, ou seja, a ação que será executada.
