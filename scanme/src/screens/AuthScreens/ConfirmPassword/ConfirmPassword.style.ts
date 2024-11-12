import { StyleSheet } from "react-native";
import { WHITE } from "../../../assets/colors/colors";
import { pixel } from "../../../utils/pixel";
import { textGlobalStyle } from "../../../utils/text-globalStyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    title: {
        ...textGlobalStyle({ size: pixel(28), weight: 'bold' }),
    },
    icon: {
        padding: pixel(16),
        paddingLeft: pixel(0)
    },
    button: {
        paddingVertical: pixel(10)
    },
    wrapper: {
        paddingHorizontal: pixel(20),
        flex: 1,
        marginTop: pixel(50),
        gap: pixel(15)

    }
})
export default styles