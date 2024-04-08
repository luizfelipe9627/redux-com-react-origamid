// Está importando a biblioteca React, o ReactDOM e o Provider.
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// Está importando a store.
import store from "./store/configureStore";

// Está importando o componente.
import App from "./App.jsx";
// import Api from "./api/Api.jsx";

// Está renderizando o componente App no elemento com o ID root do HTML.
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
