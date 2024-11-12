import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { GHOST_WHITE, GREY, WHITE, } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    flexDirection: "row",
    gap: pixel(24)
  }


})
