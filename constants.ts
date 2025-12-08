

import { GameItem, Character, HouseTheme, TriviaQuestion, Ingredient, Potion, CreatureDefinition, Stock, VaultUpgrade, WandWood, WandCore, WandColor } from './types';

export const HOUSE_THEMES: Record<string, HouseTheme> = {
  Gryffindor: {
    id: 'Gryffindor',
    primary: 'text-red-500',
    secondary: 'text-yellow-500',
    accentBg: 'bg-red-950/40',
    border: 'border-red-800',
    gradient: 'from-red-950 via-orange-950/40 to-slate-950',
    button: 'bg-red-900/80 hover:bg-red-800 text-yellow-100 border border-red-700'
  },
  Slytherin: {
    id: 'Slytherin',
    primary: 'text-emerald-400',
    secondary: 'text-slate-300',
    accentBg: 'bg-emerald-950/40',
    border: 'border-emerald-800',
    gradient: 'from-emerald-950 via-slate-950/40 to-black',
    button: 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700'
  },
  Ravenclaw: {
    id: 'Ravenclaw',
    primary: 'text-blue-400',
    secondary: 'text-sky-200',
    accentBg: 'bg-blue-950/40',
    border: 'border-blue-800',
    gradient: 'from-blue-950 via-indigo-950/40 to-slate-950',
    button: 'bg-blue-900/80 hover:bg-blue-800 text-blue-100 border border-blue-700'
  },
  Hufflepuff: {
    id: 'Hufflepuff',
    primary: 'text-yellow-400',
    secondary: 'text-amber-200',
    accentBg: 'bg-yellow-950/40',
    border: 'border-yellow-800',
    gradient: 'from-yellow-950 via-amber-950/40 to-slate-950',
    button: 'bg-yellow-900/80 hover:bg-yellow-800 text-yellow-100 border border-yellow-700'
  }
};

export const STOCK_MARKET_LIST: Stock[] = [
  { id: 'www', ticker: 'WWW', name: "Weasleys' Wizard Wheezes", description: "High risk, hilarious returns.", basePrice: 50, volatility: 0.25 },
  { id: 'prophet', ticker: 'TDP', name: "The Daily Prophet", description: "Stable dividend, manipulated news.", basePrice: 120, volatility: 0.05 },
  { id: 'nimbus', ticker: 'NBR', name: "Nimbus Racing Broom Co", description: "Cyclical. Watch for new model releases.", basePrice: 250, volatility: 0.15 },
  { id: 'ollivanders', ticker: 'OLL', name: "Ollivanders", description: "The gold standard in wands.", basePrice: 500, volatility: 0.03 },
  { id: 'gringotts', ticker: 'GRN', name: "Gringotts Holdings", description: "Betting on the house. Very safe.", basePrice: 1000, volatility: 0.01 },
  { id: 'zonko', ticker: 'ZNK', name: "Zonko's Joke Shop", description: "Struggling against WWW. High volatility.", basePrice: 30, volatility: 0.4 },
];

export const VAULT_UPGRADES: VaultUpgrade[] = [
  { level: 1, name: 'Standard Vault', cost: 0, capacity: 1000, image: '🗝️', description: 'A basic vault for basic needs.' },
  { level: 2, name: 'Reinforced Door', cost: 1000, capacity: 5000, image: '🚪', description: 'Goblin-forged steel door protection.' },
  { level: 3, name: 'Spell-Sealed', cost: 5000, capacity: 25000, image: '✨', description: 'Protected by ancient protective enchantments.' },
  { level: 4, name: 'Dragon Guarded', cost: 20000, capacity: 100000, image: '🐉', description: 'A Ukrainian Ironbelly sleeps outside.' },
  { level: 5, name: 'Deepest Dungeon', cost: 100000, capacity: 1000000, image: '🏯', description: 'Maximum security. Almost impenetrable.' },
];

