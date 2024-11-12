import { Text, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/svgs/index";
import { styles } from "./Header.style";

type Props = {
  title?: string;
  onPressArrow?: () => void;
};

const Header: React.FC<Props> = (props) => {
  const { title, onPressArrow } = props;
  return (
    <View style={styles.container}>
      {onPressArrow ? (
        <TouchableOpacity onPress={onPressArrow}>
          <Icons.ArrowBack />
        </TouchableOpacity>
      ) : (
        <Icons.Logo width={150} height={40} />
      )}
      {title ? <Text>{title}</Text> : <View />}
      <View />
    </View>
  );
};

export default Header;
