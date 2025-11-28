
import { GameItem, Character, HouseTheme, TriviaQuestion, Ingredient, Potion } from './types';

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
  potions: {}
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
  {
    question: "Who destroyed the Hufflepuff Cup Horcrux?",
    options: ["Harry Potter", "Ron Weasley", "Hermione Granger", "Neville Longbottom"],
    correctAnswer: 2
  },
  {
    question: "What represents the number 7 in Arithmancy?",
    options: ["Leadership", "Magic", "Chaos", "Love"],
    correctAnswer: 1
  },
  {
    question: "Which dragon breed did Harry face in the Triwizard Tournament?",
    options: ["Chinese Fireball", "Swedish Short-Snout", "Hungarian Horntail", "Common Welsh Green"],
    correctAnswer: 2
  },
  {
    question: "What is the max speed of a Firebolt broomstick?",
    options: ["100 mph", "120 mph", "150 mph", "180 mph"],
    correctAnswer: 2
  },
  {
    question: "Who was the Half-Blood Prince?",
    options: ["Tom Riddle", "Sirius Black", "James Potter", "Severus Snape"],
    correctAnswer: 3
  },
  {
    question: "What is the name of Dumbledore's Phoenix?",
    options: ["Firenze", "Fawkes", "Fluffy", "Fang"],
    correctAnswer: 1
  },
  {
    question: "Which spell is used to unlock doors?",
    options: ["Alohomora", "Dissendium", "Colloportus", "Aberto"],
    correctAnswer: 0
  },
  {
    question: "Who was the master of the Elder Wand before Dumbledore?",
    options: ["Voldemort", "Grindelwald", "Gregorovich", "Peverell"],
    correctAnswer: 1
  },
  {
    question: "What form does Hermione's Patronus take?",
    options: ["Otter", "Jack Russell Terrier", "Stag", "Doe"],
    correctAnswer: 0
  },
  {
    question: "What is the name of Hagrid's three-headed dog?",
    options: ["Norbert", "Fang", "Fluffy", "Aragog"],
    correctAnswer: 2
  },
  {
    question: "Which Weasley brother died in the Battle of Hogwarts?",
    options: ["Bill", "Percy", "George", "Fred"],
    correctAnswer: 3
  },
  {
    question: "What is the incantation for the Killing Curse?",
    options: ["Crucio", "Imperio", "Sectumsempra", "Avada Kedavra"],
    correctAnswer: 3
  },
  {
    question: "Who poses as Mad-Eye Moody in The Goblet of Fire?",
    options: ["Barty Crouch Sr.", "Barty Crouch Jr.", "Peter Pettigrew", "Igor Karkaroff"],
    correctAnswer: 1
  },
  {
    question: "What magical object allows you to view memories?",
    options: ["Remembrall", "Pensieve", "Mirror of Erised", "Foe-Glass"],
    correctAnswer: 1
  },
  {
    question: "Who is the Grey Lady of Ravenclaw?",
    options: ["Rowena Ravenclaw", "Helena Ravenclaw", "The Fat Lady", "Moaning Myrtle"],
    correctAnswer: 1
  },
  {
    question: "What creates a Horcrux?",
    options: ["A complex spell", "Murder", "A potion", "Sacrifice"],
    correctAnswer: 1
  },
  {
    question: "Which ear did George Weasley lose?",
    options: ["Left", "Right", "Both", "None"],
    correctAnswer: 0
  },
  {
    question: "What is the password to the Prefect's Bathroom in Goblet of Fire?",
    options: ["Pine Fresh", "Lemon Drop", "Caput Draconis", "Mimbulus Mimbletonia"],
    correctAnswer: 0
  },
  {
    question: "Who wrote 'A History of Magic'?",
    options: ["Adalbert Waffling", "Emeric Switch", "Bathilda Bagshot", "Miranda Goshawk"],
    correctAnswer: 2
  },
  {
    question: "What is the name of the Lovegood's house?",
    options: ["The Burrow", "The Rookery", "Shell Cottage", "Grimmauld Place"],
    correctAnswer: 1
  },
  {
    question: "Which vault was the Philosopher's Stone kept in?",
    options: ["711", "712", "713", "714"],
    correctAnswer: 2
  },
  {
    question: "What is the name of the Poltergeist at Hogwarts?",
    options: ["Nearly Headless Nick", "The Bloody Baron", "Peeves", "Binns"],
    correctAnswer: 2
  },
  {
    question: "How many goal posts are there on a Quidditch pitch?",
    options: ["2", "4", "6", "8"],
    correctAnswer: 2
  },
  {
    question: "What wood is Harry Potter's wand made of?",
    options: ["Yew", "Holly", "Vine", "Hawthorn"],
    correctAnswer: 1
  },
  {
    question: "Who is the editor of The Quibbler?",
    options: ["Rita Skeeter", "Barnabas Cuffe", "Xenophilius Lovegood", "Bathilda Bagshot"],
    correctAnswer: 2
  },
  {
    question: "What is the effect of the spell 'Langlock'?",
    options: ["Locks a door", "Glues tongue to roof of mouth", "Freezes legs", "Silences sound"],
    correctAnswer: 1
  },
  {
    question: "Which team won the Quidditch World Cup in 1994?",
    options: ["Bulgaria", "England", "Ireland", "Peru"],
    correctAnswer: 2
  },
  {
    question: "What does O.W.L. stand for?",
    options: ["Official Wizarding Level", "Ordinary Wizarding Level", "Outstanding Wizarding License", "Optional Wizarding Learning"],
    correctAnswer: 1
  },
  {
    question: "Who gave Harry the Marauder's Map?",
    options: ["Sirius Black", "Remus Lupin", "Fred and George Weasley", "James Potter"],
    correctAnswer: 2
  },
  {
    question: "What is the name of the Hogwarts caretaker's cat?",
    options: ["Crookshanks", "Mrs. Norris", "Tibbles", "Snowy"],
    correctAnswer: 1
  },
  {
    question: "Which Potion grants the drinker a form of shape-shifting?",
    options: ["Polyjuice Potion", "Veritaserum", "Wolfsbane Potion", "Amortentia"],
    correctAnswer: 0
  },
  {
    question: "What color is the spell 'Expelliarmus'?",
    options: ["Green", "Blue", "Red", "Yellow"],
    correctAnswer: 2
  },
  {
    question: "Who killed Bellatrix Lestrange?",
    options: ["Harry Potter", "Neville Longbottom", "Ginny Weasley", "Molly Weasley"],
    correctAnswer: 3
  },
  {
    question: "What is the street address of the Dursleys?",
    options: ["4 Privet Drive", "12 Grimmauld Place", "Spinner's End", "Godric's Hollow"],
    correctAnswer: 0
  },
  {
    question: "What does the spell 'Morsmordre' conjure?",
    options: ["The Dark Mark", "A Patronus", "Fiendfyre", "A Shield"],
    correctAnswer: 0
  },
  {
    question: "Who was the original owner of the Sorting Hat?",
    options: ["Salazar Slytherin", "Rowena Ravenclaw", "Helga Hufflepuff", "Godric Gryffindor"],
    correctAnswer: 3
  },
  {
    question: "What is the name of Voldemort's grandfather?",
    options: ["Tom Riddle Sr.", "Marvolo Gaunt", "Morfin Gaunt", "Salazar Slytherin"],
    correctAnswer: 1
  },
  {
    question: "Which ingredient is NOT in Polyjuice Potion?",
    options: ["Lacewing flies", "Leeches", "Fluxweed", "Bubotuber pus"],
    correctAnswer: 3
  },
  {
    question: "Who replaced the Fat Lady in Prisoner of Azkaban?",
    options: ["The Bloody Baron", "Sir Cadogan", "Violet", "The Grey Lady"],
    correctAnswer: 1
  },
  {
    question: "What year was the Battle of Hogwarts?",
    options: ["1996", "1997", "1998", "1999"],
    correctAnswer: 2
  },
  {
    question: "Which creature pulls the Hogwarts carriages?",
    options: ["Hippogriffs", "Thestrals", "Abraxans", "Nightmares"],
    correctAnswer: 1
  },
  {
    question: "What is the answer to the Sphinx's riddle in the maze?",
    options: ["A Spider", "A Scorpion", "A Sphinx", "A Spy"],
    correctAnswer: 0
  },
  {
    question: "Who is the Half-Blood Prince's mother?",
    options: ["Eileen Prince", "Merope Gaunt", "Lily Evans", "Narcissa Black"],
    correctAnswer: 0
  },
  {
    question: "What is the primary use of a Bezoar?",
    options: ["Invisibility", "Luck", "Antidote to poison", "Healing wounds"],
    correctAnswer: 2
  },
  {
    question: "Which row in the Hall of Prophecy contained the prophecy about Harry?",
    options: ["Row 95", "Row 96", "Row 97", "Row 98"],
    correctAnswer: 2
  },
  {
    question: "Who was the Headmaster of Hogwarts before Dumbledore?",
    options: ["Phineas Nigellus Black", "Armando Dippet", "Dilys Derwent", "Dexter Fortescue"],
    correctAnswer: 1
  },
  {
    question: "What is the name of the village where the Riddle family lived?",
    options: ["Little Hangleton", "Little Whinging", "Godric's Hollow", "Ottery St. Catchpole"],
    correctAnswer: 0
  }
];

