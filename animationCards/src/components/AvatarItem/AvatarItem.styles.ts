import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { BLACK } from '../../assets/colors/colors';
import { textGlobalStyle } from '../../utils/text-globalStyles';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: pixel(8)
    },
    image: {
        width: pixel(48),
        height: pixel(48),
        borderRadius: pixel(90)
    },
    nameText: {
        ...textGlobalStyle({ size: pixel(14), weight: 'medium' }),
        color: BLACK
    },
    surname: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: pixel(5)
    }

});