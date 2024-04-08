// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./PhotoDelete.module.css";

// Importa a action.
import { fetchPhotoDelete } from "../../store/photoDelete";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Cria um componente chamado PhotoDelete.
const PhotoDelete = ({ id }) => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, loading } = useSelector((state) => state.photoDelete); // Está desestruturando o state.photo para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  // Cria uma função assíncrona chamada handleClick que executa a função request passando a url e options como parâmetro. O async está fazendo com que a função handleClick espere a resposta da API para continuar a execução.
  async function handleClick() {
    const confirm = window.confirm("Tem certeza que deseja deletar?"); // Cria uma constante chamada confirm que recebe o retorno da função confirm que exibe uma mensagem para o usuário e retorna true ou false.

    // Se o usuário clicar em ok, executa o if.
    if (confirm) {
      dispatch(fetchPhotoDelete({ id })); // O dispatch executa a action fetchPhotoDelete passando o id como parâmetro. Sendo responsável por realizar a requisição à API e deletar a foto selecionada.
    }
  }

  // O useEffect é responsável por executar um efeito colateral, sendo assim ele executa toda vez que o data mudar, ou seja toda vez que a foto for deletada.
  React.useEffect(() => {
    // Se data for verdadeiro, ou seja, se a resposta da API for verdadeira, então executa o if.
    if (data) {
      window.location.reload(); // Recarrega a página.
    }
  }, [data]);

  return (
    // O React.Fragment é usado para renderizar mais de um elemento sem precisar criar um elemento pai como uma div por exemplo. */}
    <React.Fragment>
      {/* Se o estado loading for true, renderiza o botão desabilitado. Se não, renderiza o botão que executa a função handleClick. */}
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </React.Fragment>
  );
};

export default PhotoDelete; // Exporta o componente.
