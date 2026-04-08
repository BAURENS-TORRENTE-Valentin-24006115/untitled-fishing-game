import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { RARITY_COLORS } from '../../assets/data/constants/fishes';
import { styles } from '../../assets/styles/fishesOverlayStyles';
const { width: SCREEN_W } = Dimensions.get('window');

interface FishOverlayProps {
     fish: any;
     onClose: () => void;
}

const fishImageMap: Record<string, any> = {
  '/assets/fish/hermit_crab_sized.png': require('@/assets/fish/hermit_crab_sized.png'),
  '/assets/fish/dorade_sized.png': require('@/assets/fish/dorade_sized.png'),
  '/assets/fish/vermillion_snapper_sized.png': require('@/assets/fish/vermillion_snapper_sized.png'),
  '/assets/fish/nemo_sized.png': require('@/assets/fish/nemo_sized.png'),
  '/assets/fish/tuna_sized.png': require('@/assets/fish/tuna_sized.png'),
  '/assets/fish/sushi_sized.png': require('@/assets/fish/sushi_sized.png'),
};

export default function FishOverlay({ fish, onClose }: FishOverlayProps) {
     if (!fish) 
          return null;
     const rareteKey = fish.rarete.toLowerCase() as keyof typeof RARITY_COLORS;
     const themeColor = RARITY_COLORS[rareteKey] || '#FFFFFF';

     const fish_rod_paths = [
       require('@/assets/fishing_rod/canne_a_peche_sized.png'),
       require('@/assets/fishing_rod/canne_a_peche_chargement_sized.png'),
       require('@/assets/fishing_rod/canne_a_peche_lancer_sized.png')
     ];
     const fishRodId = 0;
     const fishImageSource = fishImageMap[fish.image];

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



