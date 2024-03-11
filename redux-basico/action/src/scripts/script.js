const initialState = 10; // Criado uma constante chamada initialState que recebe o valor 10.

//* > Constantes
/*
  - O tipo type da ação é sempre uma string que identifica a mesma. Por ser uma string, o utilizador das mesmas pode acabar cometendo um erro de digitação, introduzindo assim um BUG ao aplicativo.
  - Para evitar esse problema é comum criarmos constantes com o nome em uppercase para os nomes de cada ação que possuirmos.
*/

const REDUZIR = "REDUZIR"; // Criado uma constante chamada REDUZIR que recebe a string "REDUZIR".
const DUPLICAR = "DUPLICAR"; // Criado uma constante chamada DUPLICAR que recebe a string "DUPLICAR";
const DECREMENTAR = "DECREMENTAR"; // Criado uma constante chamada DECREMENTAR que recebe a string "DECREMENTAR";

// Criado uma função chamada reducer que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um número, e o segundo é a ação que será despachada pela store.
function reducer(state = initialState, action) {
  console.log(action); // Mostra no console a ação que foi emitida através do método dispatch da store, no caso um objeto com os valores definidos no type e no payload.

  //* > If e Else utilizando o type da ação
  /*
    - Podemos usar o if para verificar o type da ação e realizar ações diferentes para cada type.
  */

  // Se o type for "somar" ele irá executar o bloco de código dentro do if.
  if (action.type === "somar") {
    //return state + action.payload; // Retorna o estado atual da store + o valor do payload.
  }

  // Se o type for "incrementar" ele irá executar o bloco de código dentro do if.
  if (action.type === "incrementar") {
    //return state + 1; // Retorna o estado atual da store + 1, ou seja incrementa 1 no estado atual da store, sem o payload terá que ser incrementado manualmente.
  }

  // Se o type for igual a variável INCREMENTAR ele irá executar o bloco de código dentro do if.
  if (action.type === DECREMENTAR) {
    return state - action.payload; // Retorna o estado atual da store - o valor do payload.
  }

  // Se o type for igual a variável INCREMENTAR ele irá executar o bloco de código dentro do if.
  if (action.type === REDUZIR) {
    //return state - 1; // Retorna o estado atual da store - 1, ou seja subtrai 1 no estado atual da store, sem o payload terá que ser subtraído manualmente.
  }

  // Se o type for igual a variável DUPLICAR ele irá executar o bloco de código dentro do if.
  if (action.type === DUPLICAR) {
    return state * 2; // Retorna o estado atual da store * 2, ou seja duplica o estado atual da store.
  }

  return state; // Retorna o estado atual da store, dependendo de qual bloco do if for executado primeiro.
}

const store = Redux.createStore(reducer); // Criado uma constante chamada store que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro a reducer, ou seja armazena o retorno da função reducer na store.

let state = store.getState(); // Criado uma variável chamada state que recebe o retorno da função getState, que é responsável por retornar o estado atual da store.

console.log(state); // Mostra 10 no console, que é o estado atual da store sem nenhuma ação ter sido aplicada.

//* > Dispatch
/*
  - O método dispatch() é utilizado para despacharmos/emitirmos ações que irão modificar o estado da store.
  - O método dispatch() recebe um objeto como parâmetro, e esse objeto deve conter uma propriedade type que é obrigatória e serve para identificar o tipo da ação, e uma propriedade payload que é opcional e serve para passar valores para a ação.
*/

store.dispatch({ type: "somar", payload: 25 }); // O método dispatch está recebendo como type a string "somar" e como payload o número 25.

//* > Sem payload
/*
  - Não é necessário passar sempre um payload. Existem ações que só precisam do tipo para serem efetivas.
*/

store.dispatch({ type: "incrementar" }); // O método dispatch está recebendo como type a string "somar" e sem payload, pois a propriedade payload é opcional.

// Para evitar de definir um type errado, podemos criar uma constante para armazenar o type da ação, assim evitando erros de digitação de strings.
store.dispatch({ type: REDUZIR }); // O método dispatch está recebendo como type a constante REDUZIR e sem payload, pois a propriedade payload é opcional.

state = store.getState(); // Está atualizando a constante state com o estado atual da store após a ação ser sido aplicada.

console.log(state); // Mostra 9 no console, pois no reducer foi definido que o estado atual(por padrão é o 10) da store seria subtraído por 1 se o type da ação fosse "REDUZIR".

//* > Action creators
/*
  - Mais uma prática comum para facilitar o uso de ações é a criação de funções que retornam o objeto da ação. Essas são chamadas de Action Creators.
*/

// Criado uma função chamada duplicar que retorna um objeto com a propriedade type que recebe a constante DUPLICAR.
function duplicar() {
  return { type: DUPLICAR }; // Retorna um objeto com a propriedade type que recebe a constante DUPLICAR.
}

// Criado uma função chamada decrementar que recebe um parâmetro chamado payload e retorna um objeto com a propriedade type que recebe a constante DECREMENTAR e a propriedade payload que recebe o valor do parâmetro.
function decrementar(payload) {
  return { type: DECREMENTAR, payload }; // Retorna um objeto com a propriedade type que recebe a constante DECREMENTAR.
}

store.dispatch(duplicar()); // O método dispatch está recebendo como parâmetro a função duplicar.

state = store.getState(); // Está atualizando a constante state com o estado atual da store após a ação ser sido aplicada.

console.log(state); // Mostra 20 no console, pois no reducer foi definido que o estado atual(por padrão é o 10) da store seria multiplicado por 2 se o type da ação fosse "DUPLICAR".

store.dispatch(decrementar(5)); // O método dispatch está recebendo como parâmetro a função reduzir e o valor 5 como payload do objeto.

state = store.getState(); // Está atualizando a constante state com o estado atual da store após a ação ser sido aplicada.

console.log(state); // Mostra 5 no console, pois no reducer foi definido que o estado atual(por padrão é o 10) da store seria subtraído pelo valor do payload se o type da ação fosse "DECREMENTAR".

//* > Eventos
/*
  - As ações geralmente serão disparadas através de eventos. Seja com o addEventListener no JavaScript ou em eventos como onClick no React.
*/

const button = document.getElementById("button"); // Criado uma constante chamada button que recebe o elemento HTML com o id "button".

// Adiciona um evento de clique no botão que ao ser clicado irá disparar a função anônima.
button.addEventListener("click", () => {
  store.dispatch(duplicar()); // Está disparando a dispatch que atualiza o estado da store passando a função duplicar como parâmetro, ou seja ao clicar no botão irá duplicar o estado atual da store.
  console.log(store.getState()); // Mostra o estado atual da store no console.
});
