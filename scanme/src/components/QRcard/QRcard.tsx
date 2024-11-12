import { Text, TouchableOpacity } from "react-native";
import { BLACK, WHITE } from "../../assets/colors/colors";
import QRCode from "react-native-qrcode-svg";
import { styles } from "./QRcard.styles";

type Props = {
  value: string;
  onPress?: () => void;
  getRef?: any;
};

const QRcard: React.FC<Props> = (p: Props) => {
  let logoFromFile = require("../../assets/images/logoImage.png");
  return (
    <TouchableOpacity onPress={p.onPress} style={styles.qr}>
      <QRCode
        logoBackgroundColor={WHITE}
        logoSize={40}
        logo={logoFromFile}
        getRef={p.getRef}
        backgroundColor={WHITE}
        color={BLACK}
        value={p.value}
        size={120}
      />
      <Text style={styles.text}>Scan to share card</Text>
    </TouchableOpacity>
  );
};

export default QRcard;
