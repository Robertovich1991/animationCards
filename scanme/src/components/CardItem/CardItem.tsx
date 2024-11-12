import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AvatarItem from "../AvatarItem/AvatarItem";
import { ICardItem } from "../../interfaces/types";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import { GREY } from "../../assets/colors/colors";
import Icons from "../../assets/svgs/index";
import { styles } from "./CardItem.style";
import { pixel } from "../../utils/pixel";

type Props = {
  data: ICardItem;
  onPressEdit: (data: any) => void;
  onPressDelete: (id: number) => void;
  isVisible: boolean;
  onPressPreview?: (data: any) => void;
};

const CardItem: React.FC<Props> = (props) => {
  const { data, onPressEdit, isVisible, onPressDelete, onPressPreview } = props;
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const image = require("../../assets/images/coverAbstract.jpg");
  return (
    <View style={styles.container}>
      {/* <SwitchComponent
        containerStyle={styles.switch}
        isEnabled={isEnabled}
        toggleSwitch={toggleSwitch}
      /> */}
      <Image
        resizeMode="stretch"
        style={styles.background}
        source={
          data?.coverImage
            ? {
                uri: `https://scanme.am/api/admin/content/getImage?image=${data.coverImage}`,
              }
            : image
        }
      />
      <View style={styles.info}>
        {/* <AvatarItem
          avatarStyle={{ marginTop: -30 }}
          style={styles.image}
          image={data?.profilePic || ""}
          isDisabled={true}
        /> */}
        <Text style={styles.title}>
          {data?.name} {data?.surname}
        </Text>
        <View style={styles.cardID}>
          <Text>{data.cardId}</Text>
        </View>
        {data?.specialization && data?.company ? (
          <Text style={styles.subtitle}>
            {data?.specialization} at {data?.company}
          </Text>
        ) : (
          <View style={styles.empty} />
        )}
      </View>
      <View
        style={[
          styles.footer,
          isVisible && {
            flexDirection: "row",
            justifyContent: "center",
            gap: pixel(10),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => onPressEdit && onPressEdit(data)}
        >
          <Icons.Edit />
          <Text style={styles.title}>Edit</Text>
        </TouchableOpacity>

        {isVisible ? (
          <TouchableOpacity
            disabled={!isEnabled}
            style={[styles.footerButton]}
            onPress={() => {
              onPressDelete && onPressDelete(data?.id);
            }}
          >
            <Icons.Delete style={!isEnabled && { opacity: 0.5 }} />
            <Text
              style={[
                styles.title,
                !isEnabled && {
                  color: GREY,
                },
              ]}
            >
              Delete
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            onPressPreview && onPressPreview(data);
          }}
        >
          <Text style={styles.title}>Preview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardItem;
