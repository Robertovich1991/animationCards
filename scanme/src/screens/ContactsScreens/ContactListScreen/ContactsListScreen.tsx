import React, { useCallback, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { MainNavigationType } from "../../../navigation/MainNavigtion";
import styles from "./ContactList.style";
import TextInputField from "../../../components/SearchInput/SearchInput";
import Segment from "../../../components/Segment/Segment";
import { WHITE } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";
import ContactItem from "../../../components/ContactsItem/ContactsItem";

const ContactListScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const navigation = useNavigation<MainNavigationType>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);
  const contactsList = [
    {
      image:
        "https://play-lh.googleusercontent.com/kHTEK6TPrF5XLufXJTux8uuSMErQWBEw2w8fkj14Q0j3MrVqMRp5TpCcG8d2FNTWGA=w240-h480-rw",
      title: "James Cameron",
      description: "Tap to start!",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Circle-icons-tools.svg/512px-Circle-icons-tools.svg.png?20160314153935",
      title: "Support",
      description: "Tap to start!",
    },
  ];
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ gap: pixel(20), marginTop: pixel(20) }}>
        <Text style={styles.contatcs}>Contacts</Text>
        <TextInputField
          placeholder="Search name, companies, and more"
          onChangeText={setSearch}
          value={searchValue}
        />
        <Segment
          tintColor={WHITE}
          handleTabsChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          values={["People", "Groups"]}
          selectedIndex={selectedIndex}
        />
        <FlatList
          nestedScrollEnabled={true}
          contentContainerStyle={{ gap: pixel(20) }}
          showsVerticalScrollIndicator={false}
          data={contactsList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ContactItem data={item} key={index} />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactListScreen;
