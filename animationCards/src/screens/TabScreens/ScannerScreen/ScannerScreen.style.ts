import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    padding: 8,
    position: "relative",
    paddingHorizontal: pixel(16),
    paddingTop: pixel(60)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: pixel(16)
  },


})
export default styles