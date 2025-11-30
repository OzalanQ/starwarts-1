
import React, { useState, useRef } from 'react';
import { GameItem, Character, ItemType } from '../types';
import { SHOP_ITEMS, HOUSE_THEMES } from '../constants';
import { ShoppingBag, Coins, Lock, Wand2, Sparkles, Book, Check, Camera, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopProps {
  character: Character;
  onBuy: (item: GameItem) => void;
  onUpdateItemImage: (itemId: number, newUrl: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ character, onBuy, onUpdateItemImage }) => {
  const [filter, setFilter] = useState<'all' | ItemType>('all');
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const filteredItems = SHOP_ITEMS.filter(item => filter === 'all' || item.type === filter);

  const categories = [
    { id: 'all', label: 'All Items', icon: null },
    { id: 'wand', label: 'Wands', icon: Wand2 },
    { id: 'spell', label: 'Spells & Curses', icon: Sparkles },
    { id: 'equipment', label: 'Magical Equipment', icon: Book },
  ];

  // Calculate Discount
  let discount = 0;
  character.creatures.forEach(c => {
      if (c.bonusType === 'DISCOUNT' && c.happiness > 50 && c.hunger > 30) {
          discount += c.bonusValue;
      }
  });
  if (discount > 0.5) discount = 0.5; // Cap at 50%

  const handleImageUploadClick = (itemId: number) => {
    setEditingItemId(itemId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingItemId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateItemImage(editingItemId, reader.result);
        }
        setEditingItemId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div className={`flex flex-col md:flex-row justify-between items-center bg-[#1a1a2e] p-6 rounded-xl border ${theme.border}`}>
        <div>
          <h2 className={`text-3xl font-magic ${theme.secondary}`}>Diagon Alley Market</h2>
          <p className="text-slate-400">Purveyors of fine magical instruments.</p>
          {discount > 0 && (
              <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Menagerie Discount Active: -{Math.round(discount * 100)}%
              </p>
          )}
        </div>
        <div className={`flex items-center gap-2 mt-4 md:mt-0 ${theme.accentBg} px-4 py-2 rounded-full border ${theme.border}`}>
          <Coins className={`w-5 h-5 ${theme.secondary}`} />
          <span className={`font-bold ${theme.secondary}`}>{character.gold} Galleons</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
           const Icon = cat.icon;
           return (
            <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-magic tracking-wider transition-all whitespace-nowrap ${
                filter === cat.id
                ? `${theme.button} shadow-[0_0_10px_rgba(0,0,0,0.5)]` 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
            >
                {Icon && <Icon className="w-4 h-4" />}
                {cat.label}
            </button>
           );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isOwned = character.inventory.some(i => i.id === item.id) || character.equipped.some(i => i.id === item.id);
          const finalPrice = Math.floor(item.price * (1 - discount));
          const canAfford = character.gold >= finalPrice;
          const displayImage = character.customItemImages[item.id] || item.imageUrl;
          
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`group bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700 hover:border-${theme.secondary.split('-')[1]}-500/50 transition-colors`}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <img 
                  src={displayImage} 
                  alt={item.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1e293b] to-transparent h-24"></div>
                
                {/* Custom Image Upload Button */}
                <button 
                    onClick={(e) => { e.stopPropagation(); handleImageUploadClick(item.id); }}
                    className="absolute top-3 right-24 bg-black/60 hover:bg-black/80 p-1.5 rounded-full text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Customize Item Image"
                >
                    <Upload className="w-3 h-3" />
                </button>

                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white border border-white/10 uppercase font-bold">
                  {item.type === 'wand' ? 'Wand' : item.type === 'spell' ? 'Spell' : 'Artifact'}
                </span>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className={`text-xl font-serif ${theme.secondary} font-bold`}>{item.name}</h3>
                </div>
                
                <p className="text-sm text-slate-400 h-10 line-clamp-2 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex flex-col gap-1">
                    {item.attack ? (
                        <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                            ⚔️ ATK +{item.attack}
                        </span>
                    ) : null}
                    {item.defense ? (
                        <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                            🛡️ DEF +{item.defense}
                        </span>
                    ) : null}
                    {!item.attack && !item.defense && <span className="text-xs text-slate-500">Cosmetic</span>}
                  </div>
                  <button
                    onClick={() => !isOwned && canAfford && onBuy(item)}
                    disabled={isOwned || !canAfford}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                      isOwned
                        ? 'bg-green-900/50 text-green-400 border border-green-500/30 cursor-default'
                        : canAfford 
                            ? `${theme.button}` 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? (
                        <>
                            <Check className="w-4 h-4" /> Owned
                        </>
                    ) : (
                        <>
                            {canAfford ? <ShoppingBag className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            <div className="flex flex-col items-start leading-none">
                                {discount > 0 && <span className="text-[9px] line-through text-slate-500">{item.price}G</span>}
                                <span>{finalPrice} G</span>
                            </div>
                        </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};