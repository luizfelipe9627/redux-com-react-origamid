import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "./store/photos";
import { getOverFiveKg } from "./store/photos";

const Photos = () => {
  const dispatch = useDispatch(getOverFiveKg); // O dispatch é uma função responsável por disparar uma action para o reducer, nesse caso ele está recebendo a função getOverFiveKg que irá retornar os dados dos cachorros filtrados que pesam igual ou mais de 5kg.

  //* > Selector
  /*
    - O seletor é uma função que podemos utilizar diretamente no useSelector para retornar exatamente os dados da store que precisamos. Usamos um seletor quando precisamos selecionar dados específicos sem a necessidade de modificarmos o dados do estado.
  */

  const data = useSelector(getOverFiveKg); // O useSelector é responsável por acessar o estado global da aplicação. Nesse caso ele está recebendo a função getOverFiveKg que irá retornar os dados dos cachorros que pesam mais de 5kg.

  // O useEffect é um hook do React que serve para executar efeitos colaterais em componentes funcionais, nesse caso ele irá executar a função anônima sempre que o uma action for disparada.
  React.useEffect(() => {
    dispatch(fetchPhotos()); // Disparando a action fetchPhotos, responsável por fazer a requisição de fotos.
  }, [dispatch]);

  // Se o data for false ou seja não existir, ele retorna null fazendo com que o código abaixo do if não seja executado.
  if (!data) return null;

  return (
    <div>
      {/* Tem que ser o map e não o forEach, pois o map retorna um novo array com as imagens, enquanto o forEach não retorna nada. */}
      {data.map((photo) => {
        // A cada iteração ele retorna um li com o título e o peso de cada cachorro.
        return (
          <li key={photo.id}>
            {photo.title} | {photo.peso} pounds
          </li>
        );
      })}
    </div>
  );
};

export default Photos;
