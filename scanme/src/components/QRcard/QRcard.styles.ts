import { StyleSheet } from 'react-native';
import { WHITE } from '../../assets/colors/colors';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';

export const styles = StyleSheet.create({
  qr: {
    alignSelf: 'center',
    alignItems: "center",
    paddingHorizontal: pixel(25),
    marginTop: pixel(10),
    paddingVertical: pixel(20),
    borderRadius: pixel(30),
    backgroundColor: WHITE,
    gap: pixel(10)
  },
  text: {
    textAlign: 'center',
    ...textGlobalStyle({ size: pixel(14), weight: 'bold' }),
    paddingTop: pixel(5)
  },
  logo: {
    position: "absolute",
    top: "40%",
    left: "30%",
    backgroundColor: WHITE,
  }
})
