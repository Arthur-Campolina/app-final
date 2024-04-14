import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../components/header/Header";
import { Card, CardProps } from "../../components/card";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../router";

type HomeProps = {
  navigation: BottomTabNavigationProp<RootTabParamList, "Home" | "Usuario">;
};

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [data, setData] = useState<CardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CardProps[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleFetchData();
    }
  }, [isFocused]);

  async function handleFetchData() {
    try {
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario");
      const dbData = reponseData ? JSON.parse(reponseData) : [];
      setData(dbData);
      setFilteredData(dbData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (item: CardProps) => {
    navigation.navigate("Usuario", { item: item, isNewUser: false });
  };

  const updateFilteredData = (text: string) => {
    const filteredCompetidores = data.filter((competidor) =>
      competidor.nome.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredData(filteredCompetidores);
  };

  return (
    <View>
      <Header data={data} updateFilteredData={updateFilteredData} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handleEdit(item)} />
        )}
      />
    </View>
  );
};