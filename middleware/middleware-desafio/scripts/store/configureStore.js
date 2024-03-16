import token from "./token.js"; // Importa o reducer token do arquivo token.js.
import user from "./user.js"; // Importa o reducer user do arquivo user.js.
import thunk from "./middleware/thunk.js"; // Importa o middleware thunk do arquivo thunk.js.
import localStorage from "./middleware/localStorage.js"; // Importa o middleware localStorage do arquivo localStorage.js.

const { createStore, combineReducers, compose, applyMiddleware } = Redux; // Desestruturado o objeto Redux, para pegar as funções createStore e combineReducers.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Criado uma constante chamada composeEnhancers, que recebe a função __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ do objeto window caso exista, ou a função compose caso não exista.

const enchancer = composeEnhancers(applyMiddleware(thunk, localStorage)); // Criado uma constante chamada enchancer, que recebe a função composeEnhancers responsável por passar mais de um enhancer(ou middleware) para a store, e passa como parâmetro a função applyMiddleware, que é responsável por aplicar o/os middleware/s na store.

const reducer = Redux.combineReducers({ token, user }); // Criado uma constante chamada reducer que recebe o retorno da função Redux.combineReducers, que é responsável por combinar os reducers em um único reducer, e recebe como parâmetro um objeto com os reducers que serão combinados.

const store = Redux.createStore(reducer, enchancer); // O store pode receber até três parâmetros, sendo o primeiro o reducer, o segundo o estado inicial(sendo opcional) da store, e o terceiro um middleware(ou segundo caso não tenha sido passado o estado inicial).

export default store; // Exporta a store da aplicação.
