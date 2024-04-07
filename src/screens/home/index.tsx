import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Card, CardProps } from "../../components/card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../router";
import Header from "../../components/header/Header";
import { Button } from "../../components/button/Button";

type HomeProps = {
  navigation: BottomTabNavigationProp<RootTabParamList, "Home" | "Usuario">;
};

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [data, setData] = React.useState<CardProps[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      handleFetchData();
    }, [])
  );

  const handleEdit = (id?: string) => {
    console.log("ID NA HOME", id?.toString());
    navigation.navigate("Usuario", { id: id?.toString() });
  };

  async function handleFetchData() {
    try {
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario");
      const dbData = reponseData ? JSON.parse(reponseData!) : [];
      setData(dbData);
      return dbData;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handleEdit(item.id)} />
        )}
      />
    </View>
  );

};
