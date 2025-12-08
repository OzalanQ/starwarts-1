

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

export const SHOP_ITEMS: GameItem[] = [
  // WANDS
  { id: 2001, name: "10\" Oak, Dragon Heartstring", description: "Reliable and sturdy. Good for transfiguration.", price: 500, type: 'wand', attack: 45, defense: 10, imageUrl: "https://picsum.photos/seed/wand_oak/200/200" },
  { id: 2002, name: "11\" Holly, Phoenix Feather", description: "A brother to the Dark Lord's wand.", price: 3000, type: 'wand', attack: 280, defense: 50, imageUrl: "https://picsum.photos/seed/wand_harry/200/200" },
  { id: 2003, name: "14\" Willow, Unicorn Hair", description: "Great for charms work. belonged to a famous redhead.", price: 450, type: 'wand', attack: 40, defense: 15, imageUrl: "https://picsum.photos/seed/wand_willow/200/200" },
  { id: 2004, name: "12\" Ash, Unicorn Hair", description: "Stubborn wand for a stubborn wizard.", price: 400, type: 'wand', attack: 35, defense: 10, imageUrl: "https://picsum.photos/seed/wand_ash/200/200" },
  { id: 2005, name: "13.5\" Yew, Dragon Heartstring", description: "Powerful and precise. Often associated with dueling.", price: 1200, type: 'wand', attack: 110, defense: 20, imageUrl: "https://picsum.photos/seed/wand_yew/200/200" },
  { id: 2006, name: "15\" Elder, Thestral Hair", description: "The Deathstick. Unbeatable.", price: 50000, type: 'wand', attack: 500, defense: 100, imageUrl: "https://picsum.photos/seed/wand_elder/200/200" },
  { id: 2007, name: "10.75\" Vine, Dragon Heartstring", description: "Sensitive and intelligent.", price: 800, type: 'wand', attack: 75, defense: 30, imageUrl: "https://picsum.photos/seed/wand_vine/200/200" },
  { id: 2008, name: "10.25\" Cypress, Unicorn Hair", description: "Associated with nobility. Ideal for self-sacrifice.", price: 700, type: 'wand', attack: 65, defense: 25, imageUrl: "https://picsum.photos/seed/wand_cypress/200/200" },
  { id: 2009, name: "9.5\" Fir, Dragon Heartstring", description: "Resilient. Requires strength of mind.", price: 650, type: 'wand', attack: 60, defense: 20, imageUrl: "https://picsum.photos/seed/wand_fir/200/200" },
  { id: 2010, name: "13\" Cherry, Unicorn Hair", description: "Prized in Japan. Possesses lethal power.", price: 900, type: 'wand', attack: 85, defense: 15, imageUrl: "https://picsum.photos/seed/wand_cherry/200/200" },
  { id: 2011, name: "18\" Elm, Dragon Heartstring", description: "Dignified. Produces the fewest accidents.", price: 1100, type: 'wand', attack: 95, defense: 35, imageUrl: "https://picsum.photos/seed/wand_elm/200/200" },
  { id: 2012, name: "12.75\" Walnut, Dragon Heartstring", description: "For the highly intelligent witch or wizard.", price: 1000, type: 'wand', attack: 90, defense: 10, imageUrl: "https://picsum.photos/seed/wand_walnut/200/200" },
  { id: 2013, name: "10\" Hawthorn, Unicorn Hair", description: "Complex and intriguing. Good for healing and curses.", price: 850, type: 'wand', attack: 70, defense: 40, imageUrl: "https://picsum.photos/seed/wand_hawthorn/200/200" },
  { id: 2014, name: "9.5\" Rosewood, Veela Hair", description: "Beautiful and temperamental.", price: 1500, type: 'wand', attack: 100, defense: 60, imageUrl: "https://picsum.photos/seed/wand_rosewood/200/200" },
  { id: 2015, name: "11\" Blackthorn, Dragon Heartstring", description: "Best suited for a warrior.", price: 950, type: 'wand', attack: 92, defense: 25, imageUrl: "https://picsum.photos/seed/wand_blackthorn/200/200" },
  { id: 2016, name: "10.25\" Hornbeam, Dragon Heartstring", description: "For one with a singular passion.", price: 880, type: 'wand', attack: 82, defense: 18, imageUrl: "https://picsum.photos/seed/wand_hornbeam/200/200" },
  { id: 2017, name: "9.25\" Chestnut, Dragon Heartstring", description: "Attracted to skilled tamers of beasts.", price: 720, type: 'wand', attack: 68, defense: 22, imageUrl: "https://picsum.photos/seed/wand_chestnut/200/200" },
  { id: 2018, name: "11.5\" Aspen, Phoenix Feather", description: "Outstanding for martial magic. The duelist's wand.", price: 1300, type: 'wand', attack: 115, defense: 45, imageUrl: "https://picsum.photos/seed/wand_aspen/200/200" },
  { id: 2019, name: "10.5\" Cedar, Dragon Heartstring", description: "For the perspicacious and loyal.", price: 780, type: 'wand', attack: 72, defense: 28, imageUrl: "https://picsum.photos/seed/wand_cedar/200/200" },
  { id: 2020, name: "11\" Dogwood, Unicorn Hair", description: "Playful and mischievous. Refuses non-verbal spells.", price: 620, type: 'wand', attack: 55, defense: 12, imageUrl: "https://picsum.photos/seed/wand_dogwood/200/200" },
  { id: 2021, name: "13.25\" Ebony, Dragon Heartstring", description: "For those who hold fast to their beliefs.", price: 1400, type: 'wand', attack: 120, defense: 30, imageUrl: "https://picsum.photos/seed/wand_ebony/200/200" },
  { id: 2022, name: "9.75\" Hazel, Unicorn Hair", description: "Sensitive. Reflects its owner's emotional state.", price: 680, type: 'wand', attack: 62, defense: 35, imageUrl: "https://picsum.photos/seed/wand_hazel/200/200" },
  { id: 2023, name: "12\" Larch, Phoenix Feather", description: "Instills courage and confidence.", price: 920, type: 'wand', attack: 88, defense: 32, imageUrl: "https://picsum.photos/seed/wand_larch/200/200" },
  { id: 2024, name: "11.25\" Laurel, Dragon Heartstring", description: "Cannot perform a dishonorable act.", price: 860, type: 'wand', attack: 80, defense: 50, imageUrl: "https://picsum.photos/seed/wand_laurel/200/200" },
  { id: 2025, name: "10\" Maple, Phoenix Feather", description: "For the traveller and explorer.", price: 890, type: 'wand', attack: 84, defense: 26, imageUrl: "https://picsum.photos/seed/wand_maple/200/200" },
  { id: 2026, name: "12.5\" Pear, Unicorn Hair", description: "Resilient. Never looks worn.", price: 710, type: 'wand', attack: 66, defense: 38, imageUrl: "https://picsum.photos/seed/wand_pear/200/200" },
  { id: 2027, name: "11\" Pine, Phoenix Feather", description: "For the independent and individual.", price: 940, type: 'wand', attack: 89, defense: 29, imageUrl: "https://picsum.photos/seed/wand_pine/200/200" },
  { id: 2028, name: "10.75\" Poplar, Dragon Heartstring", description: "A wand you can rely upon. Consistent.", price: 640, type: 'wand', attack: 58, defense: 42, imageUrl: "https://picsum.photos/seed/wand_poplar/200/200" },
  { id: 2029, name: "10\" Red Oak, Unicorn Hair", description: "Fast reactions. Perfect for dueling.", price: 980, type: 'wand', attack: 94, defense: 15, imageUrl: "https://picsum.photos/seed/wand_redoak/200/200" },
  { id: 2030, name: "11.5\" Redwood, Phoenix Feather", description: "Bring good fortune to its owner.", price: 1600, type: 'wand', attack: 105, defense: 55, imageUrl: "https://picsum.photos/seed/wand_redwood/200/200" },
  { id: 2031, name: "12.25\" Rowan, Unicorn Hair", description: "Produces the strongest defensive charms.", price: 850, type: 'wand', attack: 40, defense: 90, imageUrl: "https://picsum.photos/seed/wand_rowan/200/200" },
  { id: 2032, name: "10.5\" Silver Lime, Dragon Heartstring", description: "Rare. Favored by Seers and Legilimens.", price: 1150, type: 'wand', attack: 98, defense: 48, imageUrl: "https://picsum.photos/seed/wand_silverlime/200/200" },
  { id: 2033, name: "9\" Spruce, Unicorn Hair", description: "Requires a firm hand. Not for the tentative.", price: 730, type: 'wand', attack: 69, defense: 21, imageUrl: "https://picsum.photos/seed/wand_spruce/200/200" },
  { id: 2034, name: "11\" Sycamore, Dragon Heartstring", description: "Craves variety. Combusts if bored.", price: 760, type: 'wand', attack: 74, defense: 14, imageUrl: "https://picsum.photos/seed/wand_sycamore/200/200" },
  
  // SPELLS
  { id: 3001, name: "Expelliarmus", description: "The Disarming Charm. A dueling staple.", price: 200, type: 'spell', attack: 20, defense: 10, imageUrl: "https://picsum.photos/seed/spell_expelliarmus/200/200" },
  { id: 3002, name: "Stupefy", description: "Stuns the target, rendering them unconscious.", price: 300, type: 'spell', attack: 35, defense: 5, imageUrl: "https://picsum.photos/seed/spell_stupefy/200/200" },
  { id: 3003, name: "Protego", description: "The Shield Charm. Reflects minor spells.", price: 250, type: 'spell', attack: 0, defense: 40, imageUrl: "https://picsum.photos/seed/spell_protego/200/200" },
  { id: 3004, name: "Incendio", description: "Conjures a jet of flames.", price: 350, type: 'spell', attack: 45, defense: 0, imageUrl: "https://picsum.photos/seed/spell_incendio/200/200" },
  { id: 3005, name: "Petrificus Totalus", description: "Full Body-Bind Curse.", price: 400, type: 'spell', attack: 30, defense: 20, imageUrl: "https://picsum.photos/seed/spell_petrificus/200/200" },
  { id: 3006, name: "Flipendo", description: "Knockback Jinx. Pushes enemies away.", price: 150, type: 'spell', attack: 15, defense: 10, imageUrl: "https://picsum.photos/seed/spell_flipendo/200/200" },
  { id: 3007, name: "Rictusempra", description: "Tickling Charm. Distracts the opponent.", price: 180, type: 'spell', attack: 10, defense: 15, imageUrl: "https://picsum.photos/seed/spell_rictusempra/200/200" },
  { id: 3008, name: "Wingardium Leviosa", description: "Levitation Charm. Drop things on foes.", price: 100, type: 'spell', attack: 10, defense: 5, imageUrl: "https://picsum.photos/seed/spell_wingardium/200/200" },
  { id: 3009, name: "Lumos Solem", description: "Blinding flash of sunlight.", price: 220, type: 'spell', attack: 15, defense: 25, imageUrl: "https://picsum.photos/seed/spell_lumos/200/200" },
  { id: 3010, name: "Confringo", description: "Blasting Curse. Causes an explosion.", price: 600, type: 'spell', attack: 70, defense: 0, imageUrl: "https://picsum.photos/seed/spell_confringo/200/200" },
  { id: 3011, name: "Diffindo", description: "Severing Charm. Cuts through defenses.", price: 450, type: 'spell', attack: 55, defense: 0, imageUrl: "https://picsum.photos/seed/spell_diffindo/200/200" },
  { id: 3012, name: "Bombarda", description: "Provokes a small explosion.", price: 500, type: 'spell', attack: 60, defense: 0, imageUrl: "https://picsum.photos/seed/spell_bombarda/200/200" },
  { id: 3013, name: "Bombarda Maxima", description: "Provokes a large explosion.", price: 800, type: 'spell', attack: 90, defense: 0, imageUrl: "https://picsum.photos/seed/spell_bombardamax/200/200" },
  { id: 3014, name: "Reducto", description: "Reductor Curse. Blasts solid objects to dust.", price: 550, type: 'spell', attack: 65, defense: 0, imageUrl: "https://picsum.photos/seed/spell_reducto/200/200" },
  { id: 3015, name: "Sectumsempra", description: "For enemies. Causes deep cuts.", price: 2000, type: 'spell', attack: 150, defense: 0, imageUrl: "https://picsum.photos/seed/spell_sectumsempra/200/200" },
  { id: 3016, name: "Levicorpus", description: "Dangles the victim by their ankle.", price: 300, type: 'spell', attack: 25, defense: 25, imageUrl: "https://picsum.photos/seed/spell_levicorpus/200/200" },
  { id: 3017, name: "Oppugno", description: "Directs objects to attack.", price: 350, type: 'spell', attack: 35, defense: 10, imageUrl: "https://picsum.photos/seed/spell_oppugno/200/200" },
  { id: 3018, name: "Serpensortia", description: "Summons a snake.", price: 400, type: 'spell', attack: 40, defense: 10, imageUrl: "https://picsum.photos/seed/spell_serpensortia/200/200" },
  { id: 3019, name: "Aguamenti", description: "Conjures water. Extinguishes fires.", price: 150, type: 'spell', attack: 5, defense: 30, imageUrl: "https://picsum.photos/seed/spell_aguamenti/200/200" },
  { id: 3020, name: "Glacius", description: "Freezes the target.", price: 380, type: 'spell', attack: 30, defense: 30, imageUrl: "https://picsum.photos/seed/spell_glacius/200/200" },
  { id: 3021, name: "Episkey", description: "Heals minor injuries instantly.", price: 500, type: 'spell', attack: 0, defense: 60, imageUrl: "https://picsum.photos/seed/spell_episkey/200/200" },
  { id: 3022, name: "Protego Totalum", description: "Protects an area from spells.", price: 700, type: 'spell', attack: 0, defense: 80, imageUrl: "https://picsum.photos/seed/spell_prototal/200/200" },
  { id: 3023, name: "Salvio Hexia", description: "Deflects hexes.", price: 650, type: 'spell', attack: 0, defense: 70, imageUrl: "https://picsum.photos/seed/spell_salvio/200/200" },
  { id: 3024, name: "Expecto Patronum", description: "Summons a spirit guardian.", price: 1200, type: 'spell', attack: 20, defense: 120, imageUrl: "https://picsum.photos/seed/spell_patronus/200/200" },
  { id: 3025, name: "Riddikulus", description: "Forces a boggart to assume a funny shape.", price: 250, type: 'spell', attack: 15, defense: 20, imageUrl: "https://picsum.photos/seed/spell_riddikulus/200/200" },
  { id: 3026, name: "Confundo", description: "Causes confusion.", price: 450, type: 'spell', attack: 20, defense: 40, imageUrl: "https://picsum.photos/seed/spell_confundo/200/200" },
  { id: 3027, name: "Obliviate", description: "Erases memories. Disorienting.", price: 800, type: 'spell', attack: 10, defense: 80, imageUrl: "https://picsum.photos/seed/spell_obliviate/200/200" },
  { id: 3028, name: "Langlock", description: "Glues the victim's tongue to the roof of their mouth.", price: 320, type: 'spell', attack: 25, defense: 15, imageUrl: "https://picsum.photos/seed/spell_langlock/200/200" },
  { id: 3029, name: "Furnunculus", description: "Covers the target in boils.", price: 280, type: 'spell', attack: 30, defense: 5, imageUrl: "https://picsum.photos/seed/spell_furnunculus/200/200" },
  { id: 3030, name: "Tarantallegra", description: "Forces the legs to dance uncontrollably.", price: 330, type: 'spell', attack: 28, defense: 10, imageUrl: "https://picsum.photos/seed/spell_tarantallegra/200/200" },
  { id: 3031, name: "Silencio", description: "Silences the target.", price: 420, type: 'spell', attack: 10, defense: 40, imageUrl: "https://picsum.photos/seed/spell_silencio/200/200" },
  { id: 3032, name: "Incarcerous", description: "Binds the target with ropes.", price: 480, type: 'spell', attack: 20, defense: 45, imageUrl: "https://picsum.photos/seed/spell_incarcerous/200/200" },
  { id: 3033, name: "Locomotor Mortis", description: "Leg-Locker Curse.", price: 290, type: 'spell', attack: 25, defense: 10, imageUrl: "https://picsum.photos/seed/spell_locomotor/200/200" },
  { id: 3034, name: "Fiendfyre", description: "Cursed fire that incinerates everything.", price: 5000, type: 'spell', attack: 300, defense: 0, imageUrl: "https://picsum.photos/seed/spell_fiendfyre/200/200" },
  
  // EQUIPMENT
  { id: 4001, name: "Hogwarts School Robes", description: "Standard uniform. Plain black.", price: 50, type: 'equipment', attack: 0, defense: 10, imageUrl: "https://picsum.photos/seed/equip_robes/200/200" },
  { id: 4002, name: "Winter Cloak", description: "Heavy wool with silver fastenings.", price: 120, type: 'equipment', attack: 0, defense: 25, imageUrl: "https://picsum.photos/seed/equip_cloak/200/200" },
  { id: 4003, name: "Dragon-Hide Gloves", description: "Essential for handling dangerous plants.", price: 200, type: 'equipment', attack: 5, defense: 30, imageUrl: "https://picsum.photos/seed/equip_gloves/200/200" },
  { id: 4004, name: "Pointed Hat", description: "For day wear. Stiffened.", price: 40, type: 'equipment', attack: 0, defense: 5, imageUrl: "https://picsum.photos/seed/equip_hat/200/200" },
  { id: 4005, name: "Protective Goggles", description: "For Quidditch or Potions.", price: 80, type: 'equipment', attack: 0, defense: 15, imageUrl: "https://picsum.photos/seed/equip_goggles/200/200" },
  { id: 4006, name: "Quidditch Helmet", description: "Leather, padded.", price: 150, type: 'equipment', attack: 0, defense: 20, imageUrl: "https://picsum.photos/seed/equip_helmet/200/200" },
  { id: 4007, name: "Quidditch Pads", description: "Elbow and knee protection.", price: 100, type: 'equipment', attack: 0, defense: 15, imageUrl: "https://picsum.photos/seed/equip_pads/200/200" },
  { id: 4008, name: "Nimbus 2000", description: "Fast, maneuverable broomstick.", price: 2000, type: 'equipment', attack: 50, defense: 50, imageUrl: "https://picsum.photos/seed/equip_nimbus2000/200/200" },
  { id: 4009, name: "Nimbus 2001", description: "Faster than the 2000. Sleek black.", price: 2500, type: 'equipment', attack: 60, defense: 55, imageUrl: "https://picsum.photos/seed/equip_nimbus2001/200/200" },
  { id: 4010, name: "Firebolt", description: "The fastest broom in the world.", price: 5000, type: 'equipment', attack: 100, defense: 80, imageUrl: "https://picsum.photos/seed/equip_firebolt/200/200" },
  { id: 4011, name: "Cleansweep Seven", description: "Reliable, if not flashy.", price: 800, type: 'equipment', attack: 30, defense: 30, imageUrl: "https://picsum.photos/seed/equip_cleansweep/200/200" },
  { id: 4012, name: "Comet 260", description: "Good braking charm. A bit slow.", price: 600, type: 'equipment', attack: 20, defense: 25, imageUrl: "https://picsum.photos/seed/equip_comet/200/200" },
  { id: 4013, name: "Remembrall", description: "Turns red if you've forgotten something.", price: 50, type: 'equipment', attack: 0, defense: 5, imageUrl: "https://picsum.photos/seed/equip_remembrall/200/200" },
  { id: 4014, name: "Sneakoscope", description: "Lights up when someone untrustworthy is near.", price: 150, type: 'equipment', attack: 0, defense: 20, imageUrl: "https://picsum.photos/seed/equip_sneakoscope/200/200" },
  { id: 4015, name: "Omnioculars", description: "Replay action, slow motion.", price: 300, type: 'equipment', attack: 5, defense: 5, imageUrl: "https://picsum.photos/seed/equip_omni/200/200" },
  { id: 4016, name: "Deluminator", description: "Sucks light from the room.", price: 1000, type: 'equipment', attack: 0, defense: 50, imageUrl: "https://picsum.photos/seed/equip_deluminator/200/200" },
  { id: 4017, name: "Invisibility Cloak", description: "Rare silvery cloak. Renders wearer invisible.", price: 10000, type: 'equipment', attack: 10, defense: 200, imageUrl: "https://picsum.photos/seed/equip_invis/200/200" },
  { id: 4018, name: "Time-Turner", description: "Hour reversal charm. Handle with care.", price: 15000, type: 'equipment', attack: 50, defense: 150, imageUrl: "https://picsum.photos/seed/equip_time/200/200" },
  { id: 4019, name: "Marauder's Map", description: "Shows everyone in Hogwarts.", price: 3000, type: 'equipment', attack: 20, defense: 80, imageUrl: "https://picsum.photos/seed/equip_map/200/200" },
  { id: 4020, name: "Monster Book of Monsters", description: "Stroking the spine calms it.", price: 120, type: 'equipment', attack: 15, defense: 5, imageUrl: "https://picsum.photos/seed/equip_book_monster/200/200" },
  { id: 4021, name: "Advanced Potion Making", description: "Contains notes from the Half-Blood Prince.", price: 200, type: 'equipment', attack: 25, defense: 10, imageUrl: "https://picsum.photos/seed/equip_book_potions/200/200" },
  { id: 4022, name: "History of Magic", description: "By Bathilda Bagshot. Very dry.", price: 60, type: 'equipment', attack: 0, defense: 5, imageUrl: "https://picsum.photos/seed/equip_book_history/200/200" },
  { id: 4023, name: "Hogwarts: A History", description: "Hermione's favorite.", price: 80, type: 'equipment', attack: 0, defense: 10, imageUrl: "https://picsum.photos/seed/equip_book_hog/200/200" },
  { id: 4024, name: "Golden Snitch", description: "Flesh memory. Good luck charm.", price: 500, type: 'equipment', attack: 0, defense: 40, imageUrl: "https://picsum.photos/seed/equip_snitch/200/200" },
  { id: 4025, name: "Bezoar Case", description: "Carrying case for antidotes.", price: 100, type: 'equipment', attack: 0, defense: 30, imageUrl: "https://picsum.photos/seed/equip_bezoar/200/200" },
  { id: 4026, name: "Foe-Glass", description: "Shows enemies when they are close.", price: 600, type: 'equipment', attack: 10, defense: 60, imageUrl: "https://picsum.photos/seed/equip_foeglass/200/200" },
  { id: 4027, name: "Secrecy Sensor", description: "Vibrates when detecting lies.", price: 350, type: 'equipment', attack: 0, defense: 45, imageUrl: "https://picsum.photos/seed/equip_sensor/200/200" },
  { id: 4028, name: "Probity Probe", description: "Detects concealment charms.", price: 400, type: 'equipment', attack: 0, defense: 50, imageUrl: "https://picsum.photos/seed/equip_probe/200/200" },
  { id: 4029, name: "Mokeskin Pouch", description: "Only the owner can get things out.", price: 250, type: 'equipment', attack: 0, defense: 35, imageUrl: "https://picsum.photos/seed/equip_pouch/200/200" },
  { id: 4030, name: "Two-Way Mirror", description: "Communicate with the holder of the other mirror.", price: 500, type: 'equipment', attack: 0, defense: 20, imageUrl: "https://picsum.photos/seed/equip_mirror/200/200" },
  { id: 4031, name: "Pensieve", description: "Review memories.", price: 2000, type: 'equipment', attack: 0, defense: 100, imageUrl: "https://picsum.photos/seed/equip_pensieve/200/200" },
  { id: 4032, name: "Put-Outer", description: "Dumbledore's invention.", price: 1000, type: 'equipment', attack: 0, defense: 40, imageUrl: "https://picsum.photos/seed/equip_putouter/200/200" },
  { id: 4033, name: "Spectrespecs", description: "See wrackspurts.", price: 40, type: 'equipment', attack: 0, defense: 5, imageUrl: "https://picsum.photos/seed/equip_specs/200/200" },
  { id: 4034, name: "Weasley's Wildfire Whiz-bangs", description: "Unstoppable fireworks.", price: 100, type: 'equipment', attack: 40, defense: 0, imageUrl: "https://picsum.photos/seed/equip_bangs/200/200" },
  { id: 4035, name: "Peruvian Instant Darkness Powder", description: "Creates impenetrable darkness.", price: 300, type: 'equipment', attack: 0, defense: 70, imageUrl: "https://picsum.photos/seed/equip_powder/200/200" }
];
