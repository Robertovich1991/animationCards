import React, { ReactNode } from "react";
import { TouchableOpacity, View, Text, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import styles from "./ModalComponent.style";

type Props = {
  isVisible: boolean;
  content: ReactNode;
  onClose?: () => void;
  containerStyle?: ViewStyle;
};

const ModalComponent: React.FC<Props> = ({
  isVisible,
  content,
  onClose,
  containerStyle,
}) => {
  return (
    <View>
      <Modal
        // coverScreen
        avoidKeyboard
        testID={"modal"}
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        useNativeDriverForBackdrop
      >
        <View style={[styles.modalConent, containerStyle]}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={{ fontSize: 20 }}>X</Text>
          </TouchableOpacity>
          {content}
        </View>
      </Modal>
    </View>
  );
};
export default ModalComponent;
