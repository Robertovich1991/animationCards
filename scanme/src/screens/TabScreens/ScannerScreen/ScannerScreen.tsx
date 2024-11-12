import React, { useRef } from "react";
import { PanResponder, SafeAreaView, StyleSheet } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Card from "../../../components/card";
import { useSelector } from "react-redux";
import { cardListSelector } from "../../../store/selectors/cardSelector";

const ScannerScreen = () => {
  const opened = useRef(-1);
  const translateY = useSharedValue(0);
  const cardList = useSelector(cardListSelector);
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          opened.current === -1 && gestureState.dx != 0 && gestureState.dy != 0
        ); // handle the gesture whether is click or drag event
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        console.log("onMoveShouldSetPanResponderCapture", opened);

        return (
          opened.current === -1 && gestureState.dx != 0 && gestureState.dy != 0
        );
      },
      onStartShouldSetPanResponder: (evt, gestureState) =>
        opened.current === -1 && gestureState.dx != 0 && gestureState.dy != 0,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        opened.current === -1 && gestureState.dx != 0 && gestureState.dy != 0,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        const { moveY, dy, vy, y0 } = gestureState;
        translateY.value -= vy * 0.2;
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const index = Math.floor(Math.floor(-translateY.value));
        if (index < 0) {
          translateY.value = withSpring(0);
        } else if (Math.abs(index) > 20) {
          translateY.value = withSpring(19);
        } else {
          translateY.value = withSpring(-index);
        }
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;
  return (
    <SafeAreaView {...panResponder.panHandlers} style={styles.container}>
      {cardList?.map((i) => (
        <Card
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    position: "relative",
  },
});

export default ScannerScreen;
