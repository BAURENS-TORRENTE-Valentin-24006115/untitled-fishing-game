import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    card: {
        width: SCREEN_W * 0.85,
        backgroundColor: '#000000',
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