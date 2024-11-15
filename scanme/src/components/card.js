import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  interpolateColor,
  useSharedValue,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { setCardsList } from "../store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { cardListSelector } from "../store/selectors/cardSelector";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const circleSize = 250;
const style = {};
const textColor = "white";
const bgColor = "#0047cc";
const Card = ({
  translateY,
  index,
  onOpened,
  name,
  date,
  url,
  len,
  profession,
}) => {
  const translateX = useSharedValue(0);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.2;
  const opened = useSharedValue(0);
  const cardlist = useSelector(cardListSelector);
  const animatedStyles = useAnimatedStyle(() => {
    let i = translateY.value + index;
    i = i < -1 ? len + i : i;
    i = i % len;
    const position = i * -60;
    let opacity = 1;
    if (position > 0) {
      opacity = 1 - Math.abs(position / 50);
    } else if (position < -360) {
      opacity = 1 - Math.abs((position + 360) / 50);
    }
    return {
      transform: [
        { translateY: opened.value > 0 ? 0 : position - 50 },
        { translateX: translateX.value },
        { scale: opacity === 0 ? 0 : 1 - 0.2 * (-position / 500) },
      ],
      zIndex: len - i,
      opacity,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(
        -translateY.value,
        index,
        "jjjjjjjjjjjjjjjjjjjjjjjjj,",
        -translateY.value - (index % cardlist.length) === 1
      );
      const x = (-translateY.value - index) % cardlist.length;
      console.log(x, "oooooooooooooooooooooo");

      if (
        translateY.value + index === 0 ||
        (-translateY.value - index) % cardlist.length === 0
      ) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        translateX.value = withTiming(
          SCREEN_WIDTH * Math.sign(translateX.value),
          {}
        );
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const handleEndGesture = () => {
    if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
      const swipeDirection =
        translateX.value > 0 ? "Card liked successfully" : "Card disliked";
      translateX.value = withTiming(
        SCREEN_WIDTH * Math.sign(translateX.value),
        {},
        Alert.alert(swipeDirection)
      );
    } else {
      translateX.value = withSpring(0);
    }
  };

  const sizeStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(opened.value, [0, 100], [200, height]),
      width: interpolate(opened.value, [0, 100], [300, width]),
      backgroundColor: interpolateColor(
        opened.value,
        [0, 100],
        ["#FFF0", "#FFFF"]
      ),
    };
  });
  return Math.abs(translateY.value) <= index ? (
    <Animated.View
      style={[
        styles.wrapper,
        opened.value === 0 ? animatedStyles : {},
        { zIndex: 10 - index },
      ]}
    >
      <GestureHandlerRootView style={[styles.wrapper, { zIndex: 10 - index }]}>
        <PanGestureHandler
          onGestureEvent={gestureHandler}
          onEnded={handleEndGesture}
        >
          <Animated.View style={[styles.wrapper, sizeStyle]}>
            <TouchableWithoutFeedback
              style={styles.card}
              onPress={() => {
                if (
                  translateY.value + index === 0 ||
                  (-translateY.value - index) % cardlist.length === 0
                ) {
                  opened.value = withTiming(opened.value > 0 ? 0 : 100, {
                    duration: 500,
                  });
                  onOpened(opened.value === 0);
                }
              }}
            >
              <View style={[s.container, { backgroundColor: bgColor }, style]}>
                <View style={[s.bgCircle, s.rightBgCircle]} />
                <View style={[s.bgCircle, s.bottomBgCircle]} />
                <View style={s.logoContainer}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: url }}
                  />
                  <View>
                    <Text style={[s.text, { color: textColor }]}>{name}</Text>
                    <Text style={[s.text, { color: textColor }]}>
                      {profession}
                    </Text>
                  </View>
                </View>
                <View style={s.cardNumberContainer}></View>
                <View style={s.footerContainer}>
                  <Text style={[s.text, { color: textColor }]}>{name}</Text>
                  <Text style={[s.text, { color: textColor }]}>{date}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>
  ) : null;
};
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
const s = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: 300,
    position: "relative",
  },
  logoContainer: {
    position: "relative",
    marginBottom: 4,
    flexDirection: "row",
    gap: 20,
  },
  circle: { width: 34, height: 34, borderRadius: 17 },
  rightCircle: { backgroundColor: "#f9a000", position: "absolute", left: 20 },
  leftCircle: { backgroundColor: "#ed0006", zIndex: 999 },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  cardNumberPart: { flexDirection: "row" },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Courier",
    fontSize: 16,
    letterSpacing: 0.53,
  },
  bgCircle: {
    position: "absolute",
    backgroundColor: "white",
    opacity: 0.05,
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize,
  },
  rightBgCircle: {
    top: (-1 * circleSize) / 4,
    right: (-1 * circleSize) / 2,
  },
  bottomBgCircle: {
    bottom: (-1 * circleSize) / 2,
    left: (0 * (-1 * circleSize)) / 2,
  },
});
export default Card;
