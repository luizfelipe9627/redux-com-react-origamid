// Importa a biblioteca React.
import React from "react";

// Importa os componentes do React Router.
import { Link } from "react-router-dom";

// Importa o CSS Module.
import styles from "./Header.module.css";

// Importa e transforma a imagem em um componente nomeado como Dogs.
import { ReactComponent as Dogs } from "../assets/svg/dogs.svg";

// Importa o hook useSelector do React Redux.
import { useSelector } from "react-redux";

// Criado um componente chamado Header.
const Header = () => {
  const { data } = useSelector((state) => state.user); // Está desestruturando o state.user para pegar a propriedade data. O useSelector é responsável por acessar o estado global da aplicação.

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        {/* O Link é responsável por criar um link para uma rota. */}
        {/* O atributo to é o caminho para a página. */}
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>

        {/* Se o data for verdadeiro, ou seja, se o usuário estiver logado, então renderiza o link para a página de conta, caso contrário, renderiza o link padrão de login. */}
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header; // Exportando o componente Header.
