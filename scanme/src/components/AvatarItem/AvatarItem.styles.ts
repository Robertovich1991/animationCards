import { StyleSheet } from 'react-native';
import { pixel } from '../../utils/pixel';
import { WHITE } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
    container: {
        width: pixel(100),
        height: pixel(100),
        borderRadius: pixel(90)
    },
    delete: {
          position: 'absolute',
        color: 'black',
        width: pixel(25),
         height: pixel(25),
          right:0,
          borderRadius:pixel(80),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:WHITE
    },
    camera: {
        marginTop: pixel(-25),
        alignSelf: 'flex-end',
        backgroundColor: WHITE,
        borderRadius: pixel(100)
    }
});