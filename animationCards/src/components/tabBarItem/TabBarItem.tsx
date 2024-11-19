import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import styles from "./TabBarItem.styles";

export enum ItemType {
  DARK = "FOCUSED",
  LIGHT = "LIGHT",
}

type Props = {
  title: string;
  icon: ReactNode;
  type: ItemType;
  focused?: boolean;
};
const ITEM_STYLE = {
  [ItemType.DARK]: {
    title: styles.title,
  },
  [ItemType.LIGHT]: {
    item: styles.light,
    title: styles.lightTitle,
  },
};

const TabBarItem: React.FC<Props> = (p: Props) => {
  return (
    <View style={[styles.container, p.focused && ITEM_STYLE[p.type].item]}>
      {p.icon}
      <Text style={[styles.title, , p.focused && styles.focusedText]}>
        {p.title}
      </Text>
    </View>
  );
};

export default TabBarItem;
