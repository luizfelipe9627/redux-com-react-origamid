/*
  - O configureStore é responsável por criar a store da aplicação e do DevTools, nele vai conter:

  1. A importação da função reducer do arquivo contador.js.
  2. A combinação dos reducers em um único reducer.
  3. A criação da store da aplicação.
  4. A exportação da store.
*/

import aluno from "./aluno.js"; // Está importando a função reducer do arquivo aluno.js.
import aulas from "./aulas.js"; // Está importando a função reducer do arquivo aulas.js.

const reducer = Redux.combineReducers({ aluno, aulas }); // Criado uma constante chamada reducer que recebe o retorno da função Redux.combineReducers, que é responsável por combinar os reducers em um único reducer, e recebe como parâmetro o reducer importado do arquivo contador.js.

// Criado uma constante chamada store que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro o reducer, que são responsáveis por alterar o estado da store. E como segundo parâmetro, recebe a extensão do devtools do redux para o navegador caso exista.
const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store; // Exporta a store para que possa ser importada/usada em outros arquivos.
