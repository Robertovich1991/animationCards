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
  style: ImageStyle;
  containerStyle?: ViewStyle;
  avatarStyle?: ViewStyle;
  isDisabled?: boolean;
  isVisible?: boolean;
  image: any;
  pickImage?: (text?: string) => void;
  deleteImage?: () => void;
}

const AvatarItem: React.FC<Props> = (p: Props) => {
  return (
    <View style={p.containerStyle}>
      <TouchableOpacity disabled={p.isDisabled} onPress={p.pickImage}>
        {p.image && p.image !== "noImage" ? (
          <Image
            source={{
              uri: p.image.startsWith("file://")
                ? p.image
                : `https://scanme.am/api/admin/content/getImage?image=${p.image}`,
            }}
            style={[styles.container, p.style]}
          />
        ) : (
          <Icons.Avatar
            style={p.avatarStyle}
            width={p.style.width as NumberProp}
            height={p.style.width as NumberProp}
          />
        )}
        {p.isVisible && (
          <>
            <TouchableOpacity onPress={p.deleteImage} style={styles.delete}>
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={p.pickImage} style={styles.camera}>
              <Icons.CameraPick width={pixel(30)} height={pixel(30)} />
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AvatarItem;
