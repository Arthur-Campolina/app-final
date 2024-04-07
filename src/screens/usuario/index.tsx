import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Center, HStack, Heading, VStack } from "native-base";
import { Input } from "../../components/input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-tiny-toast";
import uuid from "react-native-uuid";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../../components/button/Button";

type UsuarioRouteProps = BottomTabScreenProps<RootTabParamList, "Usuario">;

type FormDataProps = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

const schemaRegister = yup.object({
  nome: yup.string().required("Nome é obrigatório").min(3, "Informe no mínimo 3 digitos"),
  email: yup.string().required("Email é obrigatório").min(6, "Informe no mínimo 6 digitos").email("E-mail informado não é válido"),
  senha: yup.string().required("Senha é obrigatório").min(3, "Informe no mínimo 3 digitos"),
  confirmaSenha: yup.string().required("Confirmação de senha é obrigatório").oneOf([yup.ref("senha")], "As senhas devem coincidir"),
});

export const Usuario: React.FC<UsuarioRouteProps> = ({ route }) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schemaRegister) as any,
  });

  const isEditing = !!route.params?.id; 
  const isNewUser = !isEditing;

  React.useEffect(() => {
    if (isNewUser) {
      reset(); 
    }
  }, [isNewUser, reset]);

  async function handlerRegister(data: FormDataProps) {
    const newData: FormDataProps = { ...data };
    if (isNewUser) {
      newData.id = uuid.v4().toString();
    }
    try {
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario");
      const dbData = reponseData ? JSON.parse(reponseData!) : [];
      const previewData = [...dbData, newData];

      await AsyncStorage.setItem("@crud_form:usuario", JSON.stringify(previewData));
      reset();
      Toast.showSuccess("Usuário registrado com sucesso");
    } catch (e) {
      Toast.show("Erro ao registrar usuário " + e);
    }
  }

  return (
    <Center>
      <KeyboardAwareScrollView>
        <VStack bgColor="gray.300" flex={1} px={5} pb={50}  width="100%"  maxWidth="500px" alignSelf="center">
          <Heading my={5}>Cadastro de Usuários</Heading>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                errorMessage={errors.nome?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.senha?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmaSenha"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirma Senha"
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.confirmaSenha?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                errorMessage={errors.telefone?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="CEP"
                onChangeText={onChange}
                errorMessage={errors.cep?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="rua"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Rua"
                onChangeText={onChange}
                errorMessage={errors.rua?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="numero"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Número"
                onChangeText={onChange}
                errorMessage={errors.numero?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="bairro"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Bairro"
                onChangeText={onChange}
                errorMessage={errors.bairro?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Cidade"
                onChangeText={onChange}
                errorMessage={errors.cidade?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="uf"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="UF"
                onChangeText={onChange}
                errorMessage={errors.uf?.message}
                value={value}
              />
            )}
          />
          <Button
            title={isNewUser ? "Cadastrar" : "Salvar Alterações"}
            color="green.700"
            onPress={handleSubmit(handlerRegister)}
          />
        </VStack>
      </KeyboardAwareScrollView>
    </Center>
  );
  
};
