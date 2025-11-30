
import React, { useState } from 'react';
import { Character, CreatureDefinition, OwnedCreature } from '../types';
import { CREATURE_SHOP, HOUSE_THEMES } from '../constants';
import { Bird, Heart, Utensils, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicalMenagerieProps {
  character: Character;
  onBuyCreature: (creature: CreatureDefinition) => void;
  onFeedCreature: (instanceId: string) => void;
  onPlayCreature: (instanceId: string) => void;
}

export const MagicalMenagerie: React.FC<MagicalMenagerieProps> = ({ character, onBuyCreature, onFeedCreature, onPlayCreature }) => {
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;
  const [activeTab, setActiveTab] = useState<'habitant' | 'adopt'>('habitant');

  return (
    <div className="space-y-6 relative">
       {/* Magical Forest BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-900/20 to-transparent"></div>
      </div>

      <div className="flex gap-4 border-b border-slate-700 pb-2 relative z-10">
         <button 
            onClick={() => setActiveTab('habitant')}
            className={`px-6 py-3 font-magic text-lg transition-colors flex items-center gap-2 ${activeTab === 'habitant' ? `${theme.primary} border-b-2 border-${theme.secondary.split('-')[1]}-500` : 'text-slate-500 hover:text-slate-300'}`}
        >
            <Heart className="w-5 h-5" /> My Creatures
        </button>
        <button 
            onClick={() => setActiveTab('adopt')}
            className={`px-6 py-3 font-magic text-lg transition-colors flex items-center gap-2 ${activeTab === 'adopt' ? `${theme.primary} border-b-2 border-${theme.secondary.split('-')[1]}-500` : 'text-slate-500 hover:text-slate-300'}`}
        >
            <ShoppingBag className="w-5 h-5" /> Magical Menagerie
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'adopt' ? (
             <motion.div 
                key="adopt"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
            >
                {CREATURE_SHOP.map(creature => (
                    <div key={creature.id} className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl hover:border-slate-500 transition-all group shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-5xl group-hover:scale-110 transition-transform">{creature.image}</div>
                            <div className="bg-slate-900 px-2 py-1 rounded text-xs font-bold text-slate-400 border border-slate-700">
                                {creature.bonusType.replace('_', ' ')}
                            </div>
                        </div>
                        <h3 className={`text-xl font-serif font-bold ${theme.secondary}`}>{creature.name}</h3>
                        <p className="text-sm text-slate-400 italic mb-4 min-h-[40px]">{creature.description}</p>
                        
                        <div className="flex justify-between items-center border-t border-slate-700 pt-4">
                             <span className="text-yellow-500 font-bold">{creature.price} G</span>
                             <button
                                onClick={() => onBuyCreature(creature)}
                                disabled={character.gold < creature.price}
                                className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${
                                    character.gold >= creature.price 
                                    ? `${theme.button}` 
                                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                }`}
                             >
                                Adopt
                             </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        ) : (
            <motion.div 
                key="habitant"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
            >
                {character.creatures.length === 0 ? (
                     <div className="col-span-full text-center py-20 text-slate-500">
                        <Bird className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-serif italic">Your sanctuary is empty.</p>
                        <p>Visit the Menagerie to adopt a companion.</p>
                     </div>
                ) : (
                    character.creatures.map(pet => (
                        <div key={pet.instanceId} className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-xl relative overflow-hidden">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 text-center">
                                    <div className="text-6xl mb-2 drop-shadow-lg filter">{pet.image}</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-2xl font-magic ${theme.secondary}`}>{pet.nickname || pet.name}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">{pet.species}</p>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Happiness</span>
                                                <span>{Math.round(pet.happiness)}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pet.happiness}%` }}
                                                    className={`h-full ${pet.happiness > 50 ? 'bg-pink-500' : 'bg-slate-600'}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Fullness</span>
                                                <span>{Math.round(pet.hunger)}%</span>
                                            </div>
                                             <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pet.hunger}%` }}
                                                    className={`h-full ${pet.hunger > 50 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => onFeedCreature(pet.instanceId)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Utensils className="w-3 h-3" /> Feed (10G)
                                </button>
                                <button 
                                    onClick={() => onPlayCreature(pet.instanceId)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Sparkles className="w-3 h-3" /> Play (20G)
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};