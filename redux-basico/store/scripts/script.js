//* > Store
/*
  - Primeiro iniciamos a nossa store com Redux.createStore(). A store dá acesso ao estado global e permite despacharmos ações que modificam o mesmo.
  - É essencial passarmos uma função como primeiro argumento do createStore, essa função é chamada de reducer. O reducer é a função responsável por retornar o estado atual da store.
*/

// Criado uma função chamada reducer1 que retorna um objeto com duas propriedades.
function reducer1() {
  // Retorna as propriedades name e id.
  return {
    name: "Luiz",
    id: 19,
  };
}

const store1 = Redux.createStore(reducer1); // Criado uma constante chamada store1 que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro a reducer1, ou seja armazena o retorno da função reducer1 na store1.

console.log(store1); // Mostra no console a store criada, que é um objeto com as propriedades dispatch, subscribe, getState, replaceReducer e Symbol(observable).

//* > getState
/*
  - O método getState() retorna o estado atual da store.
*/

const state1 = store1.getState(); // Criado uma constante chamada state1 que recebe o retorno da função getState, que é responsável por retornar o estado atual da store.

console.log(state1); // Mostra no console o estado atual da store, que é um objeto com as propriedades name e id.
console.log(state1.name); // Mostra no console o valor da propriedade name do estado atual da store.

//* > Reducer
/*
  - A função de reducer recebe dois argumentos principais, o primeiro sendo o estado atual state e o segundo uma ação action que será utilizado para identificarmos as ações despachadas pela store.
*/

// Criado uma constante chamada initialState que recebe um objeto com as propriedades name e id.
const initialState = {
  name: "Lucas",
  id: 25,
};

// Criado uma função chamada reducer2 que recebe dois parâmetros, o primeiro é o estado inicial que nesse caso é um objeto com as propriedades name e id, e o segundo é a ação que será despachada pela store.
function reducer2(state = initialState, action) {
  return state; // Retorna o estado atual.
}

const store2 = Redux.createStore(reducer2); // Criado uma constante chamada store2 que recebe o retorno da função Redux.createStore, que é responsável por criar a store(armazém) da aplicação, e recebe como parâmetro a reducer2, ou seja armazena o retorno da função reducer2 na store2.
const state2 = store2.getState(); // Criado uma constante chamada state2 que recebe o retorno da função getState, que é responsável por retornar o estado atual da store.
console.log(state2); // Mostra no console o estado atual da store, que é um objeto com as propriedades name e id.
