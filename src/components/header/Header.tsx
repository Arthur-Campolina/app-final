import React, { useState } from "react";
import { View, Image, TextInput } from "react-native";
import { styles } from "./styles";

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

export default Header;
