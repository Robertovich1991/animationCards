import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import {
  savedContactSelector,
  userCardSelector,
  userContentSelector,
} from "../../store/selectors/cardSelector";
import UserCardItem from "../../components/UserCardItem/UserCardItem";
import Header from "../../components/Header/Header";
import { AuthNavigationType } from "../../navigation/AuthStackNavigation";
import { isLoginedSelector } from "../../store/selectors/authSelector";
import { BLACK } from "../../assets/colors/colors";
import { pixel } from "../../utils/pixel";
import { saveContact, setUserContent } from "../../store/slices/cardSlice";
import { extractAllFields, extractField } from "../../utils/vcardParser";
import styles from "./UserProfileScreen.styles";

const UserProfileScreen = () => {
  const userCard = useSelector(userCardSelector);
  const userContent = useSelector(userContentSelector);
  const dispatch = useDispatch<Dispatch<any>>();
  const isLogined = useSelector(isLoginedSelector);
  const contactInfo = useSelector(savedContactSelector);

  const navigation = useNavigation<AuthNavigationType>();
  const createOwnProfile = useCallback(() => {
    isLogined ? navigation.goBack() : navigation.navigate("REGISTRATION");
  }, [isLogined]);

  const handleSaveContactButtonPress = async (id: number) => {
    dispatch(
      saveContact(id, () => {
        handleSaveContact(contactInfo);
      })
    );
  };
  const handleSaveContact = async (vCardData: any) => {
    const name = extractField(vCardData, "N");
    const firstName = name ? name?.split(";")[1] : null;
    const lastName = name ? name?.split(";")[0] : null;
    const phoneNumber = extractField(vCardData, "TEL;TYPE=HOME");
    const urls = extractAllFields(vCardData, "URL");
    const photoBase64 = extractField(
      vCardData,
      "PHOTO;ENCODING=BASE64;TYPE=JPEG"
    );
    const email = extractField(vCardData, "EMAIL");
    const contact = {
      // [Contacts.Fields.Emails]: email,
      [Contacts.Fields.FirstName]: firstName,
      [Contacts.Fields.LastName]: lastName,
      [Contacts.Fields.ContactType]: Contacts.ContactTypes.Person,
      [Contacts.Fields.PhoneNumbers]: [{ label: "home", number: phoneNumber }],
      [Contacts.Fields.UrlAddresses]: urls.map((url) => ({
        label: "веб-сайт",
        url,
      })),
      [Contacts.Fields.Image]: photoBase64
        ? { uri: `data:image/jpeg;base64,${photoBase64}` }
        : undefined,
    };
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      //@ts-ignore
      contact && (await Contacts.presentFormAsync(null, contact));
    } else {
      Alert.alert("Permission to access contacts was denied");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(setUserContent(undefined));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <Header
        onPressArrow={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: pixel(50) }}
      >
        {userCard ? (
          <UserCardItem
            saveUserContact={handleSaveContactButtonPress}
            content={userContent}
            createProfile={createOwnProfile}
            data={userCard}
          />
        ) : (
          <ActivityIndicator color={BLACK} size={pixel(30)} />
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;
