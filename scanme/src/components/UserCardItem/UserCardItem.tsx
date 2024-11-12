import { useCallback } from "react";
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICardItem } from "../../interfaces/types";
import Icons from "../../assets/svgs/index";
import { pixel } from "../../utils/pixel";
import PrimaryButton, { ButtonTypes } from "../primaryButton/PrimaryButton";
import { BLACK } from "../../assets/colors/colors";
import { styles } from "./UserCardItem.styles";

type Props = {
  data: ICardItem;
  content: any;
  createProfile?: () => void;
  saveUserContact?: (id: number) => void;
};

const socials: any = {
  VIBER: <Icons.Viber />,
  WHATS_APP: <Icons.WhatsUp />,
};

const UserCardItem: React.FC<Props> = (p: Props) => {
  const openSocial = useCallback((el: any) => {
    switch (el.content.contactType) {
      case "VIBER":
        Linking.canOpenURL(`viber://contact?number=${el.placeholder}`)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(
                `viber://contact?number=${el.placeholder}`
              );
            } else {
              Alert.alert("Viber is not installed on this device");
            }
          })
          .catch((err) => console.error("An error occurred", err));
        break;
      case "WHATS_APP":
        Linking.canOpenURL(`whatsapp://send?phone=${el.placeHolder}`)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(`whatsapp://send?phone=${el.placeHolder}`);
            } else {
              Alert.alert("Viber is not installed on this device");
            }
          })
          .catch((err) => console.error("An error occurred", err));
        break;
      default:
        break;
    }
  }, []);
  const splitIntoRows = (arr: any, itemsPerRow: any) => {
    const rows = [];
    for (let i = 0; i < arr.length; i += itemsPerRow) {
      rows.push(arr.slice(i, i + itemsPerRow));
    }
    return rows;
  };
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.background}
        source={
          p.data?.coverImage
            ? {
                uri: `https://scanme.am/api/admin/content/getImage?image=${p.data?.coverImage}`,
              }
            : require("../../assets/images/card.png")
        }
      />
      <View style={styles.info}>
      
        <Text style={styles.title}>
          {p.data?.name} {p.data?.surname}
        </Text>
        {p.data?.specialization && p.data?.company ? (
          <>
            <Text style={styles.subtitle}>
              {p.data?.specialization} <Text style={styles.at}>at</Text> {""}
              {p.data?.company}
            </Text>
            <Text style={styles.subtitle}>{p.data.location}</Text>
            <Text>{p.data.about}</Text>
          </>
        ) : null}
      </View>
      <PrimaryButton
        onPress={() => p.saveUserContact && p.saveUserContact(p.data.id)}
        style={{ marginTop: pixel(15), height: pixel(50) }}
        title={"Save contact"}
        type={ButtonTypes.DARK}
        containerStyle={{ width: "80%" }}
      />
      <View style={styles.footer}>
        {p?.content?.length > 0 ? (
          splitIntoRows(p.content, 3).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((el: any, index: number) => (
                <View key={index} style={{ alignItems: "center", flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => openSocial(el)}
                    style={styles.icon}
                  >
                    <Image
                      resizeMode="cover"
                      style={styles.content}
                      source={{
                        uri: `https://scanme.am/api/admin/content/getImage?image=${el?.content?.contentIcon}`,
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{el.linkTitle}</Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.empty}>
            This profile doesn't have any added links yet
          </Text>
        )}
      </View>
      <PrimaryButton
        onPress={p.createProfile}
        style={{ marginTop: pixel(15), height: pixel(50), borderColor: BLACK }}
        title={"Create my own profile"}
        type={ButtonTypes.WHITE}
        containerStyle={{ width: "80%" }}
      />
    </View>
  );
};

export default UserCardItem;
