import { Image } from "expo-image";
import {View, TouchableOpacity, StyleSheet, BackHandler} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
function handleQuit() {
    BackHandler.exitApp()
}

export default function MainMenu() {
    return (
        <>
            <Image
                style={styles.backgroundImage}
                source={require('@/assets/background/main_background-sized.png')}
                contentFit="cover"
            />

            <View style={styles.page}>
                <ThemedText style={styles.title}>Fishing is Mips</ThemedText>

                <TouchableOpacity style={styles.buttonPlay} onPress={() => router.push('/')}>
                    <ThemedText style={styles.buttonText}>JOUER</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonQuit} onPress={handleQuit}>
                    <ThemedText style={styles.buttonText}>QUITTER</ThemedText>
                </TouchableOpacity>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 40,
        letterSpacing: 2,
        paddingHorizontal: 20,
        padding: 10,
        textAlign: 'center',
    },
    buttonPlay: {
        width: 220,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        alignItems: 'center',
    },
    buttonQuit: {
        width: 220,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ff4444',
        backgroundColor: 'rgba(255, 68, 68, 0.15)',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});