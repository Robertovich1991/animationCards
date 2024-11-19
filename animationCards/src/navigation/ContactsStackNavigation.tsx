import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { CONTACT } from "../enums/enums";
import ContactListScreen from "../screens/ContactsScreens/ContactListScreen/ContactsListScreen";
export type ContactNavigationParamList = {
  CONTACTS: undefined;
};
const ContactStack = createStackNavigator<ContactNavigationParamList>();
export type ContactNavigationType =
  StackNavigationProp<ContactNavigationParamList>;

export function ContactNavigationStack() {
  return (
    <ContactStack.Navigator
      initialRouteName={CONTACT.CONTACTS}
      screenOptions={{ headerShown: false }}
    >
      <ContactStack.Screen
        name={CONTACT.CONTACTS}
        component={ContactListScreen}
      />
    </ContactStack.Navigator>
  );
}

export default ContactNavigationStack;
