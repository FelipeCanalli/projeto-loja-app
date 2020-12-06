import * as React from "react";
import { Text, View } from "../components/Themed";
import { Alert, Picker } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConfirmacaoPagamentoScreen from "./ConfirmacaoPagamentoScreen";

const Stack = createStackNavigator();

const db = SQLite.openDatabase("applojadb.banco");

let idc = 0;
let tip = "";
let des = "";
let val = "";
let qpa = 1;
let vpa = "";

export default function Pagamento({ navigation }: { navigation: any }) {
  const [idcli, setIdCli] = React.useState(0);
  const [produtos, setProdutos] = React.useState([]);
  const [tipo, setTipo] = React.useState("Boleto");
  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState(0);
  const [qparcelas, setQparcelas] = React.useState(1);
  const [vparcelas, setVparcelas] = React.useState("");

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select idcli from perfil",
        [],
        (_, { rows: { _array } }) => {
          setIdCli(_array[0].idcli.toString());
          console.log(_array);
        }
      );

      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setProdutos(_array);
        console.log(_array);
      });

      // Fazendo a soma dos valores dos produtos que estão no carrinho
      tx.executeSql(
        "select sum(preco) as total from itens",
        [],
        (_, { rows: { _array } }) => {
          setValor(_array[0].total.toFixed(2).replace(".", ","));
          console.log(_array[0]);
        }
      );
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Picker
        mode="dropdown"
        selectedValue={tipo}
        onValueChange={setTipo}
        // style={estilos.input}
      >
        <Picker.Item label="Boleto" value="Boleto" />
        <Picker.Item label="Crédito" value="Crédito" />
        <Picker.Item label="Débito" value="Débito" />
      </Picker>

      <TextInput
        placeholder="Descrição do pagamento"
        value={descricao}
        onChangeText={(value) => {
          setDescricao(value);
        }}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Valor da compra: R$ {valor}</Text>
      </View>

      <Picker
        selectedValue={qparcelas}
        mode="dialog"
        onValueChange={(parcelas) => {
          setQparcelas(parcelas);
          setVparcelas((parseFloat(valor) / parcelas).toString());
        }}
        //style={estilos.input}
      >
        <Picker.Item label={`1x R$ ${valor} s/juros`} value="1" />

        <Picker.Item
          label={`2x R$ ${(parseFloat(valor) / 2)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="2"
        />
        <Picker.Item
          label={`3x R$ ${(parseFloat(valor) / 3)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="3"
        />
        <Picker.Item
          label={`4x R$ ${(parseFloat(valor) / 4)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="4"
        />
        <Picker.Item
          label={`5x R$ ${(parseFloat(valor) / 5)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="5"
        />
        <Picker.Item
          label={`6x R$ ${(parseFloat(valor) / 6)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="6"
        />
        <Picker.Item
          label={`7x R$ ${(parseFloat(valor) / 7)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="7"
        />
        <Picker.Item
          label={`8x R$ ${(parseFloat(valor) / 8)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="8"
        />
        <Picker.Item
          label={`9x R$ ${(parseFloat(valor) / 9)
            .toFixed(2)
            .replace(".", ",")} s/juros`}
          value="9"
        />
        <Picker.Item
          label={`10x R$ ${(parseFloat(valor) / 10)
            .toFixed(2)
            .replace(".", ",")}  s/juros`}
          value="10"
        />
      </Picker>

      <TouchableOpacity
        onPress={() => {
          // passagens de dados do formuário para as variáveis e depois cadastrar do pagamento
          idc = idcli;
          tip = tipo;
          des = descricao;
          val = valor;
          qpa = qparcelas;
          vpa = vparcelas;
          efetuarPagamento();
          // navigation.navigate("ConfirmacaoPagamento");
        }}
      >
        <Text>Pagar</Text>
      </TouchableOpacity>
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="ConfirmacaoPagamento"
        component={ConfirmacaoPagamentoScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>;
}

function efetuarPagamento() {
  // O fetch vai fazer uma captura/busca de dados de uma API
  fetch("http://192.168.0.23/projeto-app-loja/service/pagamento/cadastro.php", {
    // Passando dados para a API com método POST
    method: "POST",
    // Passando cabeçalhos dizendo que ele tem que aceitar uma aplicação em JSON
    // e o conteúdo que está sendo enviado é JSON
    headers: {
      Accept: "appllication/json",
      "Content-Type": "aplication/json",
    },
    // O corpo que eu estou enviando para lá é no formato de JSON
    body: JSON.stringify({
      // dados da api : let,
      idcli: idc,
      tipo: tip,
      descricao: des,
      valor: val,
      parcelas: qpa,
      valorparcela: vpa,
    }),
  })
    // Então, pegue a resposta vinda da API e transfome em JSON
    // Então, exiba a reposta no console
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Pagamento Efetuado com Sucesso");
    })
    .catch((error) => console.error(error));
  limparCarrinho();
}

function limparCarrinho() {
  db.transaction((tx) => {
    tx.executeSql("delete from itens");
  });
}
