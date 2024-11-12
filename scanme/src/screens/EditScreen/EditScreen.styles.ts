import { StyleSheet } from "react-native";
import { BLACK, GREY, RED_CRIMSON, OFFWHITE_GREY, WHITE } from "../../assets/colors/colors";
import { pixel } from "../../utils/pixel";
import { textGlobalStyle } from "../../utils/text-globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: pixel(10),
    paddingHorizontal: pixel(10),
  },
  imageBox: {
    alignSelf: 'center',
    marginVertical: pixel(20),
  },
  cameraBox: {
    gap: pixel(15)
  },
  inputBox: {
    justifyContent: "center",
    gap: pixel(30),
  },
  image: {
    width: pixel(100),
    height: pixel(100),
  },
  label: {
    fontSize: pixel(14),
    color: BLACK,
    // fontFamily: "Montserrat-600",
  },
  error: {
    color: RED_CRIMSON,
  },
  button: {
    gap: pixel(30),
    paddingTop: pixel(50),
  },
  editable: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GREY,
    borderRadius: pixel(10),
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: OFFWHITE_GREY,
    borderRadius: pixel(6),
    paddingLeft: pixel(10),
  },
  countryPickerButton: {
    backgroundColor: OFFWHITE_GREY,
    height: pixel(58),
  },
  textContainer: {
    backgroundColor: OFFWHITE_GREY,
    borderTopRightRadius: pixel(6),
    borderBottomRightRadius: pixel(6),
  },
  primaryButton: {
    backgroundColor: BLACK,
    borderColor: BLACK,
    borderRadius: pixel(10),
  },
  galery: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(10)
  },
  cameraText: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
  }
});

export default styles;
