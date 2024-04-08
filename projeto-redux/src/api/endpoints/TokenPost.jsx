// Importa a biblioteca React.
import React from "react";

// Criado um componente chamado TokenPost que vai ser responsável por enviar os dados do formulário para a API e receber o token.
const TokenPost = () => {
  const [username, setUsername] = React.useState(""); // Cria um estado chamado username e uma função chamada setUsername para atualizar o estado username. O valor inicial do estado username é uma string vazia.
  const [password, setPassword] = React.useState(""); // Cria um estado chamado password e uma função chamada setPassword para atualizar o estado password. O valor inicial do estado password é uma string vazia.
  const [token, setToken] = React.useState(""); // Cria um estado chamado token e uma função chamada setToken para atualizar o estado token. O valor inicial do estado token é uma string vazia.

  // Cria uma função chamada handleSubmit responsável por enviar os dados do formulário para a API.
  function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do evento, ou seja, impede que a página seja recarregada.

    // Faz uma requisição para a API usando o método fetch, que está recebendo dois parâmetros: o endereço da API e um objeto com as configurações da requisição.
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST", // Define o método como POST, ou seja, está enviando os dados para a API.
      // O headers é um objeto que contém os cabeçalhos da requisição.
      headers: {
        // O cabeçalho Content-Type informa o tipo de conteúdo que está sendo enviado no corpo da requisição.
        "Content-Type": "application/json", // Define o cabeçalho como application/json, ou seja, o corpo da requisição é um objeto JSON.
      },
      // Define o corpo da requisição com o método JSON.stringify que transforma um objeto JavaScript em uma string JSON.
      body: JSON.stringify({
        username,
        password,
      }),
    })
      // O método fetch retorna uma Promise, então é possível encadear o método then para pegar a resposta da requisição.
      .then((response) => {
        return response.json(); // Retorna o corpo da resposta como JSON.
      })
      // Atráves do then anterior, é possível encadear outro then para pegar o JSON retornado pelo then anterior.
      .then((json) => {
        setToken(json.token); // Atualiza o estado token com o valor do token retornado pela API.
        return json; // Retorna o corpo da resposta como JSON.
      });
  }

  // Retorna um formulário com três inputs e um botão para enviar os dados do formulário para a API.
  return (
    // Quando o formulário for submetido, executa a função handleSubmit que recebe o evento como parâmetro.
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        // O valor do input é o valor do estado username, ou seja, o valor inicial é uma string vazia.
        value={username}
        // A cada evento de mudança no input, executa a função setUsername que atualiza o estado username pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        // O valor do input é o valor do estado password, ou seja, o valor inicial é uma string vazia.
        value={password}
        // A cada evento de mudança no input, executa a função setPassword que atualiza o estado password pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setPassword(target.value)}
      />
      <button>Enviar</button>
      {/* Exibe o token retornado pela API. */}
      <p style={{ wordBreak: "break-all" }}>{token}</p>
    </form>
  );
};

export default TokenPost; // Exporta o componente TokenPost.
