import { StyleSheet } from "react-native";
import { pixel } from "../../utils/pixel";
import { BLACK, } from "../../assets/colors/colors";
import { textGlobalStyle } from "../../utils/text-globalStyles";

const styles = StyleSheet.create({

  previewTitle: {
    textAlign: "center",
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
  },
  buttonModal: {
    backgroundColor: BLACK,
    borderColor: BLACK,
    borderRadius: pixel(20),
  },
  link: {
    paddingVertical: pixel(20),
    borderRadius: pixel(16),
    backgroundColor: "#f8f9fa",
    gap: pixel(30),
    paddingHorizontal: pixel(20),
    marginTop: pixel(10)
  },
})
export default styles