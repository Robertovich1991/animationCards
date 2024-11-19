import { StyleSheet } from "react-native";
import { pixel } from "../../utils/pixel";
import { BLACK, GREY } from "../../assets/colors/colors";
import { textGlobalStyle } from "../../utils/text-globalStyles";

const circleSize = 250;

export const styles = StyleSheet.create({
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
    container: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        paddingHorizontal: pixel(16),
        paddingVertical: pixel(20),
        borderRadius: pixel(16),
        width: '100%',
        position: "relative",
    },
    logoContainer: {
        position: "relative",
        justifyContent: 'space-between',
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
        gap: 10,
        position: 'absolute',
        bottom: 16,
        width: '100%',
        left: pixel(17)
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
    currency: {
        color: GREY
    },
    price: {
        color: BLACK,
        ...textGlobalStyle({ size: pixel(30), weight: 'bold' })
    }
})