import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { WHITE } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  modalConent: {
    borderRadius: pixel(20),
    backgroundColor: WHITE,
    paddingVertical: pixel(15),
    paddingHorizontal: pixel(30),
  },
  close: {
    alignItems: "flex-end",
  },
  scrollViewContent: {
    flexGrow: 1,
  }
});
export default styles;
