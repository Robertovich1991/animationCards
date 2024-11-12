import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
  useSharedValue,
} from 'react-native-reanimated';
import { useEffect } from 'react';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const circleSize = 250;
const name = 'Aghasi G.';
const date = '09/29';
const suffix = 'Mr';
const style = {};
const textColor = 'white';
const bgColor = '#0047cc';
const Card = ({ translateY, index, onOpened }) => {
  const opened = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    const position = (translateY.value + index) * -60;
    let opacity = 1;
    if (position > 0) {
      opacity = 1 - Math.abs(position / 50);
    } else if (position < -360) {
      opacity = 1 - Math.abs((position + 360) / 50);
    }
    opacity = opacity < 0 ? 0 : opacity;
    return {
      transform: [
        { translateY: opened.value > 0 ? 0 : position - 50 },
        { scale: opacity === 0 ? 0 : 1 - 0.2 * (-position / 500) },
      ],
      opacity,
    };
  });
  
  const sizeStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(opened.value, [0, 100], [200, height]),
      width: interpolate(opened.value, [0, 100], [300, width]),
      backgroundColor:interpolateColor(opened.value,[0,100],["#FFF0","#FFFF"])
    };
  });
  const dotStyle = [s.dot, { backgroundColor: textColor }];
  return Math.abs(translateY.value) <= index ? (
    <Animated.View
      style={[
        styles.wrapper,
        opened.value === 0 ? animatedStyles : {},
        { zIndex: 10 - index },
        sizeStyle,
      ]}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (translateY.value + index === 0) {
            opened.value = withTiming(opened.value > 0 ? 0 : 100, {
              duration: 500,
            });
            onOpened(opened.value === 0);
          }
        }}>
        <View style={[s.container, { backgroundColor: bgColor }, style]}>
          <View style={[s.bgCircle, s.rightBgCircle]} />
          <View style={[s.bgCircle, s.bottomBgCircle]} />
          <View style={s.logoContainer}>
            <View style={[s.circle, s.leftCircle]} />
            <View style={[s.circle, s.rightCircle]} />
          </View>
          <View style={s.cardNumberContainer}>
            <View style={s.cardNumberPart}>
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={s.cardNumberPart}>
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={s.cardNumberPart}>
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <View style={s.cardNumberPart}>
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
              <View style={dotStyle} />
            </View>
            <Text style={[s.text, { color: textColor }]}>{suffix}</Text>
          </View>
          <View style={s.footerContainer}>
            <Text style={[s.text, { color: textColor }]}>{name}</Text>
            <Text style={[s.text, { color: textColor }]}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  ) : null;
};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const s = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: 300,
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logoContainer: { position: 'relative', marginBottom: 24 },
  circle: { width: 34, height: 34, borderRadius: 17 },
  rightCircle: { backgroundColor: '#f9a000', position: 'absolute', left: 20 },
  leftCircle: { backgroundColor: '#ed0006', zIndex: 999 },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cardNumberPart: { flexDirection: 'row' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 16,
    letterSpacing: 0.53,
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: 'white',
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
