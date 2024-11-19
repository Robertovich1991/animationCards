import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { BLACK, WHITE } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: WHITE,
    height: pixel(80),
    borderTopColor: 'white',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    alignItems: 'center',
    paddingHorizontal: pixel(34)
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
