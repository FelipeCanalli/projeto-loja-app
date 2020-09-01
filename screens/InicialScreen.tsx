import * as React from "react";
import { Text, View } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";

export default function Inicial() {
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
          style={estilos.imagem}
        />
        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Image source={require("../assets/images/mousepad1.png")} />
                <Text>
                  {item.nomeproduto} | {item.preco}
                </Text>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    width: "100%",
  },
});
