import React, { useState, useEffect } from 'react';
import { Character, GameItem, View, BattleResult } from './types';
import { INITIAL_CHARACTER } from './constants';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { DuelingClub } from './components/DuelingClub';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Simulated persistence
  useEffect(() => {
    const saved = localStorage.getItem('hogwarts_save_v3'); // Version increment for new state structure
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new fields exist if loading from old save
        if (!parsed.matchHistory) parsed.matchHistory = [];
        setCharacter(parsed);
      } catch (e) {
        console.error("Save file corrupted");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hogwarts_save_v3', JSON.stringify(character));
  }, [character]);

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateGold = (amount: number) => {
    setCharacter(prev => ({
        ...prev,
        gold: amount
    }));
    showNotification(`Gringotts Vault Updated: ${amount} G`);
  };

  const handleUpdateName = (name: string) => {
    setCharacter(prev => ({ ...prev, name }));
    showNotification("Identity papers updated.");
  };

  const handleUpdateHouse = (house: 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff') => {
    setCharacter(prev => ({ ...prev, house }));
    showNotification(`Welcome to ${house}!`);
  };

  const handleUpdateAvatar = (newUrl: string) => {
    setCharacter(prev => ({ ...prev, avatarUrl: newUrl }));
    showNotification("Portrait updated.");
  };

  const handleBuy = (item: GameItem) => {
    const isOwned = character.inventory.some(i => i.id === item.id) || character.equipped.some(i => i.id === item.id);
    if (isOwned) {
        showNotification("You already own this item!", 'error');
        return;
    }

    if (character.gold >= item.price) {
      setCharacter(prev => ({
        ...prev,
        gold: prev.gold - item.price,
        inventory: [...prev.inventory, item]
      }));
      showNotification(`Purchased ${item.name}!`);
    } else {
      showNotification("Not enough Galleons!", 'error');
    }
  };

  const handleEquip = (item: GameItem) => {
    // Limit removed: characters can now equip as many items as they own.
    setCharacter(prev => ({
      ...prev,
      inventory: prev.inventory.filter(i => i.id !== item.id),
      equipped: [...prev.equipped, item]
    }));
    showNotification(`Equipped ${item.name}`);
  };

  const handleUnequip = (item: GameItem) => {
    setCharacter(prev => ({
      ...prev,
      equipped: prev.equipped.filter(i => i.id !== item.id),
      inventory: [...prev.inventory, item]
    }));
    showNotification(`Unequipped ${item.name}`);
  };

  const handleSell = (item: GameItem) => {
    const sellPrice = Math.floor(item.price * 0.5);
    setCharacter(prev => ({
      ...prev,
      gold: prev.gold + sellPrice,
      inventory: prev.inventory.filter(i => i.id !== item.id)
    }));
    showNotification(`Sold ${item.name} for ${sellPrice}G`);
  };

  const handleBattleComplete = (result: BattleResult) => {
    const entryFee = 50;
    
    setCharacter(prev => {
      let newGold = prev.gold - entryFee + result.goldEarned;
      if (newGold < 0) newGold = 0;

      const updatedHistory = [...prev.matchHistory, result];
      // Keep last 20 matches only
      if (updatedHistory.length > 20) updatedHistory.shift();

      return {
        ...prev,
        gold: newGold,
        stats: {
            ...prev.stats,
            wins: result.victory ? prev.stats.wins + 1 : prev.stats.wins,
            losses: result.victory ? prev.stats.losses : prev.stats.losses + 1
        },
        matchHistory: updatedHistory
      };
    });

    if(result.victory) {
        showNotification(`Victory! Earned ${result.goldEarned} Galleons.`);
    } else {
        showNotification(`Defeat. You lost ${Math.abs(result.goldEarned)} Galleons.`, 'error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f172a] text-slate-200 font-serif overflow-hidden transition-colors duration-700">
      {/* Starfield Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
      </div>

      <Navigation currentView={currentView} onNavigate={setCurrentView} house={character.house} />

      <main className="flex-1 p-4 md:p-8 md:pb-12 overflow-y-auto h-screen relative z-10 scrollbar-hide">
        <AnimatePresence mode="wait">
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border ${
                notification.type === 'success' 
                ? 'bg-green-900/90 border-green-500 text-green-100' 
                : 'bg-red-900/90 border-red-500 text-red-100'
              }`}
            >
              <span>{notification.msg}</span>
              <button onClick={() => setNotification(null)}><X className="w-4 h-4 opacity-70 hover:opacity-100" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto mt-4 md:mt-0 pb-20 md:pb-0">
          {currentView === View.DASHBOARD && <Dashboard character={character} onUpdateGold={handleUpdateGold} onUpdateName={handleUpdateName} onUpdateHouse={handleUpdateHouse} onUpdateAvatar={handleUpdateAvatar} />}
          {currentView === View.SHOP && <Shop character={character} onBuy={handleBuy} />}
          {currentView === View.INVENTORY && <Inventory character={character} onEquip={handleEquip} onUnequip={handleUnequip} onSell={handleSell} />}
          {currentView === View.DUEL && <DuelingClub character={character} onBattleComplete={handleBattleComplete} />}
        </div>
      </main>
    </div>
  );
};

export default App;