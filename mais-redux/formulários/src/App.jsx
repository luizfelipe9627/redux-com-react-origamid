import React from "react";
import { useDispatch } from "react-redux";
import { adicionarDatas } from "./store/date";

const App = () => {
  // O useState é um hook que retorna um array com duas posições, a primeira é o estado e a segunda é uma função que altera o estado. O useState recebe um valor inicial como parâmetro, no caso dos estados partida, retorno e nome, o valor inicial é uma string vazia.
  const [nome, setNome] = React.useState("");
  const [partida, setPartida] = React.useState("");
  const [retorno, setRetorno] = React.useState("");

  const dispatch = useDispatch(); // Está executando o hook useDispatch que é responsável por acessar o dispatch da store que dispara as ações, e armazena na constante dispatch.

  // Criado uma função chamada handleSubmit que recebe um evento como parâmetro, essa função é responsável por tratar o evento.
  function handleSubmit(event) {
    event.preventDefault(); // O preventDefault é um método que previne o comportamento padrão do evento, no caso do formulário, previne o recarregamento da página.

    dispatch(adicionarDatas({ nome, partida, retorno })); // Dispara a action adicionarDatas criando as propriedades partida e retorno com os valores dos estados partida e retorno.
  }

  return (
    // O onSubmit é um evento que é disparado toda vez que o formulário é submetido, quando acionado chama a função handleSubmit que é responsável por tratar o evento.
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          // O valor do input é o que está armazenado no estado nome.
          value={nome}
          // O onChange é um evento que é disparado toda vez que o valor do input é alterado, quando acionado pega o valor do input que acionou(target) o evento e passa para o estado nome.
          onChange={({ target }) => setNome(target.value)}
        />
      </p>

      <p>
        <label htmlFor="partida">Partida</label>
        <input
          type="date"
          name="partida"
          id="partida"
          // O valor do input é o que está armazenado no estado partida.
          value={partida}
          // O onChange é um evento que é disparado toda vez que o valor do input é alterado, quando acionado pega o valor do input que acionou(target) o evento e passa para o estado partida.
          onChange={({ target }) => setPartida(target.value)}
        />
      </p>

      <p>
        <label htmlFor="retorno">Retorno</label>
        <input
          type="date"
          name="retorno"
          id="retorno"
          // O valor do input é o que está armazenado no estado retorno.
          value={retorno}
          // O onChange é um evento que é disparado toda vez que o valor do input é alterado, quando acionado pega o valor do input que acionou(target) o evento e passa para o estado retorno.
          onChange={({ target }) => setRetorno(target.value)}
        />
      </p>

      <button>Buscar</button>
    </form>
  );
};

export default App;
