import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/InputField/InputField";
import Icons from "../../../assets/svgs/index";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import { BLACK, GREY } from "../../../assets/colors/colors";
import { AUTH, LOGIN } from "../../../enums/enums";
import { login } from "../../../store/slices/authSlice";
import { getProfiles, getUserInfo } from "../../../store/slices/profileSlice";
import TextInputField from "../../../components/SearchInput/SearchInput";
import { profilesSelector } from "../../../store/selectors/profileSelector";
import { ICardItem, IEventSizes } from "../../../interfaces/types";
import { pixel } from "../../../utils/pixel";
import { getCardById, getContentById } from "../../../store/slices/cardSlice";
import { AuthNavigationType } from "../../../navigation/AuthStackNavigation";
import styles from "./LoginScreen.style";

interface ILoginData {
  email: string;
  password: string;
}
export default function LoginScreen() {
  const [passwordSecure, setPasswordSecure] = useState<boolean>(true);
  const navigation = useNavigation<AuthNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProfilesLoading, setIsProfilesLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const profileList = useSelector(profilesSelector);
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({});

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    try {
      setIsLoading(true);

      const payload = {
        email: data?.email,
        password: data?.password,
        returnSecureToken: true,
      };

      await dispatch(
        login(payload, (email) => {
          dispatch(getUserInfo(email));
        })
      );

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleOpenProfile = useCallback((el: ICardItem) => {
    dispatch(getCardById({ cardId: el.cardId }));
    dispatch(getContentById({ id: el.id }));
    navigation.navigate(AUTH.USER_PROFILE);
  }, []);

  const setSearch = useCallback((value: string) => {
    setPage(0);
    setSearchValue(value);
    setVisible(true);
  }, []);

  const filter = useCallback(
    async (text: string) => {
      if (text) {
        setIsProfilesLoading(true);
        await dispatch(
          getProfiles({
            pagination: { page: page, size: 10 },
            search_by: text,
          })
        );
        setIsProfilesLoading(false);
      }
    },
    [page]
  );

  const isCloseToBottom = (sizes: IEventSizes) => {
    const paddingToBottom = 60;
    return (
      sizes.layoutMeasurement.height + sizes.contentOffset.y >=
      sizes.contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      filter(searchValue);
    }, 500);
    return () => clearTimeout(getData);
  }, [filter, searchValue]);

  const handlerScan = useCallback(() => {
    navigation.navigate("CAMERA");
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.mainWrapper}>
        <TextInputField
          placeholder="Registered username"
          handleOnBlur={() => setVisible(false)}
          handleOnFocus={() => {
            setVisible(true);
          }}
          onChangeText={setSearch}
          value={searchValue}
        />
        {visible && (
          <>
            {isProfilesLoading ? (
              <ActivityIndicator size="large" color={BLACK} />
            ) : profileList && profileList.length > 0 ? (
              <ScrollView
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    setPage(page + 1);
                  }
                }}
                scrollEventThrottle={400}
                showsVerticalScrollIndicator
                nestedScrollEnabled
                decelerationRate={0.3}
                keyboardShouldPersistTaps={"always"}
                style={styles.profileBoard}
              >
                {profileList.map((el: any, index: number) => {
                  return (
                    <TouchableOpacity
                      style={styles.profileEl}
                      onPress={() => handleOpenProfile(el)}
                      key={index}
                    >
                      {el.profilePic ? (
                        <Image
                          source={{
                            uri: `https://scanme.am/api/admin/content/getImage?image=${el.profilePic}`,
                          }}
                          style={styles.image}
                        />
                      ) : (
                        <Icons.ProfileCard width={30} height={30} />
                      )}
                      <Text style={[styles.input]}>
                        {el.name} {el.surname}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <View style={styles.noResults}>
                <Text>Result not found</Text>
              </View>
            )}
          </>
        )}
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.inputForm}
        >
          <Text style={styles.welcomeText}>{t(`Login_Form.Welcome`)}!</Text>
          <View style={styles.inputs}>
            <Controller
              control={control}
              name={LOGIN.EMAIL}
              rules={{
                required: t("Errors.Required"),
                // pattern: {
                //   value: validator,
                //   message: t("Errors.Invalid_Email"),
                // },
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
              name={LOGIN.PASSWORD}
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(AUTH.PASSWORD_RESET);
                    }}
                  >
                    <Text style={styles.forgot}>
                      {t(`Login_Form.Forgot_password`)}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator color={BLACK} size={pixel(30)} />
          ) : (
            <PrimaryButton
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              type={ButtonTypes.DARK}
              title={t(`Login_Form.Button_text`)}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("REGISTRATION");
            }}
          >
            <Text style={styles.signup}>{t(`Register.Sign_Up`)}!</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.scan} onPress={handlerScan}>
            <Icons.QRWhite width={40} height={40} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
