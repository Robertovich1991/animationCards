import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { BLACK, GREY, TEXT_COLOR, WHITE } from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixel(25),
    paddingVertical: pixel(10),
    flex: 1,
  },
  profileBoard: {
    backgroundColor: WHITE,
    borderRadius: pixel(10),
    height: pixel(250)
  },
  profileEl: {
    height: pixel(45),
    borderBottomWidth: pixel(1),
    borderBottomColor: GREY,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixel(10)
  },
  input: {
    flex: 1,
    paddingHorizontal: pixel(13),
    paddingVertical: pixel(5),
    fontSize: pixel(22),
    color: TEXT_COLOR,
    //fontFamily: "Montserrat-400",
  },
  wrapper: {
    backgroundColor: WHITE,
    flex: 1
  },
  icon: {
    paddingRight: pixel(10)
  },
  inputForm: {
    flex: 1,
  },
  button: {
    paddingVertical: pixel(15),
    borderRadius: pixel(30),
    backgroundColor: BLACK,
    borderColor: BLACK
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
  forgot: {
    textAlign: "right",
    color: GREY,
    marginBottom: pixel(15)
  },
  signup: {
    fontSize: pixel(22),
    fontWeight: "300",
    //fontFamily: "Montserrat-600",
    textAlign: "right",
    marginTop: pixel(15),
    color: BLACK,
    fontStyle: "italic",
  },
  image: {
    width: pixel(30),
    height: pixel(30),
    borderRadius: pixel(15)
  },
  imageBack: {
    width: "100%",
    height: "100%"
  },
  mainWrapper: {
    paddingHorizontal: pixel(20),
    marginTop: pixel(70),
  },
  inputs: {
    gap: pixel(20)
  },
  scan: {
    backgroundColor: BLACK,
    borderRadius: pixel(20),
    width: pixel(80),
    height: pixel(80),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: pixel(10)
  },
  noResults: {
    alignItems: "center",
    paddingVertical: pixel(10)
  }
})
export default styles