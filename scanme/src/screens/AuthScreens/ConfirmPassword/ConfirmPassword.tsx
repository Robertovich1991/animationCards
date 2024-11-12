import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dispatch } from "redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import InputField from "../../../components/InputField/InputField";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import Header from "../../../components/Header/Header";
import { AuthNavigationType } from "../../../navigation/AuthStackNavigation";
import { GREY } from "../../../assets/colors/colors";
import Icons from "../../../assets/svgs/index";
import styles from "./ConfirmPassword.style";

interface IConfPasswordData {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
const ConfirmPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IConfPasswordData>({});
  const [passwordSecure, setPasswordSecure] = useState<boolean>(true);

  const onSubmit: SubmitHandler<IConfPasswordData> = (data) => {
    // es zaprosi het pti xrkvi nayev token
  };
  return (
    <View style={styles.container}>
      <Header
        title="Password reset"
        onPressArrow={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Please, reset you password</Text>
        <Controller
          control={control}
          name={"newPassword"}
          rules={{
            required: t("Errors.Required"),
            minLength: {
              value: 8,
              message: t("Login_Form.Password_Error"),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputField
                label={t("Login_Form.Password_label")}
                placeHolder={t("Login_Form.Password_placeholder")}
                secure={passwordSecure}
                onChange={onChange}
                value={value}
                error={errors.newPassword}
              >
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setPasswordSecure(!passwordSecure)}
                >
                  {passwordSecure ? (
                    <Icons.EyeClosed stroke={GREY} />
                  ) : (
                    <Icons.EyeOpen stroke={GREY} />
                  )}
                </TouchableOpacity>
              </InputField>
            </>
          )}
        />
        <Controller
          control={control}
          name={"confirmPassword"}
          rules={{
            required: t("Errors.Required"),
            validate: (value) =>
              value === watch("newPassword") || t("Errors.PasswordMatch"),
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputField
                label={t("Register.Confirm_Password_label")}
                placeHolder={t("Register.Confirm_Password_placeholder")}
                secure={passwordSecure}
                onChange={onChange}
                value={value}
                error={errors.confirmPassword}
              >
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setPasswordSecure(!passwordSecure)}
                >
                  {passwordSecure ? (
                    <Icons.EyeClosed stroke={GREY} />
                  ) : (
                    <Icons.EyeOpen stroke={GREY} />
                  )}
                </TouchableOpacity>
              </InputField>
            </>
          )}
        />
        <PrimaryButton
          style={styles.button}
          type={ButtonTypes.DARK}
          title={t(`Admin.Save`)}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ConfirmPassword;
