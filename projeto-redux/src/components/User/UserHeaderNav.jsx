// Importa a biblioteca React.
import React from "react";

// Importa o componente da biblioteca React Router DOM.
import { useNavigate, NavLink, useLocation } from "react-router-dom";

// Importa as imagens.
import { ReactComponent as MinhasFotos } from "../../assets/svg/feed.svg";
import { ReactComponent as Estatisticas } from "../../assets/svg/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../assets/svg/adicionar.svg";
import { ReactComponent as Sair } from "../../assets/svg/sair.svg";

// Importa o CSS Module.
import styles from "./UserHeaderNav.module.css";

// Importa o hook.
import useMedia from "../../hooks/useMedia";

// Importa o hook useDispatch do React Redux.
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/user";

// Criado um componente chamado UserHeaderNav.
const UserHeaderNav = () => {
  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const mobile = useMedia("(max-width: 40rem)"); // chamado o hook useMedia passando como parâmetro o tamanho máximo da tela do dispositivo e armazenando na variável mobile.

  const [mobileMenu, setMobileMenu] = React.useState(false); // Cria um estado chamado mobileMenu, e a função setMobileMenu para alterar o estado. O valor inicial do estado é false.

  const navigate = useNavigate(); // Armazena a função useNavigate da biblioteca React Router DOM na variável navigate. O useNavigate é responsável por fazer a navegação entre as páginas.

  // Criado uma função chamada handleLogout responsável por fazer o logout do usuário.
  function handleLogout() {
    dispatch(userLogout()); // Está despachando a ação userLogout que é responsável por fazer o logout do usuário, limpando os dados do usuário e o token do usuário.
    navigate("/login"); // Quando o usuário fizer o logout, é redirecionado para a página /login.
  }

  const { pathname } = useLocation(); // Desestrutura o retorno da função useLocation e pega a propriedade pathname que é a rota atual e armazena na variável pathname.

  // O useEffect executará uma função toda vez que o pathname for alterado.
  React.useEffect(() => {
    setMobileMenu(false); // Quando o pathname for alterado, então o estado mobileMenu recebe false, o que faz com que o menu mobile seja fechado.
  }, [pathname]); // O useEffect será executado toda vez que o pathname for alterado.

  return (
    <React.Fragment>
      {/* Se o mobile for true, então renderiza o button, caso contrário, renderiza null(nada). */}
      {mobile && (
        <button
          aria-label="Menu"
          // Está adicionando a classe mobileButtonActive no button quando o estado mobileMenu for true.
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          // Adicionado um evento de click no button, e quando o evento for disparado, chamado a função setMobileMenu passando como parâmetro o contrário do valor atual do estado mobileMenu, ou seja, se o valor atual do estado mobileMenu for true, então o valor passado para a função setMobileMenu será false, e vice-versa.
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      {/* Se o mobile for true, adiciona a classe mobileMenuActive na nav, caso contrário, deixa a classe nav(padrão). */}
      {/* Se o mobileMenu for true, então adiciona a classe navMobileActive na nav. */}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        {/* O NavLink é responsável por adicionar uma classe ao link quando ele estiver ativo, ou seja, quando a rota for acessada. */}
        {/* Está inserindo um componente dentro de cada NavLink, responsável por renderizar as imagens. */}
        {/* O end serve para quando for clicado no NavLink, ele passe a classe active para o NavLink que foi clicado, e remova a classe active dos outros NavLink. */}
        <NavLink to="/conta" end>
          <MinhasFotos />
          {/* Se o mobile for true, então renderiza o texto "Minhas fotos", caso contrário, renderiza null(nada). */}
          {mobile && "Minhas fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas />
          {/* Se o mobile for true, então renderiza o texto "Estatísticas", caso contrário, renderiza null(nada). */}
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarFoto />
          {/* Se o mobile for true, então renderiza o texto "Adicionar foto", caso contrário, renderiza null(nada). */}
          {mobile && "Adicionar foto"}
        </NavLink>
        <button onClick={handleLogout}>
          <Sair />
          {/* Se o mobile for true, então renderiza o texto "Sair", caso contrário, renderiza null(nada). */}
          {mobile && "Sair"}
        </button>
      </nav>
    </React.Fragment>
  );
};

export default UserHeaderNav; // Exporta o componente UserHeaderNav.
