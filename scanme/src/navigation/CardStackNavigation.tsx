import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { CARD } from "../enums/enums";
import ScannerScreen from "../screens/TabScreens/ScannerScreen/ScannerScreen";

export type CardNavigationParamList = {
  SCANNER: undefined;
  ADD_CARD: { id?: number };
  EDIT_CARD: { item: any };
};
const CardStack = createStackNavigator<CardNavigationParamList>();
export type CardNavigationType = StackNavigationProp<CardNavigationParamList>;

export function CardNavigationStack() {
  return (
    <CardStack.Navigator
      initialRouteName={CARD.SCANNER}
      screenOptions={{ headerShown: false }}
    >
      <CardStack.Screen name={CARD.SCANNER} component={ScannerScreen} />
    </CardStack.Navigator>
  );
}

export default CardNavigationStack;
