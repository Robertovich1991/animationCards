import { View, Text } from "react-native";
import { ReactNode } from "react";
import * as Progress from "react-native-progress";
import Icons from "../../assets/svgs";
import { styles } from "./CardProgressItem.styles";
import { pixel } from "../../utils/pixel";
import { BLACK } from "../../assets/colors/colors";

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
          <View style={styles.textBox}>
            <Text style={styles.title}>{props.title}</Text>
            <Icons.Poligon />
            <Text style={styles.count}>21</Text>
          </View>
          <Progress.Bar
            style={{ padding: 2, borderColor: BLACK }}
            height={pixel(12)}
            borderRadius={pixel(4)}
            color="rgba(156,205,150,0.8)"
            progress={0.3}
            width={60}
          />
        </View>
      </View>
    </View>
  );
};

export default CardProgressItem;
