// Importa a biblioteca React.
import React from "react";

// Criado um hook chamado useFetch responsável por fazer a requisição para a API e retornar os dados da resposta da API.
const useFetch = () => {
  const [data, setData] = React.useState(null); // Criado um estado chamado data e uma função chamada setData para alterar o estado data. O valor inicial do estado data é null.
  const [error, setError] = React.useState(null); // Criado um estado chamado error e uma função chamada setError para alterar o estado error. O valor inicial do estado error é null.
  const [loading, setLoading] = React.useState(false); // Criado um estado chamado loading e uma função chamada setLoading para alterar o estado loading. O valor inicial do estado loading é false.

  // A constante request recebe um useCallback que é responsável por renderizar a função apenas uma vez, pois a array de dependências está vazia e não vai mudar nunca.
  const request = React.useCallback(async (url, options) => {
    let response; // Criado uma variável vazia chamada response.
    let json; // Criado uma variável vazia chamada json.

    // O try é responsável por tentar executar o código que está dentro dele.
    try {
      setError(null); // Altera o estado error para null.
      setLoading(true); // Altera o estado loading para true, ou seja, enquanto a requisição estiver sendo feita, o estado loading vai ser true.

      // O await faz com que o código espere a resposta da API para continuar o código e armazena a resposta da API na variável.
      response = await fetch(url, options); // O fetch é responsável por fazer a requisição para a API, recebe como parâmetro a url responsável por acessar a API e as options que são as opções da requisição.
      json = await response.json(); // O response.json() é responsável por armazenar os dados da resposta da API no formato json na variável json.

      // Se a resposta da API for igual a false, executa o if.
      if (response.ok === false) {
        throw new Error(json.message); // O throw new Error lança um erro e exibe a mensagem de erro que está na API.
      }
    } catch (err) {
      json = null; // Altera o estado json para null para não exibir os dados da resposta da API.
      setError(`${err.message}.`); // Altera o estado error para a mensagem de erro que está na API.
    } finally {
      setData(json); // Altera o estado data para json, ou seja, armazena os dados da resposta da API no estado data.
      setLoading(false); // Altera o estado loading para false, ou seja, quando a requisição terminar, o estado loading vai ser false.

      return { response, json }; // Retorna um objeto com a resposta da API e os dados da resposta da API.
    }
  }, []);

  // Retorna um objeto com os estados data, error, loading e a função request:
  // O estado data é responsável por armazenar os dados da resposta da API. 
  // O estado error é responsável por armazenar a mensagem de erro da API. 
  // O estado loading é responsável por armazenar o estado da requisição. 
  // A função request é responsável por fazer a requisição para a API.
  return { data, error, loading, request };
};

export default useFetch; // Exporta o hook useFetch.
