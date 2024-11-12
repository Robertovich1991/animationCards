import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import CarouselScroll from "../../../components/Carousel/carousel";
import { cardListSelector } from "../../../store/selectors/cardSelector";
import { deleteCard, getCardList } from "../../../store/slices/cardSlice";
import { userInfoSelector } from "../../../store/selectors/profileSelector";
import { BLACK } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";
import ModalComponent from "../../../components/modal/ModalComponent";
import CardPreviewItem from "../../../components/CardPreviewItem/CardPreviewItem";
import { CardNavigationType } from "../../../navigation/CardStackNavigation";
import styles from "./ScannerScreen.style";

const ScannerScreen = () => {
  const cards = useSelector(cardListSelector);
  const dispatch = useDispatch<Dispatch<any>>();
  const user = useSelector(userInfoSelector);
  const navigation = useNavigation<CardNavigationType>();
  const [cardModalVisible, setCardModalVisible] = useState<boolean>(false);
  const [cardInfo, setCardInfo] = useState<any>();

  useEffect(() => {
    dispatch(getCardList(user?.id));
  }, []);

  const handlerAddCard = useCallback(() => {
    navigation.navigate("ADD_CARD", {});
  }, []);

  const deleteUserCard = useCallback((id: number) => {
    dispatch(deleteCard({ cardId: id }));
  }, []);
  const editUserCard = useCallback((item: any) => {
    navigation.navigate("EDIT_CARD", { item });
  }, []);
  const previewUserCard = useCallback((item: any) => {
    setCardInfo(item);
    setCardModalVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.header}>
        <View style={styles.upgrade}>
          <Text style={styles.upgradeText}>Upgrade +</Text>
        </View>
        <Text style={styles.supportText}>Card's name</Text>

        <Text style={styles.supportText}>Support</Text>
      </View>
      {cards && cards?.length > 0 ? (
        <CarouselScroll
          onPressPreview={previewUserCard}
          onAddNewCard={handlerAddCard}
          data={cards}
          onPressEdit={editUserCard}
          onPressDelete={deleteUserCard}
        />
      ) : (
        <ActivityIndicator color={BLACK} style={{ flex: 1 }} size={pixel(30)} />
      )}
      <ModalComponent
        onClose={() => {
          setCardModalVisible(false);
        }}
        isVisible={cardModalVisible}
        content={<CardPreviewItem data={cardInfo} />}
      />
    </View>
  );
};

export default ScannerScreen;
