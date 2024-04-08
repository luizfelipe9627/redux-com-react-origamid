// Importa a biblioteca React.
import React from "react";

// Criado um componente chamado PhotoGet.
const PhotoGet = () => {
  const [id, setId] = React.useState(""); // Cria um estado chamado id e uma função chamada setId para atualizar o estado id. O valor inicial do estado id é uma string vazia.

  // Cria uma função chamada handleSubmit responsável por puxar os dados da API.
  function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do evento, ou seja, impede que a página seja recarregada.

    // Faz uma requisição para a API usando o método fetch, que está recebendo o endereço da API como parâmetro.
    fetch(`https://dogsapi.origamid.dev/json/api/photo/${id}`)
      // O método fetch retorna uma Promise, então é possível encadear o método then para pegar a resposta da requisição.
      .then((response) => {
        return response.json(); // Retorna o corpo da resposta como JSON.
      })
      .then((json) => {
        return json; // Retorna o corpo da resposta como JSON.
      });
  }

  // Retorna um formulário com três inputs e um botão para puxar os dados da API.
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        // O valor do input é o valor do estado password, ou seja, o valor inicial é uma string vazia.
        value={id}
        // A cada evento de mudança no input, executa a função setId que atualiza o estado id pegando o target(elemento que disparou o evento) e o value do elemento.
        onChange={({ target }) => setId(target.value)}
      />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet; // Exporta o componente PhotoGet.
