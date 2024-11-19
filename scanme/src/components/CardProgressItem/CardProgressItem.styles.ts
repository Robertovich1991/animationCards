import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { BLACK, GREY } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixel(4)
  },
  iconRound: {
    padding: pixel(6),
    backgroundColor: 'rgba(150,255,155,0.2)',
    borderRadius:100
  },
  title: {
    ...textGlobalStyle({ size: pixel(14), weight: 'medium' }),
    color: BLACK
  },
  subTitle:{
    color: GREY
  }
})