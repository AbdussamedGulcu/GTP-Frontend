// ARKADAŞLARINIZ BURAYA OYUNLARIN BAŞARIMLARINI EKLEYEBİLİR
// gameId: 1 -> A Oyunu, gameId: 2 -> B Oyunu

export type Achievement = {
  id: string;
  gameId: number; 
  title: string;
  description: string;
  unlocked: boolean;
  points: number;
}

export const gameAchievements: Achievement[] = [
  // A Oyunu Başarımları
  {
    id: "a-1",
    gameId: 1,
    title: "İlk Kan",
    description: "Oyuna ilk adımını at ve bir düşman yen.",
    unlocked: true,
    points: 10
  },
  {
    id: "a-2",
    gameId: 1,
    title: "Usta Savaşçı",
    description: "10 düşmanı arka arkaya yen.",
    unlocked: false,
    points: 50
  },
  
  // B Oyunu Başarımları (Harvest Rush)
  {
    id: "hr-1",
    gameId: 2,
    title: "İlk Hasat",
    description: "Sepetine ilk meyveyi düşür ve hasata başla.",
    unlocked: false,
    points: 10
  },
  {
    id: "hr-2",
    gameId: 2,
    title: "Altın Dokunuş",
    description: "Nadir bulunan altın meşe palamudunu yakala.",
    unlocked: false,
    points: 50
  },
  {
    id: "hr-3",
    gameId: 2,
    title: "Usta Çiftçi",
    description: "Tek bir oyunda 50 skora ulaş.",
    unlocked: false,
    points: 100
  },
  {
    id: "hr-4",
    gameId: 2,
    title: "Kusursuz Tarım",
    description: "Hiç can kaybetmeden 20 skora ulaş.",
    unlocked: false,
    points: 75
  }
];
