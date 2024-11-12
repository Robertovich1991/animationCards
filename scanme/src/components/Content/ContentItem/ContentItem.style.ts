import { StyleSheet } from 'react-native';
import { OFFWHITE_GREY, WHITE } from '../../../assets/colors/colors';
import { pixel } from '../../../utils/pixel';
import { textGlobalStyle } from '../../../utils/text-globalStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: OFFWHITE_GREY,
    borderRadius: 10,
    padding: pixel(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    width: pixel(30),
    height: pixel(30),
    borderRadius: pixel(5)
  },
  title: {
    ...textGlobalStyle({ size: pixel(16), weight: 'bold' }),
  },
  addContainer: {
    width: pixel(50),
    alignItems: "center",
    borderRadius: pixel(15),
    padding: pixel(7),
    backgroundColor: WHITE
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: pixel(10)
  },
  menu: {
    marginTop: pixel(10),
    padding: pixel(15),
    borderWidth: 1,
    borderRadius: pixel(10),
    borderColor: OFFWHITE_GREY,
    gap: pixel(15)
  },
  line: {
    width: "100%",
    borderColor: OFFWHITE_GREY,
    borderWidth: 1,
    marginVertical: pixel(10)
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: pixel(10),
    paddingVertical: pixel(10),
    gap: pixel(10)
  }
})
