import { StyleSheet } from "react-native";
import { BLACK, GHOST_WHITE, GREY, OFFWHITE_GREY, WHITE } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GHOST_WHITE,
    paddingTop: pixel(40)
  },
  button: {
    width: "50%",
    paddingVertical: pixel(10),
    alignSelf: "flex-end",
    borderRadius: pixel(50)
  },
  buttonContainer: {
    margin: pixel(15)
  },
  profileEl: {
    height: pixel(45),
    borderBottomWidth: pixel(1),
    borderBottomColor: GREY,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixel(10)
  },
  image: {
    width: pixel(30),
    height: pixel(30),
    borderRadius: pixel(15)
  },
  input: {
    flex: 1,
    paddingHorizontal: pixel(13),
    paddingVertical: pixel(5),
    fontSize: pixel(22),
    color: BLACK,
    //fontFamily: "Montserrat-400",
  },
  inputStyle: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: OFFWHITE_GREY
  },
  inputContainer: {
    paddingHorizontal: pixel(15),
    paddingVertical: pixel(10)
  },
  header: {
    flexDirection: "row",
    backgroundColor: OFFWHITE_GREY,
    marginHorizontal: pixel(15),
    borderRadius: pixel(15),
    justifyContent: "space-between",
    height: pixel(40),
    alignItems: "center",
    paddingRight: pixel(15),
    marginTop: pixel(10)
  },
  upgradeText: {
    fontSize: pixel(16),
    color: WHITE,
    fontWeight: "600",
  },
  upgrade: {
    backgroundColor: BLACK,
    height: "100%",
    paddingHorizontal: pixel(15),
    justifyContent: "center",
    borderRadius: pixel(15)
  },
  supportText: {
    fontSize: pixel(16),
    color: BLACK,
    fontWeight: "600",
  },
})
export default styles