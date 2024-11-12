import React, { ReactNode } from "react";
import {
  Text,
  View,
  TextInput,
  ViewStyle,
  InputModeOptions,
} from "react-native";
import { FieldError } from "react-hook-form";
import { GREY } from "../../assets/colors/colors";
import inputStyles from "./ProfileInput.style";

export interface ITextInputProps {
  label?: string;
  value?: string | undefined;
  placeHolder: string;
  onChange?: (text?: string) => void;
  secure?: boolean;
  error?: FieldError | undefined;
  editable?: boolean;
  children?: ReactNode;
  propsInputStyles?: ViewStyle;
  numberOfLines?: number;
  multiline?: boolean;
  styles?: ViewStyle;
  inputMode?: InputModeOptions;
}

const ProfileInput: React.FC<ITextInputProps> = (props) => {
  const {
    label,
    value,
    placeHolder,
    onChange,
    secure,
    error,
    editable,
    children,
    styles,
    numberOfLines,
    multiline,
    propsInputStyles,
    inputMode,
  } = props;
  return (
    <View style={[inputStyles.container, styles]}>
      <View style={inputStyles.inputContainer}>
        <Text style={inputStyles.label}>{label}</Text>
        <TextInput
          placeholderTextColor={GREY}
          value={value}
          secureTextEntry={secure}
          numberOfLines={numberOfLines}
          multiline={multiline}
          onChangeText={onChange}
          style={[inputStyles.input, propsInputStyles]}
          placeholder={placeHolder}
          editable={editable}
          inputMode={inputMode}
        />
        {children}
      </View>
      {error ? (
        <Text style={inputStyles.errorMessage}>{error && error.message}</Text>
      ) : null}
    </View>
  );
};

export default ProfileInput;
