import { StyleSheet } from "react-native";
import { WHITE } from "../../assets/colors/colors";
import { pixel } from "../../utils/pixel";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixel(15),
  },
  wrapper: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: pixel(10)
  }

})
export default styles