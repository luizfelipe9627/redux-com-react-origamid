// Importa a biblioteca React.
import React from "react";

// Importa o componenete.
import Input from "../Forms/Input";
import Button from "../Forms/Button";

// Importa o hook.
import useForm from "../../hooks/useForm";

// Importa a API.
import { PASSWORD_RESET } from "../../Api";

// Importa o componente do React Router DOM.
import { useNavigate } from "react-router-dom";

// Importa o helper.
import Error from "../Helper/Error";
import Head from "../Helper/Head";

// Importa a action.
import { fetchLoginPasswordReset } from "../../store/loginPasswordReset";

// Importa o useDispatch e useSelector do react-redux.
import { useSelector, useDispatch } from "react-redux";

// Criado um componente chamado LoginPasswordReset.
const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState(""); // Cria um estado chamado login e uma função chamada setLogin que atualiza o estado login. O valor inicial do estado login é uma string vazia.
  const [key, setKey] = React.useState(""); // Cria um estado chamado key e uma função chamada setKey que atualiza o estado key. O valor inicial do estado key é uma string vazia.

  const navigate = useNavigate(); // Armazena na variável navigate todas as funções de navegação, sendo elas: navigate, goBack, goForward e canGo.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  // Armazena todos os dados(estados, funções etc) do hook useForm na variável password.
  const password = useForm("password");

  const { data, loading, error } = useSelector(
    (state) => state.loginPasswordReset,
  ); // Está desestruturando o state.user para pegar a propriedade data e loading. O useSelector é responsável por acessar o estado global da aplicação.

  // O useEffect é executado sempre que a página é carregada/recarregada, pois a array de dependências está vazia.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Cria uma constante chamada params que cria um novo objeto URLSearchParams que contém a query string da URL atual.
    const key = params.get("key"); // Cria uma constante chamada key que recebe o valor da chave key da query string da URL atual.
    const login = params.get("login"); // Cria uma constante chamada login que recebe o valor da chave login da query string da URL atual.

    // Se key for verdeiro, ou seja se tiver algum valor, executa o if.
    if (key) {
      setKey(key); // Altera o estado key com o valor da constante key.
    }
    // Se login for verdeiro, ou seja se tiver algum valor, executa o if.
    if (login) {
      setLogin(login); // Altera o estado login com o valor da constante login.
    }
  }, []);

  // Função chamada handleSubmit que recebe o evento como parâmetro e que é responsável por fazer a requisição para a API. O async/await é responsável por esperar a requisição ser feita para depois executar o restante do código.
  async function handleSubmit(event) {
    event.preventDefault(); // Previne que o formulário seja enviado.

    // Se o password for válido, ou seja, se o password não estiver vazio, então executa o if.
    if (password.validate()) {
      dispatch(fetchLoginPasswordReset({ login, key, password })); // Dispara a action fetchLoginPasswordReset que é responsável por fazer o reset da senha. A action recebe um objeto contendo login, key e password como parâmetro.
    }
  }

  // O useEffect é executado sempre que a variável data ou o navigate mudar.
  React.useEffect(() => {
    // Se data for verdadeiro, ou seja, se existir algum dado, então executa o if.
    if (data) {
      navigate("/login"); // Navega para a página de login.
    }
  }, [data, navigate]);

  return (
    <section className="animeLeft">
      {/* Chama o componente Head e passa a props title que é usada para mudar o título da página. */}
      <Head title="Resete a sonta" />

      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        {/* Está chamando o componente Input e passando as props label, type e name. */}
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          // O operador spread(...) está dando acesso a todas as props do hook useForm, sendo elas: value, setValue, onChange, error, validate e onBlur.
          {...password}
        />

        {/* Se loading for true, então o botão ficará desabilitado, caso contrário, o botão ficará habilitado. */}
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      {/* Chama o componente Error e passando a props error que contém o erro retornado pela API. */}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset; // Exportando o componente LoginPasswordReset.
