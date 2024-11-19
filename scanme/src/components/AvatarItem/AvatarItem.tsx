import { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from "react-native";
import Icons from "../../assets/svgs";
import { styles } from "./AvatarItem.styles";
import { NumberProp } from "react-native-svg";
import { pixel } from "../../utils/pixel";

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
        <Text>{p.surname}</Text>
      </View>
    </View>
  );
};

export default AvatarItem;
