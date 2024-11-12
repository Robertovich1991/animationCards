import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { CAMERA_SCAN } from "../enums/enums";
import CameraScan from "../screens/CameraScan/CameraScan";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";

export type CameraScanNavigationParamList = {
  CAMERA_SCAN: undefined;
  USER_PROFILE: undefined;
};
const CameraScanStack = createStackNavigator<CameraScanNavigationParamList>();
export type CameraScanNavigationType =
  StackNavigationProp<CameraScanNavigationParamList>;

export function CameraScanNavigationStack() {
  return (
    <CameraScanStack.Navigator
      initialRouteName={CAMERA_SCAN.CAMERA_SCAN}
      screenOptions={{ headerShown: false }}
    >
      <CameraScanStack.Screen
        name={CAMERA_SCAN.CAMERA_SCAN}
        component={CameraScan}
      />
      <CameraScanStack.Screen
        name={CAMERA_SCAN.USER_PROFILE}
        component={UserProfileScreen}
      />
    </CameraScanStack.Navigator>
  );
}

export default CameraScanNavigationStack;
