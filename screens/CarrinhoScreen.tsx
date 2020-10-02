import * as React from "react";
import { Text, View } from "../components/Themed";

export default function Carrinho({ route }) {
  const { idproduto } = route.params;
  return (
    <View>
      <Text> Estamos dentro da tela carrinho </Text>
    </View>
  );
}
