import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Dispatch } from "redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { validator } from "../../../utils/variables";
import InputField from "../../../components/InputField/InputField";
import { LOGIN } from "../../../enums/enums";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import { passwordReset } from "../../../store/slices/authSlice";
import { AuthNavigationType } from "../../../navigation/AuthStackNavigation";
import Icons from "../../../assets/svgs/index";
import styles from "./PasswordReset.styles";
import { BLACK, LOGO_BLUE } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";

interface IPasswordResetData {
  email: string;
}
const PasswordReset = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [disable, setDisable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [succesful, setSuccesful] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordResetData>({});

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        email: data?.email,
      };
      await dispatch(
        passwordReset(payload, () => {
          setSuccesful(true);
          setDisable(true);
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.wrapper}>
          {succesful ? (
            <View style={styles.succesful}>
              <Icons.Succesful />
              <Text style={styles.succesfulMessage}>
                Email sent successfully. Please check your inbox {"\n"} to reset
                your password and log in.
              </Text>
            </View>
          ) : null}
          <Text style={styles.welcomeText}>Password Reset</Text>
          <Text style={styles.title}>
            Enter the email address associated with{"\n"} your account and we’ll
            send you a link to
            {"\n"}reset your password.
          </Text>
          <Controller
            control={control}
            name={LOGIN.EMAIL}
            rules={{
              required: t("Errors.Required"),
              pattern: {
                value: validator,
                message: t("Errors.Invalid_Email"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeHolder={t("Login_Form.Login_placeholder")}
                onChange={onChange}
                value={value}
                error={errors.email}
              />
            )}
          />

          {isLoading ? (
            <ActivityIndicator color={BLACK} size={pixel(30)} />
          ) : (
            <PrimaryButton
              isDisabled={disable}
              style={styles.button}
              type={ButtonTypes.DARK}
              title={"Reset password"}
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PasswordReset;
