// Criado uma função middleware chamada thunk, que recebe três parâmetros, o store que é a store da aplicação, next que é a função que irá chamar o próximo middleware, e action que é a ação que será executada para alterar o estado da aplicação/store.
const thunk = (store) => (next) => (action) => {
  // Se o tipo da ação for uma função, executa o bloco de if abaixo.
  if (typeof action === "function") {
    return action(store.dispatch, store.getState); // Quando a ação for uma função, irá retornar a função action, que recebe como parâmetro a função dispatch, que é responsável por disparar uma ação para alterar o estado da aplicação/store, e a função getState, que é responsável por retornar o estado atual da aplicação/store.
  }

  return next(action); // Retorna a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada, sendo assim irá retornar a ação que está sendo utilizada para alterar o estado da store.
};

export default thunk; // Exporta a função middleware thunk.
