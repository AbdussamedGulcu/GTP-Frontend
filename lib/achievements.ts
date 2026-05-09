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
  
  // B Oyunu Başarımları
  {
    id: "b-1",
    gameId: 2,
    title: "Hızlı Başlangıç",
    description: "Oyunu 5 dakikada bitir.",
    unlocked: true,
    points: 100
  },
  {
    id: "b-2",
    gameId: 2,
    title: "Gizli Bölme",
    description: "Oyun içindeki gizli odayı bul.",
    unlocked: false,
    points: 75
  }
];
