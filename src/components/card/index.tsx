import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";

export type CardProps = {
  id?: any;
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
};
type Props = {
  data: CardProps;
  onPress: () => void;
};

export function Card({ data, onPress }: Props) {
  const [passwordIsVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.nome}>{data.nome}</Text>
          <Text style={styles.email}>{data.email}</Text>

          {passwordIsVisible ? (
            <Text style={styles.password}>{data.senha}</Text>
          ) : (
            <Text style={styles.user}>*****</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialIcons name="edit" size={22} color="#888D97" />
      </TouchableOpacity>
    </View>
  );
}
