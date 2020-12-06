import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Alert, Image } from "react-native";
import CadastrarScreen from "../screens/CadastrarScreen";
import { NavigationContainer } from "@react-navigation/native";
// Reponsável pelo empilhamento de telas
import { createStackNavigator } from "@react-navigation/stack";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("applojadb.banco");

const Stack = createStackNavigator();

let us = "";
let sh = "";

export default function Login({ navigation }: { navigation: any }) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  return (
    <View style={estilos.background}>
      <Image
        source={require("../assets/images/logo.png")}
        style={estilos.logo}
      />
      <View style={estilos.caixa}>
        {/* Mandando dados para as constantes quando houver uma alteração de texto */}
        <TextInput
          style={estilos.acesso}
          placeholder="Usuário"
          onChangeText={(value) => setUsuario(value)}
          value={usuario}
          keyboardType="visible-password"
        />
        <TextInput
          style={estilos.acesso}
          secureTextEntry
          placeholder="Senha"
          onChangeText={(value) => setSenha(value)}
          value={senha}
        />
        <TouchableOpacity
          style={estilos.btnLogar}
          onPress={() => {
            if (usuario == "" || senha == "") {
              Alert.alert("Atenção", "Prencha os campos");
            } else {
              us = usuario;
              sh = senha;
              logar();
            }
          }}
        >
          <Text style={estilos.txtLogar}>Entrar</Text>
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
  // O fetch vai fazer uma captura/busca de dados de uma API
  fetch("http://192.168.0.23/projeto-app-loja/service/usuario/login.php", {
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
      nomeusuario: us,
      senha: sh,
    }),
  })
    // Então, pegue a resposta vinda da API e transfome em JSON
    // Então, exiba a reposta no console
    .then((response) => response.json())
    .then((resposta) => {
      gravarPerfil(resposta.saida[0]);
      Alert.alert("Olhe na tela de console");
    })
    .catch((error) => console.error(error));
}

function gravarPerfil(dados) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists perfil(id integer primary key,idusuario int , nomeusuario text , foto text , idcli int , nomecli text, cpf text, sexo text, email text, telefone text, tipo text, logradouro text, numero text, complemento text, bairro text, cep text , logado);"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "insert into perfil (idusuario , nomeusuario , foto , idcli , nomecli , cpf , sexo , email , telefone , tipo , logradouro , numero , complemento , bairro , cep , logado) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        dados.idusuario,
        dados.nomeusuario,
        dados.foto,
        dados.idcli,
        dados.nomecli,
        dados.cpf,
        dados.sexo,
        dados.email,
        dados.telefone,
        dados.tipo,
        dados.logradouro,
        dados.numero,
        dados.complemento,
        dados.bairro,
        dados.cep,
        1,
      ]
    );

    tx.executeSql("select * from perfil", [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
  });
}
