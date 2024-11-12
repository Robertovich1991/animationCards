import React from "react";
import styles from "./PrimaryButton.styles";
import { TouchableNativeFeedback, View, Text, ViewStyle } from "react-native";

export enum ButtonTypes {
  WHITE = "WHITE",
  DARK = "DARK",
  RED = "RED",
  GREEN = "GREEN",
}

type Props = {
  title?: string;
  isDisabled?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle | ViewStyle[];
  type?: ButtonTypes;
  onPress?: () => void;
};

const BUTTON_STYLES: any = {
  [ButtonTypes.WHITE]: {
    button: styles.whiteButton,
    title: [styles.title],
  },
  [ButtonTypes.DARK]: {
    button: styles.dark,
    title: [styles.darkTitle],
  },
  [ButtonTypes.RED]: {
    button: [styles.red],
    title: [styles.title],
  },
  [ButtonTypes.GREEN]: {
    button: [styles.red, styles.green],
    title: [styles.title],
  },
};

const PrimaryButton: React.FC<Props> = (p: Props) => {
  return (
    <View
      style={[
        styles.box,
        p.type && BUTTON_STYLES[p.type].container,
        p.containerStyle,
        p.isDisabled && { opacity: 0.5 },
      ]}
    >
      <TouchableNativeFeedback
        disabled={p.isDisabled}
        background={TouchableNativeFeedback.Ripple("", false)}
        onPress={() => {
          if (p.onPress) {
            p.onPress();
          }
        }}
      >
        <View
          style={[
            styles.container,
            p.type ? BUTTON_STYLES[p.type].button : BUTTON_STYLES.WHITE.button,
            p.style,
          ]}
        >
          <Text
            style={[
              styles.title,
              p.type ? BUTTON_STYLES[p.type].title : BUTTON_STYLES.WHITE.title,
            ]}
          >
            {p.title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default PrimaryButton;
