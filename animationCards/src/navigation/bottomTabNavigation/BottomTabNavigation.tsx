import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BLACK, GREY } from "../../assets/colors/colors";
import TabBarItem, { ItemType } from "../../components/tabBarItem/TabBarItem";
import Icons from "../../assets/svgs/index";
import ProfileScreen from "../../screens/TabScreens/ProfileScreen/ProfileScreen";
import { TAB } from "../../enums/enums";
import CardNavigationStack from "../CardStackNavigation";
import { cardListSelector } from "../../store/selectors/cardSelector";
import { getCardList } from "../../store/slices/cardSlice";
import styles from "./BottomTabNavigation.styles";
import ContactNavigationStack from "../ContactsStackNavigation";

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
                  <Icons.TabDots
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
     
    </>
  );
};
export default TabNavigation;
