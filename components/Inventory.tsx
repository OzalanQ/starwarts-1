import React from 'react';
import { GameItem, Character } from '../types';
import { HOUSE_THEMES } from '../constants';
import { Shield, Sword, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface InventoryProps {
  character: Character;
  onEquip: (item: GameItem) => void;
  onUnequip: (item: GameItem) => void;
  onSell: (item: GameItem) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ character, onEquip, onUnequip, onSell }) => {
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Equipped Section - Sticky and Scrollable */}
      <div className={`lg:col-span-1 bg-[#1a1a2e] p-6 rounded-xl border ${theme.border} h-[calc(100vh-120px)] sticky top-6 flex flex-col`}>
        <h2 className={`text-2xl font-magic ${theme.secondary} mb-6 flex items-center gap-2 shrink-0`}>
          <Wand2 className="w-6 h-6" />
          Equipped ({character.equipped.length})
        </h2>
        
        <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {character.equipped.length === 0 ? (
             <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500">
                <Shield className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Your equipment slots are empty.</p>
             </div>
          ) : (
            character.equipped.map((item, idx) => (
              <motion.div 
                key={`${item.id}-equipped-${idx}`}
                layoutId={`item-${item.id}`}
                className={`bg-slate-800/80 p-4 rounded-lg border ${theme.border} shadow-lg relative group`}
              >
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className={`w-12 h-12 rounded object-cover ${theme.accentBg}`} />
                  <div>
                    <h4 className={`text-white font-bold font-serif`}>{item.name}</h4>
                    <p className="text-xs text-slate-400 flex gap-2">
                       {item.attack ? <span className="text-red-400">ATK +{item.attack}</span> : null}
                       {item.defense ? <span className="text-blue-400">DEF +{item.defense}</span> : null}
                    </p>
                    <span className="text-[10px] uppercase text-slate-500">{item.type}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onUnequip(item)}
                  className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100"
                >
                  <span className="text-xs font-bold">Unequip</span>
                </button>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-4 pt-6 border-t border-slate-700 shrink-0">
            <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Total Bonus Stats</h3>
            <div className="grid grid-cols-2 gap-4">
                 <div className="text-center">
                    <div className="text-2xl font-magic text-red-400">
                        {character.stats.attack + character.equipped.reduce((s, i) => s + (i.attack || 0), 0)}
                    </div>
                    <div className="text-xs text-slate-500">Attack</div>
                 </div>
                 <div className="text-center">
                    <div className="text-2xl font-magic text-blue-400">
                        {character.stats.defense + character.equipped.reduce((s, i) => s + (i.defense || 0), 0)}
                    </div>
                    <div className="text-xs text-slate-500">Defense</div>
                 </div>
            </div>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="lg:col-span-2">
        <div className={`bg-[#1a1a2e] p-6 rounded-xl border ${theme.border} min-h-[500px]`}>
           <h2 className="text-2xl font-magic text-slate-200 mb-6">Magical Trunk (Inventory)</h2>
           
           {character.inventory.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <p className="text-lg font-serif italic">Your trunk is empty.</p>
                <p className="text-sm">Visit Diagon Alley to purchase supplies.</p>
             </div>
           ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {character.inventory.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-inv-${idx}`}
                    whileHover={{ y: -5 }}
                    className={`bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-${theme.secondary.split('-')[1]}-400/50 transition-all group flex flex-col justify-between min-h-[200px]`}
                  >
                    <div className="relative">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded mb-3 bg-slate-900" />
                        <span className="absolute top-1 right-1 text-[10px] bg-black/60 px-1 rounded text-slate-300 uppercase tracking-wide">{item.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200 font-serif leading-tight mb-1">{item.name}</h4>
                    
                    <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700/50">
                        <button 
                            onClick={() => onEquip(item)}
                            className="flex-1 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white text-xs py-1.5 rounded transition-colors"
                        >
                            Equip
                        </button>
                        <button 
                          onClick={() => onSell(item)}
                          className="flex-1 bg-yellow-600/20 hover:bg-yellow-600 text-yellow-400 hover:text-white text-xs py-1.5 rounded transition-colors"
                        >
                          Sell {Math.floor(item.price * 0.5)}G
                        </button>
                    </div>
                  </motion.div>
                ))}
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
};