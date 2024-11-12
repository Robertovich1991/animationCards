import { StyleSheet } from 'react-native';

import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { BLACK, BLUE_DODGER, GREEN, LOGO_BLUE, RED_CRIMSON, WHITE } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: pixel(10),
    paddingVertical: pixel(8),
    paddingHorizontal: pixel(16),
    shadowColor: 'grey',
    alignItems: 'center',
    borderRadius: pixel(30)
  },
  box: {
    borderRadius: pixel(10),
    overflow: 'hidden',
  },
  darkTitle: {
    color: WHITE,
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    textAlign: 'center',
    color: BLACK
  },
  dark: {
    backgroundColor: BLACK,
    borderWidth: pixel(1),
    borderColor: BLACK,
    paddingVertical: pixel(6),
    borderRadius: pixel(30),
    height: pixel(54)
  },
  red: {
    backgroundColor: RED_CRIMSON,
    borderWidth: pixel(2),
    borderColor: RED_CRIMSON,
    paddingVertical: pixel(6),
    borderRadius: pixel(30)
  },
  green: {
    backgroundColor: GREEN,
    borderColor: GREEN,
    borderRadius: pixel(30)
  },
  whiteButton: {
    backgroundColor: WHITE,
    borderRadius: pixel(30),
    borderColor: BLACK,
    borderWidth: pixel(1),
    height: pixel(54)
  },
});

export default styles;