import { View, Text } from "react-native";
import { ICardItem } from "../../interfaces/types";
import { ReactNode } from "react";
import * as Progress from "react-native-progress";

import { styles } from "./CardProgressItem.styles";
import { pixel } from "../../utils/pixel";

type Props = {
  icon: ReactNode;
  title: string;
  subTitle: string;
};

const CardProgressItem: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.iconRound}>{props.icon}</View>
        <View style={{ gap: 4 }}>
          <Text style={styles.title}>{props.title}</Text>
          <Progress.Bar
            height={12}
            borderRadius={0}
            color="green"
            progress={0.3}
            width={60}
          />
        </View>
      </View>
    </View>
  );
};

export default CardProgressItem;
