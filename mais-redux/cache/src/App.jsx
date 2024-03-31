import React from "react";
import Photos from "./Photos";

const App = () => {
  const [toggle, setToggle] = React.useState(true); // Criado um estado toggle que é um booleano e a função setToggle que irá alterar o estado. O estado inicial é true.

  return (
    <div>
      {/* Criado um botão que ao ser clicado irá alterar o estado toggle para o contrário do que ele é. */}
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      {/* Se o toggle for true, ele renderiza o componente Photos. */}
      {toggle && <Photos />}
    </div>
  );
};

export default App;
