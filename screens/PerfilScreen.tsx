import * as React from "react";
import { Text, View } from "../components/Themed";

import * as SQLite from "expo-sqlite";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const db = SQLite.openDatabase("applojadb.banco");

export default function Perfil() {
  const [perfil, setPerfil] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setPerfil(_array);
      });
    });
  }, []);
  return (
    <View style={tela.caixa}>
      <Text> Seu perfil </Text>
      {perfil.map(
        ({
          idcli,
          nomeusuario,
          foto,
          nomecli,
          cpf,
          sexo,
          email,
          telefone,
          tipo,
          logradouro,
          numero,
          complemento,
          bairro,
          cep,
        }) => (
          <View style={tela.dados}>
            <Image
              style={tela.img}
              source={{
                uri: `http://192.168.0.23/projeto-app-loja/img/${foto}`,
              }}
            />
            <Text style={tela.textDados}>ID: {idcli}</Text>
            <Text style={tela.textDados}>Usuario: {nomeusuario}</Text>
            <Text style={tela.textDados}>Nome: {nomecli}</Text>
            <Text style={tela.textDados}>CPF: {cpf}</Text>
            <Text style={tela.textDados}>Sexo: {sexo}</Text>
            <Text style={tela.textDados}>Email: {email}</Text>
            <Text style={tela.textDados}>Telefone: {telefone}</Text>
            <Text style={tela.textDados}>
              Endereço: {tipo} {logradouro}, {numero}
            </Text>
            <Text style={tela.textDados}>Complemento: {complemento}</Text>
            <Text style={tela.textDados}>Bairro: {bairro}</Text>
            <Text style={tela.textDados}>CEP: {cep}</Text>
          </View>
        )
      )}
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity>
          <Text style={tela.link}>Atualizar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={tela.link}>Sair do Aplicativo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const tela = StyleSheet.create({
  caixa: {
    flex: 1,
    margin: 10,
  },
  img: {
    width: 200,
    height: 200,
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    resizeMode: "contain",
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
  dados: {
    margin: 20,
    paddingVertical: 30,
    paddingHorizontal: 70,
    marginRight: "auto",
    marginLeft: "auto",
    borderStyle: "dashed",
    borderColor: "#7e57c2",
    borderWidth: 4,
    borderRadius: 1,
  },
  textDados: {
    fontSize: 15,
    paddingVertical: 3,
  },
});
