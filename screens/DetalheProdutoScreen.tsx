import * as React from "react";
import { ActivityIndicator, Alert, Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import * as SQLite from "expo-sqlite";

export default function DetalheProduto({ route }) {
  const { idproduto } = route.params;
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://192.168.0.23/projeto-app-loja/service/produto/detalheproduto.php?idproduto=${idproduto}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) => console.error(`Erro: ${error}`))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      {carregado ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{
                  uri: `http://192.168.0.23/projeto-app-loja/img/${item.foto1}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.23/projeto-app-loja/img/${item.foto2}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.23/projeto-app-loja/img/${item.foto3}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.23/projeto-app-loja/img/${item.foto4}`,
                }}
                style={tela.img}
              />
              <Text style={tela.titulo}>{item.nomeproduto}</Text>
              <Text style={tela.descricao}>{item.descricao}</Text>
              <Text style={tela.preco}>R${item.preco}</Text>

              <TouchableOpacity
                onPress={() => {
                  adicionarAoCarrinho(
                    `${idproduto}`,
                    `${item.nomeproduto}`,
                    `${item.preco}`,
                    `${item.foto1}`
                  );
                }}
                style={tela.link}
              >
                <Text style={{ color: "white" }}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
    flex: 1,
  },
  link: {
    padding: 10,
    margin: 10,
    backgroundColor: "#7e57c2",
    color: "white",
    borderRadius: 5,
    width: 160,
  },
  titulo: {},
  descricao: {},
  preco: {},
});

// Fazer a constante do banco de dados. Vamos chamar de db

const db = SQLite.openDatabase("applojadb.banco");

function adicionarAoCarrinho(idproduto, nomeproduto, preco, foto1) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists itens(id integer primary key,idproduto int, nomeproduto text, preco text, foto text);"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "insert into itens(idproduto,nomeproduto, preco,foto)values(?,?,?,?)",
      [idproduto, nomeproduto, preco, foto1]
    );

    //tx.executeSql("drop table itens");

    tx.executeSql("select * from itens", [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
  });
}
