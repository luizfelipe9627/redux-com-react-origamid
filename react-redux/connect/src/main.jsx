import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore } from "redux";

function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;
    default:
      return state;
  }
}

// Criado uma constante chamada store que recebe o retorno da função configureStore que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro o reducer, que são responsáveis por alterar o estado da store. E como segundo parâmetro, recebe a extensão do devtools do redux para o navegador caso exista.
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider e Store */}
    {/*
      - Para podermos ter acesso ao dispatch e a store dentro dos componentes de React, precisamos encapsular todo o applicativo dentro do componente Provider que é disponibilizado pelo react-redux.
      - Depois deve ser passado a store para o Provider, para que ele possa disponibilizar a store para os componentes filhos.
    */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
