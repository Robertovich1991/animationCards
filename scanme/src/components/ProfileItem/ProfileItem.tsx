import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/svgs/index";
import styles from "./ProfileItem.style";

type Props = {
  title: string;
  onPress?: () => void;
  icon?: ReactNode;
  value?: string;
  leftIcon?: ReactNode;
};

const ProfileItem: React.FC<Props> = (props: Props) => {
  const { onPress, title, icon, value, leftIcon } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleIcon}>
        {leftIcon && leftIcon}
        <Text style={styles.title}>{title}</Text>
      </View>
      {icon ? (
        <Icons.ArrowUp style={{ transform: [{ rotate: "90deg" }] }} />
      ) : (
        <Text numberOfLines={1}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ProfileItem;