export const INITIAL_CHARACTER: Character = {
  name: "Apprentice Wizard",
  house: "Gryffindor",
  gold: 0,
  avatarUrl: "https://picsum.photos/seed/wizard/200/200",
  inventory: [],
  equipped: [],
  customItemImages: {},
  stats: {
    attack: 0,
    defense: 0,
    wins: 0,
    losses: 0,
  },
  matchHistory: [],
  solvedQuestions: [],
  ingredients: {},
  potions: {},
  creatures: [],
  vaultLevel: 1,
  portfolio: {},
  marketPrices: STOCK_MARKET_LIST.reduce((acc, stock) => ({...acc, [stock.id]: stock.basePrice}), {} as Record<string, number>)
};

export const INGREDIENTS_LIST: Ingredient[] = [
  // Basic Ingredients
  { id: 'mandrake', name: 'Mandrake Root', price: 50, description: 'Essential for restorative draughts.', image: '🌱' },
  { id: 'bezoar', name: 'Bezoar', price: 80, description: 'A stone from the stomach of a goat.', image: '🪨' },
  { id: 'lacewing', name: 'Lacewing Flies', price: 30, description: 'Must be stewed for 21 days.', image: '🪰' },
  { id: 'peppermint', name: 'Peppermint', price: 5, description: 'Counter-effect to excessive singing.', image: '🍬' },
  { id: 'ginger', name: 'Ginger Root', price: 8, description: 'Wit-sharpening ingredient.', image: '🫚' },
  { id: 'porcupine', name: 'Porcupine Quills', price: 10, description: 'Handle with care.', image: '🦔' },
  { id: 'flobberworm', name: 'Flobberworm Mucus', price: 15, description: 'Thickens potions.', image: '🟢' },
  { id: 'leech_juice', name: 'Leech Juice', price: 20, description: 'Needed for Polyjuice Potion.', image: '🩸' },
  { id: 'horklump', name: 'Horklump Juice', price: 25, description: 'Healing properties.', image: '🍄' },

  // Intermediate Ingredients
  { id: 'valerian', name: 'Valerian Sprigs', price: 40, description: 'Sedative properties.', image: '🌱' },
  { id: 'knotgrass', name: 'Knotgrass', price: 45, description: 'Ties knots in everything.', image: '🌾' },
  { id: 'shrivelfig', name: 'Shrivelfig', price: 55, description: 'Decanted for shrinking potions.', image: '🟣' },
  { id: 'fluxweed', name: 'Fluxweed', price: 60, description: 'Must be picked at full moon.', image: '🌑' },
  { id: 'wormwood', name: 'Infusion of Wormwood', price: 70, description: 'A very bitter herb.', image: '🌿' },
  { id: 'asphodel', name: 'Powdered Asphodel', price: 90, description: 'Key ingredient for sleeping potions.', image: '🌼' },
  { id: 'moonstone', name: 'Moonstone', price: 100, description: 'Used in love potions and draughts of peace.', image: '💎' },
  { id: 'dittany', name: 'Dittany', price: 100, description: 'Powerful healing herb.', image: '🍃' },

  // Rare Ingredients
  { id: 'unicorn_hair', name: 'Unicorn Hair', price: 120, description: 'Gathered from the Forbidden Forest.', image: '🦄' },
  { id: 'wolfsbane_plant', name: 'Wolfsbane', price: 130, description: 'Also known as aconite or monkshood.', image: '🐺' },
  { id: 'dragon_liver', name: 'Dragon Liver', price: 150, description: 'Highly potent and volatile.', image: '🐉' },
  { id: 'sopophorous', name: 'Sopophorous Bean', price: 180, description: 'Juice is extracted by crushing, not cutting.', image: '🫘' },
  { id: 'boomslang', name: 'Boomslang Skin', price: 200, description: 'Shredded skin of a poisonous snake.', image: '🐍' },
  { id: 'horn_of_bicorn', name: 'Horn of Bicorn', price: 250, description: 'Extremely rare ingredient.', image: '🦄' },
  { id: 'ashwinder', name: 'Ashwinder Egg', price: 300, description: 'Frozen immediately to prevent combustion.', image: '🥚' }
];

