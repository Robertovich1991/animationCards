import React from "react";
import { NativeSyntheticEvent, View, ViewStyle } from "react-native";
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from "@react-native-segmented-control/segmented-control";
import { styles } from "./Segment.style";
import { BLACK } from "../../assets/colors/colors";

type Props = {
  values: Array<string>;
  style?: ViewStyle;
  tabStyle?: ViewStyle;
  selectedIndex?: number;
  tintColor?: string;
  handleTabsChange: (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>
  ) => void;
};

const Segment: React.FC<Props> = (props) => {
  const {
    style,
    selectedIndex,
    handleTabsChange,
    values,
    tabStyle,
    tintColor,
  } = props;
  return (
    <View style={[styles.container, style]}>
      <SegmentedControl
        fontStyle={{ color: BLACK }}
        onChange={handleTabsChange}
        style={styles.segment}
        tabStyle={tabStyle}
        tintColor={tintColor}
        values={values}
        selectedIndex={selectedIndex}
      />
    </View>
  );
};

export default Segment;
