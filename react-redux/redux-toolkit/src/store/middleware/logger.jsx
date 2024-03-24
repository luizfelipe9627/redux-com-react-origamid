// Criado um middleware chamado logger que recebe a store responsável por armazenar o estado da aplicação, o next que é responsável por chamar a próxima função middleware e o action que é responsável por armazenar a ação que será executada.
const logger = (store) => (next) => (action) => {
  console.group(action.type); // Inicia um grupo no console com o nome da ação.
  console.log("ACTION:", action); // Imprime a ação no console.
  console.log("PREV_STATE:", store.getState()); // Imprime o estado anterior da store no console.

  const result = next(action); // Chama a próxima função middleware, ou seja executa o reducer que irá atualizar o estado da store.

  console.log("NEW_STATE:", store.getState()); // Imprime o estado atual da store no console.
  console.groupEnd(); // Finaliza o grupo no console.

  return result; // Retorna o resultado da função middleware.
};

export default logger; // Exporta o middleware logger.
