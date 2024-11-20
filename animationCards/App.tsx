import { StyleSheet, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/store/config/configStore";
import "./src/local/i18next/i18n";
import { WHITE } from "./src/assets/colors/colors";
import Main from "./Main"


export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <View>
            <StatusBar
              translucent={true}
              backgroundColor={"transparent"}
              barStyle={"dark-content"}
            />
          </View>
          <Main />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
