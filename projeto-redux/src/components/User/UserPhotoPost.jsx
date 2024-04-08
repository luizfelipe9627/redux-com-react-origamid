// Importa a biblioteca React.
import React from "react";

// Importa o CSS Module.
import styles from "./UserPhotoPost.module.css";

// Importa os componentes.
import Input from "../Forms/Input";
import Button from "../Forms/Button";

// Importa os hooks.
import useForm from "../../hooks/useForm";

// Importa o componente da biblioteca React Router DOM.
import { useNavigate } from "react-router-dom";

// Importa o Helper.
import Error from "../Helper/Error";
import Head from "../Helper/Head";

// Importa o hook useDispatch e useSelector do React Redux.
import { useDispatch, useSelector } from "react-redux";

// Importa o slice photoPost.
import { photoPost } from "../../store/photoPost";

// Criado um componente chamado UserPhotoPost.
const UserPhotoPost = () => {
  // Está chamando o hook useForm responsável por tornar o formulário reativo e passando como parâmetro um objeto com os campos nome, peso e idade nas constantes criadas.
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");

  const [img, setImg] = React.useState({}); // Cria um estado chamado img e uma função setImg para alterar o estado. O estado inicial é um objeto vazio.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, error, loading } = useSelector((state) => state.photoPost); // Está desestruturando o state.photoPost para pegar a propriedade data, error e loading. O useSelector é responsável por acessar o estado global da aplicação.

  const { token } = useSelector((state) => state.token.data); // Está desestruturando o state.token para pegar a propriedade token.

  const navigate = useNavigate(); // Cria uma constante navigate que recebe a função useNavigate responsável por navegar entre as rotas.

  // O useEffect vai ser executado toda vez que o estado data for alterado e a função navigate está sendo passada como dependência, ou seja, toda vez que a função navigate for alterada, o useEffect vai ser executado novamente.
  React.useEffect(() => {
    // Se o estado data for verdadeiro, ou seja, se a requisição for bem sucedida, então executa o if.
    if (data) {
      navigate("/conta"); // Está chamando a função navigate passando como parâmetro a rota /conta.
    }
  }, [data, navigate]);

  // Criado uma função handleSubmit responsável por enviar os dados do formulário.
  function handleSubmit(event) {
    event.preventDefault(); // Evita que o formulário seja enviado e a página seja recarregada.

    const formData = new FormData(); // Cria um objeto do tipo FormData, ou seja, um objeto que simula o comportamento de um formulário.

    // Está adicionando ao objeto formData a propriedade img com o valor do arquivo selecionado.
    formData.append("img", img.raw);
    // Está adicionando ao objeto formData as propriedades img, nome, peso e idade com os valores digitados nos campos do formulário.
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    dispatch(photoPost({ formData, token })); // Está chamando a função photoPost passando como parâmetro um objeto com as propriedades formData e token, fazendo com que os dados sejam enviados para a API.
  }

  // Criado uma função handleImgChange responsável por alterar o estado da imagem.
  function handleImgChange({ target }) {
    // Está atualizando o estado da imagem passando um objeto com as propriedades preview e raw.
    setImg({
      preview: URL.createObjectURL(target.files[0]), // Cria uma URL temporária para a imagem.
      raw: target.files[0], // Armazena o arquivo selecionado.
    });
  }

  return (
    <section className={`${styles.photoPost} animaLeft`}>
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Poste sua foto" />

      <form onSubmit={handleSubmit}>
        {/* Está chamando o componente Input e passando as propriedades label, type e name. */}
        {/* O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, onChange, error e as funções validate e onBlur. */}
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />

        {/* Está verificando se o estado loading é verdadeiro, se for, então renderiza o Button com o texto "Enviando..." e desabilita o botão, caso contrário, renderiza o Button com o texto "Enviar" que é o texto padrão. */}
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {/* Está chamando o componente Error e passando a propriedade error que é o erro retornado pela API. */}
        <Error error={error} />
      </form>

      <div>
        {/* Se o estado img.preview for verdadeiro, então renderiza o elemento div com a classe preview. */}
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost; // Exporta o componente UserPhotoPost.
