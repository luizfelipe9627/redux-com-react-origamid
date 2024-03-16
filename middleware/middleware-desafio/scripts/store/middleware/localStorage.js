// Criado uma função middleware chamada localStorage, que recebe três parâmetros, o store que é a store da aplicação, next que é a função que irá chamar o próximo middleware, e action que é a ação que será executada para alterar o estado da aplicação/store.
const localStorage = (store) => (next) => (action) => {
  const result = next(action); // Criado uma constante chamada result, que recebe a função next, que é responsável por chamar o próximo middleware, e passa como parâmetro a ação que será executada, sendo assim irá retornar a ação que está sendo utilizada para alterar o estado da store.
  
  // Se a ação localStorage for diferente de indefinido, ou seja, se a ação localStorage existir, executa o bloco de if abaixo.
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload),
    ); // Está armazenando no localStorage do navegador, o valor da ação localStorage como chave, e o valor da ação payload como valor, e está convertendo o valor da ação payload para uma string, pois o localStorage só aceita valores em string.
  }

  return result; // Retorna o resultado da função next, que é a ação que está sendo utilizada para alterar o estado da store.
};

export default localStorage; // Exporta a função middleware localStorage.
