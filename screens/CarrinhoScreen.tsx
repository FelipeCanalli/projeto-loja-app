import * as React from "react";
import { Text, View } from "../components/Themed";

import * as SQLite from "expo-sqlite";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Reponsável pelo empilhamento de telas
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PagamentoScreen from "./PagamentoScreen";

const db = SQLite.openDatabase("applojadb.banco");

const Stack = createStackNavigator();

export default function Carrinho({ navigation }: { navigation: any }) {
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setDados(_array);
      });
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={tela.title}> Veja o que tem no carrinho </Text>
      {dados.map(({ id, idproduto, nomeproduto, preco, foto }) => (
        <View key={id} style={{ margin: 20 }}>
          <Image
            source={{
              uri: `http://192.168.0.23/projeto-app-loja/img/${foto}`,
            }}
            style={tela.img}
          />
          <Text>Produto: {nomeproduto}</Text>
          <Text>Preço: R$ {preco.replace(".", ",")}</Text>

          <TouchableOpacity>
            <Text
              style={tela.link2}
              onPress={() => {
                db.transaction((tx) => {
                  tx.executeSql("delete from itens where id = ?", [id]);
                });
              }}
            >
              Remover do Carrinho
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("Pagamento")}>
        <Text style={tela.link}>Ir para pagamento</Text>
      </TouchableOpacity>
    </View>
  );
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Pagamento" component={PagamentoScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const tela = StyleSheet.create({
  img: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginRight: "auto",
    marginLeft: "auto",
    margin: 10,
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
  link3: {
    margin: 10,
    backgroundColor: "#7e57c2",
    color: "white",
    borderRadius: 5,
    width: 40,
    height: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
  },
});
