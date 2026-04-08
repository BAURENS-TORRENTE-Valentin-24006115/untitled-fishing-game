import fishesData from '../../assets/data/json/fishes.json';
export function selectRandomFishWithRarity() {
    const listePoisson = fishesData.poissons;
    const randomValue = Math.random();

    let availableFishes: typeof listePoisson;

    if (randomValue > 0.9) {
        availableFishes = listePoisson.filter(fish => fish.rarete === "Exotique");
    }
    else if (randomValue > 0.70) {
        availableFishes = listePoisson.filter(fish => fish.rarete === "Légendaire");
    }
    else if (randomValue > 0.40) {
        availableFishes = listePoisson.filter(fish => fish.rarete === "Rare");
    }
    else {
        availableFishes = listePoisson.filter(fish => fish.rarete === "Commun");
    }

    // If no fish found in the rarity tier, return a random fish from that tier or fallback
    if (availableFishes.length === 0) {
        return listePoisson[Math.floor(Math.random() * listePoisson.length)];
    }

    return availableFishes[Math.floor(Math.random() * availableFishes.length)];
}