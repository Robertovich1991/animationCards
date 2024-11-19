import React from "react";
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { MAIN } from "../enums/enums";
import EditScreen from "../screens/EditScreen/EditScreen";
import TabNavigation from "./bottomTabNavigation/BottomTabNavigation";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
import { pixel } from "../utils/pixel";
import CameraScan from "../screens/CameraScan/CameraScan";

export type MainParamList = {
  EDIT: undefined;
  TAB: undefined;
  CARD_PROFILE: undefined;
  SCAN_CAMERA: undefined;
};
const Stack = createStackNavigator<MainParamList>();
export type MainNavigationType = StackNavigationProp<MainParamList>;

const verticalAnimation: StackNavigationOptions = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
  presentation: "transparentModal",
  cardStyle: {
    marginTop: "15%",
    borderTopLeftRadius: pixel(20),
    borderTopRightRadius: pixel(20),
  },
};
export function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={MAIN.TAB} component={TabNavigation} />
      <Stack.Group screenOptions={{ animationEnabled: true }}>
      </Stack.Group>
    </Stack.Navigator>
  );
}
