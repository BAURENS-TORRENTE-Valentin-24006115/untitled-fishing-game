import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { RARITY_COLORS } from '../../assets/data/constants/fishes';
import { styles } from '../../assets/styles/fishesOverlayStyles';
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface FishOverlayProps {
     fish: any;
     onClose: () => void;
}

export default function FishOverlay({ fish, onClose }: FishOverlayProps) {
     if (!fish) 
          return null;
     const rareteKey = fish.rarete.toLowerCase() as keyof typeof RARITY_COLORS;
     const themeColor = RARITY_COLORS[rareteKey] || '#FFFFFF';
     return (
     <View style={styles.container}>
          <View style={[styles.card, { borderColor: themeColor }]}>
          
          {/*Nom dlu poisson*/}
          <ThemedText style={{ color: themeColor, fontSize: 24, fontWeight: 'bold' }}>
               {fish.nom}
          </ThemedText>
          <View>
               <ThemedText>{fish.rarete}</ThemedText>
          </View>
          <View>
               <ThemedText>{fish.taille} cm</ThemedText>
               <ThemedText>+{fish.valeur_nutritive}</ThemedText>
          </View>
          <View>
               <ThemedText>{fish.description}</ThemedText>
               <ThemedText>Effet : {fish.effet}</ThemedText>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
               <ThemedText style={{ color: '#000', fontWeight: 'bold' }} >RAMASSER</ThemedText>
          </TouchableOpacity>
          </View>
     </View>
     );
}



