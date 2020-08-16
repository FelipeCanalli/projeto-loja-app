import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { Picker, StyleSheet } from "react-native";

export default function Cadastrar() {
  const [sexo, setSexo] = React.useState("");
  const [tipo, setTipo] = React.useState("");

  return (
    <View style={estilos.background}>
      <ScrollView>
        {/* ==============================  inicio da caixa ============================== */}
        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Dados Pessoais</Text>
          <TextInput placeholder="Nome Completo" style={estilos.input} />
          <TextInput
            placeholder="CPF"
            keyboardType="numeric"
            style={estilos.input}
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
          <TextInput placeholder="Usuário" style={estilos.input} />
          <TextInput
            secureTextEntry
            placeholder="Senha"
            style={estilos.input}
          />
          <TextInput
            secureTextEntry
            placeholder="Confirme sua senha"
            style={estilos.input}
          />
        </View>

        {/* ======================================================================================== */}

        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Contato</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={estilos.input}
          />
          <TextInput
            placeholder="Telefone"
            keyboardType="phone-pad"
            style={estilos.input}
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
          <TextInput placeholder="Logradouro" style={estilos.input} />
          <TextInput
            placeholder="Número"
            keyboardType="numeric"
            style={estilos.input}
          />
          <TextInput placeholder="Complemento" style={estilos.input} />
          <TextInput placeholder="Bairro" style={estilos.input} />
          <TextInput
            placeholder="CEP"
            keyboardType="numeric"
            style={estilos.input}
          />
        </View>

        {/* ======================================================================================== */}

        <TouchableOpacity style={estilos.btnCadastrar}>
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
    margin: 20,
    padding: 10,
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
