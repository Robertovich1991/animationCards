import {
  Image,
  View,
  Text,
  ImageStyle,
} from "react-native";
import Icons from "../../assets/svgs";
import { styles } from "./AvatarItem.styles";

interface Props {
  uri: string;
  name: string;
  surname: string;
  style: ImageStyle;
}

const AvatarItem: React.FC<Props> = (p: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: p.uri,
        }}
        style={[styles.image, p.style]}
      />
      <View>
        <Text style={styles.nameText}>{p.name}</Text>
        <View style={styles.surname}>
          <Text>{p.surname}</Text>
          <Icons.Verify />
        </View>
      </View>
    </View>
  );
};

export default AvatarItem;
