import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/login.jsx";

const App = () => {
  // Criado um useState que recebe um array com dois elementos, o primeiro elemento é o estado, que recebe uma string vazia como valor inicial, e o segundo elemento é a função atualizadora, que será responsável por alterar o estado username.
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch(); // Está executando o hook useDispatch que é responsável por acessar o dispatch da store que dispara as ações, e armazena na constante dispatch.

  const { data } = useSelector((state) => state.login.user); // Está executando o hook useSelector que recebe como parâmetro uma função que acessa o estado da store, e retorna o estado da propriedade data do user e armazena na constante data.

  // Criado uma função chamada handleFetchToken que recebe um evento como parâmetro.
  function handleFetchToken(event) {
    event.preventDefault(); // O preventDefault é responsável por prevenir o comportamento padrão do formulário, que é recarregar a página ao enviar o formulário.

    dispatch(login({ username, password })); // O dispatch dispara a ação login passando como parâmetro um objeto com as propriedades username e password.
  }

  return (
    <div>
      <form onSubmit={handleFetchToken}>
        <label style={{ display: "block" }} htmlFor="username">
          Usuário
        </label>
        <input
          id="username"
          type="text"
          // Está atribuindo o valor do estado username ao input.
          value={username}
          // A cada alteração no input, a função anônima é chamada, e recebe como parâmetro a desestruturação do evento target(acessa o elemento que disparou o evento) e a função atualizadora setUsername é chamada, passando como parâmetro o valor digitado no input.
          onChange={({ target }) => setUsername(target.value)}
        />

        <label style={{ display: "block" }} htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          // Está atribuindo o valor do estado password ao input.
          value={password}
          // A cada alteração no input, a função anônima é chamada, e recebe como parâmetro a desestruturação do evento target(acessa o elemento que disparou o evento) e a função atualizadora setPassword é chamada, passando como parâmetro o valor digitado no input.
          onChange={({ target }) => setPassword(target.value)}
        />

        <button>Enviar</button>

        {/* Se data for verdadeiro/existir é renderizado o parágrafo com a informação do usuário, caso contrário é renderizado um parágrafo vazio. */}
        <p>{data?.nome}</p>
        <p>{data?.email}</p>
      </form>
    </div>
  );
};

export default App;
