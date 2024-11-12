import { TouchableOpacity, View } from "react-native";
import Icons from "../../assets/svgs/index";
import { styles } from "./MainHeader.style";

type Props = {
  onPressMenu?: () => void;
  onPressShopping?: () => void;
};

const MainHeader: React.FC<Props> = (props) => {
  const { onPressMenu, onPressShopping } = props;

  return (
    <View style={styles.container}>
      <Icons.Logo />
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onPressShopping}>
          <Icons.Shopping />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressMenu}>
          <Icons.Menu />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;
