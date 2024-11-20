import React, { useCallback, useRef } from "react";
import { PanResponder, SafeAreaView, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Card from "../../../components/Card/card";
import { useDispatch, useSelector } from "react-redux";
import { cardListSelector } from "../../../store/selectors/cardSelector";
import { removeItem } from "../../../store/slices/cardSlice";

import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import styles from "./ScannerScreen.style";

const ScannerScreen = () => {
  const opened = useRef(-1);
  const translateY = useSharedValue(0);
  const cardList = useSelector(cardListSelector);
  const dispatch = useDispatch();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          opened.current === -1 &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        const { moveY, dy, vy, y0 } = gestureState;
        translateY.value -= vy * 0.2;
      },
      onPanResponderRelease: (evt, gestureState) => {
        const index = Math.floor(Math.floor(-translateY.value));
        translateY.value = withSpring(-index);
      },
    })
  ).current;
  console.log(cardList?.length);
  const removeFromList = useCallback(
    (id: number, index: number) => {
      if (cardList?.length) {
        const count =
          Math.floor(Math.abs(translateY.value / cardList.length)) *
          (translateY.value > 0 ? 1 : -1);
        console.log(
          Math.floor(Math.abs(translateY.value / cardList.length)),
          translateY.value > 0 ? 1 : -1
        );

        index = count * (cardList.length - 1) - index;
        console.log("New Index", index, translateY.value);

        translateY.value = withSpring(translateY.value - 1, { duration: 500 });
        dispatch(removeItem(id));
      }
    },
    [cardList]
  );
  return (
    <SafeAreaView {...panResponder.panHandlers} style={styles.container}>
      <View style={styles.header}>
        <PrimaryButton title="Create" type={ButtonTypes.DARK} />
        <PrimaryButton title="$100.00 | Edit" type={ButtonTypes.WHITE} />
      </View>
      {cardList?.map((el, i) => (
        <Card
          key={i}
          id={el.id}
          onRemove={removeFromList}
          len={cardList.length}
          name={el.name}
          surname={el.surname}
          url={el.url}
          translateY={translateY}
          index={i}
          onOpened={(isOpen: boolean) => {
            opened.current = isOpen ? i : -1;
          }}
        />
      ))}
    </SafeAreaView>
  );
};

export default ScannerScreen;
