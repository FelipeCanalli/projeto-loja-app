import * as React from "react";
import { Text, View } from "../components/Themed";

import * as SQLite from "expo-sqlite";
import { Image, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const db = SQLite.openDatabase("applojadb.banco");

export default function Carrinho() {
  const [dados, setDados] = React.useState([]);
  const [quantidade, setQuantidade] = React.useState("1");

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setDados(_array);
      });
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={tela.title}> Veja o que tem no carrinho </Text>
      {dados.map(({ id, idproduto, nomeproduto, preco, foto }) => (
        <View style={{ flex: 1, margin: 19 }}>
          <Image
            source={{
              uri: `http://192.168.0.23/projeto-app-loja/img/${foto}`,
            }}
            style={tela.img}
          />
          <Text>Produto: {nomeproduto}</Text>
          <Text>Preço: {preco}</Text>
          <Text>Quantidade: </Text>
          <TextInput
            keyboardType="decimal-pad"
            value={quantidade}
            onChangeText={(value) => setQuantidade(value)}
          />

          <TouchableOpacity>
            <Text style={tela.link2}>Remover do Carrinho</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity>
        <Text style={tela.link}>Ir para pagamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
  link: {
    padding: 10,
    margin: 10,
    backgroundColor: "#7e57c2",
    color: "white",
    borderRadius: 5,
    width: 160,
    textAlign: "center",
  },
  link2: {
    color: "#e17575",
    fontSize: 11,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
  },
});
