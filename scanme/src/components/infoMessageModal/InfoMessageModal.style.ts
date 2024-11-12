import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { BLACK, WHITE } from '../../assets/colors/colors';
import { textGlobalStyle } from '../../utils/text-globalStyles';

const styles = StyleSheet.create({
  modalConent: {
    backgroundColor: WHITE,
    paddingVertical: pixel(30),
    paddingHorizontal: pixel(25),
    borderRadius: pixel(30)
  },
  buttonStyle: {
    paddingVertical: pixel(10),
    backgroundColor: BLACK,
    borderColor: BLACK
  },
  title: {
    color: BLACK,
    textAlign: 'center',
    fontSize: pixel(18),
    ...textGlobalStyle({ size: pixel(22), weight: 'bold' }),
    //fontFamily: "Montserrat-500",

  },
  text: {
    color: BLACK,
    textAlign: 'center',
    marginVertical: pixel(30),
    ...textGlobalStyle({ size: pixel(16), weight: "regular" }),
    //fontFamily: "Montserrat-400",
  }
});
export default styles;
