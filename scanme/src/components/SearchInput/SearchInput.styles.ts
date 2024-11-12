import { StyleSheet } from 'react-native';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { pixel } from '../../utils/pixel';
import { BLACK, WHITE, OFFWHITE_GREY } from '../../assets/colors/colors';

const styles = StyleSheet.create({

  title: {
    ...textGlobalStyle({ size: pixel(22), weight: 'bold' }),
    color: WHITE,
    paddingTop: pixel(34),
    paddingBottom: pixel(8)
  },
  inputBox: {
    backgroundColor: OFFWHITE_GREY,
    borderRadius: pixel(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: pixel(16),
    height: pixel(50),
  },
  inputText: {
    color: BLACK,
    paddingVertical: pixel(8),
    fontSize: pixel(16),
  },
});

export default styles;
