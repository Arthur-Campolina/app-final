import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Center, HStack, Heading, VStack } from "native-base";
import { Input } from "../../components/input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-tiny-toast";
import uuid from "react-native-uuid";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../router";

type UsuarioRouteProps = BottomTabScreenProps<RootTabParamList, "Usuario">;

type FormDataProps = {
  id: any;
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
};

const schemaRegister = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Informe no minimo 3 digitos"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .min(6, "Informe no minimo 6 digitos")
    .email("E-mail informado não é valido"),
  senha: yup
    .string()
    .required("Senha é obrigatório")
    .min(3, "Informe no minimo 3 digitos"),
  confirmaSenha: yup
    .string()
    .required("Confirmação de senha é obrigatório")
    .oneOf([yup.ref("senha")], "As senha devem coindir"),
});

export const Usuario: React.FC<UsuarioRouteProps> = ({ route, navigation }) => {
  const isEditting = !!route?.params?.id;
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isEditting) {
      console.log("ID NO USUARIO", route.params.id);
      handlerSearch(route.params.id);
    } else reset();
  }, [route.params.id, isEditting]);

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schemaRegister) as any,
  });

  async function handlerRegister(data: FormDataProps) {
    data.id = uuid.v4();

    try {
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario");
      const dbData = reponseData ? JSON.parse(reponseData!) : [];
      const previewData = [...dbData, data];

      await AsyncStorage.setItem(
        "@crud_form:usuario",
        JSON.stringify(previewData)
      );
      reset();
      Toast.showSuccess("Usuário registrado com sucesso");
    } catch (e) {
      Toast.show("Erro ao registrar usuário " + e);
    }
  }

  async function handlerSearch(id: string) {
    try {
      setIsLoading(true);
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario");
      const dbData: FormDataProps[] = reponseData
        ? JSON.parse(reponseData!)
        : [];
      const foundItem = dbData.find((item) => item.id === id);
      if (foundItem)
        Object.entries(foundItem).forEach(([key, value]) =>
          setValue(key as keyof FormDataProps, value)
        );
    } catch (e) {
      Toast.show("Erro ao registrar usuário " + e);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(isLoading);
  return (
    <KeyboardAwareScrollView>
      <VStack bgColor="gray.300" flex={1} px={5} pb={100}>
        <Center>
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
          {isEditting ? (
            <VStack>
              <HStack>
                <Button
                  rounded="md"
                  shadow={3}
                  title="Alterar"
                  color="#F48B20"
                  // onPress={handleSubmit(handlerAlterRegister)}
                />
              </HStack>
              <HStack paddingTop={5}>
                <Button
                  rounded="md"
                  shadow={3}
                  title="Excluir"
                  color="#CC0707"
                  // onPress={() => setShowDeleteDialog(true)}
                />
              </HStack>
            </VStack>
          ) : (
            <Button
              title="Cadastrar"
              color="green.700"
              onPress={handleSubmit(handlerRegister)}
            />
          )}
          has context menu
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};
