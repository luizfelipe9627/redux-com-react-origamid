// Importa a biblioteca React.
import React from "react";

// Importa o componente da biblioteca React Router DOM.
import { Routes, Route, Navigate } from "react-router-dom";

// Importa o componente.
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import NotFound from "../NotFound";

// Importa os CSS Modules.
import styles from "./Login.module.css";

// Importa o helper.
import Head from "../Helper/Head";

// Importa o hook useSelector do React Redux.
import { useSelector } from "react-redux";
import Loading from "../Helper/Loading";

// Criado um componente chamado Login.
const Login = () => {
  // Chama o componente Head e passa as props title e description que são usadas para mudar o título da página e a descrição da página.
  <Head title="Fotos" description="Home do site Dogs, com o feed de fotos." />;

  const { data, loading } = useSelector((state) => state.user); // Está desestruturando o state.user para pegar a propriedade data e loading. O useSelector é responsável por acessar o estado global da aplicação.

  if (loading) return <Loading />; // Se a propriedade loading for verdadeira, ou seja, se estiver carregando, renderiza o componente Loading.

  if (data) return <Navigate to="/conta" />; // Se a propriedade data for verdadeira, ou seja, se o usuário estiver logado, redireciona o usuário para a rota de minha conta.

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        {/* O Routes é o componente que vai conter todas as rotas da aplicação. */}
        <Routes>
          {/* O Route é o componente que vai conter cada rota da aplicação. */}
          {/* O path é o caminho da rota. */}
          {/* O element é o componente que vai ser renderizado quando a rota for acessada. */}

          {/* Renderiza o componente LoginForm quando a rota: / for acessada, ou seja, a rota raiz. */}
          <Route path="/" element={<LoginForm />} />

          {/* Renderiza o componente LoginCreate quando a rota: /cirar for acessada. */}
          <Route path="criar" element={<LoginCreate />} />

          {/* Renderiza o componente LoginPasswordLost quando a rota: /perdeu for acessada. */}
          <Route path="perdeu" element={<LoginPasswordLost />} />

          {/* Renderiza o componente LoginPasswordReset quando a rota: /resetar for acessada. */}
          <Route path="resetar" element={<LoginPasswordReset />} />

          {/* Renderiza o componente NotFound quando nenhuma rota for acessada. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login; // Exportando o componente Login.
