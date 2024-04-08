// Importa as funções configureStore e combineReducers do redux-toolkit.
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Importa os reducers da aplicação.
import photo from "./photo";
import photoPost from "./photoPost";
import token from "./token";
import user from "./user";
import feed from "./feed";
import ui from "./ui";
import loginPasswordLost from "./loginPasswordLost";
import userStats from "./userStats";
import photoDelete from "./photoDelete";
import photoComments from "./photoComments";
import loginCreate from "./loginCreate";
import loginPasswordReset from "./loginPasswordReset";

// O combineReducers é responsável por combinar os reducers e armazenar em uma constante chamada reducer.
const reducer = combineReducers({
  feed,
  photo,
  photoPost,
  photoDelete,
  photoComments,
  user,
  userStats,
  loginCreate,
  loginPasswordLost,
  loginPasswordReset,
  token,
  ui,
});

const middleware = (getDefaultMiddleware) => getDefaultMiddleware(); // A constante middleware recebe uma função que recebe como parâmetro o getDefaultMiddleware que é responsável por retornar os middlewares padrões do redux-toolkit, e junta(por isso o concat) com o middleware personalizado.

const store = configureStore({ reducer, middleware }); // Criado uma constante chamada store que recebe o retorno da função configureStore que é responsável por criar a store(armazém) da aplicação, recebendo como parâmetro os reducers e middlewares.

export default store; // Exporta a constante store.
