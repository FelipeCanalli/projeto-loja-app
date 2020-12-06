// Importação dos icones
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

// Importação das minhas telas
import LoginScreen from "../screens/LoginScreen";
import CadastrarScreen from "../screens/CadastrarScreen";
import InicialScreen from "../screens/InicialScreen";
import PerfilScreen from "../screens/PerfilScreen";
import CarrinhoScreen from "../screens/CarrinhoScreen";
import PagamentoScreen from "../screens/PagamentoScreen";
import PedidosRealizadosScreen from "../screens/PedidosRealizadosScreen";

import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Inicial"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Inicial"
        component={InicialNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Carrinho"
        component={CarrinhoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cart" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Pagamento"
        component={PagamentoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon2 name="cogs" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Pedidos Realizados"
        component={PedidosRealizadosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-gift" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Perfil"
        component={PerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="user-astronaut" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon2 name="cog" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Cadastrar"
        component={CadastrarNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon2 name="cogs" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIcon2(props: { name: string; color: string }) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const InicialStack = createStackNavigator();
function InicialNavigator() {
  return (
    <InicialStack.Navigator>
      <InicialStack.Screen
        name="InicialScreen"
        component={InicialScreen}
        options={{ headerTitle: "App Venda" }}
      />
    </InicialStack.Navigator>
  );
}

const PerfilStack = createStackNavigator();
function PerfilNavigator() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{ headerTitle: "Perfil" }}
      />
    </PerfilStack.Navigator>
  );
}

const CarrinhoStack = createStackNavigator();
function CarrinhoNavigator() {
  return (
    <CarrinhoStack.Navigator>
      <CarrinhoStack.Screen
        name="CarrinhoScreen"
        component={CarrinhoScreen}
        options={{ headerTitle: "Carrinho" }}
      />
    </CarrinhoStack.Navigator>
  );
}

const PagamentoStack = createStackNavigator();
function PagamentoNavigator() {
  return (
    <PagamentoStack.Navigator>
      <PagamentoStack.Screen
        name="PagamentoScreen"
        component={PagamentoScreen}
        options={{ headerTitle: "Pagamento" }}
      />
    </PagamentoStack.Navigator>
  );
}

const PedidosRealizadosStack = createStackNavigator();
function PedidosRealizadosNavigator() {
  return (
    <PedidosRealizadosStack.Navigator>
      <PedidosRealizadosStack.Screen
        name="PedidosRealizadosScreen"
        component={PedidosRealizadosScreen}
        options={{ headerTitle: "Pedidos Realizados" }}
      />
    </PedidosRealizadosStack.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </LoginStack.Navigator>
  );
}

const CadastrarStack = createStackNavigator();
function CadastrarNavigator() {
  return (
    <CadastrarStack.Navigator>
      <CadastrarStack.Screen
        name="CadastrarScreen"
        component={CadastrarScreen}
        options={{ headerTitle: "Cadastro" }}
      />
    </CadastrarStack.Navigator>
  );
}
