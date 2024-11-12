import { StyleSheet } from "react-native";
import { textGlobalStyle } from "../../utils/text-globalStyles";
import { pixel } from "../../utils/pixel";
import { LOGO_BLUE, WHITE } from "../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  urlText: {
    marginTop: pixel(20),
    ...textGlobalStyle({ size: pixel(18), weight: 'bold' }),
    color: LOGO_BLUE,
    textDecorationLine: "underline",
  },
  codeWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    ...textGlobalStyle({ size: pixel(22), weight: 'bold' }),
    color: WHITE
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: pixel(10)
  }
});

export default styles;
