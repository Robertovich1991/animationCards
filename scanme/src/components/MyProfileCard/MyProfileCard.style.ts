import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { textGlobalStyle } from '../../utils/text-globalStyles';
import { GHOST_WHITE, GREY, } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: GHOST_WHITE,
    borderRadius: pixel(10),
    padding: pixel(10),
    gap: pixel(20)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: pixel(10),
    borderBottomWidth: 1,
    borderBottomColor: GREY
  },
  image: {
    width: pixel(100),
    height: pixel(100),
    borderRadius: pixel(50)
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
    //fontFamily: "Montserrat-400",
  },
  info: {
    gap: pixel(15)
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(5)
  }

})
