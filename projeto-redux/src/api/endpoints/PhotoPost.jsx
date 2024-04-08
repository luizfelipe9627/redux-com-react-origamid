// Importa a biblioteca React.
import React from "react";

// Criado um componente chamado PhotoPost.
const PhotoPost = () => {
  const [token, setToken] = React.useState(""); // Cria um estado chamado token e uma função chamada setToken para atualizar o estado token. O valor inicial do estado token é uma string vazia.
  const [name, setName] = React.useState(""); // Cria um estado chamado name e uma função chamada setName para atualizar o estado name. O valor inicial do estado name é uma string vazia.
  const [weight, setWeight] = React.useState(""); // Cria um estado chamado weight e uma função chamada setWeight para atualizar o estado weight. O valor inicial do estado weight é uma string vazia.
  const [age, setAge] = React.useState(""); // Cria um estado chamado age e uma função chamada setAge para atualizar o estado age. O valor inicial do estado age é uma string vazia.
  const [img, setImg] = React.useState(""); // Cria um estado chamado img e uma função chamada setImg para atualizar o estado img. O valor inicial do estado img é uma string vazia.

  // Cria uma função chamada handleSubmit responsável por enviar os dados do formulário para a API.
  function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do evento, ou seja, impede que a página seja recarregada.

    const formData = new FormData(); // Cria um objeto FormData que vai ser responsável por enviar os dados do formulário para a API.
    formData.append("nome", name); // Adiciona uma chave chamada nome no objeto formData e o valor dessa chave é o estado name.
    formData.append("peso", weight); // Adiciona uma chave chamada peso no objeto formData e o valor dessa chave é o estado weight.
    formData.append("idade", age); // Adiciona uma chave chamada idade no objeto formData e o valor dessa chave é o estado age.
    formData.append("img", img); // Adiciona uma chave chamada img no objeto formData e o valor dessa chave é o estado img.

    // Faz uma requisição para a API usando o método fetch, que está recebendo dois parâmetros: o endereço da API e um objeto com as configurações da requisição.
    fetch("https://dogsapi.origamid.dev/json/api/photo", {
      method: "POST", // Define o método como POST, ou seja, está enviando os dados para a API.
      // O headers é um objeto que contém os cabeçalhos da requisição.
      headers: {
        // O Authorization é um cabeçalho que contém o token de autenticação.
        Authorization: "Bearer " + token, // Define o cabeçalho como Bearer + o token de autenticação.
      },
      body: formData, // Define o corpo da requisição com um objeto formData que contém os dados do formulário.
    })
      // O método fetch retorna uma Promise, então é possível encadear o método then para pegar a resposta da requisição.
      .then((response) => {
        return response.json(); // Retorna o corpo da resposta como JSON.
      })
      // Atráves do then anterior, é possível encadear outro then para pegar o JSON retornado pelo then anterior.
      .then((json) => {
        return json; // Retorna o corpo da resposta como JSON.
      });
  }

  // Retorna um formulário com três inputs e um botão para enviar os dados do formulário para a API.
  return (
    // Quando o formulário for submetido, executa a função handleSubmit que recebe o evento como parâmetro.
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Token"
        // O valor do input é o valor do estado token, ou seja, o valor inicial é uma string vazia.
        value={token}
        // A cada evento de mudança no input, executa a função setToken que atualiza o estado token pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setToken(target.value)}
      />
      <input
        type="text"
        placeholder="Nome"
        // O valor do input é o valor do estado weight, ou seja, o valor inicial é uma string vazia.
        value={name}
        // A cada evento de mudança no input, executa a função setName que atualiza o estado name pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setName(target.value)}
      />
      <input
        type="text"
        placeholder="Peso"
        // O valor do input é o valor do estado weight, ou seja, o valor inicial é uma string vazia.
        value={weight}
        // A cada evento de mudança no input, executa a função setWeight que atualiza o estado weight pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setWeight(target.value)}
      />
      <input
        type="text"
        placeholder="Idade"
        // O valor do input é o valor do estado age, ou seja, o valor inicial é uma string vazia.
        value={age}
        // A cada evento de mudança no input, executa a função setAge que atualiza o estado age pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setAge(target.value)}
      />
      <input
        type="file"
        placeholder="Imagem"
        // A cada evento de mudança no input, executa a função setImg que atualiza o estado img pegando o target(elemento que disparou o evento) e o value do elemento que é um arquivo de imagem.
        onChange={({ target }) => setImg(target.files[0])}
      />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost; // Exporta o componente UserPost.
