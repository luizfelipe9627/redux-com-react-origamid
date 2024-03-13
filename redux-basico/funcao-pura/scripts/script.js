// Criado uma função chamada reducer que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um número, e o segundo é a ação que será despachada pela store, responsável por alterar o estado da store.
function reducer(state = 0, action) {
  // O switch é responsável por verificar o valor da propriedade type do objeto action, e executar o bloco de código que corresponde ao valor da propriedade type.
  switch (action.type) {
    // Caso o valor da propriedade type seja igual a "MODIFICAR_WIDTH", irá executar o bloco de código abaixo.
    case "MODIFICAR_WIDTH":
      //* > Forma incorreta
      /*
        - A forma abaixo é uma forma incorreta de se fazer, pois a função reducer é uma função pura, ou seja, ela não deve realizar efeitos colaterais, como por exemplo, alterar o DOM.
        - A função reducer é responsável apenas por alterar o estado da store.

        const caixa = document.getElementById("caixa"); // Criado uma constante chamada caixa que recebe o elemento HTML com o id "caixa".
        caixa.style.width = action.payload + "px"; // A propriedade width do elemento caixa recebe o valor do estado mais a string "px".
      */

      return action.payload; // Retorna o valor armazenado na propriedade payload do objeto action.
    // Caso o valor da propriedade type não corresponda a nenhum dos valores acima, será executado o bloco de código abaixo.
    default:
      return state; // Retorna o estado atual.
  }
}

//* > Redux DevTools
/*
  - Uma das principais vantagens do uso do Redux é a utilização da sua extensão do browser para debugarmos mudanças no estado.
  - Para utilizá-la, basta instalar a extensão do Redux DevTools no navegador e adicionar a função abaixo como segundo parâmetro do createStore.
*/

// Criado uma constante chamada store que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro o reducer, que são responsáveis por alterar o estado da store. E como segundo parâmetro, recebe a extensão do devtools do redux para o navegador caso exista.
const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

//* > Efeito colateral
/*
  - Efeitos colaterais são aqueles que impactam objetos/elementos que não pertencem a função. Exemplo: fetch, setTimeout, manipular dom, modificar objetos/arrays externas e outros.
  - Um dos problemas dos efeitos colaterais é o fato deles quebrarem funcionalidades da devtool como o Time Travel.
*/

// Criado uma função de efeito colateral chamada render.
function render() {
  const caixa = document.getElementById("caixa"); // Criado uma constante chamada caixa que recebe o elemento HTML com o id "caixa".
  caixa.style.width = store.getState() + "px"; // A propriedade width do elemento caixa recebe o valor do estado mais a string "px".
}

store.subscribe(render); // Toda vez que o estado da store for alterado, a função render será executada.

store.dispatch({ type: "MODIFICAR_WIDTH", payload: 200 }); // Está atualizando/modificando o estado da store, despachando a ação com a propriedade type que recebe a string "MODIFICAR_WIDTH" e a propriedade payload que recebe o valor 200.
store.dispatch({ type: "MODIFICAR_WIDTH", payload: 123 }); // Está atualizando/modificando o estado da store, despachando a ação com a propriedade type que recebe a string "MODIFICAR_WIDTH" e a propriedade payload que recebe o valor 123.
store.dispatch({ type: "MODIFICAR_WIDTH", payload: 321 }); // Está atualizando/modificando o estado da store, despachando a ação com a propriedade type que recebe a string "MODIFICAR_WIDTH" e a propriedade payload que recebe o valor 321.
store.dispatch({ type: "MODIFICAR_WIDTH", payload: 202 }); // Está atualizando/modificando o estado da store, despachando a ação com a propriedade type que recebe a string "MODIFICAR_WIDTH" e a propriedade payload que recebe o valor 202.

console.log(store.getState()); // Exibe no console o estado atual da store.
