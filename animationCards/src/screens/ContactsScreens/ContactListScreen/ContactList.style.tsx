import { StyleSheet } from "react-native";
import { WHITE } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    paddingTop: pixel(40),
    flex: 1,
    paddingHorizontal: pixel(18),
  },
  contatcs: {
    ...textGlobalStyle({ size: pixel(30), weight: "bold" }),
  },
});
export default styles;
