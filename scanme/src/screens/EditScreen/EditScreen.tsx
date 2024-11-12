import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import PhoneInput from "react-native-phone-number-input";
import AvatarItem from "../../components/AvatarItem/AvatarItem";
import {
  profileImageSelector,
  userInfoSelector,
} from "../../store/selectors/profileSelector";
import { MainNavigationType } from "../../navigation/MainNavigtion";
import { IUserEditedInfo } from "../../interfaces/types";
import {
  deleteUserPicture,
  editUserInfo,
  editUserPicture,
  getUserInfo,
} from "../../store/slices/profileSlice";
import { LOGIN } from "../../enums/enums";
import { validator } from "../../utils/variables";
import Icons from "../../assets/svgs";
import PrimaryButton, {
  ButtonTypes,
} from "../../components/primaryButton/PrimaryButton";
import Header from "../../components/Header/Header";
import ProfileInput from "../../components/ProfileInput/ProfileInput";
import { pixel } from "../../utils/pixel";
import { textGlobalStyle } from "../../utils/text-globalStyles";
import ModalComponent from "../../components/modal/ModalComponent";
import styles from "./EditScreen.styles";

interface IUserEdit {
  email: string;
  phoneNumber: string;
}

const EditScreen = () => {
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch<Dispatch<any>>();
  const navigation = useNavigation<MainNavigationType>();
  const [cameraModal, setCameraModal] = useState<boolean>(false);
  const [countryIso, setCountryIso] = useState<string>(user?.countryIso);
  function removeCountryCode(phoneNumber?: string): string | undefined {
    const countryCode = "+374";
    if (phoneNumber && phoneNumber.startsWith(countryCode)) {
      return phoneNumber?.slice(countryCode.length);
    }
    return phoneNumber;
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEdit>({
    defaultValues: {
      email: user?.email,
      phoneNumber: removeCountryCode(user?.phoneNumber),
    },
  });
  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        mediaPermission.status !== "granted"
      ) {
        Alert.alert(
          "Permission required",
          "Permission to access camera and media library is required!"
        );
      }
    })();
  }, []);

  const [image, setImage] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState();

  const pickImage = async (picType: string) => {
    if (picType === "camera") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        //@ts-ignore
        setImageUri(result.assets[0]);
        setImage(result.assets[0].uri);
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        //@ts-ignore
        setImageUri(result.assets[0]);
        setImage(result.assets[0].uri);
      }
    }
  };
  const pick = (pick: any) => {
    setCameraModal(false);
    setTimeout(() => {
      pickImage(pick);
    }, 1000);
  };
  const imageUpdated = useSelector(profileImageSelector);

  const onSubmit: SubmitHandler<IUserEdit> = useCallback(
    (data) => {
      const payload: IUserEditedInfo = {
        email: data.email,
        phoneNumber: data.phoneNumber,
        countryIso: countryIso ?? "am",
      };
      dispatch(
        editUserInfo({ id: user?.id, info: payload }, (email) =>
          dispatch(getUserInfo(email))
        )
      );
      if (image === "noImage") {
        dispatch(deleteUserPicture({ id: user?.id }));
      } else {
        dispatch(
          editUserPicture({ id: user?.id, imageUri: imageUri }, () => {
            dispatch(getUserInfo(user?.email ?? ""));
          })
        );
      }
      navigation.goBack();
    },
    [image]
  );

  const handleDelete = useCallback(() => {
    setImage("noImage");
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header
            onPressArrow={() => {
              reset({});
              setImage("");
              navigation.goBack();
            }}
          />
          <View style={styles.imageBox}>
            <AvatarItem
              isVisible
              deleteImage={handleDelete}
              image={image ? image : imageUpdated || user?.profilePic}
              pickImage={() => setCameraModal(true)}
              isDisabled
              style={styles.image}
            />
          </View>
          <View style={styles.inputBox}>
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
                <ProfileInput
                  label={t("Login_Form.Login_label")}
                  placeHolder={"email*"}
                  onChange={onChange}
                  value={value}
                  error={errors.email}
                />
              )}
            />
            <Controller
              control={control}
              name={LOGIN.PHONE_NUMBER}
              rules={{
                required: t("Errors.Required"),
              }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.phoneInputContainer}>
                  <Text style={styles.label}>Phone</Text>
                  <PhoneInput
                    codeTextStyle={textGlobalStyle({
                      size: pixel(16),
                      weight: "semibold",
                    })}
                    textInputStyle={textGlobalStyle({
                      size: pixel(16),
                      weight: "semibold",
                    })}
                    countryPickerButtonStyle={styles.countryPickerButton}
                    textContainerStyle={styles.textContainer}
                    onChangeCountry={(iso) => {
                      setCountryIso(iso.cca2);
                    }}
                    defaultCode={user?.countryIso?.toUpperCase() ?? "AM"}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.button}>
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              title={t(`Admin.Save`)}
              style={styles.primaryButton}
              type={ButtonTypes.DARK}
            />
          </View>
          <ModalComponent
            isVisible={cameraModal}
            onClose={() => setCameraModal(false)}
            content={
              <View style={styles.cameraBox}>
                <TouchableOpacity
                  style={styles.galery}
                  onPress={() => pick("camera")}
                >
                  <Icons.CameraPick width={pixel(30)} height={pixel(30)} />
                  <Text style={styles.cameraText}>Take a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.galery}
                  onPress={() => pick("gallery")}
                >
                  <Icons.GalleryPick width={pixel(30)} height={pixel(30)} />
                  <Text style={styles.cameraText}>Pick from Galery</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditScreen;
