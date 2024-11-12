import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { GREY, WHITE, TEXT_COLOR, GREY_MG, OPACITY_GREEN, BLACK } from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    gap: pixel(15),
    flex: 1,
    marginTop: pixel(30),
  },
  wrapper: {
    backgroundColor: WHITE,
    flex: 1,
    paddingBottom: pixel(30),
    paddingVertical: pixel(15),
  },
  icon: {
    paddingRight: pixel(10)
  },
  inputForm: {
    marginTop: pixel(25),
    paddingHorizontal: pixel(20),
  },
  button: {
    paddingVertical: pixel(15),
    borderRadius: pixel(30),
    backgroundColor: BLACK,
    borderColor: BLACK,
    marginHorizontal: pixel(20)
  },
  welcomeText: {
    fontSize: pixel(48),
    fontWeight: "300",
    // //fontFamily: "Montserrat-600",
    color: TEXT_COLOR,
    fontStyle: "italic",
    textAlign: "center"
  },
  subtitle: {
    color: GREY,
    //fontFamily: "Montserrat-400",
  },
  imageBack: {
    width: "100%",
    height: "100%"
  },
  inputs: {
    gap: pixel(10),
    paddingBottom: pixel(30)
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