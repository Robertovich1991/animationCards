import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { BLACK, WHITE } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: WHITE,
    height: pixel(90),
    paddingTop: pixel(15),
    alignItems: 'center',
  },
  tabBarLight: {
    backgroundColor: WHITE,
    height: pixel(90),
    paddingTop: pixel(15),
  },
  share: {
    backgroundColor: BLACK,
    width: pixel(65),
    height: pixel(65),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: pixel(20),
  }
});

export default styles;
