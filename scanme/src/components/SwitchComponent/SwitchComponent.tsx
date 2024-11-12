import { View, Switch, ViewStyle } from "react-native";
import { BRIGHT_GRAY, GREEN, WHITE } from "../../assets/colors/colors";

type Props = {
  isEnabled: boolean;
  toggleSwitch: () => void;
  containerStyle?: ViewStyle;
};

const SwitchComponent: React.FC<Props> = (props) => {
  const { isEnabled, toggleSwitch, containerStyle } = props;
  return (
    <View style={containerStyle}>
      <Switch
        trackColor={{ true: WHITE }}
        thumbColor={isEnabled ? GREEN : WHITE}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default SwitchComponent;
