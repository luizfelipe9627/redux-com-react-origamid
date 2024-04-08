// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import PhotoContent from "../Photo/PhotoContent";

// Importa o helper.
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

// Importa o CSS Module.
import styles from "./FeedModal.module.css";

// Importa o hook useDispatch e useSelector do React Redux.
import { useDispatch, useSelector } from "react-redux";

// Importa a action fetchPhoto.
import { closeModal } from "../../store/ui";

// Cria um componente chamado FeedModal que recebe a propriedade photo.
const FeedModal = () => {
  const { data, loading, error } = useSelector((state) => state.photo); // Está desestruturando o state.photo para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  const { modal } = useSelector((state) => state.ui); // Está desestruturando o state.ui para pegar a propriedade modal. O useSelector é responsável por acessar o estado global da aplicação.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  // Função chamada handleOutsideClick que recebe o evento como parâmetro e que é responsável por fechar o modal quando o usuário clicar fora dele.
  function handleOutsideClick(event) {
    // Se o target(elemento clicado) for igual ao currentTarget(elemento que está recebendo o evento), então executa o if.
    if (event.target === event.currentTarget) {
      dispatch(closeModal()); // Dispara a action closeModal que é responsável por fechar o modal.
    }
  }

  // Criado um hook chamado useEffect que é disparado toda vez uma ação é disparada.
  React.useEffect(() => {
    dispatch(closeModal()); // Dispara a action closeModal que é responsável por fechar o modal, para a próxima vez que o modal for aberto ele não mostrar a foto anterior.
  }, [dispatch]);

  if (!modal) return null; // Se o modal for false, retorna null.

  return (
    // Cria um elemento div com a classe modal e o evento onClick que executa a função handleOutsideClick.
    <div className={styles.modal} onClick={handleOutsideClick}>
      {/* Se o estado error for true, renderiza o componente Error passando a propriedade error que recebe o estado error com a mensagem de erro da API. */}
      {error && <Error error={error} />}
      {/* Se o estado loading for true, renderiza o componente Loading. */}
      {loading && <Loading />}
      {/* Se o estado data for true, renderiza o componente PhotoContent passando a propriedade data que recebe o estado data. */}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal; // Exporta o componente FeedModal.