export const POTION_RECIPES: Potion[] = [
  // Basic Potions
  { 
    id: 'cure_boils', 
    name: 'Cure for Boils', 
    description: 'A simple potion to cure boils. Watch the heat!', 
    sellPrice: 150, 
    image: '⚗️',
    ingredients: ['mandrake', 'bezoar'],
    difficulty: 10
  },
  { 
    id: 'pepperup', 
    name: 'Pepperup Potion', 
    description: 'Cures the common cold. Steam from ears side-effect.', 
    sellPrice: 400, 
    image: '😤',
    ingredients: ['horn_of_bicorn', 'mandrake', 'ginger'],
    difficulty: 30
  },
  { 
    id: 'confusing', 
    name: 'Confusing Concoction', 
    description: 'Causes confusion and recklessness.', 
    sellPrice: 350, 
    image: '😵',
    ingredients: ['leech_juice', 'horklump'],
    difficulty: 35
  },
  { 
    id: 'essence_dittany', 
    name: 'Essence of Dittany', 
    description: 'Powerful healing agent for wounds.', 
    sellPrice: 500, 
    image: '🩹',
    ingredients: ['dittany', 'leech_juice'],
    difficulty: 45
  },
  
  // Intermediate Potions
  { 
    id: 'forgetfulness', 
    name: 'Forgetfulness Potion', 
    description: 'Causes an unknown degree of memory loss.', 
    sellPrice: 250, 
    image: '🧪',
    ingredients: ['mandrake', 'unicorn_hair'],
    difficulty: 25
  },
  { 
    id: 'sleeping', 
    name: 'Sleeping Draught', 
    description: 'Induces immediate, deep sleep.', 
    sellPrice: 400, 
    image: '💤',
    ingredients: ['mandrake', 'lacewing', 'unicorn_hair'],
    difficulty: 40
  },
  { 
    id: 'ageing', 
    name: 'Ageing Potion', 
    description: 'Causes the drinker to age temporarily.', 
    sellPrice: 600, 
    image: '👴',
    ingredients: ['boomslang', 'leech_juice'],
    difficulty: 50
  },
  { 
    id: 'skele_gro', 
    name: 'Skele-Gro', 
    description: 'Regrows bones. Tastes awful.', 
    sellPrice: 900, 
    image: '🦴',
    ingredients: ['flobberworm', 'shrivelfig', 'porcupine'],
    difficulty: 60
  },
  { 
    id: 'peace', 
    name: 'Draught of Peace', 
    description: 'Relieves anxiety and agitation.', 
    sellPrice: 1000, 
    image: '😌',
    ingredients: ['moonstone', 'valerian', 'porcupine'],
    difficulty: 70
  },

  // Advanced Potions
  { 
    id: 'polyjuice_simple', 
    name: 'Polyjuice Potion (Weak)', 
    description: 'Allows the drinker to assume the form of another for a short time.', 
    sellPrice: 1200, 
    image: '👥',
    ingredients: ['lacewing', 'boomslang', 'dragon_liver'],
    difficulty: 75
  },
  { 
    id: 'polyjuice', 
    name: 'Polyjuice Potion (Strong)', 
    description: 'Allows the drinker to assume the form of another.', 
    sellPrice: 2500, 
    image: '👥',
    ingredients: ['lacewing', 'boomslang', 'horn_of_bicorn'],
    difficulty: 80
  },
  { 
    id: 'draught_living_death', 
    name: 'Draught of Living Death', 
    description: 'A sleeping potion so powerful it mimics death.', 
    sellPrice: 2800, 
    image: '💀',
    ingredients: ['asphodel', 'wormwood', 'sopophorous'],
    difficulty: 85
  },
  { 
    id: 'wolfsbane', 
    name: 'Wolfsbane Potion', 
    description: 'Relieves symptoms of lycanthropy. Does not cure.', 
    sellPrice: 3500, 
    image: '🌕',
    ingredients: ['wolfsbane_plant', 'moonstone', 'valerian'],
    difficulty: 95
  },
  { 
    id: 'veritaserum', 
    name: 'Veritaserum', 
    description: 'Forces the drinker to tell the truth.', 
    sellPrice: 4500, 
    image: '👁️',
    ingredients: ['moonstone', 'sopophorous', 'unicorn_hair'],
    difficulty: 90
  },
  { 
    id: 'amortentia', 
    name: 'Amortentia', 
    description: 'The most powerful love potion in the world.', 
    sellPrice: 2000, 
    image: '💖',
    ingredients: ['moonstone', 'ashwinder', 'dragon_liver'],
    difficulty: 60
  },
  { 
    id: 'felix', 
    name: 'Felix Felicis', 
    description: 'Liquid Luck. Very dangerous to brew.', 
    sellPrice: 5000, 
    image: '🍀',
    ingredients: ['ashwinder', 'moonstone', 'dragon_liver', 'unicorn_hair'],
    difficulty: 95
  },
  { 
    id: 'elixir_life',
    name: 'Elixir of Life',
    description: 'Extends life. Requires extremely rare ingredients.',
    sellPrice: 10000,
    image: '🏺',
    ingredients: ['ashwinder', 'sopophorous', 'horn_of_bicorn'],
    difficulty: 99
  }
];

