import { StyleSheet } from "react-native";
import { pixel } from "../../utils/pixel";
import { BLACK, GREY, OFFWHITE_GREY, RED_CRIMSON, } from "../../assets/colors/colors";
import { textGlobalStyle } from "../../utils/text-globalStyles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    gap: pixel(8),
  },
  label: {
    fontSize: pixel(14),
    color: BLACK,
    //fontFamily: "Montserrat-600",
  },
  inputContainer: {
    width: "100%",
    height: pixel(56),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: OFFWHITE_GREY,
    borderRadius: pixel(6),
    paddingHorizontal: pixel(15)
  },
  input: {
    flex: 1,
    paddingHorizontal: pixel(13),
    fontSize: pixel(16),
    color: BLACK,
    ...textGlobalStyle({ size: pixel(16), weight: 'semibold' }),
    //fontFamily: "Montserrat-400",
    // height: "100%"
  },
  errorMessage: {
    color: RED_CRIMSON,
    fontSize: pixel(11),
    fontStyle: 'normal'
  },
  error: {
    color: RED_CRIMSON
  },

  text: {
    color: GREY,
    fontSize: pixel(30),
  },
  title: {
    color: GREY,
    fontSize: pixel(12),
    textAlign: "center"
  },

})
export default styles