import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SwitchComponent from "../../SwitchComponent/SwitchComponent";
import Icons from "../../../assets/svgs/index";
import { styles } from "./ActiveContentItem.style";

type Props = {
  data?: any;
  handlerDeleteContent: (id: number) => void;
};

const ActiveContentItem: React.FC<Props> = (props) => {
  const { data, handlerDeleteContent } = props;
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: `https://scanme.am/api/admin/content/getImage?image=${data?.contentIcon}`,
          }}
        />
        <Text style={styles.title}>{data?.name}</Text>
      </View>
      <View style={styles.row}>
        {!isEnabled && (
          <TouchableOpacity onPress={() => handlerDeleteContent(data?.id)}>
            <Icons.Delete />
          </TouchableOpacity>
        )}
        <SwitchComponent isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
      </View>
    </View>
  );
};

export default ActiveContentItem;
