import { Image, View, StyleSheet, useWindowDimensions } from 'react-native';

interface HungerBarProps {
    hunger: number; // 0-20
}

export const HungerBar = ({ hunger }: HungerBarProps) => {
    const MAX_ELEMENTS = 10;
    const POINTS_PER_FULL = 2;
    const { width } = useWindowDimensions();

    // Calculer la taille dynamique des éléments pour qu'ils s'adaptent à la largeur
    const elementSize = (width / MAX_ELEMENTS) - 2; // -2 pour le padding

    // Calculer les éléments
    const fullElements = Math.floor(hunger / POINTS_PER_FULL);
    const hasHalf = (hunger % POINTS_PER_FULL) === 1;
    const emptyElements = MAX_ELEMENTS - fullElements - (hasHalf ? 1 : 0);

    return (
        <View style={styles.barContainer}>
            {/* Éléments pleins */}
            {Array(fullElements).fill(null).map((_, i) => (
                <Image
                    key={`full-${i}`}
                    source={require('@/assets/images/UI/hunger-full.png')}
                    style={[{ width: elementSize, height: elementSize }]}
                />
            ))}

            {/* Élément demi (s'il existe) */}
            {hasHalf && (
                <Image
                    source={require('@/assets/images/UI/hunger-half.png')}
                    style={[{ width: elementSize, height: elementSize }]}
                />
            )}

            {/* Éléments vides */}
            {Array(emptyElements).fill(null).map((_, i) => (
                <Image
                    key={`empty-${i}`}
                    source={require('@/assets/images/UI/hunger-empty.png')}
                    style={[{ width: elementSize, height: elementSize }]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    barContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 8,
    }
});
