import { StyleSheet } from 'react-native';
import { pixel } from '../../../utils/pixel';
import { textGlobalStyle } from '../../../utils/text-globalStyles';
import { OFFWHITE_GREY } from '../../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: pixel(15),
    borderRadius: pixel(20),
    backgroundColor: OFFWHITE_GREY,
    justifyContent: "space-between"
  },
  image: {
    width: pixel(40),
    height: pixel(40),
    borderRadius: pixel(10)
  },
  title: {
    ...textGlobalStyle({ size: pixel(18), weight: 'bold' }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(10)
  },

});