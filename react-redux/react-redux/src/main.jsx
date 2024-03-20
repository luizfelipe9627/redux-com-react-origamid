import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore } from "redux";

// Criado uma função chamada reducer que recebe dois parâmetros, state e action. O state é o estado atual da store, e o action é a ação que será executada para alterar o estado da store.
function reducer(state = 0, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a string "INCREMENTAR", será executado o bloco de código abaixo.
    case "INCREMENTAR":
      return state + 1; // Retorna o estado atual mais 1.
    // Caso o valor da propriedade type não corresponda a nenhum dos casos acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
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
