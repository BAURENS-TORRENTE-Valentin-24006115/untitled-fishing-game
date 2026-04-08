import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export const styles = StyleSheet.create({
    fish: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignSelf: 'stretch',
    },
    overlayCard: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: [{ translateX: -SCREEN_W * 0.425 }],
      width: SCREEN_W * 0.85,
      minHeight: 420,
      borderRadius: 14,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.40)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    card: {
        width: SCREEN_W * 0.85,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        padding: 20,
        borderWidth: 4,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor : '#ffffff',
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    }
});