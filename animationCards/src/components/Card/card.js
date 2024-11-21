import { Text, View, Dimensions, TouchableWithoutFeedback, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  interpolate,
  interpolateColor,
  useSharedValue,
  runOnJS,
  useAnimatedGestureHandler,
  withDelay,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { cardListSelector } from "../../store/selectors/cardSelector";
import { styles } from "./card.styles";
import AvatarItem from "../AvatarItem/AvatarItem";
import Icons from "../../assets/svgs/index";
import CardItem from "../CardItem/CardItem";
import CardProgressItem from "../CardProgressItem/CardProgressItem";
import { pixel } from "../../utils/pixel";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const style = {};
const bgColor = "white";
const MARGIN = pixel(80);
const Card = ({
  translateY,
  index,
  onOpened,
  name,
  surname,
  url,
  len,
  onRemove,
  containerStyle,
  id,
}) => {
  const translateX = useSharedValue(0);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SWIPE_THRESHOLD = 300
  const opened = useSharedValue(0);
  const cardlist = useSelector(cardListSelector);
  const animatedStyles = useAnimatedStyle(() => {
    let i = translateY.value + index;
    i = i < -1 ? len + i : i;
    i = i % len;
    const position = i * -MARGIN + i * 2.4 * 3;
    let opacity = 1;
    if (position > 0) {
      opacity = 1 - Math.abs(position / MARGIN + 10);
    } else if (position < -360) {
      opacity = 1 - Math.abs((position + 360) / MARGIN);
    }
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: opened.value > 0 ? 0 : position - 50 },
        { scale: opacity === 0 ? 0 : 1 - 0.5 * (-position / 500) },
        { rotate: Math.sin(position / 15) + "deg" }
      ],
      zIndex: Math.floor(len - i),
      opacity,
    };
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(translateY.value, 'index', index);

      const x = (-translateY.value - index) % cardlist.length;
      if (
        translateY.value + index === 0 || translateY.value + index === 10 ||
        (-translateY.value - index) % cardlist.length === 0 || (translateY.value - index) % cardlist.length === 0 || translateY.value > index
      ) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        translateX.value = withSequence(
          withTiming(SCREEN_WIDTH * Math.sign(translateX.value), {}, () => {
            runOnJS(onRemove)(id, index);
          }),
          withDelay(500, withTiming(0, { duration: 0 }))
        );
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const sizeStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(opened.value, [0, 100], [200, height]),
      width: interpolate(opened.value, [0, 100], [343, width]),
      backgroundColor: interpolateColor(
        opened.value,
        [0, 100],
        ["#FFF0", "#FFFF"]
      ),
    };
  });
  return true && (
    <Animated.View
      style={[
        styles.wrapper,
        opened.value === 0 ? animatedStyles : {},
      ]}
    >
      <GestureHandlerRootView style={[styles.wrapper2x, { zIndex: 10 - index }]}>
        <PanGestureHandler
          onGestureEvent={gestureHandler}
        >
          <Animated.View style={[styles.wrapper2x, sizeStyle]}>
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
              <View
                style={[
                  styles.container,
                  { backgroundColor: bgColor },
                  style,
                  containerStyle,
                ]}
              >
                <View style={styles.logoContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <AvatarItem surname={surname} name={name} uri={url} />
                    <Text style={styles.currency}>
                      $<Text style={styles.price}>121</Text>.00
                    </Text>
                  </View>
                  <Icons.Chart style={{ right: pixel(16) }} />
                </View>
                <View style={styles.footerContainer}>
                  <CardItem
                    title="2.50m"
                    subTitle="@stev_..."
                    icon={<Icons.SocialIcon />}
                  />
                  <CardItem
                    title="400"
                    subTitle="pledges"
                    icon={<Icons.Profile />}
                  />
                  <CardProgressItem title="2217" icon={<Icons.Shield />} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>

  );
};

export default Card;
