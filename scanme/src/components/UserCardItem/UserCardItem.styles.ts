import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { BLACK, BLUE_DODGER, GREY, OFFWHITE_GREY, } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: pixel(30),
    alignItems: "center",
    marginTop: pixel(30),
    borderWidth: 1,
    borderColor: OFFWHITE_GREY,
    paddingBottom: pixel(10)
  },
  icon: {
    width: pixel(60),
    height: pixel(60),
    alignSelf: 'center',
  },
  background: {
    height: pixel(250),
    borderTopRightRadius: pixel(30),
    borderTopLeftRadius: pixel(30),
    width: "100%"
  },
  image: {
    width: pixel(150),
    height: pixel(150),
    marginTop: pixel(-80)
  },
  title: {
    ...textGlobalStyle({ size: pixel(30), weight: 'bold' }),
    //fontFamily: "Montserrat-500",
  },
  info: {
    marginTop: pixel(10),
    alignContent: "center",
    alignItems: "center",
    gap: pixel(10)
  },
  subtitle: {
    ...textGlobalStyle({ size: pixel(18), weight: 'bold' }),
    //fontFamily: "Montserrat-500",
    color: BLUE_DODGER
  },
  footer: {
    flexWrap: 'wrap',
    marginTop: pixel(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: pixel(20)
  },
  at: {
    color: BLACK
  },
  empty: {
    color: GREY,
    ...textGlobalStyle({ size: pixel(18), weight: 'regular' }),
    //fontFamily: "Montserrat-500",

  },
  content: {
    width: pixel(60),
    height: pixel(60),
    borderRadius: pixel(30)
  },
  row: {
    flexDirection: 'row',
    width: '60%',
  }
})
