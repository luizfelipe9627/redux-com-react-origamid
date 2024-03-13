const initialState = 10; // Criado uma constante chamada initialState que recebe o valor 10.
const INCREMENTAR = "INCREMENTAR"; // Criado uma constante chamada INCREMENTAR que recebe a string "INCREMENTAR".

// Criado uma função chamada reducer que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um número, e o segundo é a ação que será despachada pela store.
function reducer(state = initialState, action) {
  // Se o type for igual a variável INCREMENTAR ele irá executar o bloco de código dentro do if, se não ele executa o bloco de código dentro do else.
  if (action.type === INCREMENTAR) {
    return state + 1; // Retorna o estado atual da store + 1, ou seja incrementa 1 no estado atual da store, sem o payload terá que ser incrementado manualmente.
  }
  return state; // Retorna o estado atual da store, dependendo de qual bloco de código foi executado primeiro.
}

const store = Redux.createStore(reducer); // Criado uma constante chamada store que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro a reducer, ou seja armazena o retorno da função reducer na store.

// Criado uma função chamada incrementar que retorna um objeto com a propriedade type que recebe a constante INCREMENTAR.
function incrementar() {
  return { type: INCREMENTAR }; // Retorna um objeto com a propriedade type que recebe a constante INCREMENTAR.
}

const button = document.getElementById("button"); // Criado uma constante chamada button que recebe o elemento HTML com o id "button".

//* > Subscribe
/*
  - A store possui o método subscribe que irá ativar a função que for passada como argumento do mesmo, todas as vezes que uma ação for despachada via dispatch.
*/

// Criado uma função chamada render que não recebe parâmetros, responsável por renderizar o estado atual da store na tela.
function render() {
  let state = store.getState(); // Criado uma variável chamada state que recebe o retorno da função getState, que é responsável por retornar o estado atual da store.

  const total = document.getElementById("total"); // Criado uma constante chamada total que recebe o elemento HTML com o id "total".

  total.innerHTML = state; // Está alterando o conteúdo do elemento HTML com o valor armazena na variável state.
}

render(); // Executa a função render pela primeira vez, para renderizar o estado inicial da store na tela.

// O subscribe é executado todas as vezes que uma ação é despachada, ou seja sempre que o método dispatch é executado, fazendo com que execute a função render que é responsável por renderizar o estado atual da store na tela.
store.subscribe(() => render());

//*> Unsubscribe
/*
  - A store possui o método subscribe que irá ativar a função que for passada como argumento do mesmo, todas as vezes que uma ação for despachada via dispatch.
*/

// Está armazenando o retorno da função subscribe em uma constante chamada unsubscribe (poderia ser qualquer nome), que é responsável por desativar a função que foi passada como argumento do subscribe.
const unsubscribe = store.subscribe(() => {
  console.log(`O estado da store foi alterado para: ${store.getState()}`); // Está exibindo uma mensagem no console com o estado atual da store.
});

// Está executando a função unsubscribe que é responsável por desativar a função que foi passada como argumento do subscribe.
unsubscribe();

// Adiciona um evento de clique no botão que ao ser clicado irá disparar a função incrementar, que vai emitir a ação que vai incrementar o estado da store.
button.addEventListener("click", () => store.dispatch(incrementar()));
