import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { Picker, StyleSheet, Alert } from "react-native";

// Váriaveis globais
let ft = "padrao.jpg";
let nome = "";
let cpf = "";
let sx = "";
let us = "";
let sh = "";
let cf = "";
let em = "";
let tel = "";
let tp = "";
let lg = "";
let nu = "";
let cp = "";
let ba = "";
let cep = "";

export default function Cadastrar() {
  const [foto, setFoto] = React.useState("");
  const [nomecli, setNomecli] = React.useState("");
  const [cpfcli, setCPFcli] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmar, setConfirmar] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [logradouro, setLogradouro] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [cepcli, setCEPcli] = React.useState("");

  return (
    <View style={estilos.background}>
      <ScrollView>
        {/* ==============================  inicio da caixa ============================== */}
        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Dados Pessoais</Text>
          <TextInput
            placeholder="Nome Completo"
            style={estilos.input}
            onChangeText={(value) => setNomecli(value)}
            value={nomecli}
          />
          <TextInput
            placeholder="CPF"
            keyboardType="numeric"
            style={estilos.input}
            onChangeText={(value) => setCPFcli(value)}
            value={cpfcli}
          />
          <Picker
            mode="dropdown"
            selectedValue={sexo}
            onValueChange={setSexo}
            style={estilos.input}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
          </Picker>
        </View>

        {/* ======================================================================================== */}

        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Acesso</Text>
          <TextInput
            placeholder="Usuário"
            style={estilos.input}
            onChangeText={(value) => setUsuario(value)}
            value={usuario}
            keyboardType="visible-password"
          />
          <TextInput
            secureTextEntry
            placeholder="Senha"
            style={estilos.input}
            onChangeText={(value) => setSenha(value)}
            value={senha}
          />
          <TextInput
            secureTextEntry
            placeholder="Confirme sua senha"
            style={estilos.input}
            onChangeText={(value) => setConfirmar(value)}
            value={confirmar}
          />
        </View>

        {/* ======================================================================================== */}

        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Contato</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={estilos.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            placeholder="Telefone"
            keyboardType="phone-pad"
            style={estilos.input}
            onChangeText={(value) => setTelefone(value)}
            value={telefone}
          />
        </View>

        {/* ======================================================================================== */}

        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Endereço</Text>
          <Picker
            mode="dropdown"
            selectedValue={tipo}
            onValueChange={setTipo}
            style={estilos.input}
          >
            <Picker.Item label="Rua" value="Rua" />
            <Picker.Item label="Avenida" value="Avenida" />
            <Picker.Item label="Alameda" value="Alameda" />
            <Picker.Item label="Praça" value="Praça" />
          </Picker>
          <TextInput
            placeholder="Logradouro"
            style={estilos.input}
            onChangeText={(value) => setLogradouro(value)}
            value={logradouro}
          />
          <TextInput
            placeholder="Número"
            keyboardType="numeric"
            style={estilos.input}
            onChangeText={(value) => setNumero(value)}
            value={numero}
          />
          <TextInput
            placeholder="Complemento"
            style={estilos.input}
            onChangeText={(value) => setComplemento(value)}
            value={complemento}
          />
          <TextInput
            placeholder="Bairro"
            style={estilos.input}
            onChangeText={(value) => setBairro(value)}
            value={bairro}
          />
          <TextInput
            placeholder="CEP"
            keyboardType="numeric"
            style={estilos.input}
            onChangeText={(value) => setCEPcli(value)}
            value={cepcli}
          />
        </View>

        {/* ======================================================================================== */}

        <TouchableOpacity
          style={estilos.btnCadastrar}
          onPress={() => {
            // let = const;
            ft = foto;
            us = usuario;
            sh = senha;
            nome = nomecli;
            cpf = cpfcli;
            sx = sexo;
            em = email;
            tel = telefone;
            tp = tipo;
            lg = logradouro;
            nu = numero;
            cp = complemento;
            ba = bairro;
            cep = cepcli;

            efetuarCadastro();
          }}
        >
          <Text style={estilos.txtCadastrar}>Cadastrar</Text>
        </TouchableOpacity>

        {/* ==============================  fim da caixa ============================== */}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  caixa: {
    borderColor: "silver",
    borderWidth: 1,
    borderRadius: 10,
    margin: 30,
    padding: 20,
  },
  titulo: {
    marginHorizontal: 22,
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 2,
    color: "black",
    borderBottomColor: "black",
  },
  input: {
    width: "90%",
    height: 50,
    fontSize: 15,
    padding: 8,
    margin: 2,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomWidth: 2,
    borderBottomColor: "silver",
    color: "silver",
  },
  btnCadastrar: {
    backgroundColor: "white",
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
  txtCadastrar: {
    textAlign: "center",
    fontWeight: "100",
    color: "#64b5f6",
    fontSize: 20,
  },
});

function efetuarCadastro() {
  // O fetch vai fazer uma captura/busca de dados de uma API
  fetch("http://192.168.0.23/projeto-app-loja/service/cadastro/cadastrar.php", {
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
      nomecli: nome,
      cpf: cpf,
      sexo: sx,
      email: em,
      telefone: tel,
      tipo: tp,
      logradouro: lg,
      numero: nu,
      complemento: cp,
      bairro: ba,
      cep: cep,
      nomeusuario: us,
      senha: sh,
      foto: ft,
    }),
  })
    // Então, pegue a resposta vinda da API e transfome em JSON
    // Então, exiba a reposta no console
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Olhe o console");
    })
    .catch((error) => console.error(error));
}
