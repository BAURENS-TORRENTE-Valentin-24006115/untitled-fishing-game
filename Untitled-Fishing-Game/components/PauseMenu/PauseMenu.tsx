import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";

const { width: SCREEN_W } = Dimensions.get('window');

interface PauseMenuProps {
    onResume: () => void;
}

export default function PauseMenu({ onResume }: PauseMenuProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ThemedText style={styles.title}>PAUSE</ThemedText>

                <TouchableOpacity style={styles.buttonResume} onPress={onResume}>
                    <ThemedText style={styles.buttonText}>▶  REPRENDRE</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonQuit} onPress={() => router.push('/MainMenu')}>
                    <ThemedText style={styles.buttonText}>✕  QUITTER</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },
    card: {
        width: SCREEN_W * 0.8,
        backgroundColor: '#1a1a1a',
        padding: 30,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        alignItems: 'center',
        gap: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        letterSpacing: 2,
    },
    buttonResume: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        alignItems: 'center',
    },
    buttonQuit: {
        width: '100%',
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