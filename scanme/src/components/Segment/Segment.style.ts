import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  segment: {
    height: pixel(50),
    width: '100%',
  },
})
