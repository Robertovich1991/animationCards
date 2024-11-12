import { StyleSheet } from "react-native";
import { pixel } from "../../utils/pixel";
import { BLACK, GREY, OFFWHITE_GREY, } from "../../assets/colors/colors";

const styles = StyleSheet.create({
  newCard: {
    justifyContent: "center",
    alignItems: "center",
    height: pixel(270),
    width: pixel(270),
    borderWidth: 1,
    borderColor: GREY,
    borderStyle: "dashed",
    borderRadius: pixel(30),
    paddingHorizontal: pixel(15),
    gap: pixel(10),

  },
  circle: {
    width: pixel(60),
    height: pixel(60),
    borderRadius: pixel(30),
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
    fontSize: pixel(14),
    textAlign: "center"
  },
  button: {
    height: pixel(50),
    borderRadius: pixel(10),
    width: pixel(200),
    backgroundColor: BLACK,
    borderColor: BLACK
  },
  new: {
    paddingTop: pixel(250),
    alignItems: "center"
  }

})
export default styles