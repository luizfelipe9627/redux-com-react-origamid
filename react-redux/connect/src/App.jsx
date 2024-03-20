import { connect } from "react-redux";

// Criado uma função que retorna um objeto com a propriedade type que recebe o valor INCREMENTAR.
const incrementar = () => ({ type: "INCREMENTAR" });

// Componente funcional que recebe as props, sendo elas o estado e a função dispatch.
const App = (props) => {
  return (
    <div>
      {/* Está acessando a propriedade contador que contém o valor do estado. */}
      <h1>Total: {props.contador}</h1>

      {/* Está criando um botão que ao ser clicado, dispara a ação do tipo INCREMENTAR, fazendo com que o estado seja incrementado. */}
      <button onClick={() => props.dispatch({ type: "INCREMENTAR" })}>
        Incrementar com dispatch
      </button>

      {/* Está criando um botão que ao ser clicado, dispara a função incrementar atráves do mapDispatchToProps, fazendo com que o estado seja incrementado. */}
      <button onClick={props.incrementar}>
        Incrementar com mapDispatchToProps
      </button>
    </div>
  );
};

//* > mapStateToProps
/*
  - Antes dos hooks, era necessario conectarmos o Redux ao componente para utilizar o estado/dispatch.
*/

// Criado uma função chamada mapStateToProps que recebe o estado como parâmetro e retorna um objeto com as props que queremos mapear.
const mapStateToProps = (state) => {
  return { contador: state }; // Retorna um objeto com a propriedade contador que recebe o valor do estado passado como parâmetro.
};

//* > mapDisptachToProps
/*
  - Com o mapDispatchToProps não precisamos utilizar o dispatch para dispararmos uma função.
*/

// Criado um objeto chamado mapDispatchToProps que recebe a função incrementar como propriedade, sendo que cada propriedade é uma função que dispara uma ação.
const mapDispatchToProps = {
  incrementar,
};

//* > Connect
/*
  - O connect é uma função que conecta o componente ao store, permitindo que ele acesse o estado e dispare ações.
  - A função connect() pode receber dois parâmetros, mapStateToProps que é responsável por mapear o estado, ou seja, pegar o estado e transformar em props, e mapDispatchToProps que é responsável por mapear as ações, ou seja, pegar as ações e transformar em props.
  - Caso seja utilizando o mapDispatchToProps a função dispatch não precisa ser utilizada para disparar uma ação, como por exemplo: props.dispatch({ type: "INCREMENTAR" }).
*/

export default connect(mapStateToProps, mapDispatchToProps)(App); // Está exportando o componente App conectado ao store.
