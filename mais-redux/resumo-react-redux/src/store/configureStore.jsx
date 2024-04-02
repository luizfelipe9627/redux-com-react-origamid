import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contador from "./contador";
import logger from "./middleware/logger";
import fotos from "./fotos";

const reducer = combineReducers({ contador, fotos }); // O combineReducers é responsável por combinar os reducers e armazenar em uma constante chamada reducer.

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(logger); // A constante middleware recebe uma função que recebe como parâmetro o getDefaultMiddleware que é responsável por retornar os middlewares padrões do redux-toolkit, e junta(por isso o concat) com o middleware personalizado logger.

//* > 1. configureStore
/*
  - O configureStore é responsável por criar a store(armazém) da aplicação, e recebe um objeto como parâmetro, e esse objeto deve conter a chave reducer, que recebe o/s reducer/s que será responsável por alterar/atualizar o estado da store.
*/

const store = configureStore({ reducer, middleware }); // Criado uma constante chamada store que recebe o retorno da função configureStore que é responsável por criar a store(armazém) da aplicação, recebendo como parâmetro os reducers e middleware.

export default store; // Exporta a constante store.
