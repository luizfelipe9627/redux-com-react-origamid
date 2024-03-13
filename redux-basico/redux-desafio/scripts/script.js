import store from "./store/configureStore.js"; // Está importando a store da aplicação.
import {
  incrementarTempo,
  reduzirTempo,
  modificarEmail,
} from "./store/aluno.js"; // Está importando as funções incrementar e reduzir do contador do arquivo.
import { completarAula, completarCurso, resetarCurso } from "./store/aulas.js"; // Está importando a função completarAula do arquivo.

// Criado uma função chamada render
function render() {
  const { aulas, aluno } = store.getState(); // Está desestruturando o estado da aplicação/store para pegar as propriedades aulas e aluno.

  const alunoEl = document.getElementById("aluno"); // Está pegando no HTML o elemento com id aluno e armazenando na variável alunoEl.
  const aulasEl = document.getElementById("aulas"); // Está pegando no HTML o elemento com id aulas e armazenando na variável aulasEl.

  alunoEl.innerText = `${aluno.nome} : ${aluno.email} : ${aluno.diasRestantes}`; // Está alterando o texto do elemento alunoEl para o nome e email do aluno.

  aulasEl.innerText = aulas.filter((aula) => aula.completa === true).length; // Está alterando o texto do elemento aulasEl para a quantidade de aulas completas, utilizando o método filter para filtrar as aulas completas e pegando o tamanho do array retornado.
}

render(); // Está chamando a função render para imprimir o estado inicial da aplicação.

// O subscribe é executado todas as vezes que uma ação é despachada, ou seja sempre que o método dispatch é executado, fazendo com que execute a função render.
store.subscribe(render);

// O dispatch é responsável por despachar/emitir a ação que será executada pelo reducer, e recebe como parâmetro a função desejada responsável por retornar um objeto com a propriedade type, ou seja, a ação que será executada.
store.dispatch(reduzirTempo());
store.dispatch(incrementarTempo());
store.dispatch(modificarEmail("teste@email.com"));
store.dispatch(completarAula(2));
store.dispatch(completarCurso());
store.dispatch(resetarCurso());
