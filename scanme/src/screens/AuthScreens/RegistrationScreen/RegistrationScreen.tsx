import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/InputField/InputField";
import { AuthNavigationType } from "../../../navigation/AuthStackNavigation";
import Icons from "../../../assets/svgs/index";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import { BLACK, GREY } from "../../../assets/colors/colors";
import Header from "../../../components/Header/Header";
import PhoneInputButton from "../../../components/phoneInput/phoneInput";
import { register } from "../../../store/slices/authSlice";
import { validator } from "../../../utils/variables";
import { pixel } from "../../../utils/pixel";
import styles from "./RegistrationScreen.style";

interface IRegistrData {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  confirmPassword: string;
  countryIso: string;
}
export default function RegistartionScreen() {
  const navigation = useNavigation<AuthNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordSecure, setPasswordSecure] = useState<boolean>(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] =
    useState<boolean>(true);
  const { t } = useTranslation();
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IRegistrData>({});

  const onSubmit: SubmitHandler<IRegistrData> = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        register({ ...data, countryIso: watch("countryIso") ?? "374" }, () => {
          navigation.navigate("CODE_CONFIRMATION", {
            countryISO: watch("countryIso"),
            userPhoneNumber: data.phoneNumber,
          });
          reset({});
          setValue("countryIso", "374");
          setValue("phoneNumber", "");
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? pixel(30) : 0}
        style={styles.container}
        contentContainerStyle={{ paddingHorizontal: pixel(30) }}
      >
        <Header
          onPressArrow={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.inputForm}
        >
          {/* {succesful ? (
            <View style={styles.succesful}>
              <Icons.Succesful />
              <Text style={styles.succesfulMessage}>
                Email sent successfully. Please check your inbox {"\n"} to
                activate your account and log in.
              </Text>
            </View>
          ) : null} */}
          <Text style={styles.welcomeText}>
            {t(`Register.Create_account`)}!
          </Text>
          <View style={styles.inputs}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: t("Errors.Required"),
                pattern: {
                  value: /^.{3,}$/,
                  message: t("Errors.First_name"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  placeHolder={t("Register.Firstname_placeholder")}
                  onChange={onChange}
                  value={value}
                  error={errors.name}
                />
              )}
            />
            <Controller
              control={control}
              name="surname"
              rules={{
                required: t("Errors.Required"),
                pattern: {
                  value: /^.{3,}$/,
                  message: t("Errors.Second_name"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  placeHolder={t("Register.Second_name_placeholder")}
                  onChange={onChange}
                  value={value}
                  error={errors.surname}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
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
            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required: t("Errors.Required"),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInputButton
                  onChangeCountryCode={(countryCode) =>
                    setValue("countryIso", countryCode)
                  }
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: t("Errors.Required"),
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;':",./<>?~\\-])[A-Za-z\d!@#$%^&*()_+[\]{}|;':",./<>?~\\-]{8,20}$/,
                  message: t(`Errors.Password_pattern`),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputField
                    placeHolder={t("Login_Form.Password_placeholder")}
                    secure={passwordSecure}
                    onChange={onChange}
                    value={value}
                    error={errors.password}
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
              name="confirmPassword"
              rules={{
                required: t("Errors.Required"),
                validate: (value) =>
                  value === watch("password") || t("Errors.Password_match"),
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputField
                    placeHolder={t("Register.Confirm_Password_placeholder")}
                    secure={confirmPasswordSecure}
                    onChange={onChange}
                    value={value}
                    error={errors.confirmPassword}
                  >
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() =>
                        setConfirmPasswordSecure(!confirmPasswordSecure)
                      }
                    >
                      {confirmPasswordSecure ? (
                        <Icons.EyeClosed stroke={GREY} />
                      ) : (
                        <Icons.EyeOpen stroke={GREY} />
                      )}
                    </TouchableOpacity>
                  </InputField>
                </>
              )}
            />
          </View>
        </ScrollView>
        {isLoading ? (
          <ActivityIndicator color={BLACK} size={pixel(30)} />
        ) : (
          <PrimaryButton
            style={styles.button}
            isDisabled={false}
            onPress={handleSubmit(onSubmit)}
            type={ButtonTypes.DARK}
            title={t(`Register.Title`)}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
