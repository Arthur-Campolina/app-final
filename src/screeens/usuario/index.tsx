import React from "react";
import { Center, Heading, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-tiny-toast";
import uuid from "react-native-uuid";

const { showSuccess, show } = Toast;
const formDataSchema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Informe no mínimo 3 caracteres"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("E-mail não válido"),
  senha: yup
    .string()
    .required("Senha é obrigatório")
    .min(6, "Informe no mínimo 6 caracteres"),
  confirmaSenha: yup
    .string()
    .required("Confirmar a senha é obrigatório")
    .min(6, "Informe no mínimo 6 caracteres")
    .oneOf([yup.ref("senha")], "As senhas devem ser idénticas"),
});
type FormDataType = yup.InferType<typeof formDataSchema>;
interface UserType extends FormDataType {
  id: string | number[];
}
const USER_DB_ID = "@user-crud-form:usuario";

export const Usuario = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(formDataSchema),
  });

  const onClickSubmitHandler = async (formData: FormDataType) => {
    try {
      const newUser: UserType = {
        id: uuid.v4(),
        ...formData,
      };
      const responseDB = await AsyncStorage.getItem(USER_DB_ID);
      const dataDB = responseDB ? JSON.parse(responseDB) : "";
      const updatedData = [...dataDB, newUser];

      await AsyncStorage.setItem(USER_DB_ID, JSON.stringify(updatedData));

      showSuccess("Usuário registrado com sucesso");
    } catch (error: any) {
      show("[Error]: ", error.message);
      throw new Error("[Error]: ", error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <VStack bgColor="gray.300" flex={1} px={5} pb={100}>
        <Center>
          <Heading my={10}>Cadastro de Usuário</Heading>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange } }) => (
              <Input
                onChange={onChange} // send value to hook form
                errorMessage={errors.nome?.message ?? ""}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                onChange={onChange} // send value to hook form
                errorMessage={errors.nome?.message ?? ""}
              />
            )}
          />
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange } }) => (
              <Input
                onChange={onChange} // send value to hook form
                errorMessage={errors.nome?.message ?? ""}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmaSenha"
            render={({ field: { onChange } }) => (
              <Input
                onChange={onChange} // send value to hook form
                errorMessage={errors.nome?.message}
              />
            )}
          />
          <Button
            title="Cadastrar"
            onPress={handleSubmit(onClickSubmitHandler)}
          />
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
  );
};
