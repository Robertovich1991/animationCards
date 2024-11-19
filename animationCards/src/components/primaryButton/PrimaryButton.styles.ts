import { StyleSheet } from 'react-native';

import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { BLACK, BLUE_DODGER, GREEN, LOGO_BLUE, RED_CRIMSON, WHITE } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: pixel(10),
    paddingVertical: pixel(10),
    paddingHorizontal: pixel(16),
    shadowColor: 'grey',
    alignItems: 'center',
   borderRadius: pixel(48)
  },
  darkTitle: {
    color: WHITE,
  },
  title: {
    ...textGlobalStyle({ size: pixel(14), weight: 'regular' }),
    textAlign: 'center',
    color: BLACK
  },
  dark: {
    backgroundColor: BLACK,
    borderWidth: pixel(1),
    borderColor: BLACK,
    borderRadius: pixel(48),
  },
  whiteButton: {
    backgroundColor: WHITE,
    borderRadius: pixel(48),
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: pixel(1),
  },
});

export default styles;