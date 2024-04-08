// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import PhotoContent from "./PhotoContent";

// Importa o hook do React Router DOM.
import { useParams } from "react-router-dom";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Importa o helper.
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import Head from "../Helper/Head";

// Importa a action fetchPhoto.
import { fetchPhoto } from "../../store/photo";

// Cria um componente chamado Photo.
const Photo = () => {
  // O useParams é um hook que retorna um objeto com os parâmetros da rota dinâmica. Nesse caso o id da foto.
  const { id } = useParams(); // Desestrutura o retorno da função useParams e armazena o id da foto na constante id.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, loading, error } = useSelector((state) => state.photo); // Está desestruturando o state.photo para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  // O useEffect executa quando o componente for renderizado na tela pela primeira vez e toda vez que o id da foto mudar e for executado o dispatch, ou seja, toda vez que a foto mudar.
  React.useEffect(() => {
    dispatch(fetchPhoto(id)); // Dispara a action fetchPhoto passando o id da foto como parâmetro. Sendo responsável por realizar a requisição à API e armazenar a foto no estado global.
  }, [dispatch, id]);

  // Se o error for verdadeiro ou seja se tiver erro executa o if.
  if (error) {
    return <Error error={error} />; // Retorna o componente Error com a prop error que contém a mensagem de erro que veio da API.
  }
  // Se o loading for verdadeiro ou seja se estiver carregando os dados executa o if.
  if (loading) {
    return <Loading />; // Retorna o componente Loading.
  }
  // Se data for verdadeiro ou seja se tiver os dados da foto executa o if.
  if (data) {
    // Retorna o componente PhotoContent com a prop data que contém os dados da foto.
    return (
      <section className="container mainContainer">
        {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
        <Head title={data.photo.title} />
        {/* Chama o componente PhotoContent passando a prop data que contém os dados da foto e a prop single com o valor true para que o componente PhotoContent saiba que é uma foto única. */}
        <PhotoContent single={true} />
      </section>
    );
  }
};

export default Photo; // Exporta o componente Photo.
