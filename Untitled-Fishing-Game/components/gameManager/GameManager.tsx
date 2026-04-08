import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface gameManagerProps{
    bestScore: number;
    score: number;
    timer: string;
    onRestart: () => void;
} 

export default function GameManager({bestScore, score, timer, onRestart}: gameManagerProps){
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ThemedText style={styles.gameOverTitle}>MORT DE FAIM !</ThemedText>

                <View style={styles.statsRow}>
                    <ThemedText>Meilleur Score : {bestScore}</ThemedText>
                    <ThemedText>Score : {score}</ThemedText>
                    <ThemedText>Temps : {timer}</ThemedText>
                </View>

                <TouchableOpacity style={styles.button} onPress={onRestart}>
                    <ThemedText style={styles.buttonText}>RECOMMENCER</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        borderColor: '#ff4444', 
        alignItems: 'center',
    },
    gameOverTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ff4444',
        marginBottom: 20,
    },
    statsRow: {
        marginVertical: 20,
        alignItems: 'center',
        gap: 10,
    },
    button: {
        backgroundColor: '#ff4444',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }
});