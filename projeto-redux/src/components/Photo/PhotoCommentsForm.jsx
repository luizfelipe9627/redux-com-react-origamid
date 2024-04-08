// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import Textarea from "../Forms/Textarea";

// Importa o CSS Module.
import styles from "./PhotoCommentsForm.module.css";

// Importa o svg e transforma em um componente React chamado Enviar.
import { ReactComponent as Enviar } from "../../assets/svg/enviar.svg";

// Importa o helper.
import Error from "../Helper/Error";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Importa a action.
import { fetchPhotoComments } from "../../store/photoComments";

// Cria um componente chamado PhotoCommentsForm.
const PhotoCommentsForm = ({ id, single, comments, setComments }) => {
  const [comment, setComment] = React.useState(""); // Cria um estado para armazenar o comentário digitado pelo usuário e a função para atualizar o estado chamado setComment. O estado inicial é uma string vazia.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, error } = useSelector((state) => state.photoComments); // Está desestruturando o state.photo para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  async function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário que é enviar os dados para uma outra página e recarregar a página.

    dispatch(fetchPhotoComments({ id, comment })); // O dispatch executa a action fetchPhotoComments passando o id e o comentário como parâmetro. Sendo responsável por realizar a requisição à API e enviar o comentário digitado pelo usuário.
  }

  React.useEffect(() => {
    if (!error && data) {
      setComments((prevComments) => [...prevComments, data]);
      setComment(""); // Reseta o campo de comentário
    }
  }, [data, error, setComments]);

  return (
    <form
      // Se o single for verdadeiro, ou seja se for uma foto única, então renderiza a classe single, se não renderiza uma string vazia, ou seja, não renderiza nada.
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      {/* Chama o componente Textarea passando as propriedades name, value, placeholder e onChange como parâmetro. */}
      <Textarea
        name="comment"
        id="comment"
        value={comment}
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)} // Quando o usuário digitar algo no campo de texto, o evento onChange é disparado e a função setComment é chamada passando o valor digitado como parâmetro.
      />
      {/* Se single for verdadeiro, ou seja se for uma foto única, então renderiza a classe single, se não renderiza uma string vazia, ou seja, não renderiza nada. */}
      <button className={`${styles.button} ${single ? styles.single : ""}`}>
        <Enviar />
      </button>

      {/* Se o error for verdadeiro, ou seja se existir um erro, então renderiza o componente Error que é passado como propriedade o error que é a mensagem de erro da API. */}
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentsForm; // Exporta o componente PhotoCommentsForm.
