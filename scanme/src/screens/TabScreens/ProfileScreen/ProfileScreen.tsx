import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../../store/selectors/profileSelector";
import { MainNavigationType } from "../../../navigation/MainNavigtion";
import Icons from "../../../assets/svgs/index";
import { signOut } from "../../../store/slices/authSlice";
import Header from "../../../components/Header/Header";
import { profileData } from "../../../assets/mocks/mocks";
import { pixel } from "../../../utils/pixel";
import ProfileItem from "../../../components/ProfileItem/ProfileItem";
import styles from "./ProfileScreen.style";

const ProfileScreen = () => {
  const user = useSelector(userInfoSelector);
  const navigation = useNavigation<MainNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();
  const handlerEditProfile = useCallback(() => {
    navigation.navigate("EDIT");
  }, []);

  const handlerLogOut = useCallback(() => {
    dispatch(signOut());
  }, []);
  const userEditData = [
    { label: "Edit account email", value: user?.email },
    { label: "Edit account phone", value: user?.phoneNumber },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Header />
        </View>
        <View style={styles.user}>
          <Text style={styles.settings}>Settings</Text>
          <View style={styles.analitycs}>
            <Text style={styles.textTitle}>My analytics</Text>
            <TouchableOpacity style={styles.userContent}>
              <View style={styles.row}>
                <Image
                  style={styles.image}
                  source={{
                    uri: user?.profilePic
                      ? `https://scanme.am/api/admin/content/getImage?image=${user?.profilePic}`
                      : "https://i.pinimg.com/564x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
                  }}
                />
                <Text style={styles.username}>
                  {user?.name} {user?.surname}
                </Text>
              </View>

              <Icons.ArrowUp style={{ transform: [{ rotate: "90deg" }] }} />
            </TouchableOpacity>
          </View>
          <View style={styles.analitycs}>
            {profileData?.map((item, index) => {
              return <ProfileItem icon title={item} key={index} />;
            })}
          </View>
          <View style={[styles.analitycs, { gap: pixel(20) }]}>
            {userEditData.map((item, index) => (
              <ProfileItem
                title={item.label}
                key={index}
                value={item.value}
                onPress={handlerEditProfile}
              />
            ))}
          </View>
          <View style={styles.analitycs}>
            <ProfileItem icon title={"Sign out"} onPress={handlerLogOut} />
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
