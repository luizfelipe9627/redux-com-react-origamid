import React from "react";
import Contador from "./Contador";
import Fotos from "./Fotos";

//* > 4. useDispatch e useSelector
/*
  - O useDispatch é um hook que é responsável por disparar as ações para alterar o estado da store.
  - O useSelector é um hook que é responsável por acessar o estado da store.
*/

const App = () => {
  return (
    <div>
      <Contador />
      <Fotos />
    </div>
  );
};

export default App;
