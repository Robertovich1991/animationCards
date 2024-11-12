
import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(10),
    justifyContent: "space-between"
  },
  image: {
    width: pixel(50),
    height: pixel(50),
    borderRadius: pixel(25)
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),

  },
  description: {
    ...textGlobalStyle({ size: pixel(12), weight: 'regular' }),
  },
  row: {
    flexDirection: "row",
    gap: pixel(10),
    alignItems: "center"
  }
})
