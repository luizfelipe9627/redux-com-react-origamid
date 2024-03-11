const INCREMENTAR = "INCREMENTAR"; // Criado uma constante chamada INCREMENTAR que recebe a string "INCREMENTAR".
const SOMAR = "SOMAR"; // Criado uma constante chamada SOMAR que recebe a string "SOMAR".

// Criado uma função chamada count que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um número, e o segundo é a ação que será despachada pela store, responsável por alterar o estado da store.
function count(state = 0, action) {
  //* > Switch case
  /*
    - É comum o uso do switch statement dentro do count ao invés do uso de if/else. Serve apenas para facilitar a leitura e evitar a repetição do action.type.
  */

  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a constante INCREMENTAR, irá executar o bloco de código abaixo.
    case INCREMENTAR:
      return state + 1; // Retorna o estado atual mais 1.
    // Caso o valor da propriedade type seja igual a string "SOMAR", será executado o bloco de código abaixo.
    case SOMAR:
      return state + action.payload; // Retorna o estado atual mais o valor armazenado na propriedade payload do objeto action.
    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

// Criado uma função chamada modal que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um booleano, e o segundo é a ação que será despachada pela store, responsável por alterar o estado da store.
function modal(state = false, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a string "ABRIR", irá executar o bloco de código abaixo.
    case "ABRIR":
      return true; // Retorna true.
    // Caso o valor da propriedade type seja igual a string "FECHAR", será executado o bloco de código abaixo.
    case "FECHAR":
      return false; // Retorna false.
    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

//* > combineReducers
/*
  - Podemos dividir o código do reducer em diferentes funções e combiná-las ao final. Vale lembrar que ao final o reducer sempre será único e toda ação despachada irá passar por todos os reducers.
*/

const reducer = Redux.combineReducers({ count, modal }); // Criado uma constante chamada reducer que recebe o retorno da função Redux.combineReducers, que é responsável por combinar os reducers em um único reducer, e recebe como parâmetro um objeto com os reducers que serão combinados.

const store = Redux.createStore(reducer); // Criado uma constante chamada store que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro o reducer, que são responsáveis por alterar o estado da store.

// Criado uma função chamada incrementar que retorna um objeto com a propriedade type que recebe a constante INCREMENTAR.
function incrementar() {
  return { type: INCREMENTAR }; // Retorna um objeto com a propriedade type que recebe a constante INCREMENTAR.
}

// Criado uma função chamada somar que recebe um parâmetro chamado payload, responsável por retornar um objeto com a propriedade type que recebe a string "SOMAR" e a propriedade payload que recebe o valor passado como parâmetro.
function somar(payload) {
  return { type: "SOMAR", payload }; // Retorna um objeto com a propriedade type que recebe a string "SOMAR" e a propriedade payload que recebe o valor passado como parâmetro.
}

const button = document.getElementById("button"); // Criado uma constante chamada button que recebe o elemento HTML com o id "button".

// Criado uma função chamada render que não recebe parâmetros, responsável por renderizar o estado atual da store na tela.
function render() {
  const { count, modal } = store.getState(); // Está desestruturando o retorno da função store.getState, que contém o estado atual da store, e armazenando o valor da propriedade count na constante count e o valor da propriedade modal na constante modal.

  const total = document.getElementById("total"); // Criado uma constante chamada total que recebe o elemento HTML com o id "total".

  total.innerHTML = count; // Está alterando o conteúdo do elemento HTML total para o estado atual da propriedade count desestruturada do retorno da função store.getState.

  // Se modal for true executará o bloco de código abaixo, caso contrário executará o bloco de código após o else.
  if (modal) {
    total.style.display = "inline-block"; // Define o estilo display do elemento HTML total para "inline-block", fazendo com que o elemento fique visível em linha ocupando apenas o espaço necessário.
  } else {
    total.style.display = "none"; // Define o estilo display do elemento HTML total para "none", fazendo com que o elemento fique oculto.
  }
}

render(); // Executa a função render pela primeira vez, para renderizar o estado inicial da store na tela.

// O subscribe é executado todas as vezes que uma ação é despachada, ou seja sempre que o método dispatch é executado, fazendo com que execute a função render que é responsável por renderizar o estado atual da store na tela.
store.subscribe(() => render());

store.dispatch(somar(5)); // Dispara a ação que vai somar 5 ao estado da store, executando a função somar que retorna um objeto com a propriedade type que recebe a string "SOMAR" e a propriedade payload que recebe o valor 5.

// Adiciona um evento de clique no botão que ao ser clicado irá disparar a função incrementar, que vai emitir a ação que vai incrementar o estado da store.
button.addEventListener("click", () => store.dispatch(incrementar()));

const abrir = document.getElementById("abrir"); // Criado uma constante chamada abrir que recebe o elemento HTML com o id "abrir".
const fechar = document.getElementById("fechar"); // Criado uma constante chamada fechar que recebe o elemento HTML com o id "fechar".

// Adiciona um evento de clique no botão abrir que ao ser clicado irá disparar a função anônima, que vai emitir a ação que vai abrir o modal, executando a função dispatch que recebe um objeto com a propriedade type que recebe a string "ABRIR", fazendo com que o modal receba o valor true.
abrir.addEventListener("click", () => store.dispatch({ type: "ABRIR" }));

// Adiciona um evento de clique no botão fechar que ao ser clicado irá disparar a função anônima, que vai emitir a ação que vai fechar o modal, executando a função dispatch que recebe um objeto com a propriedade type que recebe a string "FECHAR", fazendo com que o modal receba o valor false.
fechar.addEventListener("click", () => store.dispatch({ type: "FECHAR" }));
