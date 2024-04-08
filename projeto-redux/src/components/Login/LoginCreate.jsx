// Importa a biblioteca React.
import React from "react";

// Importa o componente.
import Input from "../Forms/Input";
import Button from "../Forms/Button";

// Importa o hook.
import useForm from "../../hooks/useForm";

// Importa o helper.
import Error from "../Helper/Error";
import Head from "../Helper/Head";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Importa as actions.
import { userLogin } from "../../store/user";
import { fetchLoginCreate } from "../../store/loginCreate";

// Criado um componente chamado LoginCreate.
const LoginCreate = () => {
  // Armazena todos os dados(estados, funções etc) do hook useForm nas variáveis username, email e password.
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const { data, loading, error } = useSelector((state) => state.loginCreate); // Está desestruturando o state.loginCreate para pegar a propriedade data, loading e error. O useSelector é responsável por acessar o estado global da aplicação.

  // Criado uma função chamada handleSubmit responsável por fazer o envio dos dados do formulário para a API. O async faz com que a função espere a resposta da API para continuar o código.
  async function handleSubmit(event) {
    event.preventDefault(); // Impede que o formulário seja enviado e a página seja recarregada.

    // Dispara a função loginCreate que é responsável por criar o usuário e passando como parâmetro um objeto que é o payload da action, definindo o username, email e password.
    dispatch(
      fetchLoginCreate({
        username,
        email,
        password,
      }),
    );
  }

  // O useEffect é um hook do React que serve para executar efeitos colaterais em componentes funcionais, ele irá executar a função passada como primeiro parâmetro toda vez que a data, dispatch, username ou password mudar.
  React.useEffect(() => {
    // Se o estado data for verdadeiro, ou seja, se o usuário for criado com sucesso, executa o if e redireciona o usuário para a rota de minha conta.
    if (data) {
      // Dispacha a função userLogin que é responsável por fazer o login do usuário e passando como parâmetros um objeto que é o payload da action, definindo o username e o password.
      dispatch(
        userLogin({ username: username.value, password: password.value }),
      );
    }
  }, [data, dispatch, username, password]);

  return (
    <section className="animeLeft">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Crie sua conta" />

      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        {/* Está chamando o componente Input e passando as props label, type e name. */}
        {/* O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, setValue, onChange, error, validate e onBlur. */}
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />

        {/* Se o estado loading for true, executa o if e exibe o texto "Cadastrando...". Se o estado loading for false, executa o else e exibe o texto "Cadastrar". */}
        {loading ? (
          // Está chamando o componente Button e passando a props disabled que recebe o texto Cadastrando....
          <Button disabled>Cadastrando...</Button>
        ) : (
          // Está chamando o componente Button e passando a props children que recebe o texto Cadastrar.
          <Button>Cadastrar</Button>
        )}
        {/* Está chamando o componente Error e passando a props error que recebe o estado error que armazena a mensagem de erro da API. */}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate; // Exportando o componente LoginCreate.
