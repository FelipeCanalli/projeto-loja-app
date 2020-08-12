import * as React from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";

import { Text, View } from "../components/Themed";

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Carregando os dados da api usando a função fetch
  useEffect(() => {
    // Faça a captura, faça o fetch, faça a busca dessa url
    fetch("http://192.168.0.23/projeto-app-loja/service/produto/listar.php")
      // Então, response (dados que ele conseguiu coletar), falando que serão
      // trabalhados no formato de JSON
      .then((response) => response.json())
      // Mandando essa saida (que está dentro da resposta dessa requisição) para dentro da const data
      .then((produto) => setData(produto.saida))
      // Catch para capturar algum erro
      .catch((e) => console.error(e))
      // A aplicação não está mais carregando
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* Está ainda no processo de carregamento ? */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text>
              {item.nomeproduto} {item.preco} {item.descricao}
            </Text>
          )}
          // Passando id do produto como key. O KeyExtractor o id que vai ajudar
          // na localização e organização dos dados
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
