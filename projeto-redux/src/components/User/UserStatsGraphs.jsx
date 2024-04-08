// Importa a biblioteca React.
import React from "react";

// Importa a biblioteca Victory.
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

// Importa o CSS Module.
import styles from "./UserStatsGraphs.module.css";

// Criado um componente chamado UserStatsGraphs que recebe a props data contendo a resposta da API.
const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]); // Cria um estado chamado graph e uma função atualizadora chamada setGraph para alterar o estado. O estado inicial é um array vazio.
  const [total, setTotal] = React.useState(0); // Cria um estado chamado total e uma função atualizadora chamada setTotal para alterar o estado. O estado inicial é 0.

  // O React.useEffect é executado sempre que o componente for renderizado ou quando data for alterado.
  React.useEffect(() => {
    // O map percorre o array data desestruturando o objeto acessos e retornando um novo objeto com o valor de acessos já convertido para Number.
    const graphData = data.map((item) => {
      return {
        // Passa o valor do title das fotos para x.
        x: item.title,
        // Passa o valor(convertido de string para number) de acessos de cada foto para y.
        y: Number(item.acessos),
      };
    });

    // Altera o valor do estado total para a soma de todos os valores do array data.
    setTotal(
      data
        // O map percorre o array data desestruturando o objeto acessos e retornando o valor de acessos já convertido para Number.
        .map(({ acessos }) => Number(acessos))
        // O reduce soma todos os valores do array, pegando o valor atual e o próximo valor e retornando a soma dos dois. O valor inicial é 0 caso o array esteja vazio.
        .reduce((anterior, proximo) => anterior + proximo, 0),
    );

    setGraph(graphData); // Altera o valor do estado graph para o valor de graphData.
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>

      <div className={styles.graphItem}>
        {/* O VictoryPie recebe a props data que recebe o array data e a props x que recebe o valor de title. */}
        <VictoryPie
          // O data recebe o array graph que contém os valores de x e y.
          data={graph}
          // O innerRadius é usado para criar um gráfico de pizza donut(rosquinha).
          innerRadius={50}
          // O padding é usado para criar um espaçamento entre o gráfico e o container(que é o tamanho do gráfico).
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          // Está estilizando o data que é o gráfico e o labels que são os valores de x e y.
          style={{
            data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 },
            labels: { fontSize: 14, fill: "#333" },
          }}
        />
      </div>

      <div className={styles.graphItem}>
        {/* O VictoryChart é usado para criar um gráfico de barras. */}
        <VictoryChart>
          {/* O VictoryBar recebe a props data que recebe o array graph e a props x que recebe o valor de title. */}
          {/*O alignment="start" é usado para alinhar o gráfico no início do container.*/}
          <VictoryBar data={graph} alignment="start"></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs; // Exporta o componente UserStatsGraphs.
