import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { LOGO_BLUE, OFFWHITE_GREY, } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: pixel(30),
    alignItems: "center",
    marginTop: pixel(30),
    borderWidth: 1,
    borderColor: OFFWHITE_GREY,
    paddingBottom: pixel(10),
  },
  background: {
    height: pixel(100),
    borderTopRightRadius: pixel(30),
    borderTopLeftRadius: pixel(30),
    width: pixel(297),
  },
  image: {
    width: pixel(90),
    height: pixel(90),
    marginTop: pixel(-30)
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    //fontFamily: "Montserrat-500",
  },
  info: {
    marginTop: pixel(10),
    alignContent: "center",
    alignItems: "center",
    gap: pixel(10)
  },
  subtitle: {
    ...textGlobalStyle({ size: pixel(12), weight: 'bold' }),
    //fontFamily: "Montserrat-500",
    color: LOGO_BLUE,
    marginBottom: pixel(20)
  },
  footer: {
    width: "100%",
    gap: pixel(10),
    paddingBottom: pixel(10),
    paddingHorizontal: pixel(10),

  },
  footerButton: {
    paddingVertical: pixel(10),
    paddingHorizontal: pixel(10),
    borderRadius: pixel(10),
    backgroundColor: OFFWHITE_GREY,
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(10),
    justifyContent: "center",
  },
  cardID: {
    backgroundColor: OFFWHITE_GREY,
    borderRadius: pixel(30),
    paddingVertical: pixel(5),
    paddingHorizontal: pixel(10)
  },
  switch: {
    position: "absolute",
    zIndex: 1,
    right: 10,
    top: 10
  },
  empty: {
    paddingVertical: pixel(5)
  }
})
