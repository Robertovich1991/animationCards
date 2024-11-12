import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ContactsItem.style";
import Icons from "../../assets/svgs/index";
import { pixel } from "../../utils/pixel";

type Props = {
  data: any;
};

const ContactItem: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: data?.image }} />
        <View style={{ gap: pixel(5) }}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.description}>{data?.description}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity>
          <Icons.Edit />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons.ThreeDots />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactItem;
