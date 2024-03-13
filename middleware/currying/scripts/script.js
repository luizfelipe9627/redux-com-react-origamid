const li = Array.from(document.querySelectorAll("li")); // Está retornando um array com todos os elementos li(por padrão são Node List) e armazenando na variável chamada li.

//* > Currying
/*
  - Uma função curried permite passarmos um argumento por vez, ao invés de todos de uma vez.
*/

// Criado uma curry function chamada getElementAttr que recebe um argumento chamado key.
const getElementAttr = (key) => {
  return (el) => el.getAttribute(key); // Retorna uma função que recebe um argumento chamado el e retorna o elemento com o atributo key passado como argumento.
};

const getAttrDataSlide = getElementAttr("data-slide"); // Está executando a função getElementAttr e passando para o argumento key o valor "data-slide" e armazenando o retorno em uma variável chamada getAttrDataSlide.

const getAttrDataId = getElementAttr("id"); // Está executando a função getElementAttr e passando para o argumento key o valor "id" e armazenando o retorno em uma variável chamada getAttrDataId.

const dataSlideList = li.map(getAttrDataSlide); // Para cada elemento do array li que o map percorre, está executando a função dentro da variável getAttrDataSlide e armazenando o retorno em uma variável chamada dataSlideList.
console.log(dataSlideList); // Irá mostrar um array com os elementos que possuem o atributo data-slide.

const idList = li.map(getAttrDataId); // Para cada elemento do array li que o map percorre, está executando a função dentro da variável getAttrDataId e armazenando o retorno em uma variável chamada idList.
console.log(idList); // Irá mostrar um array com os elementos que possuem o atributo id.