export const CREATURE_SHOP: CreatureDefinition[] = [
    // Original Creatures
    { id: 'owl_common', species: 'Barn Owl', name: 'Barn Owl', description: 'Reliable mail carrier. Occasionally finds loose change.', price: 200, image: '🦉', bonusType: 'GOLD_FINDER', bonusValue: 5 },
    { id: 'toad', species: 'Common Toad', name: 'Toad', description: 'Not very popular, but loyal. Slime aids defense.', price: 50, image: '🐸', bonusType: 'DEFENSE_BOOST', bonusValue: 5 },
    { id: 'cat_kneazle', species: 'Kneazle', name: 'Kneazle', description: 'Intelligent cat-like creature. Good at sniffing out bargains.', price: 300, image: '🐈', bonusType: 'DISCOUNT', bonusValue: 0.05 },
    { id: 'hippogriff', species: 'Hippogriff', name: 'Hippogriff', description: 'Proud and powerful. Intimidates foes.', price: 1000, image: '🦅', bonusType: 'ATTACK_BOOST', bonusValue: 10 },
    { id: 'dragon_hatchling', species: 'Dragon Hatchling', name: 'Norbert', description: 'Illegal, dangerous, and adorable. Hoards gold.', price: 5000, image: '🐲', bonusType: 'GOLD_FINDER', bonusValue: 50 },
    { id: 'niffler', species: 'Niffler', name: 'Niffler', description: 'Attracted to shiny things. Excellent treasure hunter.', price: 800, image: '🦡', bonusType: 'GOLD_FINDER', bonusValue: 20 },
    { id: 'phoenix_chick', species: 'Phoenix Chick', name: 'Fawkes Jr.', description: 'Immortal and loyal. Healing tears boost defense.', price: 10000, image: '🔥', bonusType: 'DEFENSE_BOOST', bonusValue: 50 },

    // New Creatures
    { id: 'puffskein', species: 'Pygmy Puff', name: 'Pygmy Puff', description: 'Cute, fluffy, and comes in various shades of pink and purple.', price: 150, image: '🧶', bonusType: 'DEFENSE_BOOST', bonusValue: 2 },
    { id: 'bowtruckle', species: 'Bowtruckle', name: 'Bowtruckle', description: 'Tree guardian. Good at picking locks (finding discounts).', price: 450, image: '🌱', bonusType: 'DISCOUNT', bonusValue: 0.02 },
    { id: 'demiguise', species: 'Demiguise', name: 'Demiguise', description: 'Can turn invisible. Enhances defensive tactics.', price: 1200, image: '🐒', bonusType: 'DEFENSE_BOOST', bonusValue: 15 },
    { id: 'occamy', species: 'Occamy', name: 'Occamy', description: 'Choranaptyxic. Grows to fill space. Aggressive.', price: 2500, image: '🐍', bonusType: 'ATTACK_BOOST', bonusValue: 25 },
    { id: 'thestral', species: 'Thestral', name: 'Thestral', description: 'Invisible to those who haven\'t seen death. Unnerving.', price: 1800, image: '🐎', bonusType: 'ATTACK_BOOST', bonusValue: 18 },
    { id: 'mooncalf', species: 'Mooncalf', name: 'Mooncalf', description: 'Dances by moonlight. Its dung makes magical plants grow.', price: 600, image: '🐂', bonusType: 'GOLD_FINDER', bonusValue: 8 },
    { id: 'fwooper', species: 'Fwooper', name: 'Fwooper', description: 'Brightly colored bird. Its song will drive you mad.', price: 900, image: '🦜', bonusType: 'ATTACK_BOOST', bonusValue: 12 },
    { id: 'diricawl', species: 'Diricawl', name: 'Diricawl', description: 'Flightless bird that can vanish. Hard to catch.', price: 750, image: '🐦', bonusType: 'DEFENSE_BOOST', bonusValue: 10 },
    { id: 'ghoul', species: 'Ghoul', name: 'Attic Ghoul', description: 'Noisy and messy, but keeps unwanted guests away.', price: 100, image: '🧟', bonusType: 'DEFENSE_BOOST', bonusValue: 3 },
    { id: 'gnome', species: 'Garden Gnome', name: 'Gnome', description: 'Pest. Might dig up a knut or two.', price: 25, image: '🥔', bonusType: 'GOLD_FINDER', bonusValue: 1 },
    { id: 'fire_crab', species: 'Fire Crab', name: 'Fire Crab', description: 'Looks like a jeweled tortoise. Shoots fire.', price: 1100, image: '🦀', bonusType: 'ATTACK_BOOST', bonusValue: 14 },
    { id: 'salamander', species: 'Fire Dwelling Salamander', name: 'Salamander', description: 'Lives in flames. Hot to handle.', price: 550, image: '🦎', bonusType: 'ATTACK_BOOST', bonusValue: 8 },
    { id: 'streeler', species: 'Streeler', name: 'Streeler', description: 'Giant snail that leaves a poisonous trail.', price: 650, image: '🐌', bonusType: 'DEFENSE_BOOST', bonusValue: 8 },
    { id: 'jarvey', species: 'Jarvey', name: 'Jarvey', description: 'Looks like a ferret. Can talk (mostly insults).', price: 400, image: '🦦', bonusType: 'ATTACK_BOOST', bonusValue: 5 },
    { id: 'jobberknoll', species: 'Jobberknoll', name: 'Jobberknoll', description: 'Silent until death. Feathers used in truth serums.', price: 500, image: '🐦‍⬛', bonusType: 'DISCOUNT', bonusValue: 0.03 },
    { id: 'knarl', species: 'Knarl', name: 'Knarl', description: 'Suspicious hedgehog-like creature.', price: 250, image: '🦔', bonusType: 'DEFENSE_BOOST', bonusValue: 4 },
    { id: 'moke', species: 'Moke', name: 'Moke', description: 'Shrinks at will. Hides in small places.', price: 350, image: '🦎', bonusType: 'DEFENSE_BOOST', bonusValue: 6 },
    { id: 'plimpy', species: 'Plimpy', name: 'Plimpy', description: 'Spherical fish. Nibbles on toes.', price: 120, image: '🐟', bonusType: 'ATTACK_BOOST', bonusValue: 2 },
    { id: 'billywig', species: 'Billywig', name: 'Billywig', description: 'Blue insect. Sting causes levitation.', price: 850, image: '🐝', bonusType: 'GOLD_FINDER', bonusValue: 10 },
    { id: 'blast_ended_skrewt', species: 'Blast-Ended Skrewt', name: 'Skrewt', description: 'Illegal hybrid. Explodes from the rear. Very dangerous.', price: 2200, image: '🦂', bonusType: 'ATTACK_BOOST', bonusValue: 30 }
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // ... (Existing questions kept for brevity, assuming they are unchanged)
  {
    question: "What is the core of the Elder Wand?",
    options: ["Phoenix Feather", "Dragon Heartstring", "Thestral Tail Hair", "Unicorn Hair"],
    correctAnswer: 2
  },
  {
    question: "Which Potion is known as 'Liquid Luck'?",
    options: ["Amortentia", "Polyjuice Potion", "Veritaserum", "Felix Felicis"],
    correctAnswer: 3
  },
  // ... (Rest of questions)
];

