import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { RED_CRIMSON, WHITE } from "../../../assets/colors/colors";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: pixel(15),
    paddingTop: pixel(40),
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    //fontFamily: "Montserrat-400",
    color: RED_CRIMSON
  },
  cameraBox: {
    gap: pixel(15)
  },
  image: {
    width: pixel(100),
    height: pixel(100),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: pixel(60),
    flex: 1,
    marginVertical: pixel(10),
    paddingBottom: pixel(30)
  },
  galery: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(10)
  },
  cameraText: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
  },
  modal: {
    height: pixel(450)
  },
  modalComponent: {
    gap: pixel(10),
    flex: 1,
  },
  flatlist: {
    gap: pixel(10),
    flexGrow: 1
  }
})
export default styles