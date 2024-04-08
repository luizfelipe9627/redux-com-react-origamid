// Importa a biblioteca React.
import React from "react";

// Importa os componentes.
import UserHeaderNav from "./UserHeaderNav";

// Importa o CSS Module.
import styles from "./UserHeader.module.css";

// Importa o componente da biblioteca react-router-dom.
import { useLocation } from "react-router-dom";

// Criado um componente chamado UserHeader.
const UserHeader = () => {
  const [title, setTitle] = React.useState(""); // Cria um estado chamado title e uma função atualizadora chamada setTitle. O valor inicial é uma string vazia.
  
  const { pathname } = useLocation(); // Desestrutura o useLocation pega o que está dentro do pathname e atribui a variável pathname.

  // Executa o useEffect quando o componente for montado e quando o location.pathname(que é o caminho da URL) for alterado.
  React.useEffect(() => {
    // Faz um switch para verificar qual é o pathname e atribui um título para cada um.
    switch (pathname) {
      case "/conta/estatisticas":
        setTitle("Estatísticas"); // Atribui ao estado title o valor "Estatísticas".
        break;
      case "/conta/postar":
        setTitle("Poste Sua Foto"); // Atribui ao estado title o valor "Poste Sua Foto".
        break;
      default:
        setTitle("Minha Conta"); // Atribui ao estado title o valor "Minha Conta".
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader; // Exporta o componente UserHeader.
