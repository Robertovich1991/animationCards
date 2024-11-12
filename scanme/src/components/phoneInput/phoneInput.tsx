import React, { useRef } from "react";
import { View, ViewStyle } from "react-native";
import styles from "./phoneInput.styles";
import PhoneInput from "react-native-phone-number-input";

type Props = {
  style?: ViewStyle;
  value: string;
  onChangeText: (text: string) => void;
  onChangeCountryCode?: (countryCode: string) => void;
};

const PhoneInputButton: React.FC<Props> = (p: Props) => {
  const phoneInput = useRef<PhoneInput>(null);
  const checkValid = phoneInput.current?.isValidNumber(p.value);
  return (
    <View style={[styles.container, p.style]}>
      <PhoneInput
        textContainerStyle={styles.background}
        containerStyle={styles.background}
        value={p.value}
        ref={phoneInput}
        textInputStyle={checkValid ? styles.inValid : styles.valid}
        defaultCode="AM"
        layout="first"
        onChangeCountry={(country) => {
          p.onChangeCountryCode &&
            p.onChangeCountryCode(country.callingCode[0]);
        }}
        onChangeText={p.onChangeText}
      />
    </View>
  );
};

export default PhoneInputButton;
