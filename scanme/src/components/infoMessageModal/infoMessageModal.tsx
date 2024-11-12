import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import PrimaryButton, { ButtonTypes } from "../primaryButton/PrimaryButton";
import styles from "./InfoMessageModal.style";

type Props = {
  isVisible: boolean;
  text: string;
  title: string;
  onClose: () => void;
  buttonTitle: string;
};

const InfoMessageModal: React.FC<Props> = ({
  isVisible,
  text,
  title,
  onClose,
  buttonTitle,
}) => {
  return (
    <View>
      <Modal
        testID={"modal"}
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        useNativeDriverForBackdrop
      >
        <View style={styles.modalConent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <PrimaryButton
            style={styles.buttonStyle}
            onPress={onClose}
            type={ButtonTypes.DARK}
            title={buttonTitle}
          />
        </View>
      </Modal>
    </View>
  );
};
export default InfoMessageModal;
