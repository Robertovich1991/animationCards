import { StyleSheet } from "react-native";
import { BLACK, GREY_MG, OPACITY_GREEN, TEXT_COLOR, WHITE } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: "regular" }),
    color: GREY_MG,
    textAlign: "center",
    lineHeight: pixel(24)
  },
  wrapper: {
    paddingHorizontal: pixel(20),
    flex: 1,
    marginTop: pixel(150),
    gap: pixel(15)
  },
  button: {
    paddingVertical: pixel(15),
    borderRadius: pixel(30),
    backgroundColor: BLACK,
    borderColor: BLACK,
  },
  imageBack: {
    width: "100%",
    height: "100%"
  },
  welcomeText: {
    fontSize: pixel(48),
    fontWeight: "300",
    //fontFamily: "Montserrat-600",
    color: TEXT_COLOR,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: pixel(100)
  },
  succesfulMessage: {
    fontWeight: "300",
    //fontFamily: "Montserrat-600",
    color: GREY_MG,
    textAlign: "center"
  },
  succesful: {
    backgroundColor: OPACITY_GREEN,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixel(16),
    paddingVertical: pixel(16),
    borderRadius: pixel(10),
    justifyContent: "space-between"
  }

})
export default styles