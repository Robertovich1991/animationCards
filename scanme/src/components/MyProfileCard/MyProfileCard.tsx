import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import Icons from "../../assets/svgs/index";
import { styles } from "./MyProfileCard.style";
import AvatarItem from "../AvatarItem/AvatarItem";
import { IGetMeProfile } from "../../interfaces/types";
import { useSelector } from "react-redux";
import { profileImageSelector } from "../../store/selectors/profileSelector";

type Props = {
  data: IGetMeProfile;
  onPressEdit: (id: number) => void;
  deleteImage?: () => void;
};

const MyProfileCard: React.FC<Props> = (props) => {
  const { onPressEdit, data, deleteImage } = props;
  const { t } = useTranslation();
  const imageUpdated = useSelector(profileImageSelector);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(`MyProfile.My_Profile`)}</Text>
        <TouchableOpacity onPress={() => onPressEdit && onPressEdit(data?.id)}>
          <Icons.Edit />
        </TouchableOpacity>
      </View>
      <AvatarItem
        deleteImage={deleteImage}
        isDisabled
        image={imageUpdated ? imageUpdated : data?.profilePic}
        style={styles.image}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Icons.ProfileCard />
          <Text style={styles.title}>
            {data?.name} {data?.surname}
          </Text>
        </View>
        <View style={styles.row}>
          <Icons.Email />
          <Text style={styles.title}>{data?.email}</Text>
        </View>
        <View style={styles.row}>
          <Icons.Phone />
          <Text style={styles.title}>{data?.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyProfileCard;
