// Importa a biblioteca React.
import React from "react";

// Importa os componenetes.
import Input from "../Forms/Input";
import Button from "../Forms/Button";

// Importa os hooks.
import useForm from "../../hooks/useForm";

// Importa a action.
import { fetchLoginPasswordLost } from "../../store/loginPasswordLost";

// Importa o helper.
import Error from "../Helper/Error";
import Head from "../Helper/Head";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Criado um componente chamado LoginPasswordLost.
const LoginPasswordLost = () => {
  // Armazena todos os dados(estados, funções etc) do hook useForm na variável login.
  const login = useForm();

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, loading, error } = useSelector(
    (state) => state.loginPasswordLost,
  ); // Está desestruturando o state.loginPasswordLost para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  // Função chamada handleSubmit que recebe o evento como parâmetro e que é responsável por fazer a requisição para a API. O async/await é responsável por esperar a requisição ser feita para depois executar o restante do código.
  async function handleSubmit(event) {
    event.preventDefault(); // Previne que o formulário seja enviado.

    // Se o login for válido, ou seja, se o login não estiver vazio, então executa o if.
    if (login.validate()) {
      // O dispatch executa a action loginPasswordLost passando o login e a url como parâmetros. Sendo responsável por realizar a requisição à API e enviar o email de recuperação de senha.
      dispatch(
        fetchLoginPasswordLost({
          // Está armazenando o valor do input login na propriedade login.
          login: login.value,
          // Está armazenando a url atual na propriedade url e substituindo a palavra perdeu por resetar.
          url: window.location.href.replace("perdeu", "resetar"),
        }),
      );
    }
  }

  return (
    <section className="animeLeft">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Perdeu a senha" />

      <h1 className="title">Perdeu a senha?</h1>
      {/* Se data for verdadeiro, ou seja, se a resposta da API for verdadeira, então mostra o parágrafo com o valor da resposta da API, caso contrário, mostra o formulário. */}
      {data ? (
        <p style={{ color: "#4C1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Está chamando o componente Input e passando as props label, type e name. */}
          {/* O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, setValue, onChange, error, validate e onBlur. */}
          <Input label="Email / Usuário" type="text" name="login" {...login} />

          {/* Se loading for true, então o botão ficará desabilitado, caso contrário, o botão ficará habilitado. */}
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}
      {/* Chama o componente Error e passando a props error que contém o erro retornado pela API. */}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost; // Exportando o componente LoginPasswordLost.
