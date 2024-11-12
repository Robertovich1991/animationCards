import { StyleSheet } from "react-native";
import { pixel } from "../../utils/pixel";
import { BRIGHT_GRAY, OFFWHITE_GREY, WHITE, WILD_BLUE } from "../../assets/colors/colors";

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: pixel(5),
    marginTop: pixel(10)
  },
  accordHeader: {
    padding: pixel(15),
    borderWidth: 1,
    borderColor: OFFWHITE_GREY,
    borderTopLeftRadius: pixel(10),
    borderTopRightRadius: pixel(10),
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accordTitle: {
    fontSize: pixel(16),
  },
  accordBody: {
    padding: pixel(10),
    borderWidth: 1,
    borderColor: BRIGHT_GRAY,
    borderTopColor: WILD_BLUE,
    borderBottomLeftRadius: pixel(10),
    borderBottomRightRadius: pixel(10)
  },
});

export default styles