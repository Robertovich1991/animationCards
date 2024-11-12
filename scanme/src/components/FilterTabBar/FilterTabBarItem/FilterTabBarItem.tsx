import React, { ReactNode } from "react";
import { TouchableOpacity, ViewStyle, Text } from "react-native";
import { style } from "./FilterTabBarItem.style";

type Props = {
  isSelected: boolean;
  label: string;
  onPress: (id: string) => void;
  styles?: ViewStyle;
  id: string;
  icon?: ReactNode;
};
const FilterTabBarItem: React.FC<Props> = (props) => {
  const { isSelected, label, onPress, styles, id, icon } = props;
  return (
    <TouchableOpacity
      style={[
        style.tab,
        isSelected ? style.selectedStyle : style.transparent,
        styles,
      ]}
      onPress={() => onPress(id)}
    >
      {icon && icon}
      <Text style={style.title}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FilterTabBarItem;
