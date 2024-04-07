import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Usuario } from "../screens/usuario";
import { CardProps } from "../components/card";


export type RootTabParamList = {
  Home: undefined;
  Usuario: { 
    item: CardProps;
    isNewUser: boolean;
  }; 
};

const Tab = createBottomTabNavigator<RootTabParamList>();


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue",
    backround: "white",
  },
};

export const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            title: "Competidores",
          }}
        />
        <Tab.Screen
          name="Usuario"
          component={Usuario}
          initialParams={{ item: undefined, isNewUser: true }} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-multiple-plus"
                color={color}
                size={26}
              />
            ),
            title: "Cadastro",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
