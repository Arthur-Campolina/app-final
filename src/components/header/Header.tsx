import React, { useState } from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";

export interface Competidor {
  nome: string;
}

interface HeaderProps {
  data: Competidor[];
  updateFilteredData: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ data, updateFilteredData }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
    updateFilteredData(text);
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../../.././assets/header.png")}
        style={styles.backgroundImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar competidor..."
        placeholderTextColor="white"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  input: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default Header;