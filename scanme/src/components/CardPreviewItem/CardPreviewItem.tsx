import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, Share, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Svg } from "react-native-svg";
import Icons from "../../assets/svgs/index";
import { pixel } from "../../utils/pixel";
import QRcard from "../QRcard/QRcard";
import PrimaryButton, { ButtonTypes } from "../primaryButton/PrimaryButton";
import ProfileItem from "../ProfileItem/ProfileItem";
import { BLACK } from "../../assets/colors/colors";
import styles from "./CardPreviewItem.style";

type Props = {
  data: any;
};

const CardPreviewItem: React.FC<Props> = (props) => {
  const { data } = props;
  const qrCodeRef = useRef<Svg>(null);
  const [loading, setLoading] = useState(false);

  const shareCard = useCallback(async (cardId: string) => {
    try {
      await Share.share({
        message: `https://scanme.am/${cardId}`,
      });
    } catch (error) {
      console.error("Error sharing URL", error);
    }
  }, []);

  const copyToClipboard = async (cardId: string) => {
    await Clipboard.setStringAsync(`https://scanme.am/${cardId}`).then(() => {
      Alert.alert(
        "Card link copied!",
        "Now you can past your digital business card link wherever you'd like to share it"
      );
    });
  };

  const saveQrImage = async () => {
    setLoading(true);
    try {
      qrCodeRef.current?.toDataURL(async (data) => {
        const filename = FileSystem.documentDirectory + "QRCode.png";
        await FileSystem.writeAsStringAsync(filename, data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
          const asset = await MediaLibrary.createAssetAsync(filename);
          await MediaLibrary.createAlbumAsync("Download", asset, false);
          Alert.alert("Success", "QR code saved to gallery!");
        } else {
          Alert.alert("Error", "Permission to access media library denied");
        }
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save QR code to gallery.");
    } finally {
      setLoading(false);
    }
  };

  const previewModalData = [
    {
      title: "Copy card link",
      icon: <Icons.Copy />,
      onPress: () => data && copyToClipboard(data.cardId),
    },
    {
      title: "Download QR",
      icon: <Icons.Downdload />,
      onPress: () => saveQrImage(),
    },
  ];
  return (
    <View>
      {data && (
        <View>
          <Text style={styles.previewTitle}>
            {data.name} {data?.surname}
          </Text>
          <QRcard getRef={qrCodeRef} value={data?.cardId} />
          <View style={{ gap: pixel(20) }}>
            <PrimaryButton
              onPress={() => shareCard(data.cardId)}
              title={"Share your card"}
              style={styles.buttonModal}
              type={ButtonTypes.DARK}
            />
          </View>
          {loading ? (
            <View style={{ marginTop: pixel(10) }}>
              <ActivityIndicator color={BLACK} size="large" />
            </View>
          ) : (
            <View style={styles.link}>
              {previewModalData?.map((item, index) => {
                return (
                  <ProfileItem
                    onPress={item?.onPress}
                    title={item?.title}
                    key={index}
                    leftIcon={item.icon}
                  />
                );
              })}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CardPreviewItem;
