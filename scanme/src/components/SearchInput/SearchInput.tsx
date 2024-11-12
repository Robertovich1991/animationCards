import React from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { BLACK, GREY } from "../../assets/colors/colors";
import styles from "./SearchInput.styles";
import Icons from "../../assets/svgs/index";
import { pixel } from "../../utils/pixel";

type Props = {
  title?: string;
  style?: ViewStyle;
  value?: string;
  keyboard?: KeyboardTypeOptions | undefined;
  placeholder: string;
  handleOnBlur?: () => void;
  handleOnFocus?: () => void;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
  inputRef?: React.LegacyRef<TextInput>;
};

const TextInputField: React.FC<Props> = (p: Props) => {
  return (
    <View>
      {p.title && <Text style={styles.title}>{p.title}</Text>}
      <View style={[styles.inputBox, p.style]}>
        <TextInput
          placeholderTextColor={GREY}
          ref={p.inputRef}
          onChangeText={p.onChangeText}
          value={p.value}
          placeholder={p.placeholder}
          onFocus={p.handleOnFocus}
          keyboardType={p.keyboard}
          onBlur={p.handleOnBlur}
          selectionColor={BLACK}
          style={styles.inputText}
        />
        <Icons.Search width={pixel(30)} height={pixel(30)} />
      </View>
    </View>
  );
};

export default TextInputField;
