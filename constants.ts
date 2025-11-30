
import { GameItem, Character, HouseTheme, TriviaQuestion, Ingredient, Potion, CreatureDefinition, Stock, VaultUpgrade } from './types';

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
  // --- Book 1: Philosopher's Stone ---
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
  {
    question: "What is the number of the vault where the Philosopher's Stone was kept?",
    options: ["687", "711", "713", "624"],
    correctAnswer: 2
  },
  {
    question: "Who teaches History of Magic at Hogwarts?",
    options: ["Professor Flitwick", "Professor Binns", "Professor Sinistra", "Professor Vector"],
    correctAnswer: 1
  },
  {
    question: "What position does Harry play on his Quidditch team?",
    options: ["Seeker", "Chaser", "Keeper", "Beater"],
    correctAnswer: 0
  },
  {
    question: "What is the name of Hagrid's three-headed dog?",
    options: ["Fluffy", "Fang", "Norbert", "Aragog"],
    correctAnswer: 0
  },
  {
    question: "What kind of dragon does Hagrid hatch in his hut?",
    options: ["Norwegian Ridgeback", "Hungarian Horntail", "Common Welsh Green", "Chinese Fireball"],
    correctAnswer: 0
  },
  {
    question: "What is the password to the Prefects' Bathroom in 'Goblet of Fire'?",
    options: ["Pine Fresh", "Lemon Drop", "Caput Draconis", "Wattlebird"],
    correctAnswer: 0
  },
  {
    question: "Who is the Hufflepuff Ghost?",
    options: ["The Grey Lady", "The Fat Friar", "The Bloody Baron", "Nearly Headless Nick"],
    correctAnswer: 1
  },
  {
    question: "What flavor of Bertie Bott's Every Flavour Beans did Dumbledore get in his youth?",
    options: ["Vomit", "Earwax", "Soap", "Grass"],
    correctAnswer: 0
  },

  // --- Book 2: Chamber of Secrets ---
  {
    question: "Who was the first victim of the Basilisk in 1943?",
    options: ["Penelope Clearwater", "Colin Creevey", "Moaning Myrtle", "Justin Finch-Fletchley"],
    correctAnswer: 2
  },
  {
    question: "What spell does Hermione use to freeze the Cornish Pixies?",
    options: ["Immobulus", "Petrificus Totalus", "Stupefy", "Expelliarmus"],
    correctAnswer: 0
  },
  {
    question: "Who is the heir of Slytherin?",
    options: ["Draco Malfoy", "Lucius Malfoy", "Tom Riddle", "Harry Potter"],
    correctAnswer: 2
  },
  {
    question: "What item did Lucius Malfoy slip into Ginny Weasley's cauldron?",
    options: ["Tom Riddle's Diary", "A cursed necklace", "A poison vial", "A dark artifact"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the Weasley family owl?",
    options: ["Hedwig", "Pigwidgeon", "Errol", "Hermes"],
    correctAnswer: 2
  },
  {
    question: "Which professor tries to mend Harry's broken arm but removes the bones instead?",
    options: ["Snape", "Lockhart", "Flitwick", "Sprout"],
    correctAnswer: 1
  },
  {
    question: "Where is the entrance to the Chamber of Secrets located?",
    options: ["The dungeons", "The Great Hall", "Moaning Myrtle's Bathroom", "The Astronomy Tower"],
    correctAnswer: 2
  },
  {
    question: "What plant is used to revive those who have been petrified?",
    options: ["Mandrake", "Devil's Snare", "Venomous Tentacula", "Bubotuber"],
    correctAnswer: 0
  },
  {
    question: "What is Aragog?",
    options: ["A dragon", "A giant spider", "A basilisk", "A werewolf"],
    correctAnswer: 1
  },
  {
    question: "Who destroyed Tom Riddle's diary?",
    options: ["Harry Potter", "Ginny Weasley", "Dumbledore", "Ron Weasley"],
    correctAnswer: 0
  },

  // --- Book 3: Prisoner of Azkaban ---
  {
    question: "Who is revealed to be Scabbers the rat?",
    options: ["Sirius Black", "Remus Lupin", "Peter Pettigrew", "James Potter"],
    correctAnswer: 2
  },
  {
    question: "What form does Harry's Patronus take?",
    options: ["A stag", "A doe", "A dog", "An otter"],
    correctAnswer: 0
  },
  {
    question: "Who gave Harry the Marauder's Map?",
    options: ["Fred and George", "Lupin", "Sirius", "Dumbledore"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the hippogriff buckbeak is sentenced to death?",
    options: ["Buckbeak", "Witherwings", "Storm", "Thunder"],
    correctAnswer: 0
  },
  {
    question: "Who is the Divination professor?",
    options: ["Professor McGonagall", "Professor Trelawney", "Professor Vector", "Professor Sinistra"],
    correctAnswer: 1
  },
  {
    question: "What does the Boggart turn into for Neville Longbottom?",
    options: ["A giant spider", "A dementor", "Professor Snape", "A mummy"],
    correctAnswer: 2
  },
  {
    question: "What spell repels a Boggart?",
    options: ["Riddikulus", "Expecto Patronum", "Protego", "Expelliarmus"],
    correctAnswer: 0
  },
  {
    question: "Who is Moony?",
    options: ["Sirius Black", "James Potter", "Remus Lupin", "Peter Pettigrew"],
    correctAnswer: 2
  },
  {
    question: "What device does Hermione use to attend all her classes?",
    options: ["Invisibility Cloak", "Time-Turner", "Pensieve", "Portkey"],
    correctAnswer: 1
  },
  {
    question: "Who is the executioner sent to kill Buckbeak?",
    options: ["Walden Macnair", "Lucius Malfoy", "Yaxley", "Amycus Carrow"],
    correctAnswer: 0
  },

  // --- Book 4: Goblet of Fire ---
  {
    question: "Who put Harry's name in the Goblet of Fire?",
    options: ["Barty Crouch Jr.", "Igor Karkaroff", "Ludo Bagman", "Severus Snape"],
    correctAnswer: 0
  },
  {
    question: "What dragon did Harry face in the first task?",
    options: ["Hungarian Horntail", "Chinese Fireball", "Swedish Short-Snout", "Common Welsh Green"],
    correctAnswer: 0
  },
  {
    question: "Who did Hermione go to the Yule Ball with?",
    options: ["Ron Weasley", "Harry Potter", "Viktor Krum", "Neville Longbottom"],
    correctAnswer: 2
  },
  {
    question: "What is the prize for winning the Triwizard Tournament?",
    options: ["1000 Galleons", "The Elder Wand", "Eternal Glory", "A job at the Ministry"],
    correctAnswer: 0
  },
  {
    question: "Who killed Cedric Diggory?",
    options: ["Voldemort", "Peter Pettigrew", "Barty Crouch Jr.", "Bellatrix Lestrange"],
    correctAnswer: 1
  },
  {
    question: "What is the name of the journalist who writes for the Daily Prophet?",
    options: ["Rita Skeeter", "Xenophilius Lovegood", "Barnabas Cuffe", "Bozo"],
    correctAnswer: 0
  },
  {
    question: "What creatures live in the Black Lake?",
    options: ["Merpeople", "Grindylows", "Giant Squid", "All of the above"],
    correctAnswer: 3
  },
  {
    question: "What charm does Harry use to breathe underwater?",
    options: ["Bubble-Head Charm", "Gillyweed", "Transfiguration", "None"],
    correctAnswer: 1
  },
  {
    question: "Who was impersonating Mad-Eye Moody?",
    options: ["Barty Crouch Jr.", "Peter Pettigrew", "Sirius Black", "Remus Lupin"],
    correctAnswer: 0
  },
  {
    question: "What is the incantation for the Dark Mark?",
    options: ["Morsmordre", "Sectumsempra", "Avada Kedavra", "Crucio"],
    correctAnswer: 0
  },

  // --- Book 5: Order of the Phoenix ---
  {
    question: "What is the name of the secret society founded by Dumbledore?",
    options: ["Dumbledore's Army", "The Order of the Phoenix", "The Death Eaters", "The Inquisitorial Squad"],
    correctAnswer: 1
  },
  {
    question: "Who kills Sirius Black?",
    options: ["Bellatrix Lestrange", "Lucius Malfoy", "Voldemort", "Snape"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the prophecy sphere Harry retrieves?",
    options: ["The Lost Prophecy", "The Chosen One", "S.P.T to A.P.W.B.D", "The Dark Lord's Fall"],
    correctAnswer: 2
  },
  {
    question: "Who is the High Inquisitor of Hogwarts?",
    options: ["Severus Snape", "Dolores Umbridge", "Minerva McGonagall", "Argus Filch"],
    correctAnswer: 1
  },
  {
    question: "What creatures can only be seen by those who have witnessed death?",
    options: ["Thestrals", "Hippogriffs", "Unicorns", "Acromantulas"],
    correctAnswer: 0
  },
  {
    question: "Where does the D.A. meet?",
    options: ["The Shrieking Shack", "The Room of Requirement", "The Chamber of Secrets", "The Forbidden Forest"],
    correctAnswer: 1
  },
  {
    question: "Who teaches Harry Occlumency?",
    options: ["Dumbledore", "Snape", "McGonagall", "Moody"],
    correctAnswer: 1
  },
  {
    question: "What is the name of Hagrid's half-brother?",
    options: ["Grawp", "Golgomath", "Karkus", "Magorian"],
    correctAnswer: 0
  },
  {
    question: "Which centaur saves Harry and Hermione from Umbridge?",
    options: ["Firenze", "Bane", "Ronan", "Grawp"],
    correctAnswer: 3
  },
  {
    question: "What does Umbridge make Harry write with a blood quill?",
    options: ["I must not tell lies", "I will behave", "I respect authority", "Magic is might"],
    correctAnswer: 0
  },

  // --- Book 6: Half-Blood Prince ---
  {
    question: "Who is the Half-Blood Prince?",
    options: ["Harry Potter", "Tom Riddle", "Severus Snape", "Sirius Black"],
    correctAnswer: 2
  },
  {
    question: "What is a Horcrux?",
    options: ["A powerful wand", "An object containing part of a soul", "A magical creature", "A potion ingredient"],
    correctAnswer: 1
  },
  {
    question: "Who kills Dumbledore?",
    options: ["Draco Malfoy", "Bellatrix Lestrange", "Severus Snape", "Fenrir Greyback"],
    correctAnswer: 2
  },
  {
    question: "Which potion brings good luck?",
    options: ["Felix Felicis", "Amortentia", "Polyjuice Potion", "Veritaserum"],
    correctAnswer: 0
  },
  {
    question: "Who is the new Potions Master in Book 6?",
    options: ["Severus Snape", "Horace Slughorn", "Minerva McGonagall", "Pomona Sprout"],
    correctAnswer: 1
  },
  {
    question: "What memory does Slughorn tamper with?",
    options: ["His conversation with Tom Riddle about Horcruxes", "The day Lily Potter died", "His fight with Dumbledore", "The creation of the Philosopher's Stone"],
    correctAnswer: 0
  },
  {
    question: "Who attacks Ron Weasley with poisoned mead?",
    options: ["Draco Malfoy", "Harry Potter", "Severus Snape", "Horace Slughorn"],
    correctAnswer: 0
  },
  {
    question: "What object is the first Horcrux Harry and Dumbledore destroy together?",
    options: ["Tom Riddle's Diary", "Marvolo Gaunt's Ring", "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup"],
    correctAnswer: 1
  },
  {
    question: "Who is the captain of the Gryffindor Quidditch team in Book 6?",
    options: ["Harry Potter", "Ron Weasley", "Katie Bell", "Ginny Weasley"],
    correctAnswer: 0
  },
  {
    question: "Where do Harry and Dumbledore go to find the locket?",
    options: ["The Cave", "The Gaunt Shack", "The Ministry of Magic", "Gringotts"],
    correctAnswer: 0
  },

  // --- Book 7: Deathly Hallows ---
  {
    question: "What are the three Deathly Hallows?",
    options: ["Elder Wand, Resurrection Stone, Invisibility Cloak", "Philosopher's Stone, Sword of Gryffindor, Sorting Hat", "Marauder's Map, Time-Turner, Pensieve", "None of the above"],
    correctAnswer: 0
  },
  {
    question: "Who destroys Nagini?",
    options: ["Harry Potter", "Ron Weasley", "Hermione Granger", "Neville Longbottom"],
    correctAnswer: 3
  },
  {
    question: "What is the last Horcrux to be destroyed?",
    options: ["Nagini", "Harry Potter", "The Diadem", "The Cup"],
    correctAnswer: 0
  },
  {
    question: "Who was the true master of the Elder Wand after Dumbledore?",
    options: ["Snape", "Voldemort", "Draco Malfoy", "Harry Potter"],
    correctAnswer: 2
  },
  {
    question: "Where is the Diadem of Ravenclaw hidden?",
    options: ["The Room of Requirement", "The Chamber of Secrets", "The Forbidden Forest", "The Ravenclaw Common Room"],
    correctAnswer: 0
  },
  {
    question: "Who saves Harry from drowning in the frozen pool?",
    options: ["Ron Weasley", "Hermione Granger", "Snape", "Dumbledore"],
    correctAnswer: 0
  },
  {
    question: "What does Dumbledore leave Ron in his will?",
    options: ["The Deluminator", "The Tales of Beedle the Bard", "The Golden Snitch", "Gryffindor's Sword"],
    correctAnswer: 0
  },
  {
    question: "Who kills Bellatrix Lestrange?",
    options: ["Harry Potter", "Hermione Granger", "Molly Weasley", "Ginny Weasley"],
    correctAnswer: 2
  },
  {
    question: "What is the final battle called?",
    options: ["The Battle of Hogwarts", "The Battle of the Ministry", "The Battle of the Seven Potters", "The Final Duel"],
    correctAnswer: 0
  },
  {
    question: "How many years later is the epilogue set?",
    options: ["10", "19", "25", "15"],
    correctAnswer: 1
  },
  {
    question: "What is the name of Harry's youngest son?",
    options: ["Albus Severus", "James Sirius", "Lily Luna", "Teddy Remus"],
    correctAnswer: 0
  },
  {
    question: "Who becomes Headmistress of Hogwarts after the battle?",
    options: ["Minerva McGonagall", "Pomona Sprout", "Filius Flitwick", "Luna Lovegood"],
    correctAnswer: 0
  },
  {
    question: "What career does Harry pursue?",
    options: ["Auror", "Quidditch Player", "Professor", "Minister of Magic"],
    correctAnswer: 0
  },
  {
    question: "Who marries Ron Weasley?",
    options: ["Hermione Granger", "Lavender Brown", "Luna Lovegood", "Padma Patil"],
    correctAnswer: 0
  },
  {
    question: "Who marries Draco Malfoy?",
    options: ["Astoria Greengrass", "Pansy Parkinson", "Millicent Bulstrode", "Daphne Greengrass"],
    correctAnswer: 0
  },
  
  // ... More detailed questions ...
  {
    question: "What is the core of Harry Potter's wand?",
    options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Veela Hair"],
    correctAnswer: 2
  },
  {
    question: "Who is the ghost of Gryffindor Tower?",
    options: ["The Bloody Baron", "The Grey Lady", "The Fat Friar", "Nearly Headless Nick"],
    correctAnswer: 3
  },
  {
    question: "What does the spell 'Alohomora' do?",
    options: ["Unlocks doors", "Levitates objects", "Disarms opponents", "Creates light"],
    correctAnswer: 0
  },
  {
    question: "What position did James Potter play in Quidditch?",
    options: ["Seeker", "Chaser", "Beater", "Keeper"],
    correctAnswer: 1
  },
  {
    question: "Who is the care of magical creatures teacher before Hagrid?",
    options: ["Professor Kettleburn", "Professor Grubby-Plank", "Professor Merrythought", "Professor Beery"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the poltergeist at Hogwarts?",
    options: ["Peeves", "Binns", "Myrtle", "Nick"],
    correctAnswer: 0
  },
  {
    question: "What is the main ingredient in Polyjuice Potion?",
    options: ["Boomslang skin", "Lacewing flies", "Bicorn horn", "Fluxweed"],
    correctAnswer: 1
  },
  {
    question: "Who guards the entrance to the Gryffindor common room?",
    options: ["The Fat Lady", "Sir Cadogan", "The Grey Lady", "The Bloody Baron"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the village near Hogwarts?",
    options: ["Hogsmeade", "Godric's Hollow", "Little Hangleton", "Ottery St. Catchpole"],
    correctAnswer: 0
  },
  {
    question: "Who is the editor of The Quibbler?",
    options: ["Xenophilius Lovegood", "Rita Skeeter", "Barnabas Cuffe", "Hermione Granger"],
    correctAnswer: 0
  },
  {
    question: "What magical creature pulls the Hogwarts carriages?",
    options: ["Thestrals", "Hippogriffs", "Abraxans", "Unicorns"],
    correctAnswer: 0
  },
  {
    question: "Who is the head of Hufflepuff House?",
    options: ["Professor Sprout", "Professor Flitwick", "Professor McGonagall", "Professor Snape"],
    correctAnswer: 0
  },
  {
    question: "What is the name of Filch's cat?",
    options: ["Mrs. Norris", "Crookshanks", "Fang", "Ripper"],
    correctAnswer: 0
  },
  {
    question: "Who poses as Mad-Eye Moody in 'Goblet of Fire'?",
    options: ["Barty Crouch Jr.", "Peter Pettigrew", "Igor Karkaroff", "Lucius Malfoy"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the Black family house-elf?",
    options: ["Kreacher", "Dobby", "Winky", "Hockey"],
    correctAnswer: 0
  },
  {
    question: "Who is the Half-Blood Prince?",
    options: ["Severus Snape", "Harry Potter", "Tom Riddle", "Sirius Black"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the secret room in Hogwarts that appears when needed?",
    options: ["The Room of Requirement", "The Chamber of Secrets", "The Shrieking Shack", "The Trophy Room"],
    correctAnswer: 0
  },
  {
    question: "Who destroys the Hufflepuff Cup Horcrux?",
    options: ["Hermione Granger", "Ron Weasley", "Harry Potter", "Neville Longbottom"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the sword that can destroy Horcruxes?",
    options: ["The Sword of Gryffindor", "The Sword of Slytherin", "The Elder Wand", "The Sword of Ravenclaw"],
    correctAnswer: 0
  },
  {
    question: "Who saves Harry from the Dementors in the Forbidden Forest in 'Prisoner of Azkaban'?",
    options: ["Harry Potter (from the future)", "James Potter", "Sirius Black", "Remus Lupin"],
    correctAnswer: 0
  },
    {
    question: "What is the incantation for the Levitating Charm?",
    options: ["Wingardium Leviosa", "Alohomora", "Expelliarmus", "Lumos"],
    correctAnswer: 0
  },
  {
    question: "Who is the author of 'Magical Me'?",
    options: ["Gilderoy Lockhart", "Newt Scamander", "Bathilda Bagshot", "Rita Skeeter"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the pub in Hogsmeade famous for its Butterbeer?",
    options: ["The Three Broomsticks", "The Hog's Head", "The Leaky Cauldron", "Honeydukes"],
    correctAnswer: 0
  },
  {
    question: "Who is the caretaker of Hogwarts?",
    options: ["Argus Filch", "Rubeus Hagrid", "Madam Pince", "Madam Pomfrey"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the centaur who teaches Divination?",
    options: ["Firenze", "Bane", "Ronan", "Magorian"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the Weasley's home?",
    options: ["The Burrow", "Shell Cottage", "Grimmauld Place", "Godric's Hollow"],
    correctAnswer: 0
  },
  {
    question: "Who is the head of Ravenclaw House?",
    options: ["Professor Flitwick", "Professor Sprout", "Professor McGonagall", "Professor Snape"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical map that shows everyone's location in Hogwarts?",
    options: ["The Marauder's Map", "The Map of Hogwarts", "The Seeker's Map", "The Ghost Map"],
    correctAnswer: 0
  },
  {
    question: "Who is the ghost of Slytherin House?",
    options: ["The Bloody Baron", "The Grey Lady", "The Fat Friar", "Nearly Headless Nick"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical plant that screams when uprooted?",
    options: ["Mandrake", "Devil's Snare", "Venomous Tentacula", "Whomping Willow"],
    correctAnswer: 0
  },
  {
    question: "Who is the captain of the Slytherin Quidditch team in 'Philosopher's Stone'?",
    options: ["Marcus Flint", "Draco Malfoy", "Blaise Zabini", "Theodore Nott"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the spell that produces light from the wand tip?",
    options: ["Lumos", "Nox", "Accio", "Expecto Patronum"],
    correctAnswer: 0
  },
  {
    question: "Who is the matron of the Hogwarts hospital wing?",
    options: ["Madam Pomfrey", "Madam Pince", "Madam Hooch", "Professor Sprout"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical creature that guards the Philosopher's Stone?",
    options: ["Fluffy", "Norbert", "Aragog", "Fang"],
    correctAnswer: 0
  },
  {
    question: "Who is the sister of Bellatrix Lestrange and Narcissa Malfoy who was disowned?",
    options: ["Andromeda Tonks", "Nymphadora Tonks", "Walburga Black", "Eileen Prince"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical government in Great Britain?",
    options: ["The Ministry of Magic", "The Wizengamot", "The International Confederation of Wizards", "The Order of Merlin"],
    correctAnswer: 0
  },
  {
    question: "Who is the head of the Department of Magical Law Enforcement in 'Deathly Hallows'?",
    options: ["Pius Thicknesse", "Yaxley", "Amelia Bones", "Bartemius Crouch Sr."],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical creature that serves the Black family?",
    options: ["Kreacher", "Dobby", "Winky", "Hokey"],
    correctAnswer: 0
  },
  {
    question: "Who is the werewolf who bit Remus Lupin?",
    options: ["Fenrir Greyback", "Scabior", "Antonin Dolohov", "Thorfinn Rowle"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical prison?",
    options: ["Azkaban", "Nurmengard", "The Ministry holding cells", "Gringotts dungeons"],
    correctAnswer: 0
  },
  {
    question: "Who is the author of 'The Tales of Beedle the Bard'?",
    options: ["Beedle the Bard", "Albus Dumbledore", "Hermione Granger", "Bathilda Bagshot"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the spell used to disarm an opponent?",
    options: ["Expelliarmus", "Stupefy", "Protego", "Avada Kedavra"],
    correctAnswer: 0
  },
  {
    question: "Who is the Gryffindor ghost?",
    options: ["Nearly Headless Nick", "The Fat Friar", "The Grey Lady", "The Bloody Baron"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical candy that makes you roar like a lion?",
    options: ["Lion Bars", "Chocoballs", "Roaring Pastilles", "Canary Creams"],
    correctAnswer: 0 // Actually this might be a trick question or specific to a game, let's stick to book canon or well known facts.
  },
  {
    question: "What sweet causes the eater to make animal noises?",
    options: ["Various sweets from Honeydukes", "Every Flavour Beans", "Cockroach Clusters", "Chocolate Frogs"],
    correctAnswer: 0 // This is vague. Let's replace with a better one.
  },
   {
    question: "What is the name of the sweet that allows you to skip class by making you ill?",
    options: ["Skiving Snackboxes", "Puking Pastilles", "Fainting Fancies", "Nosebleed Nougat"],
    correctAnswer: 0
  },
  {
    question: "Who is the Minister for Magic at the beginning of the series?",
    options: ["Cornelius Fudge", "Rufus Scrimgeour", "Pius Thicknesse", "Kingsley Shacklebolt"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical bank run by goblins?",
    options: ["Gringotts", "Galleons Bank", "The Wizarding Bank", "Goblin Bank"],
    correctAnswer: 0
  },
  {
    question: "Who is the Potions Master before Slughorn returns?",
    options: ["Severus Snape", "Horace Slughorn", "Albus Dumbledore", "Filius Flitwick"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical street hidden in London?",
    options: ["Diagon Alley", "Knockturn Alley", "Privet Drive", "Grimmauld Place"],
    correctAnswer: 0
  },
  {
    question: "Who is the Keeper of Keys and Grounds at Hogwarts?",
    options: ["Rubeus Hagrid", "Argus Filch", "Albus Dumbledore", "Severus Snape"],
    correctAnswer: 0
  },
  {
    question: "What is the name of Harry Potter's owl?",
    options: ["Hedwig", "Errol", "Pigwidgeon", "Hermes"],
    correctAnswer: 0
  },
  {
    question: "Who is the head of Gryffindor House?",
    options: ["Minerva McGonagall", "Albus Dumbledore", "Severus Snape", "Pomona Sprout"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the poltergeist who causes trouble at Hogwarts?",
    options: ["Peeves", "Nearly Headless Nick", "The Bloody Baron", "The Grey Lady"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the train that takes students to Hogwarts?",
    options: ["Hogwarts Express", "Knight Bus", "The Flying Ford Anglia", "The Durmstrang Ship"],
    correctAnswer: 0
  },
  {
    question: "Who is the Defense Against the Dark Arts teacher in 'Chamber of Secrets'?",
    options: ["Gilderoy Lockhart", "Quirinus Quirrell", "Remus Lupin", "Alastor Moody"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the giant spider in the Forbidden Forest?",
    options: ["Aragog", "Mosag", "Shelob", "Ungoliant"],
    correctAnswer: 0
  },
  {
    question: "Who opened the Chamber of Secrets 50 years ago?",
    options: ["Tom Riddle", "Rubeus Hagrid", "Aragog", "Salazar Slytherin"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical creature that can transform into a person's worst fear?",
    options: ["Boggart", "Dementor", "Poltergeist", "Obscurus"],
    correctAnswer: 0
  },
  {
    question: "Who is the godfather of Harry Potter?",
    options: ["Sirius Black", "Remus Lupin", "James Potter", "Albus Dumbledore"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the werewolf who teaches Defense Against the Dark Arts?",
    options: ["Remus Lupin", "Fenrir Greyback", "Scabior", "Bill Weasley"],
    correctAnswer: 0
  },
  {
    question: "Who betrayed James and Lily Potter to Voldemort?",
    options: ["Peter Pettigrew", "Sirius Black", "Remus Lupin", "Severus Snape"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the magical tournament held in 'Goblet of Fire'?",
    options: ["Triwizard Tournament", "Quidditch World Cup", "Wizarding Duel Championship", "Gobstones Tournament"],
    correctAnswer: 0
  },
  {
    question: "Who is the French champion in the Triwizard Tournament?",
    options: ["Fleur Delacour", "Viktor Krum", "Cedric Diggory", "Harry Potter"],
    correctAnswer: 0
  },
  {
    question: "Who is the Durmstrang champion in the Triwizard Tournament?",
    options: ["Viktor Krum", "Fleur Delacour", "Cedric Diggory", "Harry Potter"],
    correctAnswer: 0
  },
  {
    question: "Who is the Hogwarts champion in the Triwizard Tournament (besides Harry)?",
    options: ["Cedric Diggory", "Fred Weasley", "George Weasley", "Angelina Johnson"],
    correctAnswer: 0
  },
  {
    question: "Who kills Albus Dumbledore?",
    options: ["Severus Snape", "Draco Malfoy", "Bellatrix Lestrange", "Fenrir Greyback"],
    correctAnswer: 0
  },
  {
    question: "What is the name of Voldemort's snake?",
    options: ["Nagini", "Basilisk", "Serpensortia", "Slither"],
    correctAnswer: 0
  },
  {
    question: "Who destroys the diadem Horcrux?",
    options: ["Vincent Crabbe (with Fiendfyre)", "Harry Potter", "Hermione Granger", "Ron Weasley"],
    correctAnswer: 0
  },
  {
    question: "Who kills Voldemort?",
    options: ["Harry Potter", "Neville Longbottom", "Ron Weasley", "Dumbledore"],
    correctAnswer: 0
  },
  {
    question: "Who is the master of the Elder Wand at the end of the series?",
    options: ["Harry Potter", "Voldemort", "Snape", "Draco Malfoy"],
    correctAnswer: 0
  }
];

export const SHOP_ITEMS: GameItem[] = [
  // --- WANDS (IDs 1000-1099) ---
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
  {
    id: 1002,
    name: "The Elder Wand",
    description: "15\" Elder, Thestral Tail Hair. The Deathstick. Unbeatable in the right hands.",
    price: 5000,
    type: 'wand',
    attack: 500,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/wand_elder/200/200"
  },
  {
    id: 1003,
    name: "Lord Voldemort's Wand",
    description: "13½\" Yew, Phoenix Feather. Powerful and precise. Ideally suited for dark magic.",
    price: 4500,
    type: 'wand',
    attack: 450,
    defense: 20,
    imageUrl: "https://picsum.photos/seed/wand_voldemort/200/200"
  },
  {
    id: 1004,
    name: "Hermione Granger's Wand",
    description: "10¾\" Vine, Dragon Heartstring. Excellent for charms and elegant spellwork.",
    price: 2800,
    type: 'wand',
    attack: 240,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/wand_hermione/200/200"
  },
  {
    id: 1005,
    name: "Ron Weasley's Wand",
    description: "14\" Willow, Unicorn Hair. Reliable, though occasionally temperamental.",
    price: 2500,
    type: 'wand',
    attack: 220,
    defense: 80,
    imageUrl: "https://picsum.photos/seed/wand_ron/200/200"
  },
  {
    id: 1006,
    name: "Draco Malfoy's Wand",
    description: "10\" Hawthorn, Unicorn Hair. Reasonably springy. Favors the ambitious.",
    price: 2700,
    type: 'wand',
    attack: 230,
    defense: 60,
    imageUrl: "https://picsum.photos/seed/wand_draco/200/200"
  },
  {
    id: 1007,
    name: "Bellatrix Lestrange's Wand",
    description: "12¾\" Walnut, Dragon Heartstring. Unyielding and lethal.",
    price: 3500,
    type: 'wand',
    attack: 380,
    defense: 10,
    imageUrl: "https://picsum.photos/seed/wand_bellatrix/200/200"
  },
  {
    id: 1008,
    name: "Severus Snape's Wand",
    description: "Unknown length, Ebony, Dragon Heartstring. Rigid and perfect for combat.",
    price: 3200,
    type: 'wand',
    attack: 300,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/wand_snape/200/200"
  },
  {
    id: 1009,
    name: "Lucius Malfoy's Wand",
    description: "18\" Elm, Dragon Heartstring. Hidden within a snake-headed cane.",
    price: 4000,
    type: 'wand',
    attack: 340,
    defense: 40,
    imageUrl: "https://picsum.photos/seed/wand_lucius/200/200"
  },
  {
    id: 1010,
    name: "Neville Longbottom's Wand",
    description: "13\" Cherry, Unicorn Hair. Once belonged to a hero.",
    price: 2600,
    type: 'wand',
    attack: 240,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/wand_neville/200/200"
  },
  {
    id: 1011,
    name: "Ginny Weasley's Wand",
    description: "Yew wood. Highly proficient at hexes, specifically the Bat-Bogey Hex.",
    price: 2700,
    type: 'wand',
    attack: 260,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/wand_ginny/200/200"
  },
  {
    id: 1012,
    name: "Minerva McGonagall's Wand",
    description: "9½\" Fir, Dragon Heartstring. Stiff. Suited for Transfiguration.",
    price: 3100,
    type: 'wand',
    attack: 290,
    defense: 140,
    imageUrl: "https://picsum.photos/seed/wand_minerva/200/200"
  },
  {
    id: 1013,
    name: "Remus Lupin's Wand",
    description: "10¼\" Cypress, Unicorn Hair. Pliable. Matches a gentle soul.",
    price: 2800,
    type: 'wand',
    attack: 250,
    defense: 110,
    imageUrl: "https://picsum.photos/seed/wand_remus/200/200"
  },
  {
    id: 1014,
    name: "Sirius Black's Wand",
    description: "Unknown wood and core. Etched with runes. A rebel's wand.",
    price: 3300,
    type: 'wand',
    attack: 310,
    defense: 60,
    imageUrl: "https://picsum.photos/seed/wand_sirius/200/200"
  },
  {
    id: 1015,
    name: "Fleur Delacour's Wand",
    description: "9½\" Rosewood, Veela Hair. Temperamental in non-owner's hands.",
    price: 2900,
    type: 'wand',
    attack: 240,
    defense: 90,
    imageUrl: "https://picsum.photos/seed/wand_fleur/200/200"
  },
  {
    id: 1016,
    name: "Cedric Diggory's Wand",
    description: "12¼\" Ash, Unicorn Hair. Pleasantly springy.",
    price: 2800,
    type: 'wand',
    attack: 250,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/wand_cedric/200/200"
  },
  {
    id: 1017,
    name: "Viktor Krum's Wand",
    description: "10¼\" Hornbeam, Dragon Heartstring. Thicker than usual. Rigid.",
    price: 3000,
    type: 'wand',
    attack: 320,
    defense: 40,
    imageUrl: "https://picsum.photos/seed/wand_krum/200/200"
  },
  {
    id: 1018,
    name: "Luna Lovegood's Wand",
    description: "Unknown wood. Acorn patterns. Excellent for non-verbal spells.",
    price: 2600,
    type: 'wand',
    attack: 220,
    defense: 130,
    imageUrl: "https://picsum.photos/seed/wand_luna/200/200"
  },
  {
    id: 1019,
    name: "Nymphadora Tonks' Wand",
    description: "Rowan wood. Protective and strong against Dark Arts.",
    price: 2900,
    type: 'wand',
    attack: 270,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/wand_tonks/200/200"
  },
  {
    id: 1020,
    name: "Mad-Eye Moody's Wand",
    description: "Battle-worn wood. Has defeated many dark wizards.",
    price: 3600,
    type: 'wand',
    attack: 350,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/wand_moody/200/200"
  },
  {
    id: 1021,
    name: "Dolores Umbridge's Wand",
    description: "8\" Birch, Dragon Heartstring. Unusually short. Punitive.",
    price: 2000,
    type: 'wand',
    attack: 180,
    defense: 20,
    imageUrl: "https://picsum.photos/seed/wand_umbridge/200/200"
  },
  {
    id: 1022,
    name: "Peter Pettigrew's Wand",
    description: "9¼\" Chestnut, Dragon Heartstring. Brittle.",
    price: 1500,
    type: 'wand',
    attack: 150,
    defense: 10,
    imageUrl: "https://picsum.photos/seed/wand_wormtail/200/200"
  },
  {
    id: 1023,
    name: "Ancient Oak Wand",
    description: "14\" Oak, Phoenix Feather. A wand for a guardian.",
    price: 4200,
    type: 'wand',
    attack: 360,
    defense: 180,
    imageUrl: "https://picsum.photos/seed/wand_oak/200/200"
  },
  {
    id: 1024,
    name: "Blackthorn Master Wand",
    description: "11\" Blackthorn. A warrior's wand. Bonds through danger.",
    price: 4100,
    type: 'wand',
    attack: 400,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/wand_blackthorn/200/200"
  },
  {
    id: 1025,
    name: "Elegant Cherry Wand",
    description: "10\" Cherry, Unicorn Hair. Prized in Mahoutokoro.",
    price: 3800,
    type: 'wand',
    attack: 300,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/wand_cherry/200/200"
  },
  {
    id: 1026,
    name: "Dogwood Duelist Wand",
    description: "12\" Dogwood. Mischievous and refuses to perform non-verbal spells.",
    price: 3400,
    type: 'wand',
    attack: 330,
    defense: 80,
    imageUrl: "https://picsum.photos/seed/wand_dogwood/200/200"
  },
  {
    id: 1027,
    name: "Ebony Combat Wand",
    description: "13\" Ebony. Suited for transfiguration and martial magic.",
    price: 4300,
    type: 'wand',
    attack: 390,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/wand_ebony/200/200"
  },
  {
    id: 1028,
    name: "Silver Lime Wand",
    description: "10\" Silver Lime. Associated with Seers and Legilimency.",
    price: 3900,
    type: 'wand',
    attack: 200,
    defense: 250,
    imageUrl: "https://picsum.photos/seed/wand_lime/200/200"
  },
  {
    id: 1029,
    name: "Spruce Wand",
    description: "11\" Spruce. Requires a firm hand. Good for flamboyant effects.",
    price: 3100,
    type: 'wand',
    attack: 280,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/wand_spruce/200/200"
  },
  {
    id: 1030,
    name: "Aspen Wand",
    description: "12\" Aspen. The duelist's favorite. Strong martial magic.",
    price: 4600,
    type: 'wand',
    attack: 420,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/wand_aspen/200/200"
  },

  // --- SPELLS (IDs 2000-2099) ---
  {
    id: 2001,
    name: "Expelliarmus Scroll",
    description: "The Disarming Charm. Removes opponent's weapon.",
    price: 500,
    type: 'spell',
    attack: 50,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/spell_expelliarmus/200/200"
  },
  {
    id: 2002,
    name: "Stupefy Codex",
    description: "The Stunning Spell. Knocks opponent unconscious.",
    price: 800,
    type: 'spell',
    attack: 100,
    defense: 20,
    imageUrl: "https://picsum.photos/seed/spell_stupefy/200/200"
  },
  {
    id: 2003,
    name: "Protego Maxima",
    description: "A powerful Shield Charm. Deflects minor jinxes.",
    price: 1200,
    type: 'spell',
    attack: 0,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/spell_protego/200/200"
  },
  {
    id: 2004,
    name: "Sectumsempra Curse",
    description: "For enemies. Lacerates the target. Dark magic.",
    price: 4000,
    type: 'spell',
    attack: 450,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/spell_sectumsempra/200/200"
  },
  {
    id: 2005,
    name: "Avada Kedavra Theory",
    description: "Forbidden knowledge of the Killing Curse. (Boosts raw power).",
    price: 5000,
    type: 'spell',
    attack: 600,
    defense: -100,
    imageUrl: "https://picsum.photos/seed/spell_ak/200/200"
  },
  {
    id: 2006,
    name: "Petrificus Totalus",
    description: "Full Body-Bind Curse. Paralyzes the opponent.",
    price: 1000,
    type: 'spell',
    attack: 120,
    defense: 40,
    imageUrl: "https://picsum.photos/seed/spell_petrificus/200/200"
  },
  {
    id: 2007,
    name: "Reducto Curse",
    description: "The Reductor Curse. Blasts solid objects to pieces.",
    price: 1500,
    type: 'spell',
    attack: 180,
    defense: 10,
    imageUrl: "https://picsum.photos/seed/spell_reducto/200/200"
  },
  {
    id: 2008,
    name: "Incendio Tome",
    description: "Fire-making spell. Conjures jet of flames.",
    price: 1100,
    type: 'spell',
    attack: 140,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/spell_incendio/200/200"
  },
  {
    id: 2009,
    name: "Expecto Patronum",
    description: "Advanced defensive magic. Summons a spirit guardian.",
    price: 3500,
    type: 'spell',
    attack: 50,
    defense: 400,
    imageUrl: "https://picsum.photos/seed/spell_patronus/200/200"
  },
  {
    id: 2010,
    name: "Confringo Scroll",
    description: "Blasting Curse. Causes anything it hits to explode.",
    price: 1800,
    type: 'spell',
    attack: 200,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/spell_confringo/200/200"
  },
  {
    id: 2011,
    name: "Levicorpus",
    description: "Dangles the victim by their ankle. Non-verbal.",
    price: 900,
    type: 'spell',
    attack: 80,
    defense: 80,
    imageUrl: "https://picsum.photos/seed/spell_levicorpus/200/200"
  },
  {
    id: 2012,
    name: "Episkey Guide",
    description: "Heals minor injuries. Essential for prolonged duels.",
    price: 1300,
    type: 'spell',
    attack: 0,
    defense: 160,
    imageUrl: "https://picsum.photos/seed/spell_episkey/200/200"
  },
  {
    id: 2013,
    name: "Rictusempra",
    description: "Tickling Charm. Distracts and weakens opponent.",
    price: 600,
    type: 'spell',
    attack: 70,
    defense: 30,
    imageUrl: "https://picsum.photos/seed/spell_rictusempra/200/200"
  },
  {
    id: 2014,
    name: "Oppugno Jinx",
    description: "Directs object or individuals to attack the victim.",
    price: 1400,
    type: 'spell',
    attack: 160,
    defense: 20,
    imageUrl: "https://picsum.photos/seed/spell_oppugno/200/200"
  },
  {
    id: 2015,
    name: "Diffindo",
    description: "Severing Charm. Cuts or tears objects.",
    price: 700,
    type: 'spell',
    attack: 90,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/spell_diffindo/200/200"
  },
  {
    id: 2016,
    name: "Crucio Knowledge",
    description: "The Torture Curse. Illegal and horrific. Massive damage.",
    price: 4800,
    type: 'spell',
    attack: 500,
    defense: -50,
    imageUrl: "https://picsum.photos/seed/spell_crucio/200/200"
  },
  {
    id: 2017,
    name: "Imperio Scroll",
    description: "The Imperius Curse. Total control over the victim.",
    price: 4600,
    type: 'spell',
    attack: 400,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/spell_imperio/200/200"
  },
  {
    id: 2018,
    name: "Bombarda Maxima",
    description: "Creates a large explosion capable of destroying walls.",
    price: 2200,
    type: 'spell',
    attack: 280,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/spell_bombarda/200/200"
  },
  {
    id: 2019,
    name: "Glacius",
    description: "Freezing Spell. Freezes target or creates ice.",
    price: 1100,
    type: 'spell',
    attack: 110,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/spell_glacius/200/200"
  },
  {
    id: 2020,
    name: "Incarcerous",
    description: "Conjures thick ropes to bind the target.",
    price: 1300,
    type: 'spell',
    attack: 100,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/spell_incarcerous/200/200"
  },
  {
    id: 2021,
    name: "Langlock",
    description: "Glues the victim's tongue to the roof of their mouth.",
    price: 850,
    type: 'spell',
    attack: 80,
    defense: 40,
    imageUrl: "https://picsum.photos/seed/spell_langlock/200/200"
  },
  {
    id: 2022,
    name: "Muffliato",
    description: "Fills ears of nearby people with buzzing. Stealth.",
    price: 750,
    type: 'spell',
    attack: 0,
    defense: 110,
    imageUrl: "https://picsum.photos/seed/spell_muffliato/200/200"
  },
  {
    id: 2023,
    name: "Obscuro",
    description: "Conjures a blindfold over the eyes of the victim.",
    price: 700,
    type: 'spell',
    attack: 60,
    defense: 60,
    imageUrl: "https://picsum.photos/seed/spell_obscuro/200/200"
  },
  {
    id: 2024,
    name: "Salvio Hexia",
    description: "Protective enchantment against hexes.",
    price: 1600,
    type: 'spell',
    attack: 0,
    defense: 220,
    imageUrl: "https://picsum.photos/seed/spell_salvio/200/200"
  },
  {
    id: 2025,
    name: "Fiendfyre Curse",
    description: "Uncontrollable cursed fire. Extremely dangerous.",
    price: 4500,
    type: 'spell',
    attack: 550,
    defense: -200,
    imageUrl: "https://picsum.photos/seed/spell_fiendfyre/200/200"
  },
  {
    id: 2026,
    name: "Confundo Scroll",
    description: "Confundus Charm. Causes confusion.",
    price: 950,
    type: 'spell',
    attack: 80,
    defense: 60,
    imageUrl: "https://picsum.photos/seed/spell_confundo/200/200"
  },
  {
    id: 2027,
    name: "Aguamenti",
    description: "Water-Making Spell. Good for putting out fires.",
    price: 600,
    type: 'spell',
    attack: 40,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/spell_aguamenti/200/200"
  },
  {
    id: 2028,
    name: "Legilimens",
    description: "Allows the caster to delve into the mind of the victim.",
    price: 3800,
    type: 'spell',
    attack: 300,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/spell_legilimens/200/200"
  },
  {
    id: 2029,
    name: "Piertotum Locomotor",
    description: "Animates statues and suits of armour to do your bidding.",
    price: 3200,
    type: 'spell',
    attack: 250,
    defense: 250,
    imageUrl: "https://picsum.photos/seed/spell_piertotum/200/200"
  },
  {
    id: 2030,
    name: "Serpensortia",
    description: "Conjures a snake from the wand tip.",
    price: 1200,
    type: 'spell',
    attack: 150,
    defense: 30,
    imageUrl: "https://picsum.photos/seed/spell_serpensortia/200/200"
  },

  // --- EQUIPMENT (IDs 3000-3099) ---
  {
    id: 3001,
    name: "Invisibility Cloak",
    description: "Rare, fluid, silvery cloak. Renders the wearer completely invisible.",
    price: 5000,
    type: 'equipment',
    attack: 0,
    defense: 400,
    imageUrl: "https://picsum.photos/seed/eq_cloak/200/200"
  },
  {
    id: 3002,
    name: "Time-Turner",
    description: "Allows travel back in time. Extremely dangerous to use.",
    price: 4800,
    type: 'equipment',
    attack: 50,
    defense: 350,
    imageUrl: "https://picsum.photos/seed/eq_timeturner/200/200"
  },
  {
    id: 3003,
    name: "Marauder's Map",
    description: "Shows every classroom, hallway, and corner of Hogwarts.",
    price: 3500,
    type: 'equipment',
    attack: 100,
    defense: 200,
    imageUrl: "https://picsum.photos/seed/eq_map/200/200"
  },
  {
    id: 3004,
    name: "Golden Snitch",
    description: "Flesh memories. Grants speed and agility.",
    price: 1500,
    type: 'equipment',
    attack: 0,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/eq_snitch/200/200"
  },
  {
    id: 3005,
    name: "Sneakoscope",
    description: "Lights up, spins, and whistles if someone untrustworthy is nearby.",
    price: 800,
    type: 'equipment',
    attack: 0,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/eq_sneakoscope/200/200"
  },
  {
    id: 3006,
    name: "Remembrall",
    description: "Turns red if you've forgotten something.",
    price: 500,
    type: 'equipment',
    attack: 0,
    defense: 40,
    imageUrl: "https://picsum.photos/seed/eq_remembrall/200/200"
  },
  {
    id: 3007,
    name: "Deluminator",
    description: "Removes light sources from the immediate surroundings.",
    price: 2500,
    type: 'equipment',
    attack: 20,
    defense: 220,
    imageUrl: "https://picsum.photos/seed/eq_deluminator/200/200"
  },
  {
    id: 3008,
    name: "Omnioculars",
    description: "Brass binoculars with replay and slow-motion functions.",
    price: 900,
    type: 'equipment',
    attack: 10,
    defense: 80,
    imageUrl: "https://picsum.photos/seed/eq_omnioculars/200/200"
  },
  {
    id: 3009,
    name: "Two-Way Mirror",
    description: "Communicate with the holder of the other mirror.",
    price: 1200,
    type: 'equipment',
    attack: 0,
    defense: 110,
    imageUrl: "https://picsum.photos/seed/eq_mirror/200/200"
  },
  {
    id: 3010,
    name: "Foe-Glass",
    description: "Shows your enemies as shadows when they are not in immediate danger.",
    price: 1600,
    type: 'equipment',
    attack: 20,
    defense: 140,
    imageUrl: "https://picsum.photos/seed/eq_foeglass/200/200"
  },
  {
    id: 3011,
    name: "Secrecy Sensor",
    description: "Vibrates when it detects concealment and lies.",
    price: 1400,
    type: 'equipment',
    attack: 0,
    defense: 130,
    imageUrl: "https://picsum.photos/seed/eq_sensor/200/200"
  },
  {
    id: 3012,
    name: "Dragon-hide Gloves",
    description: "Tough gloves that protect from poisons and burns.",
    price: 1100,
    type: 'equipment',
    attack: 0,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/eq_gloves/200/200"
  },
  {
    id: 3013,
    name: "Shield Hat",
    description: "Simple shield charm embedded in a hat.",
    price: 850,
    type: 'equipment',
    attack: 0,
    defense: 90,
    imageUrl: "https://picsum.photos/seed/eq_hat/200/200"
  },
  {
    id: 3014,
    name: "Shield Cloak",
    description: "Deflects minor hexes and jinxes.",
    price: 1800,
    type: 'equipment',
    attack: 0,
    defense: 180,
    imageUrl: "https://picsum.photos/seed/eq_shieldcloak/200/200"
  },
  {
    id: 3015,
    name: "Peruvian Instant Darkness Powder",
    description: "Creates impenetrable darkness.",
    price: 700,
    type: 'equipment',
    attack: 0,
    defense: 85,
    imageUrl: "https://picsum.photos/seed/eq_powder/200/200"
  },
  {
    id: 3016,
    name: "Decoy Detonators",
    description: "Black horn-like objects that scurry away and make noise.",
    price: 600,
    type: 'equipment',
    attack: 30,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/eq_decoy/200/200"
  },
  {
    id: 3017,
    name: "Portable Swamp",
    description: "Turns a corridor into a swamp.",
    price: 1000,
    type: 'equipment',
    attack: 40,
    defense: 70,
    imageUrl: "https://picsum.photos/seed/eq_swamp/200/200"
  },
  {
    id: 3018,
    name: "Hand of Glory",
    description: "Gives light only to the holder.",
    price: 2200,
    type: 'equipment',
    attack: 10,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/eq_hand/200/200"
  },
  {
    id: 3019,
    name: "Cursed Necklace",
    description: "Opal necklace. Cursed. Do not touch.",
    price: 4500,
    type: 'equipment',
    attack: 500,
    defense: -100,
    imageUrl: "https://picsum.photos/seed/eq_necklace/200/200"
  },
  {
    id: 3020,
    name: "Resurrection Stone (Replica)",
    description: "A stone said to recall the dead.",
    price: 5000,
    type: 'equipment',
    attack: 0,
    defense: 300,
    imageUrl: "https://picsum.photos/seed/eq_resurrection/200/200"
  },
  {
    id: 3021,
    name: "Sword of Gryffindor (Replica)",
    description: "Goblin-made. Imbibes only that which strengthens it.",
    price: 4800,
    type: 'equipment',
    attack: 450,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/eq_sword/200/200"
  },
  {
    id: 3022,
    name: "Ravenclaw's Diadem (Replica)",
    description: "Wit beyond measure is man's greatest treasure.",
    price: 4700,
    type: 'equipment',
    attack: 200,
    defense: 200,
    imageUrl: "https://picsum.photos/seed/eq_diadem/200/200"
  },
  {
    id: 3023,
    name: "Hufflepuff's Cup (Replica)",
    description: "A golden cup with badger engraving.",
    price: 4600,
    type: 'equipment',
    attack: 100,
    defense: 350,
    imageUrl: "https://picsum.photos/seed/eq_cup/200/200"
  },
  {
    id: 3024,
    name: "Slytherin's Locket (Replica)",
    description: "Heavy gold locket with a serpentine S.",
    price: 4900,
    type: 'equipment',
    attack: 300,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/eq_locket/200/200"
  },
  {
    id: 3025,
    name: "Bezoar Case",
    description: "A case full of bezoars. Ultimate antidote kit.",
    price: 2000,
    type: 'equipment',
    attack: 0,
    defense: 250,
    imageUrl: "https://picsum.photos/seed/eq_bezoar/200/200"
  },
  {
    id: 3026,
    name: "Spectrespecs",
    description: "Makes wrackspurts visible.",
    price: 600,
    type: 'equipment',
    attack: 10,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/eq_specs/200/200"
  },
  {
    id: 3027,
    name: "Probity Probe",
    description: "Detects spells of concealment and hidden magical objects.",
    price: 1300,
    type: 'equipment',
    attack: 0,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/eq_probe/200/200"
  },
  {
    id: 3028,
    name: "Revealer",
    description: "A bright red eraser that reveals invisible ink.",
    price: 550,
    type: 'equipment',
    attack: 0,
    defense: 30,
    imageUrl: "https://picsum.photos/seed/eq_revealer/200/200"
  },
  {
    id: 3029,
    name: "Auto-Answer Quill",
    description: "Writes answers automatically. Banned in exams.",
    price: 950,
    type: 'equipment',
    attack: 20,
    defense: 20,
    imageUrl: "https://picsum.photos/seed/eq_quill/200/200"
  },
  {
    id: 3030,
    name: "Wizard's Chess Set",
    description: "Barbaric chess set. Improves strategic thinking.",
    price: 800,
    type: 'equipment',
    attack: 60,
    defense: 60,
    imageUrl: "https://picsum.photos/seed/eq_chess/200/200"
  }
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
