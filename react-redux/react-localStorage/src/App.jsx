import React from "react";
import { useDispatch } from "react-redux";
import { autoLogin, login } from "./store/login.jsx";
import { somar } from "./store/count.jsx";
import { useSelector } from "react-redux";

const App = () => {
  // Criado um useState que recebe um array com dois elementos, o primeiro elemento é o estado, que recebe uma string vazia como valor inicial, e o segundo elemento é a função atualizadora, que será responsável por alterar o estado username.
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { data } = useSelector((state) => state.login.user); // Está desestruturando a propriedade data do retorno do estado e está executando o hook useSelector que é responsável por acessar o estado da store, recebe como parâmetro uma função que retorna o estado da store e retorna o estado que desejamos acessar, no caso o user.

  const dispatch = useDispatch(); // Está executando o hook useDispatch que é responsável por acessar o dispatch da store que dispara as ações, e armazena na constante dispatch.

  // O useEffect executa toda vez que o dispatch é modificado, ou seja sempre que uma ação for acionada o useEffect executa o bloco de código dentro dele.
  React.useEffect(() => {
    dispatch(autoLogin()); // Dispara uma ação passando como parâmetro e executando a função autoLogin.
  }, [dispatch]);

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
      </form>

      {/* Se data for verdadeiro/existir é renderizado o parágrafo com o email do usuário, caso contrário é renderizado um parágrafo vazio. */}
      <p>{data?.email}</p>

      {/* Criado um botão que ao ser clicado, dispara a ação somar fazendo com que o estado da store seja incrementado em 1. */}
      <button onClick={() => dispatch(somar(5))}>Somar</button>
    </div>
  );
};

export default App;
