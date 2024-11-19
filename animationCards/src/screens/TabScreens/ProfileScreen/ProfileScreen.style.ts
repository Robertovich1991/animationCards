import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { LOGO_BLUE, WHITE } from "../../../assets/colors/colors";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: pixel(10),
    paddingTop: pixel(40)
  },
  user: {
    paddingHorizontal: pixel(15),
    marginTop: pixel(15),
    gap: pixel(10)
  },
  logout: {
    justifyContent: "flex-end",
    marginVertical: pixel(15),
    textAlign: "center",
    flexDirection: "row",
    gap: pixel(5),
    marginRight: pixel(20)
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    //fontFamily: "Montserrat-400",
    color: LOGO_BLUE,
  },
  settings: {
    ...textGlobalStyle({ size: pixel(30), weight: 'bold' }),
    color: "#353535",
    marginBottom: pixel(20)
  },
  analitycs: {
    paddingVertical: pixel(20),
    borderRadius: pixel(16),
    backgroundColor: "#f8f9fa",
    gap: pixel(15),
    paddingHorizontal: pixel(20)
  },
  userContent: {
    flexDirection: "row",
    backgroundColor: WHITE,
    borderRadius: pixel(10),
    alignItems: "center",
    paddingVertical: pixel(5),
    paddingLeft: pixel(10),
    justifyContent: "space-between"
  },
  image: {
    width: pixel(30),
    height: pixel(30),
    borderRadius: pixel(15)
  },
  username: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
  },
  textTitle: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    color: "#353535"
  },
  row: {
    flexDirection: "row",
    gap: pixel(10),
    alignItems: "center",
  },
})
export default styles