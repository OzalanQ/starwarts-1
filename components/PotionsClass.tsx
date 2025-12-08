
import React, { useState } from 'react';
import { Character, Ingredient, Potion } from '../types';
import { INGREDIENTS_LIST, POTION_RECIPES, HOUSE_THEMES } from '../constants';
import { FlaskConical, Plus, ShoppingCart, AlertTriangle, Check, X, Flame, Sparkles, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PotionsClassProps {
  character: Character;
  onBuyIngredient: (ingredient: Ingredient, cost: number) => void;
  onBrewPotion: (potion: Potion, success: boolean) => void;
  onSellPotion: (potion: Potion) => void;
}

export const PotionsClass: React.FC<PotionsClassProps> = ({ character, onBuyIngredient, onBrewPotion, onSellPotion }) => {
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;
  const [activeTab, setActiveTab] = useState<'ingredients' | 'cauldron'>('ingredients');
  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewResult, setBrewResult] = useState<'success' | 'failure' | null>(null);

  const canBrew = (potion: Potion) => {
    return potion.ingredients.every(id => (character.ingredients[id] || 0) > 0);
  };

  const handleBrew = () => {
    if (!selectedPotion || !canBrew(selectedPotion)) return;

    setIsBrewing(true);
    setBrewResult(null);

    setTimeout(() => {
      setIsBrewing(false);
      const success = Math.random() * 100 > selectedPotion.difficulty; // Difficulty is chance of failure
      
      setBrewResult(success ? 'success' : 'failure');
      onBrewPotion(selectedPotion, success);
    }, 2000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Dungeon Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute -bottom-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute -top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
      </div>

      <div className="flex gap-4 border-b border-slate-700 pb-2 relative z-10">
        <button 
            onClick={() => setActiveTab('ingredients')}
            className={`px-6 py-3 font-magic text-lg transition-colors ${activeTab === 'ingredients' ? `${theme.primary} border-b-2 border-${theme.secondary.split('-')[1]}-500` : 'text-slate-500 hover:text-slate-300'}`}
        >
            Apothecary
        </button>
        <button 
            onClick={() => setActiveTab('cauldron')}
            className={`px-6 py-3 font-magic text-lg transition-colors ${activeTab === 'cauldron' ? `${theme.primary} border-b-2 border-${theme.secondary.split('-')[1]}-500` : 'text-slate-500 hover:text-slate-300'}`}
        >
            Brewing Station
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ingredients' ? (
            <motion.div 
                key="ingredients"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
            >
                {INGREDIENTS_LIST.map(ing => (
                    <div key={ing.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl hover:bg-slate-800 transition-colors flex flex-col justify-between group">
                        <div className="flex justify-between items-start">
                            <div className="text-4xl mb-2">{ing.image}</div>
                            <div className="text-xs font-bold bg-slate-900 px-2 py-1 rounded text-slate-400">
                                Owned: {character.ingredients[ing.id] || 0}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-slate-200">{ing.name}</h3>
                            <p className="text-xs text-slate-400 italic mb-3">{ing.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-yellow-500 font-bold text-sm">{ing.price} G</span>
                                <button 
                                    onClick={() => character.gold >= ing.price && onBuyIngredient(ing, ing.price)}
                                    disabled={character.gold < ing.price}
                                    className={`p-2 rounded-full ${character.gold >= ing.price ? 'bg-green-900 text-green-400 hover:bg-green-800' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        ) : (
            <motion.div 
                key="cauldron"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10"
            >
                {/* Recipe List */}
                <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto scrollbar-hide">
                    {POTION_RECIPES.map(potion => (
                        <button
                            key={potion.id}
                            onClick={() => { setSelectedPotion(potion); setBrewResult(null); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                                selectedPotion?.id === potion.id 
                                ? `${theme.accentBg} ${theme.border} shadow-lg` 
                                : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                            }`}
                        >
                            <div className="text-2xl">{potion.image}</div>
                            <div>
                                <h4 className={`font-bold font-serif ${selectedPotion?.id === potion.id ? 'text-white' : 'text-slate-400'}`}>{potion.name}</h4>
                                <div className="flex gap-2 text-[10px] uppercase tracking-wider mt-1">
                                    <span className="text-yellow-500/80">Val: {potion.sellPrice}G</span>
                                    <span className={`${potion.difficulty > 50 ? 'text-red-400' : 'text-green-400'}`}>Risk: {potion.difficulty}%</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Cauldron Area */}
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
                    {selectedPotion ? (
                        <>
                            <div className="text-center mb-8 relative z-10">
                                <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{selectedPotion.image}</div>
                                <h2 className="text-3xl font-magic text-white mb-2">{selectedPotion.name}</h2>
                                <p className="text-slate-400 font-serif italic">{selectedPotion.description}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md relative z-10">
                                {selectedPotion.ingredients.map((ingId, idx) => {
                                    const ing = INGREDIENTS_LIST.find(i => i.id === ingId);
                                    const hasIt = (character.ingredients[ingId] || 0) > 0;
                                    return (
                                        <div key={idx} className={`p-3 rounded bg-slate-800 border ${hasIt ? 'border-green-500/30' : 'border-red-500/30'} text-center relative`}>
                                            <div className="text-2xl mb-1">{ing?.image}</div>
                                            <div className="text-xs text-slate-300 truncate">{ing?.name}</div>
                                            {!hasIt && <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center text-red-200 text-xs font-bold rounded">Missing</div>}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="min-h-[6rem] w-full relative z-10 flex justify-center items-center mt-6">
                                {isBrewing ? (
                                    <div className="flex flex-col items-center text-purple-400 animate-pulse">
                                        <Flame className="w-10 h-10 mb-2" />
                                        <span className="font-magic tracking-widest text-lg">Brewing...</span>
                                    </div>
                                ) : brewResult ? (
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className={`flex flex-col items-center p-6 rounded-xl border-2 backdrop-blur-md w-full max-w-sm shadow-2xl relative overflow-hidden ${
                                            brewResult === 'success' 
                                            ? 'bg-green-950/80 border-green-400 text-green-100' 
                                            : 'bg-red-950/80 border-red-400 text-red-100'
                                        }`}
                                    >
                                        {/* Background glow effect */}
                                        <div className={`absolute inset-0 opacity-20 ${brewResult === 'success' ? 'bg-green-400' : 'bg-red-400'} blur-xl`}></div>
                                        
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className={`p-3 rounded-full mb-3 ${brewResult === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                                {brewResult === 'success' ? <Sparkles className="w-12 h-12 text-green-300" /> : <AlertTriangle className="w-12 h-12 text-red-300" />}
                                            </div>
                                            
                                            <h3 className="font-magic text-3xl font-bold tracking-wide mb-2 drop-shadow-md">
                                                {brewResult === 'success' ? 'Success!' : 'Brewing Failed!'}
                                            </h3>
                                            
                                            <p className="text-sm font-serif text-center opacity-90 mb-4 leading-relaxed">
                                                {brewResult === 'success' 
                                                    ? `You have successfully brewed a batch of ${selectedPotion.name}.` 
                                                    : `The mixture turned unstable and exploded!`}
                                            </p>

                                            {brewResult === 'failure' && (
                                                <div className="bg-red-900/50 px-4 py-2 rounded border border-red-500/30 mb-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-red-200">
                                                    <Flame className="w-4 h-4" /> Ingredients Lost
                                                </div>
                                            )}
                                            
                                            <button 
                                                onClick={() => setBrewResult(null)}
                                                className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded transition-all shadow-lg hover:scale-105 active:scale-95 ${
                                                    brewResult === 'success'
                                                    ? 'bg-green-600 hover:bg-green-500 text-white border border-green-400'
                                                    : 'bg-red-600 hover:bg-red-500 text-white border border-red-400'
                                                }`}
                                            >
                                                {brewResult === 'success' ? 'Collect Potion' : 'Clean Up Mess'}
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <button
                                        onClick={handleBrew}
                                        disabled={!canBrew(selectedPotion)}
                                        className={`
                                            px-8 py-3 rounded-full font-magic text-lg transition-all shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95
                                            ${canBrew(selectedPotion) 
                                                ? 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-purple-500/20' 
                                                : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                                        `}
                                    >
                                        <FlaskConical className="w-5 h-5" />
                                        Brew Potion
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-500 flex flex-col items-center">
                            <FlaskConical className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a recipe from the grimoire to begin brewing.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Potions Inventory Preview */}
      <div className="bg-[#1a1a2e] border border-slate-700 p-4 rounded-xl mt-8 relative z-10">
         <h3 className="font-magic text-slate-300 mb-4 flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Your Potions Cabinet</h3>
         <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {Object.keys(character.potions).length === 0 && <p className="text-slate-500 text-sm italic">Empty...</p>}
            {Object.entries(character.potions).map(([id, qty]) => {
                const quantity = qty as number;
                if (quantity <= 0) return null;
                const pot = POTION_RECIPES.find(p => p.id === id);
                if (!pot) return null;
                return (
                    <div key={id} className="flex-shrink-0 bg-slate-800 p-3 rounded-xl border border-slate-700 w-36 text-center relative group hover:border-slate-500 transition-colors">
                        <div className="text-3xl mb-2 drop-shadow-lg">{pot.image}</div>
                        <div className="text-xs font-bold text-white truncate mb-1">{pot.name}</div>
                        <div className="absolute top-2 right-2 bg-slate-900 text-[10px] px-1.5 py-0.5 rounded text-slate-300 font-mono border border-slate-700">x{quantity}</div>
                        
                        <button 
                            onClick={() => onSellPotion(pot)}
                            className="w-full mt-2 bg-slate-900/50 hover:bg-yellow-900/50 border border-slate-700 hover:border-yellow-700 text-slate-400 hover:text-yellow-400 text-[10px] py-1.5 rounded transition-all flex items-center justify-center gap-1.5 group/btn"
                        >
                            <Coins className="w-3 h-3 group-hover/btn:text-yellow-400" />
                            Sell {pot.sellPrice}G
                        </button>
                    </div>
                );
            })}
         </div>
      </div>
    </div>
  );
};