export const SHOP_ITEMS: GameItem[] = [
    // ... (Existing items kept for brevity)
    {
    id: 1001,
    name: "Harry Potter's Wand",
    description: "11\" Holly, Phoenix Feather. Nice and supple. A brother to the Dark Lord's wand.",
    price: 3000,
    type: 'wand',
    attack: 280,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/wand_harry/200/200"
  },
  // ...
];

export const OPPONENT_NAMES = [
  "Lord Voldemort",
  "Bellatrix Lestrange",
  "Severus Snape",
  "Draco Malfoy",
  "Lucius Malfoy",
  "Fenrir Greyback",
  "Dolores Umbridge",
  "Peter Pettigrew",
  "Barty Crouch Jr."
];

// --- WAND CRAFTING CONSTANTS ---

export const WAND_WOODS: WandWood[] = [
  { id: 'holly', name: 'Holly', description: 'A rare kind of wood, traditionally considered protective.', cost: 500, attackBonus: 30, color: '#e2d7c0' },
  { id: 'yew', name: 'Yew', description: 'Sap is poisonous. Often associated with dark wizards.', cost: 800, attackBonus: 60, color: '#d9a67a' },
  { id: 'ash', name: 'Ash', description: 'Stubborn wood. Cleaves to its one true master.', cost: 600, attackBonus: 40, color: '#c7b299' },
  { id: 'vine', name: 'Vine', description: 'For those who seek a higher purpose.', cost: 700, attackBonus: 45, color: '#8b5a2b' },
  { id: 'elder', name: 'Elder', description: 'The rarest wand wood of all. Very unlucky.', cost: 2000, attackBonus: 100, color: '#5c4033' },
  { id: 'cherry', name: 'Cherry', description: 'Prized in Mahoutokoro. Makes lethal wands.', cost: 900, attackBonus: 70, color: '#a0522d' },
  { id: 'hawthorn', name: 'Hawthorn', description: 'A complex, intriguing wood.', cost: 750, attackBonus: 50, color: '#6d4c41' },
  { id: 'walnut', name: 'Walnut', description: 'For highly intelligent witches and wizards.', cost: 650, attackBonus: 45, color: '#4e342e' },
];

