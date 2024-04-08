// Importa a biblioteca React.
import React from "react";

// Importa os componentes.
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

// Importa o compenente PropTypes.
import PropTypes from "prop-types";

// Importa o hook useSelector do React Redux.
import { useSelector, useDispatch } from "react-redux";

import { loadNewPhotos, resetFeedState } from "../../store/feed";

// Importa os helpers.
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";

// Criado um componente chamado Feed que recebe a prop user.
const Feed = ({ user }) => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { infinite, loading, list, error } = useSelector((state) => state.feed); // Está desestruturando o state.feed para pegar a propriedade infinite, loading, list e error. O useSelector é responsável por acessar o estado global da aplicação.

  // Criado um hook chamado useEffect que é disparado toda vez que uma ação é disparada, e quando o usuário atualizar a página.
  React.useEffect(() => {
    dispatch(resetFeedState()); // Dispara a ação resetFeedState, responsável por resetar o estado da store.

    dispatch(loadNewPhotos({ user, total: 6 })); // Dispara a ação loadNewPhotos, responsável por carregar novas fotos, passando um objeto com a propriedade user que é o usuário que postou as fotos e a propriedade total que é o total de fotos a serem carregadas.
  }, [dispatch, user]);

  // Criado um hook chamado useEffect que é disparado toda vez uma ação é disparada, quando o usuário atualizar a página e quando o usuário chegar no final da página.
  React.useEffect(() => {
    let wait = false; // Criado uma variável chamada wait e inicializada como false.

    // Criado uma função chamada infiniteScroll responsável por fazer mais páginas serem carregadas quando o usuário chegar no final da página.
    function infiniteScroll() {
      // Se o valor do estado infinite for true executa o if.
      if (infinite) {
        const scroll = window.scrollY; // Pega o valor do scrollY, ou seja, a quantidade de pixels que o usuário já rolou a página.
        const height = document.body.offsetHeight - window.innerHeight; // Pega o valor da altura do body menos a altura da janela do navegador.

        // Se o scroll for maior ou igual a altura da página vezes 0.75, ou seja, se o usuário já rolou 75% da página e a variável wait for false executa o if.
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user, total: 6 })); // Dispara a ação loadNewPhotos, responsável por carregar novas fotos, passando um objeto com a propriedade user que é o usuário que postou as fotos e a propriedade total que é o total de fotos a serem carregadas.

          wait = true; // Muda o valor da variável wait para true.

          // O setTimeout é uma função que executa uma função depois de um determinado tempo, nesse caso 500ms.
          setTimeout(() => {
            wait = false; // Depois de 500ms muda o valor da variável wait para false.
          }, 500);
        }
      }
    }
    window.addEventListener("wheel", infiniteScroll); // Adiciona um evento wheel que é disparado quando o usuário rola a roda do mouse para cima ou para baixo, quando acionado chama a função infiniteScroll.
    window.addEventListener("scroll", infiniteScroll); // Adiciona um evento scroll que é disparado quando o usuário rola a página para cima ou para baixo, quando acionado chama a função infiniteScroll.

    // Quando o componente é desmontado, ou seja quando o usuário sai da página, remove os eventos wheel e scroll.
    return () => {
      window.removeEventListener("wheel", infiniteScroll); // Remove o evento wheel.
      window.removeEventListener("scroll", infiniteScroll); // Remove o evento scroll.
    };
  }, [infinite, dispatch, user]);

  return (
    <div>
      {/* Renderiza o componente FeedModal. */}
      <FeedModal />

      {/* Se a lista de fotos for maior que 0, renderiza o FeedPhotos. */}
      {list.length > 0 && <FeedPhotos />}

      {/* Se o valor do estado loading for true, renderiza o componente Loading. */}
      {loading && <Loading />}

      {/* Se o valor do estado error for verdadeiro, renderiza o componente Error, passando a prop error com o valor de error da store. */}
      {error && <Error error={error} />}

      {/* Se o valor do estado infinite for false ou seja, se não existirem mais postagens e o usuário não estiver logado, renderiza um parágrafo com a mensagem "Não existem mais postagens." */}
      {!infinite && !user && (
        <p
          style={{
            textAlign: "center",
            padding: "2rem 0 4rem 0",
            color: "#888",
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
};

// Define o valor padrão dos props do componente Feed.
Feed.defaultProps = {
  user: 0, // Está definindo o valor padrão da prop user como 0.
};

// Define o tipo dos props recebidos pelo componente Feed.
Feed.propTypes = {
  user: PropTypes.oneOfType([
    // Está definindo que a prop user pode ser uma string ou um número e que é obrigatória.
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed; // Exporta o componente Feed.
