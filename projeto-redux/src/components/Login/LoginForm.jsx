// Importa a biblioteca React.
import React from "react";

// Importa o componente da biblioteca React Router DOM.
import { Link } from "react-router-dom";

// Importa os componentes.
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

// Importa os CSS Modules.
import styles from "./LoginForm.module.css";
import stylesButton from "../Forms/Button.module.css";

// Importa o hook.
import useForm from "../../hooks/useForm";

// Importa o helper.
import Head from "../Helper/Head";

// Importa o hook useSelector e useDispatch do React Redux.
import { useSelector, useDispatch } from "react-redux";

// Importa a action.
import { userLogin } from "../../store/user";

// Criado um componente chamado LoginForm.
const LoginForm = () => {
  // Armazena todos os dados(estados, funções etc) do hook useForm nas variáveis username e password.
  const username = useForm();
  const password = useForm();

  const token = useSelector((state) => state.token); // O useSelector é uma função que recebe um parâmetro que é o estado da store, e retorna a propriedade token do estado global da aplicação.

  const user = useSelector((state) => state.user); // O useSelector é uma função que recebe um parâmetro que é o estado da store, e retorna a propriedade user do estado global da aplicação.

  const loading = token.loading || user.loading; // Se o estado loading do token ou do user for true, a variável loading recebe true, senão, recebe false.

  const error = token.error || user.error; // Se o estado error do token ou do user for true, a variável error recebe true, senão, recebe false.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  // Criado uma função chamada handleSubmit responsável por fazer o envio dos dados do formulário para a API. O async faz com que a função espere a resposta da API para continuar o código.
  async function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário, que é recarregar a página quando o formulário é enviado.

    // Se o username e o password forem válidos, ou seja, se o formulário estiver válido, executa o if e faz a requisição para a API.
    if (username.validate() && password.validate()) {
      // O dispatch executa a função userLogin que é responsável por logar o usuário, passando como parâmetros um objeto que é o payload da action, definindo o username e o password.
      dispatch(
        userLogin({ username: username.value, password: password.value }),
      );
    }
  }

  return (
    <section className="animeLeft">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Login" />

      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Está chamando o componente Input e passando as props label, type e name. */}
        {/* O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, setValue, onChange, error, validate e onBlur. */}

        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />

        {/* Se o estado loading for true, mostra o botão desabilitado, senão, mostra o botão habilitado entrar. */}
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}

        {/* Está chamando o componente Error e passando a props error que recebe o estado error da store. */}
        <Error error={error} />
      </form>

      {/* O Link é responsável por criar um link para uma rota e o to é responsável por definir a rota. */}
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>

        {/* O Link é responsável por criar um link para uma rota e o to é responsável por definir a rota. */}
        <Link className={stylesButton.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm; // Exportando o componente LoginForm.
