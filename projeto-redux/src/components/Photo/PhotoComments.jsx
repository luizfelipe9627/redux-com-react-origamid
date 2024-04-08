// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import PhotoCommentsForm from "./PhotoCommentsForm";

// Importa o CSS Module.
import styles from "./PhotoComments.module.css";

// Importa o hook useSelector do React Redux.
import { useSelector } from "react-redux";

// Cria um componente chamado PhotoComments que recebe como parâmetro as propriedades comments e id.
const PhotoComments = (props) => {
  const commentsSection = React.useRef(null); // Cria uma referência para o elemento commentsSection. O valor inicial é null.

  const [comments, setComments] = React.useState(() => props.comments); // Cria um estado para armazenar os comentários e a função para atualizar o estado chamado setComments. O estado inicial é o valor das propriedades comments.

  const { data } = useSelector((state) => state.user); // Está desestruturando o state.user para pegar a propriedade data. O useSelector é responsável por acessar o estado global da aplicação.

  // O useEffect é executado quando o componente é renderizado e sempre que o estado comments for atualizado.
  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight; // Faz com que o scroll do elemento commentsSection seja igual ao seu scrollHeight, ou seja, faz com que o scroll fique no final do elemento.
  }, [comments]);

  return (
    // O React.Fragment é utilizado para agrupar elementos filhos sem adicionar nós extras ao DOM, por isso não é necessário utilizar uma div.
    <React.Fragment>
      {/* Cria uma lista com os comentários, onde o map percorre o array comments e para cada comentário retorna um li com o nome do autor e o comentário digitado pelo usuário. */}
      {/* O ref é utilizado para acessar o elemento commentsSection. */}

      {/* Se a propriedade single for verdadeira ou seja se for uma foto única atribui a classe single, se não atribui a classe comments. */}
      <ul
        ref={commentsSection}
        // Se o single for verdadeiro, ou seja se for uma foto única, então renderiza a classe single, se não renderiza uma string vazia, ou seja, não renderiza nada.
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment, index) => (
          <li key={index}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {/* Se o data for verdadeiro, ou seja o usuário estiver logado, então renderiza o componente PhotoCommentsForm que é passado como propriedade o id da foto a função atualizadora setComments e a propriedade single. */}
      {data && (
        <PhotoCommentsForm
          id={props.id}
          comments={comments}
          setComments={setComments}
          single={props.single}
        />
      )}
    </React.Fragment>
  );
};

export default PhotoComments; // Exporta o componente PhotoComments.
