
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

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Potion {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  image: string;
  ingredients: string[]; // IDs of required ingredients
  difficulty: number; // 0-100, chance of failure
}

export interface CreatureDefinition {
  id: string;
  species: string;
  name: string; 
  description: string;
  price: number;
  image: string;
  bonusType: 'GOLD_FINDER' | 'DISCOUNT' | 'ATTACK_BOOST' | 'DEFENSE_BOOST';
  bonusValue: number; 
}

export interface OwnedCreature extends CreatureDefinition {
  instanceId: string; 
  happiness: number; // 0-100
  hunger: number; // 0-100 (100 is full)
  lastInteraction: number; 
}

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  description: string;
  basePrice: number;
  volatility: number; // 0.0 to 1.0
}

export interface PortfolioItem {
  shares: number;
  totalCost: number; // Total spent on these shares (for avg calculation)
}

export interface VaultUpgrade {
  level: number;
  name: string;
  cost: number;
  capacity: number; // Flavor text mostly, or could be a cap
  image: string;
  description: string;
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
  solvedQuestions: string[]; // List of question strings already answered correctly
  ingredients: Record<string, number>; // Map of Ingredient ID -> Quantity
  potions: Record<string, number>; // Map of Potion ID -> Quantity
  creatures: OwnedCreature[];
  
  // Bank & Investments
  vaultLevel: number;
  portfolio: Record<string, PortfolioItem>;
  marketPrices: Record<string, number>;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  SHOP = 'SHOP',
  INVENTORY = 'INVENTORY',
  DUEL = 'DUEL',
  QUIZ = 'QUIZ',
  POTIONS = 'POTIONS',
  CREATURES = 'CREATURES',
  BANK = 'BANK'
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

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}