export const WAND_CORES: WandCore[] = [
  { id: 'unicorn', name: 'Unicorn Hair', description: 'Produces the most consistent magic. Hard to turn to the Dark Arts.', cost: 400, defenseBonus: 50, image: '🦄' },
  { id: 'dragon', name: 'Dragon Heartstring', description: 'Produces the most power. Capable of flamboyant spells.', cost: 600, defenseBonus: 20, image: '🐉' },
  { id: 'phoenix', name: 'Phoenix Feather', description: 'Capable of the greatest range of magic. Hard to tame.', cost: 800, defenseBonus: 40, image: '🔥' },
  { id: 'thestral', name: 'Thestral Hair', description: 'Unstable and tricky, but potent.', cost: 1200, defenseBonus: 10, image: '💀' },
  { id: 'veela', name: 'Veela Hair', description: 'Temperamental. Good for charms.', cost: 500, defenseBonus: 30, image: '🧚‍♀️' },
];

export const WAND_COLORS: WandColor[] = [
  { id: 'natural', name: 'Natural Polish', hex: 'transparent', cost: 0 },
  { id: 'midnight', name: 'Midnight Blue', hex: '#1e3a8a', cost: 100 },
  { id: 'blood', name: 'Blood Red', hex: '#7f1d1d', cost: 100 },
  { id: 'emerald', name: 'Emerald Green', hex: '#064e3b', cost: 100 },
  { id: 'void', name: 'Void Black', hex: '#0f172a', cost: 200 },
  { id: 'ivory', name: 'Ivory White', hex: '#f8fafc', cost: 150 },
  { id: 'gold', name: 'Gilded', hex: '#ca8a04', cost: 500 },
];
