import { StyleSheet } from "react-native";
import { pixel } from "../../../utils/pixel";
import { BLACK_FOOTER, GREY, GREY_MG, LOGIN_INPUT_BG, TEXT_COLOR, WHITE } from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: pixel(40),
  },
  digital: {
    color: TEXT_COLOR,
    fontSize: pixel(64),
    fontWeight: "700"
  },
  image: {
    width: pixel(400),
    height: pixel(420)
  },
  connect: {
    color: TEXT_COLOR,
    fontSize: pixel(48),
    fontWeight: "300",
    fontStyle: "italic"
  },
  subConnect: {
    color: GREY_MG,
    fontSize: pixel(20),
    fontWeight: "400",
    lineHeight: pixel(30)
  },
  netWorking: {
    backgroundColor: LOGIN_INPUT_BG,
    height: pixel(700),
    borderRadius: pixel(20),
    paddingHorizontal: pixel(20),
  },
  networkImage: {
    width: pixel(390),
    height: pixel(293),
  },
  phones: {
    // position: "absolute",
    // zIndex: 1
  },
  netWorkingText: {
    color: TEXT_COLOR,
    fontSize: pixel(36),
    fontWeight: "700",
    lineHeight: pixel(40),
  },
  subtitle: {
    color: GREY_MG,
    fontSize: pixel(20),
    fontWeight: "400",
    lineHeight: pixel(30),
    marginTop: pixel(20)
  },
  socials: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: pixel(40)
  },
  card: {
    paddingHorizontal: pixel(20),
    paddingVertical: pixel(24),
    backgroundColor: LOGIN_INPUT_BG,
    borderRadius: pixel(20)
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixel(20)
  },
  footer: {
    height: pixel(70),
    backgroundColor: LOGIN_INPUT_BG,
    padding: pixel(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  footerContent: {
    backgroundColor: "rgba(242, 247, 252, 0.5)",
    paddingHorizontal: pixel(20),
    paddingVertical: pixel(40)
  },
  footerRow: {
    flexDirection: "row",
    gap: pixel(40),
  },
  footerTitle: {
    color: TEXT_COLOR,
    fontSize: pixel(18),
    fontWeight: "700",
    lineHeight: pixel(27),
    marginBottom: pixel(10)
  },
  footerSubtitle: {
    color: BLACK_FOOTER,
    fontSize: pixel(16),
    fontWeight: "400",
    lineHeight: pixel(24),
  },
  profileBoard: {
    backgroundColor: WHITE,
    borderRadius: pixel(10),
    height: pixel(250)
  },
  profileEl: {
    height: pixel(45),
    borderBottomWidth: pixel(1),
    borderBottomColor: GREY,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixel(10)
  },
  input: {
    flex: 1,
    paddingHorizontal: pixel(13),
    paddingVertical: pixel(5),
    fontSize: pixel(22),
    color: TEXT_COLOR,
    //fontFamily: "Montserrat-400",
  },
})
export default styles