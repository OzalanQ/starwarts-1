
export type ItemType = 'wand' | 'spell' | 'equipment';

export interface GameItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  type: ItemType;
  attack?: number; 
  defense?: number; 
}

export interface BattleResult {
  id?: string;
  victory: boolean;
  goldEarned: number;
  log: string[];
  opponentName: string;
  date: string;
}

export interface Character {
  name: string;
  house: 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';
  gold: number;
  avatarUrl: string;
  inventory: GameItem[];
  equipped: GameItem[];
  // Map of Item ID -> Base64 Image String
  customItemImages: Record<number, string>;
  stats: {
    attack: number;
    defense: number;
    wins: number;
    losses: number;
  };
  matchHistory: BattleResult[];
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  SHOP = 'SHOP',
  INVENTORY = 'INVENTORY',
  DUEL = 'DUEL'
}

export interface HouseTheme {
  id: string;
  primary: string; // Main text color (e.g., text-red-500)
  secondary: string; // Accent color (e.g., text-yellow-400)
  accentBg: string; // Background accent (e.g., bg-red-900/20)
  border: string; // Border color (e.g., border-red-500/50)
  gradient: string; // BG Gradient
  button: string; // Button class
}
