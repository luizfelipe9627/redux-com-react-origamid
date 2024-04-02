import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFotos, selecOverFiveYears } from "./store/fotos";

const Fotos = () => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, loading, error } = useSelector((state) => state.fotos); // Está desestruturando o state.fotos para pegar a propriedade data e loading. O useSelector é responsável por acessar o estado global da aplicação e retornar os dados que estão armazenados no estado.

  const fotos = useSelector(selecOverFiveYears); // O useSelector está acessando o estado definido na função selecOverFiveYears e retornando as fotos que possuem mais de 5 anos, armazenando na constante fotos.

  React.useEffect(() => {
    dispatch(fetchFotos(2)); // Dispara a função fetchFotos, que é responsável por solicitar os dados das fotos.
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>; // Se o loading for true, ou seja, se estiver carregando(fazendo a requisição), então irá renderizar o parágrafo com o texto Carregando...

  if (error) return <p>{error}</p>; // Se o error for true, ou seja, se houver algum erro, então irá renderizar o parágrafo com o texto do erro.

  // Se fotos for true, ou seja, se existir alguma foto que possua mais de 5 anos, então irá renderizar uma lista com essas fotos.
  if (fotos) {
    return (
      <ul>
        {/* O método map é responsável por percorrer o array fotos e retornar um novo array com os títulos das fotos, já desestruturando o id, idade e o title ao invés de acessar o objeto todo. */}
        {fotos.map(({ id, title, idade }) => {
          return (
            <li key={id}>
              {title} | {idade}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null; // Retorna null, ou seja não irá renderizar nada.
  }
};

export default Fotos;
