import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { BLACK, OFFWHITE_GREY, WHITE } from "../../../assets/colors/colors";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

export const style = StyleSheet.create({
  selectedStyle: {
    backgroundColor: OFFWHITE_GREY,
    borderWidth: 1,
    borderColor: OFFWHITE_GREY,
  },
  tab: {
    alignItems: "center",
    borderRadius: pixel(50),
    paddingHorizontal: pixel(10),
    flexDirection: "row",
  },
  transparent: {
    borderWidth: 1,
    borderColor: OFFWHITE_GREY,
    backgroundColor: WHITE
  },
  title: {
    ...textGlobalStyle({ size: pixel(14), weight: 'semibold' }),
    color: BLACK
  }
});
