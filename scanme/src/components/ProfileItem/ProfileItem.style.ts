import { StyleSheet } from 'react-native';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { pixel } from '../../utils/pixel';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    color: "#353535"
  },
  titleIcon: {
    gap: pixel(10),
    flexDirection: "row",
    alignItems: "center"
  }
});

export default styles;
