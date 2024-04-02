//* > 5. Middleware
/*
  - A função middleware é uma função que recebe três parâmetros, store que é a store da aplicação, next que é a função que irá chamar o próximo middleware, e action que é a ação que será executada para alterar o estado da aplicação/store.
  - Dentro do Middleware possuímos acesso a store, next e action. Assim podemos ter acesso ao estado atual via store.getState() e também podemos despachar ações com action.dispatch().
*/

// Criado uma função middleware chamada logger, que recebe três parâmetros, store, next e action.
const logger = (store) => (next) => (action) => {
  const result = next(action); // Criado uma constante chamada result, que recebe a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada.

  console.log(result); // Exibe no console o resultado da função next, que é a ação que está sendo utilizada para alterar o estado da store.

  return result; // Retorna o resultado da função next, que é a ação que está sendo utilizada para alterar o estado da store.
};

export default logger; // Exporta a função middleware logger.