export const SHOP_ITEMS: GameItem[] = [
  // --- HERO WANDS ---
  {
    id: 1001,
    name: "Harry Potter's Wand",
    description: "11\" Holly, Phoenix Feather. Nice and supple.",
    price: 3000,
    type: 'wand',
    attack: 280,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/harrywand/200/200"
  },
  {
    id: 1002,
    name: "Ron Weasley's Wand",
    description: "14\" Willow, Unicorn Hair. Reliable.",
    price: 2500,
    type: 'wand',
    attack: 240,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/ronwand/200/200"
  },
  {
    id: 1003,
    name: "Hermione Granger's Wand",
    description: "10¾\" Vine, Dragon Heartstring. Excellent for spellwork.",
    price: 3200,
    type: 'wand',
    attack: 300,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/hermionewand/200/200"
  },

  // --- LEGENDARY WANDS ---
  {
    id: 1,
    name: "The Elder Wand",
    description: "15\" Elder, Thestral Tail Hair. The Deathstick.",
    price: 5000,
    type: 'wand',
    attack: 500,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/elderwand/200/200"
  },
  {
    id: 2,
    name: "Voldemort's Wand",
    description: "13½\" Yew, Phoenix Feather. A brother to Harry's wand.",
    price: 4500,
    type: 'wand',
    attack: 480,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/voldywand/200/200"
  },
  {
    id: 3,
    name: "Bellatrix's Wand",
    description: "12¾\" Walnut, Dragon Heartstring. Unyielding.",
    price: 4000,
    type: 'wand',
    attack: 420,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/bellatrix/200/200"
  },
  {
    id: 4,
    name: "Draco Malfoy's Wand",
    description: "10\" Hawthorn, Unicorn Hair. Reasonably springy.",
    price: 3500,
    type: 'wand',
    attack: 350,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/draco/200/200"
  },
  {
    id: 5,
    name: "Lucius Malfoy's Wand",
    description: "18\" Elm, Dragon Heartstring. Hidden in a cane.",
    price: 3800,
    type: 'wand',
    attack: 390,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/lucius/200/200"
  },
  {
    id: 6,
    name: "Snape's Wand",
    description: "Birch, unknown core. Precise and severe.",
    price: 4100,
    type: 'wand',
    attack: 410,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/snape/200/200"
  },
  {
    id: 7,
    name: "Sirius Black's Wand",
    description: "Oak, unknown core. Etched with runes.",
    price: 3600,
    type: 'wand',
    attack: 360,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/sirius/200/200"
  },
  {
    id: 8,
    name: "Remus Lupin's Wand",
    description: "10¼\" Cypress, Unicorn Hair. Pliable.",
    price: 3400,
    type: 'wand',
    attack: 330,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/lupin/200/200"
  },
  {
    id: 9,
    name: "McGonagall's Wand",
    description: "9½\" Fir, Dragon Heartstring. Stiff.",
    price: 3900,
    type: 'wand',
    attack: 380,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/mcgonagall/200/200"
  },
  {
    id: 10,
    name: "Ginny Weasley's Wand",
    description: "Yew wood. Famous for powerful hexes.",
    price: 3100,
    type: 'wand',
    attack: 310,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/ginny/200/200"
  },
  {
    id: 11,
    name: "Neville's 2nd Wand",
    description: "13\" Cherry, Unicorn Hair. The last wand Ollivander sold.",
    price: 3000,
    type: 'wand',
    attack: 320,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/neville/200/200"
  },
  {
    id: 12,
    name: "Cedric Diggory's Wand",
    description: "12¼\" Ash, Unicorn Hair. Pleasantly springy.",
    price: 2800,
    type: 'wand',
    attack: 290,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/cedric/200/200"
  },
  {
    id: 13,
    name: "Fleur Delacour's Wand",
    description: "9½\" Rosewood, Veela Hair. Temperamental.",
    price: 2900,
    type: 'wand',
    attack: 270,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/fleur/200/200"
  },
  {
    id: 14,
    name: "Krum's Wand",
    description: "10¼\" Hornbeam, Dragon Heartstring. Thicker than usual.",
    price: 3300,
    type: 'wand',
    attack: 340,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/krum/200/200"
  },
  {
    id: 15,
    name: "Luna Lovegood's Wand",
    description: "Unknown wood and core. Creates lovely patronuses.",
    price: 2600,
    type: 'wand',
    attack: 250,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/luna/200/200"
  },
  {
    id: 16,
    name: "Peter Pettigrew's Wand",
    description: "9¼\" Chestnut, Dragon Heartstring. Brittle.",
    price: 2000,
    type: 'wand',
    attack: 180,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/pettigrew/200/200"
  },
  {
    id: 17,
    name: "Dolores Umbridge's Wand",
    description: "8\" Birch, Dragon Heartstring. Usually short.",
    price: 2500,
    type: 'wand',
    attack: 200,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/umbridge/200/200"
  },

  // --- CUSTOM WAND WOODS ---
  {
    id: 101,
    name: "Blackthorn & Dragon",
    description: "Suited to a warrior. Bonds through danger.",
    price: 2200,
    type: 'wand',
    attack: 220,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/blackthorn/200/200"
  },
  {
    id: 102,
    name: "Walnut & Phoenix",
    description: "Belongs to highly intelligent witches and wizards.",
    price: 2400,
    type: 'wand',
    attack: 240,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/walnut/200/200"
  },
  {
    id: 103,
    name: "Fir & Unicorn",
    description: "Demand staying power and strength of purpose.",
    price: 1800,
    type: 'wand',
    attack: 180,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/fir/200/200"
  },
  {
    id: 104,
    name: "Cherry & Dragon",
    description: "Produces wand of lethal power.",
    price: 4000,
    type: 'wand',
    attack: 400,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/cherry/200/200"
  },
  {
    id: 105,
    name: "Unicorn Hair & Ash",
    description: "Reliable and difficult to turn to the Dark Arts.",
    price: 1500,
    type: 'wand',
    attack: 150,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/ashuni/200/200"
  },
  {
    id: 106,
    name: "Ebony & Dragon",
    description: "Impressive appearance, for combat magic.",
    price: 3700,
    type: 'wand',
    attack: 370,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/ebony/200/200"
  },
  {
    id: 107,
    name: "Red Oak & Phoenix",
    description: "Possesses unusually fast reactions.",
    price: 3200,
    type: 'wand',
    attack: 320,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/redoak/200/200"
  },
  {
    id: 108,
    name: "Acacia & Unicorn",
    description: "A very tricky wood that refuses to produce magic for any but its owner.",
    price: 1200,
    type: 'wand',
    attack: 120,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/acacia/200/200"
  },
  {
    id: 109,
    name: "Hazel & Dragon",
    description: "Sensitive to its owner's emotional state.",
    price: 2800,
    type: 'wand',
    attack: 280,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/hazel/200/200"
  },
  {
    id: 110,
    name: "Pear & Unicorn",
    description: "Resilient. Never known to belong to a Dark wizard.",
    price: 1600,
    type: 'wand',
    attack: 160,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/pear/200/200"
  },
  {
    id: 111,
    name: "Pine & Phoenix",
    description: "Always chooses an independent, individual master.",
    price: 2500,
    type: 'wand',
    attack: 250,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/pine/200/200"
  },
  {
    id: 112,
    name: "Rowan & Unicorn",
    description: "Protective. Difficult to break.",
    price: 1900,
    type: 'wand',
    attack: 190,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/rowan/200/200"
  },
  {
    id: 113,
    name: "Sycamore & Dragon",
    description: "Combusts if allowed to become bored.",
    price: 3300,
    type: 'wand',
    attack: 330,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/sycamore/200/200"
  },

  // --- SPELLS ---
  {
    id: 201,
    name: "Avada Kedavra",
    description: "The Killing Curse. Unblockable and instantly fatal.",
    price: 5000,
    type: 'spell',
    attack: 500,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/avada/200/200"
  },
  {
    id: 202,
    name: "Sectumsempra",
    description: "Slashes the victim from a distance.",
    price: 4200,
    type: 'spell',
    attack: 420,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/sectum/200/200"
  },
  {
    id: 203,
    name: "Expecto Patronum",
    description: "Powerful defensive charm against Dementors.",
    price: 3500,
    type: 'spell',
    attack: 100,
    defense: 450,
    imageUrl: "https://picsum.photos/seed/patronum/200/200"
  },
  {
    id: 204,
    name: "Crucio",
    description: "The Cruciatus Curse. Inflicts unbearable pain.",
    price: 4500,
    type: 'spell',
    attack: 450,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/crucio/200/200"
  },
  {
    id: 205,
    name: "Imperio",
    description: "Total control over another.",
    price: 4800,
    type: 'spell',
    attack: 150,
    defense: 400,
    imageUrl: "https://picsum.photos/seed/imperio/200/200"
  },
  {
    id: 206,
    name: "Protego Maxima",
    description: "A powerful shield charm.",
    price: 2000,
    type: 'spell',
    attack: 0,
    defense: 300,
    imageUrl: "https://picsum.photos/seed/protego/200/200"
  },
  {
    id: 207,
    name: "Stupefy",
    description: "Stuns the target.",
    price: 1000,
    type: 'spell',
    attack: 100,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/stupefy/200/200"
  },
  {
    id: 208,
    name: "Expelliarmus",
    description: "The disarming charm.",
    price: 800,
    type: 'spell',
    attack: 50,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/expelliarmus/200/200"
  },
  {
    id: 209,
    name: "Confringo",
    description: "Blasting Curse. Explodes target.",
    price: 2500,
    type: 'spell',
    attack: 280,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/confringo/200/200"
  },
  {
    id: 210,
    name: "Petrificus Totalus",
    description: "Full Body-Bind Curse.",
    price: 1200,
    type: 'spell',
    attack: 80,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/petrificus/200/200"
  },
  {
    id: 211,
    name: "Incendio",
    description: "Conjures a jet of flames.",
    price: 2200,
    type: 'spell',
    attack: 250,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/incendio/200/200"
  },
  {
    id: 212,
    name: "Bombarda",
    description: "Provokes a small explosion.",
    price: 2400,
    type: 'spell',
    attack: 260,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/bombarda/200/200"
  },
  {
    id: 213,
    name: "Diffindo",
    description: "The Severing Charm. Cuts targets.",
    price: 1800,
    type: 'spell',
    attack: 200,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/diffindo/200/200"
  },
  {
    id: 214,
    name: "Reducto",
    description: "Blasts solid objects into pieces.",
    price: 2300,
    type: 'spell',
    attack: 240,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/reducto/200/200"
  },
  {
    id: 215,
    name: "Glacius",
    description: "Freezes the target.",
    price: 1500,
    type: 'spell',
    attack: 100,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/glacius/200/200"
  },
  {
    id: 216,
    name: "Rictusempra",
    description: "The Tickling Charm. Distracts enemies.",
    price: 900,
    type: 'spell',
    attack: 50,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/rictu/200/200"
  },
  {
    id: 217,
    name: "Aguamenti",
    description: "Conjures water. Good for defense against fire.",
    price: 1100,
    type: 'spell',
    attack: 50,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/agua/200/200"
  },
  {
    id: 218,
    name: "Serpensortia",
    description: "Conjures a snake to attack.",
    price: 1700,
    type: 'spell',
    attack: 190,
    defense: 20,
    imageUrl: "https://picsum.photos/seed/serpen/200/200"
  },
  {
    id: 219,
    name: "Levicorpus",
    description: "Dangles the victim by their ankle.",
    price: 1400,
    type: 'spell',
    attack: 80,
    defense: 80,
    imageUrl: "https://picsum.photos/seed/levi/200/200"
  },
  {
    id: 220,
    name: "Fiendfyre",
    description: "Cursed fire that consumes everything.",
    price: 4900,
    type: 'spell',
    attack: 490,
    defense: 0,
    imageUrl: "https://picsum.photos/seed/fiendfyre/200/200"
  },

  // --- EQUIPMENT ---
  {
    id: 301,
    name: "Invisibility Cloak",
    description: "True invisibility. Evades Death itself.",
    price: 5000,
    type: 'equipment',
    attack: 0,
    defense: 500,
    imageUrl: "https://picsum.photos/seed/cloak/200/200"
  },
  {
    id: 302,
    name: "Time-Turner",
    description: "Allows the user to travel back in time.",
    price: 4500,
    type: 'equipment',
    attack: 100,
    defense: 350,
    imageUrl: "https://picsum.photos/seed/timeturner/200/200"
  },
  {
    id: 303,
    name: "Sword of Gryffindor",
    description: "Goblin-made. Absorbs strength.",
    price: 4200,
    type: 'equipment',
    attack: 450,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/gryffsword/200/200"
  },
  {
    id: 304,
    name: "Felix Felicis",
    description: "Liquid Luck. Success in all endeavours.",
    price: 3000,
    type: 'equipment',
    attack: 100,
    defense: 300,
    imageUrl: "https://picsum.photos/seed/felix/200/200"
  },
  {
    id: 305,
    name: "Marauder's Map",
    description: "Reveals everyone's location.",
    price: 2500,
    type: 'equipment',
    attack: 50,
    defense: 250,
    imageUrl: "https://picsum.photos/seed/map/200/200"
  },
  {
    id: 306,
    name: "Resurrection Stone",
    description: "One of the Hallows. Recalls spirits.",
    price: 4800,
    type: 'equipment',
    attack: 0,
    defense: 480,
    imageUrl: "https://picsum.photos/seed/resstone/200/200"
  },
  {
    id: 307,
    name: "Ravenclaw's Diadem",
    description: "Enhances the wisdom of the wearer.",
    price: 4600,
    type: 'equipment',
    attack: 200,
    defense: 300,
    imageUrl: "https://picsum.photos/seed/diadem/200/200"
  },
  {
    id: 308,
    name: "Hufflepuff's Cup",
    description: "A magical golden cup with mysterious powers.",
    price: 4000,
    type: 'equipment',
    attack: 100,
    defense: 400,
    imageUrl: "https://picsum.photos/seed/cup/200/200"
  },
  {
    id: 309,
    name: "Slytherin's Locket",
    description: "Heavy gold locket with a serpent S.",
    price: 4400,
    type: 'equipment',
    attack: 250,
    defense: 250,
    imageUrl: "https://picsum.photos/seed/locket/200/200"
  },
  {
    id: 310,
    name: "Philosopher's Stone",
    description: "Grants immortality and gold.",
    price: 5000,
    type: 'equipment',
    attack: 100,
    defense: 500,
    imageUrl: "https://picsum.photos/seed/philstone/200/200"
  },
  {
    id: 311,
    name: "Golden Snitch",
    description: "Flesh memories. Increases agility.",
    price: 1500,
    type: 'equipment',
    attack: 0,
    defense: 200,
    imageUrl: "https://picsum.photos/seed/snitch/200/200"
  },
  {
    id: 312,
    name: "Deluminator",
    description: "Sucks light from the surroundings.",
    price: 1200,
    type: 'equipment',
    attack: 50,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/deluminator/200/200"
  },
  {
    id: 313,
    name: "Sneakoscope",
    description: "Lights up when someone untrustworthy is near.",
    price: 800,
    type: 'equipment',
    attack: 0,
    defense: 100,
    imageUrl: "https://picsum.photos/seed/sneak/200/200"
  },
  {
    id: 314,
    name: "Remembrall",
    description: "Turns red if you've forgotten something.",
    price: 500,
    type: 'equipment',
    attack: 0,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/remembrall/200/200"
  },
  {
    id: 315,
    name: "Bezoar",
    description: "A cure for most poisons.",
    price: 700,
    type: 'equipment',
    attack: 0,
    defense: 120,
    imageUrl: "https://picsum.photos/seed/bezoar/200/200"
  },
  {
    id: 316,
    name: "Omnioculars",
    description: "Replay action and slow things down.",
    price: 1000,
    type: 'equipment',
    attack: 0,
    defense: 80,
    imageUrl: "https://picsum.photos/seed/omni/200/200"
  },
  {
    id: 317,
    name: "Peruvian Instant Darkness Powder",
    description: "Creates impenetrable darkness.",
    price: 900,
    type: 'equipment',
    attack: 0,
    defense: 150,
    imageUrl: "https://picsum.photos/seed/powder/200/200"
  },
  {
    id: 318,
    name: "Spectrespecs",
    description: "Allows you to see Wrackspurts.",
    price: 600,
    type: 'equipment',
    attack: 0,
    defense: 60,
    imageUrl: "https://picsum.photos/seed/specs/200/200"
  },
  {
    id: 319,
    name: "Monster Book of Monsters",
    description: "A vicious textbook. Stroke the spine.",
    price: 1100,
    type: 'equipment',
    attack: 80,
    defense: 40,
    imageUrl: "https://picsum.photos/seed/monsterbook/200/200"
  },
  {
    id: 320,
    name: "Advanced Potion Making",
    description: "Contains the Half-Blood Prince's notes.",
    price: 1300,
    type: 'equipment',
    attack: 100,
    defense: 50,
    imageUrl: "https://picsum.photos/seed/potions/200/200"
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
