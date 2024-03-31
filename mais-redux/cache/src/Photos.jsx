import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "./store/photos";

const Photos = () => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data } = useSelector((state) => state.photos); // Está desestruturando o state.photos para pegar a propriedade data. O useSelector é responsável por acessar o estado global da aplicação.

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
        // A cada iteração ele retorna um li com o título da foto.
        return <li key={photo.id}>{photo.title}</li>;
      })}
    </div>
  );
};

export default Photos;
