import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { BLACK, GREY_MG, OFFWHITE_GREY, OPACITY_GREEN, TEXT_COLOR, WHITE } from "../../../assets/colors/colors";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

const styles = StyleSheet.create({
  inputForm: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  welcomeText: {
    fontSize: pixel(48),
    fontWeight: "300",
    color: TEXT_COLOR,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: pixel(100)
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: "regular" }),
    color: GREY_MG,
    textAlign: "center",
    lineHeight: pixel(24)

  },
  codeFieldRoot: {
    alignItems: "center",
  },
  cell: {
    width: pixel(50),
    height: pixel(56),
    backgroundColor: OFFWHITE_GREY,
    textAlign: 'center',
    borderRadius: pixel(4),
    ...textGlobalStyle({ size: pixel(20), weight: 'medium' }),
    paddingVertical: pixel(15)
  },
  focusCell: {
  },
  filledCell: {
    borderBottomWidth: 2,
    borderBottomColor: BLACK,
  },
  cellView: {
  },
  container: {
    flex: 1,
    backgroundColor: WHITE
  },

  wrapper: {
    paddingHorizontal: pixel(20),
    flex: 1,
    marginTop: pixel(150),
    gap: pixel(30)
  },
  button: {
    paddingVertical: pixel(15),
    borderRadius: pixel(30),
    backgroundColor: BLACK,
    borderColor: BLACK,
    marginTop: pixel(30)
  },
  succesfulMessage: {
    fontWeight: "300",
    color: GREY_MG,
  },
  succesful: {
    backgroundColor: OPACITY_GREEN,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixel(16),
    paddingVertical: pixel(16),
    borderRadius: pixel(10),
    gap: pixel(10)
  }
});
export default styles;
