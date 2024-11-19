import { View, Text } from "react-native";
import { styles } from "./CardItem.style";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  subTitle: string;
};

const CardItem: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.iconRound}>{props.icon}</View>
        <View style={{justifyContent:'space-between'}}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={[styles.title, styles.subTitle]}>{props.subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardItem;
