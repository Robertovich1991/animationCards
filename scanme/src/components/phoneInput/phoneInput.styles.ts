import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { BLACK, GHOST_WHITE, RED_CRIMSON } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: pixel(6),
    backgroundColor: GHOST_WHITE,
    marginTop: pixel(15)
  },
  valid: {
    color: RED_CRIMSON,
  },
  inValid: {
    color: BLACK,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  background: {
    backgroundColor: GHOST_WHITE,
    borderRadius: pixel(6),

  }
});

export default styles;
