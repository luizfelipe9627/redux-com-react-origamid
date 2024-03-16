// Criado uma função chamada getLocalStorage, que recebe dois parâmetros, key que é a chave que será utilizada para buscar o valor no localStorage, e initial que é o valor que será retornado caso não haja valor armazenado no localStorage.
function getLocalStorage(key, initial) {
  // O try é responsável por tentar executar o bloco de código, e caso haja erro, o catch é responsável por capturar o erro e executar o bloco de código correspondente.
  try {
    return JSON.parse(window.localStorage.getItem(key)) || initial; // Está retornando o valor armazenado no localStorage em JSON, que está armazenado na chave passada no parâmetro key, e caso não exista, retorna o valor passado no parâmetro initial.
  } catch (error) {
    return initial; // Retorna o valor passado no parâmetro initial.
  }
}

export default getLocalStorage; // Exporta a função getLocalStorage.
