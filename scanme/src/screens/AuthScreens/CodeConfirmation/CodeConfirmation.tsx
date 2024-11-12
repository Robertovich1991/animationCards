import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dispatch } from "@reduxjs/toolkit";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation, useRoute } from "@react-navigation/native";
import { pixel } from "../../../utils/pixel";
import Icons from "../../../assets/svgs/index";
import { BLACK } from "../../../assets/colors/colors";
import {
  codeConfirmation,
  resendConfirmationCode,
} from "../../../store/slices/authSlice";
import { AuthNavigationType } from "../../../navigation/AuthStackNavigation";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import styles from "./CodeConfirmation.style";

interface ICodeConfirmData {
  verificationCode: string;
}
export default function CodeConfirmation() {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const [succesful, setSuccesful] = useState<boolean>(false);
  const navigation = useNavigation<AuthNavigationType>();
  const route = useRoute<any["route"]>();
  const { countryISO, userPhoneNumber } = route.params;

  const { t } = useTranslation();

  useEffect(() => {
    if (succesful) {
      const timer = setTimeout(() => {
        navigation.navigate("LOGIN");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [succesful, navigation]);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICodeConfirmData>({});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: watch("verificationCode"),
    setValue: () => {},
  });
  const resendCode = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        resendConfirmationCode(
          {
            countryISO,
            userPhoneNumber,
          },
          () => {
            setSuccesful(true);
          }
        )
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<ICodeConfirmData> = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        codeConfirmation(data.verificationCode, () => {
          setSuccesful(true);
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.inputForm}
      >
        <View style={styles.wrapper}>
          {succesful ? (
            <View style={styles.succesful}>
              <Icons.Succesful />
              <Text style={styles.succesfulMessage}>
                Verification is successful!!{"\n"}Please login to access your
                account
              </Text>
            </View>
          ) : null}
          <Text style={styles.welcomeText}>Verify Account</Text>
          <Text style={styles.title}>
            We have sent you a six digit code to your phone.
            {"\n"} Enter the code to verify your account and log in.
          </Text>

          <Controller
            control={control}
            name={"verificationCode"}
            rules={{
              required: t("Errors.Required"),
            }}
            render={({ field: { onChange, value } }) => (
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={onChange}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                    style={[!!symbol && styles.filledCell, styles.cellView]}
                  >
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            )}
          />

          {isLoading ? (
            <ActivityIndicator color={BLACK} size={pixel(30)} />
          ) : (
            <PrimaryButton
              isDisabled={watch("verificationCode")?.length !== 6}
              style={styles.button}
              type={ButtonTypes.DARK}
              title={"Verify"}
              onPress={handleSubmit(onSubmit)}
            />
          )}
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.title}>
              Didn’t receive the code?
              <Text style={styles.title}> Resend code</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
