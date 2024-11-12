import { StyleSheet } from "react-native";
import { pixel } from "../../utils/pixel";
import { BLACK, GHOST_WHITE, GREY, OFFWHITE_GREY, RED_CRIMSON, } from "../../assets/colors/colors";

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
    backgroundColor: GHOST_WHITE,
    borderRadius: pixel(6),
  },
  input: {
    flex: 1,
    paddingHorizontal: pixel(13),
    fontSize: pixel(20),
    color: BLACK,
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
  newCard: {
    justifyContent: "center",
    alignItems: "center",
    height: pixel(200),
    width: pixel(200),
    borderWidth: 1,
    borderColor: GREY,
    borderStyle: "dashed",
    borderRadius: pixel(30),
    paddingHorizontal: pixel(15),
    gap: pixel(10)
  },
  circle: {
    width: pixel(50),
    height: pixel(50),
    borderRadius: pixel(25),
    backgroundColor: OFFWHITE_GREY,
    alignItems: "center",
    justifyContent: "center"
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