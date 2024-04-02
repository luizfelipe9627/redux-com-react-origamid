import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/configureStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* 2. Provider */}
    {/*
      - Adicionar a store ao aplicativo utilizando o Provider do react-redux.
    */}
    <Provider store={store}>
      <App />
    </Provider>
  </>,
);
