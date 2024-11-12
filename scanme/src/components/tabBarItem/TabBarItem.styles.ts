import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { BLACK, GREY, RED, SCANNER, WHITE } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: pixel(5),
    paddingHorizontal: pixel(15),
    gap: pixel(3)
  },
  selectedTitle: {
    color: RED,
  },
  light: {
    backgroundColor: 'grey',
  },
  title: {
    color: GREY,
    fontSize: pixel(12),
    fontWeight: "bold",
  },
  lightTitle: {
    color: BLACK,
  },
  focusedText: {
    color: BLACK,
    fontSize: pixel(12),
    fontWeight: "bold",
  }
});

export default styles;
