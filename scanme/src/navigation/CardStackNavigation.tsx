import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { CARD } from "../enums/enums";
import ScannerScreen from "../screens/TabScreens/ScannerScreen/ScannerScreen";
import AddCardScreen from "../screens/TabScreens/AddCardScreen/AddCardScreen";
import EditCardScreen from "../screens/TabScreens/EditCardScreen/EditCardScreen";

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
      <CardStack.Screen name={CARD.ADD_CARD} component={AddCardScreen} />
      <CardStack.Screen name={CARD.EDIT_CARD} component={EditCardScreen} />
    </CardStack.Navigator>
  );
}

export default CardNavigationStack;
