import React from "react";
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import LoginScreen from "../screens/AuthScreens/LoginScreen/LoginScreen";
import RegistartionScreen from "../screens/AuthScreens/RegistrationScreen/RegistrationScreen";
import { AUTH, MAIN } from "../enums/enums";
import PasswordReset from "../screens/AuthScreens/PasswordReset/PasswordReset";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
import ConfirmPassword from "../screens/AuthScreens/ConfirmPassword/ConfirmPassword";
import LandingScreen from "../screens/AuthScreens/LandingScreen/LandingScreen";
import CodeConfirmation from "../screens/AuthScreens/CodeConfirmation/CodeConfirmation";
import { pixel } from "../utils/pixel";
import CameraScanNavigationStack from "./CameraScanStackNavigation";

export type AuthNavigationParamList = {
  LOGIN: undefined;
  REGISTRATION: undefined;
  PASSWORD_RESET: undefined;
  USER_PROFILE: undefined;
  CONFIRM_PASSWORD: undefined;
  LANDING: undefined;
  CODE_CONFIRMATION: { userPhoneNumber: string; countryISO: string };
  CAMERA: undefined;
  CARD_PROFILE: undefined;
};
const AuthStack = createStackNavigator<AuthNavigationParamList>();
export type AuthNavigationType = StackNavigationProp<AuthNavigationParamList>;
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
export function AuthNavigationStack() {
  return (
    <AuthStack.Navigator
      initialRouteName={AUTH.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name={AUTH.LANDING} component={LandingScreen} />
      <AuthStack.Screen name={AUTH.LOGIN} component={LoginScreen} />
      <AuthStack.Screen
        name={AUTH.REGISTRATION}
        component={RegistartionScreen}
      />
      <AuthStack.Screen name={AUTH.PASSWORD_RESET} component={PasswordReset} />
      <AuthStack.Screen
        name={AUTH.CONFIRM_PASSWORD}
        component={ConfirmPassword}
      />
      <AuthStack.Screen
        name={AUTH.USER_PROFILE}
        component={UserProfileScreen}
      />
      <AuthStack.Screen
        name={AUTH.CODE_CONFIRMATION}
        component={CodeConfirmation}
      />
      <AuthStack.Group screenOptions={{ animationEnabled: true }}>
        <AuthStack.Screen
          name={AUTH.CAMERA}
          component={CameraScanNavigationStack}
          options={verticalAnimation}
        />
        <AuthStack.Screen
          name={MAIN.CARD_PROFILE}
          component={UserProfileScreen}
          options={verticalAnimation}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
}

export default AuthNavigationStack;
