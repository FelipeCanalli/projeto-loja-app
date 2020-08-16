import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Alert, Image } from "react-native";
import CadastrarScreen from "../screens/CadastrarScreen";
import { NavigationContainer } from "@react-navigation/native";
// Reponsável pelo empilhamento de telas
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Login({ navigation }: { navigation: any }) {
  return (
    <View style={estilos.background}>
      <Image
        source={require("../assets/images/logo.png")}
        style={estilos.logo}
      />
      <View style={estilos.caixa}>
        <TextInput style={estilos.acesso} placeholder="Usuário" />
        <TextInput style={estilos.acesso} secureTextEntry placeholder="Senha" />
        <TouchableOpacity style={estilos.btnLogar} onPress={logar}>
          <Text style={estilos.txtLogar}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.btnCadastrar}
          onPress={() => navigation.navigate("Cadastrar")}
        >
          <Text style={estilos.txtCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Cadastrar" component={CadastrarScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilos = StyleSheet.create({
  background: {
    // backgroundColor: "#ffab91",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  caixa: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#ffff",
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 80,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  acesso: {
    backgroundColor: "white",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    height: 50,
    padding: 15,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },
  btnLogar: {
    justifyContent: "center",
    marginTop: 30,
    width: "70%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#64b5f6",
  },
  btnCadastrar: {
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    width: "70%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#64b5f6",
    borderWidth: 1,
  },
  txtLogar: {
    textAlign: "center",
    fontWeight: "100",
    color: "white",
    fontSize: 20,
  },
  txtCadastrar: {
    textAlign: "center",
    fontWeight: "100",
    color: "#64b5f6",
    fontSize: 20,
  },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function logar() {
  fetch("http://192.168.0.23/projeto-app-loja/service/usuario/login.php", {
    method: "POST",
    headers: {
      Accept: "appllication/json",
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({
      nomeusuario: "felipegalvao",
      senha: "123",
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Olhe o console");
    })
    .catch((error) => console.error(error));
}
