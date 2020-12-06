import * as React from "react";
import { Text, View } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import NumberFormat from "react-number-format"; // npm i react-number-format
import DetalheProduto from "./DetalheProdutoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "../navigation";

const Stack = createStackNavigator();

export default function Inicial() {
  return (
    <Stack.Navigator initialRouteName="Produtos">
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="DetalheProduto" component={DetalheProduto} />
    </Stack.Navigator>
  );
}

function Produtos({ navigation }) {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  // Carregar a api com os dados do banco de dados
  // Executar a consulta listartelainicial

  React.useEffect(() => {
    fetch(
      "http://192.168.0.23/projeto-app-loja/service/produto/listartelainicial.php"
    )
      // Então, vamos transformar a resposta em JSON
      .then((response) => response.json())
      // Então, vamos dizer que tudo o que está vindo são produtos e colocar eles em setDados
      .then((produtos) => setDados(produtos.saida))
      .catch((error) => console.error(error))
      // Finalizando interrompendo o carregamento
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      <ScrollView>
        <Image
          source={require("../assets/images/produtos.png")}
          style={tela.img}
        />
        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{
                    uri: `http://192.168.0.23/projeto-app-loja/img/${item.foto}`,
                  }}
                  style={tela.imgProduto}
                />
                <Text> {item.nomeproduto}</Text>
                <Text> R$ {item.preco.replace(".", ",")}</Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DetalheProduto", {
                      idproduto: `${item.idproduto}`,
                    });
                  }}
                >
                  <Text style={tela.link}>Saiba mais</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    width: "100%",
  },
  imgProduto: {
    width: 200,
    height: 200,
    flex: 1,
    resizeMode: "contain",
  },
  link: {
    padding: 10,
    margin: 10,
    backgroundColor: "#7e57c2",
    color: "white",
    borderRadius: 5,
    width: 100,
  },
});
