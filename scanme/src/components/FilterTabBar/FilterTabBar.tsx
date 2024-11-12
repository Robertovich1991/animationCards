import React from "react";
import { View, ViewStyle, ScrollView } from "react-native";
import { pixel } from "../../utils/pixel";
import FilterTabBarItem from "./FilterTabBarItem/FilterTabBarItem";
import { styles } from "./FilterTabBar.style";

type IProps = {
  tabs: any[];
  selectedId: string;
  onPress: (id: string) => void;
  style?: ViewStyle;
};

const FilterTabBar: React.FC<IProps> = ({
  tabs,
  selectedId,
  onPress,
  style,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.container, style, { height: pixel(40) }]}>
        {tabs?.map((item, index) => {
          return (
            <FilterTabBarItem
              id={item.id}
              key={index}
              icon={item.icon}
              label={item.label}
              isSelected={selectedId === item.id}
              onPress={() => onPress(item.id)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default FilterTabBar;
