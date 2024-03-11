//* Imutabilidade com arrays
/*
  - Utlize o spread [...array] para criar uma "cópia".
*/

const array1 = [0, 1, 2, 3, 4]; // Esta criando uma constante chamada array1 que recebe um array com cinco elementos.

const array2 = array1; // Esta criando uma constante chamada array2 que recebe a constante array1, sendo assim não é uma cópia do array1, e sim uma referência para o mesmo array.
console.log(array1 === array2); // Retorna true, pois array2 é uma referência para o mesmo array que array1.

const array3 = [...array1]; // Esta criando uma constante chamada array3 que recebe um novo array com os elementos do array1, sendo assim é uma cópia do array1 se tornando um novo array.
console.log(array1 === array3); // Retorna false, pois array3 é um novo array.

//* > Métodos mutáveis de arrays
/*
  - Métodos mutáveis de arrays são métodos que alteram o array original.
*/

/*
array.copyWithin();
array.fill();
array.pop();
array.push();
array.reverse();
array.shift();
array.sort();
array.splice();
array.unshift();
*/

//* > Métodos imutáveis de arrays
/*
  - Métodos imutáveis de arrays são métodos que retornam um novo array.
*/

/*
array.concat();
array.filter();
array.map();
array.reduce();
array.flat();
array.join();
*/

//* > Imutabilidade com objetos
/*
  - O spread também pode ser utilizado para criarmos uma "cópia" de um objeto.
*/

// Criado uma constante chamada obj1 que recebe um objeto vazio.
const obj1 = {
  name: "John Doe",
  age: 25,
};

const obj2 = obj1; // Criado uma constante chamada obj2 que recebe a constante obj1, sendo assim não é uma cópia do obj1, e sim uma referência para o mesmo objeto.
console.log(obj1 === obj2); // Retorna true, pois obj2 é uma referência para o mesmo objeto que obj1.

const obj3 = { ...obj1, name: "Jane Doe" }; // Criado uma constante chamada obj3 que recebe um novo objeto com as propriedades do objeto obj1, sendo assim é uma cópia do obj1 se tornando um novo objeto com a propriedade name alterada para "Jane Doe".
console.log(obj1 === obj3); // Retorna false, pois obj3 é um novo objeto.

// Outra forma de criar uma cópia de um objeto é utilizando o método Object.assign.
const obj4 = Object.assign({}, obj1, { name: "Peter Doe" }); // Criado uma constante chamada obj4 que recebe um novo objeto com as propriedades do objeto obj1, sendo assim é uma cópia do obj1 se tornando um novo objeto com a propriedade name alterada para "Peter Doe".
console.log(obj1 === obj4); // Retorna false, pois obj4 é um novo objeto.

//* > Immer
/*
  - O immer é um pacote que nos permite trabalhar com imutabilidade de forma mais simples.
*/

// Criado uma constante chamada objWithImmer que recebe o retorno da função produce do pacote immer, que é responsável por criar um novo objeto com as alterações necessárias. Recebe como primeiro parâmetro o objeto obj1 que será modificado, e como segundo parâmetro uma função que recebe o objeto draft que é uma cópia do objeto obj1, e é responsável por alterar o objeto draft.
const objWithImmer = immer.produce(obj1, (draft) => {
  draft.name = "Peter Doe"; // Altera o valor da propriedade name do objeto draft(obj1) para "Peter Doe".
});
console.log(obj1 === objWithImmer); // Retorna false, pois objWithImmer é um novo objeto criado a partir do objeto obj1.
