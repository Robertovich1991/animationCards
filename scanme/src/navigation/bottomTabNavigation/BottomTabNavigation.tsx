import React, { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BLACK, GREY } from "../../assets/colors/colors";
import TabBarItem, { ItemType } from "../../components/tabBarItem/TabBarItem";
import Icons from "../../assets/svgs/index";
import ProfileScreen from "../../screens/TabScreens/ProfileScreen/ProfileScreen";
import { TAB } from "../../enums/enums";
import CardNavigationStack from "../CardStackNavigation";
import { pixel } from "../../utils/pixel";
import ContactNavigationStack from "../ContactsStackNavigation";
import ModalComponent from "../../components/modal/ModalComponent";
import { cardListSelector } from "../../store/selectors/cardSelector";
import { getCardList } from "../../store/slices/cardSlice";
import CardPreviewItem from "../../components/CardProgressItem/CardProgressItem";
import styles from "./BottomTabNavigation.styles";

export type RootTabParamList = {
  ProfileScreen: undefined;
  HomeScreen: undefined;
  ScannerStack: undefined;
  ContactsStack: undefined;
  Share: undefined;
  CameraScan: undefined;
};

const ICON_SIZE = 30;

const Tab = createBottomTabNavigator<RootTabParamList>();
const TabNavigation: React.FC = ({ navigation }: any) => {
  const [cardModalVisible, setCardModalVisible] = useState<boolean>(false);
  const handlePreviewPress = useCallback(() => {
    setCardModalVisible(true);
  }, []);
  const cards = useSelector(cardListSelector);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch(getCardList());
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: "",
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              focused={focused}
              type={ItemType.LIGHT}
              icon={<Icons.TabDots />}
              title=""
            />
          ),
        }}
      >
        <Tab.Screen
          name={TAB.HOME}
          component={CardNavigationStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                type={ItemType.DARK}
                icon={
                  <Image
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      borderRadius: pixel(20),
                    }}
                    source={{
                      uri: "https://i.pinimg.com/564x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
                    }}
                  />
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name={TAB.CONTACTS}
          component={ContactNavigationStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                type={ItemType.DARK}
                icon={
                  focused ? (
                    <Icons.TabSearch width={ICON_SIZE} height={ICON_SIZE} />
                  ) : (
                    <Icons.TabSearch width={ICON_SIZE} height={ICON_SIZE} />
                  )
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name={TAB.SCANNERSTACK}
          component={ContactNavigationStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                type={ItemType.DARK}
                icon={
                  focused ? (
                    <Icons.TabGift width={ICON_SIZE} height={ICON_SIZE} />
                  ) : (
                    <Icons.TabGift width={ICON_SIZE} height={ICON_SIZE} />
                  )
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name={TAB.PROFILE}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                type={ItemType.DARK}
                icon={
                  focused ? (
                    <Icons.TabProfile
                      stroke={BLACK}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  ) : (
                    <Icons.TabProfile
                      stroke={GREY}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  )
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
      <ModalComponent
        onClose={() => {
          setCardModalVisible(false);
        }}
        isVisible={cardModalVisible}
        content={
          cards && cards?.length > 0 && <CardPreviewItem data={cards[0]} />
        }
      />
    </>
  );
};
export default TabNavigation;
