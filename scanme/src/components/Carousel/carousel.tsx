import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { pixel } from "../../utils/pixel";
import { MAIN } from "../../enums/enums";
import { MainParamList } from "../../navigation/MainNavigtion";
import { ICardItem } from "../../interfaces/types";
import { getCardById, getContentById } from "../../store/slices/cardSlice";
import PrimaryButton, { ButtonTypes } from "../primaryButton/PrimaryButton";
import QRcard from "../QRcard/QRcard";
import CardItem from "../CardItem/CardItem";
import styles from "./carousel.style";

type NavigateProps = NativeStackScreenProps<MainParamList, MAIN.CARD_PROFILE>;

type Props = {
  data?: ICardItem[];
  renderItem?: () => void;
  onPressEdit: (item: any) => void;
  onPressDelete: (id: number) => void;
  onAddNewCard: () => void;
  onPressPreview: (item: any) => void;
};

const { width } = Dimensions.get("window");
const CarouselScroll: React.FC<Props> = (p: Props) => {
  const navigation = useNavigation<NavigateProps["navigation"]>();
  const dispatch = useDispatch<Dispatch<any>>();
  const navigateToEdit = (item: any) => {
    dispatch(getCardById({ cardId: item.cardId }));
    dispatch(getContentById({ id: item.id }));
    navigation.navigate(MAIN.CARD_PROFILE);
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item.isAddNewCard) {
      return (
        <View style={styles.new}>
          <TouchableOpacity style={styles.newCard} onPress={p.onAddNewCard}>
            <View style={styles.circle}>
              <Text style={styles.text}>+</Text>
            </View>
            <Text style={styles.title}>
              Create another card with different information and customization
            </Text>
            <PrimaryButton
              type={ButtonTypes.DARK}
              title={"Create another card"}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <QRcard onPress={() => navigateToEdit(item)} value={item.cardId} />
        <CardItem
          onPressPreview={(item) => p.onPressPreview(item)}
          isVisible={index > 0}
          onPressDelete={(id) => p.onPressDelete(id)}
          onPressEdit={(item) => p.onPressEdit(item)}
          data={item}
        />
      </View>
    );
  };
  const dataWithAddNewCard = [...(p.data || []), { isAddNewCard: true }];

  return (
    <Carousel
      data={dataWithAddNewCard}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={pixel(300)}
    />
  );
};

export default CarouselScroll;
