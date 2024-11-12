import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  ContentData,
  IUserCardContentRequest,
} from "../../../interfaces/types";
import { styles } from "./ContentItem.style";
import { Controller } from "react-hook-form";
import InputField from "../../InputField/InputField";
import PrimaryButton, { ButtonTypes } from "../../primaryButton/PrimaryButton";
import ModalComponent from "../../modal/ModalComponent";

type Props = {
  data: ContentData;
  onPressAdd: () => void;
  menuVisible: boolean;
  control: any;
  onPressSave: (data: IUserCardContentRequest) => void;
  onPressCancel: () => void;
  getValues: any;
  onCloseMenu: () => void;
};

const ContentItem: React.FC<Props> = ({
  data,
  control,
  menuVisible,
  onPressAdd,
  onPressSave,
  getValues,
  onPressCancel,
  onCloseMenu,
}) => {
  return (
    <>
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
        <TouchableOpacity style={styles.addContainer} onPress={onPressAdd}>
          <Text style={styles.title}>+</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent
        onClose={onCloseMenu}
        isVisible={menuVisible}
        content={
          <View style={styles.menu}>
            <View style={styles.row}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://scanme.am/api/admin/content/getImage?image=${data?.contentIcon}`,
                }}
              />
              <Text style={styles.title}>{data?.name}</Text>
            </View>
            <View style={styles.line} />
            <Controller
              control={control}
              rules={{ required: true }}
              name="placeholder"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Link"
                  placeHolder="Link"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              name="linkTitle"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Link title"
                  placeHolder="Link title"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton
                containerStyle={{ width: "50%" }}
                onPress={() =>
                  onPressSave({
                    placeholder: getValues("placeholder"),
                    linkTitle: getValues("linkTitle"),
                    id: data.id,
                    contentInfo: data,
                  })
                }
                type={ButtonTypes.DARK}
                title="Save"
              />
              <PrimaryButton
                containerStyle={{ width: "50%" }}
                onPress={onCloseMenu}
                type={ButtonTypes.WHITE}
                title="Cancel"
              />
            </View>
          </View>
        }
      />
    </>
  );
};

export default ContentItem;
