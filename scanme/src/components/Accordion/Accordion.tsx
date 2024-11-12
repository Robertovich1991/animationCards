import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/svgs/index";
import styles from "./Accordion.style";

export interface IProps {
  title: string;
  content: JSX.Element;
  expanded: boolean;
  onHeaderPress?: () => void;
}
const Accordion: React.FC<IProps> = (props) => {
  const { onHeaderPress, expanded, title, content } = props;
  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={onHeaderPress}>
        <Text style={styles.accordTitle}>{title}</Text>
        {expanded ? <Icons.ArrowDown /> : <Icons.ArrowUp />}
      </TouchableOpacity>
      {expanded && <View style={styles.accordBody}>{content}</View>}
    </View>
  );
};

export default Accordion;
