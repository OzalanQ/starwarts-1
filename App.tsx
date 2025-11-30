
import React, { useState, useEffect, useRef } from 'react';
import { Character, GameItem, View, BattleResult, Ingredient, Potion, CreatureDefinition, OwnedCreature, Stock } from './types';
import { INITIAL_CHARACTER, STOCK_MARKET_LIST, VAULT_UPGRADES } from './constants';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { DuelingClub } from './components/DuelingClub';
import { QuizRoom } from './components/QuizRoom';
import { PotionsClass } from './components/PotionsClass';
import { MagicalMenagerie } from './components/MagicalMenagerie';
import { GringottsBank } from './components/GringottsBank';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  
  // Refs for intervals
  const gameLoopRef = useRef<number | null>(null);

  // Simulated persistence
  useEffect(() => {
    const saved = localStorage.getItem('hogwarts_save_v9'); // Version bump for bank
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new fields exist if loading from old save
        if (!parsed.matchHistory) parsed.matchHistory = [];
        if (!parsed.customItemImages) parsed.customItemImages = {};
        if (!parsed.solvedQuestions) parsed.solvedQuestions = [];
        if (!parsed.ingredients) parsed.ingredients = {};
        if (!parsed.potions) parsed.potions = {};
        if (!parsed.creatures) parsed.creatures = [];
        if (!parsed.vaultLevel) parsed.vaultLevel = 1;
        if (!parsed.portfolio) parsed.portfolio = {};
        if (!parsed.marketPrices) parsed.marketPrices = STOCK_MARKET_LIST.reduce((acc, stock) => ({...acc, [stock.id]: stock.basePrice}), {});
        
        setCharacter(parsed);
      } catch (e) {
        console.error("Save file corrupted");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hogwarts_save_v9', JSON.stringify(character));
  }, [character]);

  // --- GAME LOOP (Passive Income, Creature Decay, Market Fluctuation) ---
  useEffect(() => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);

    gameLoopRef.current = window.setInterval(() => {
        setCharacter(prev => {
            let goldGained = 0;
            
            // 1. Update Creatures
            const updatedCreatures = prev.creatures.map(pet => {
                const DECAY_AMOUNT = 0.0028; // Approx 1% per hour

                let newHunger = Math.max(0, pet.hunger - DECAY_AMOUNT); 
                let newHappiness = Math.max(0, pet.happiness - DECAY_AMOUNT);
                
                // Passive Income Check
                if (pet.bonusType === 'GOLD_FINDER' && pet.happiness > 50 && pet.hunger > 50) {
                    if (Math.random() < 0.3) {
                        goldGained += pet.bonusValue;
                    }
                }
                
                return {
                    ...pet,
                    hunger: newHunger,
                    happiness: newHappiness
                };
            });

            // 2. Update Stock Market Prices
            // Random walk simulation based on volatility
            const updatedPrices = { ...prev.marketPrices };
            STOCK_MARKET_LIST.forEach(stock => {
                const currentPrice = updatedPrices[stock.id] || stock.basePrice;
                // Fluctuate by volatility % in either direction
                const changePercent = (Math.random() - 0.5) * 2 * stock.volatility; 
                // Apply a smaller factor per tick so it doesn't jump wildly every 10 seconds
                // Using 10% of volatility per tick
                const move = currentPrice * (changePercent * 0.1); 
                let newPrice = currentPrice + move;
                
                // Soft clamp to keep reasonable bounds (0.1x to 5x base price)
                newPrice = Math.max(stock.basePrice * 0.1, Math.min(stock.basePrice * 5, newPrice));
                
                updatedPrices[stock.id] = newPrice;
            });

            return {
                ...prev,
                creatures: updatedCreatures,
                gold: prev.gold + goldGained,
                marketPrices: updatedPrices
            };
        });
    }, 10000); // Tick every 10 seconds

    return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);


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
  
  const handleUpdateItemImage = (itemId: number, newUrl: string) => {
    setCharacter(prev => ({
        ...prev,
        customItemImages: {
            ...prev.customItemImages,
            [itemId]: newUrl
        }
    }));
    showNotification("Magical appearance altered.");
  };

  const handleBuy = (item: GameItem) => {
    let discount = 0;
    character.creatures.forEach(c => {
        if (c.bonusType === 'DISCOUNT' && c.happiness > 50) {
            discount += c.bonusValue;
        }
    });
    if (discount > 0.5) discount = 0.5;
    const finalPrice = Math.floor(item.price * (1 - discount));

    const isOwned = character.inventory.some(i => i.id === item.id) || character.equipped.some(i => i.id === item.id);
    if (isOwned) {
        showNotification("You already own this item!", 'error');
        return;
    }

    if (character.gold >= finalPrice) {
      setCharacter(prev => ({
        ...prev,
        gold: prev.gold - finalPrice,
        inventory: [...prev.inventory, item]
      }));
      showNotification(`Purchased ${item.name} for ${finalPrice}G!`);
    } else {
      showNotification("Not enough Galleons!", 'error');
    }
  };

  const handleEquip = (item: GameItem) => {
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

  const handleQuizComplete = (goldChange: number, solvedQuestion?: string) => {
    setCharacter(prev => {
      const newGold = Math.max(0, prev.gold + goldChange);
      let newSolved = prev.solvedQuestions || [];
      if (solvedQuestion) {
        newSolved = [...newSolved, solvedQuestion];
      }
      return { ...prev, gold: newGold, solvedQuestions: newSolved };
    });
  };

  const handleBuyIngredient = (ingredient: Ingredient, cost: number) => {
    if (character.gold < cost) return;
    setCharacter(prev => ({
      ...prev,
      gold: prev.gold - cost,
      ingredients: {
        ...prev.ingredients,
        [ingredient.id]: (prev.ingredients[ingredient.id] || 0) + 1
      }
    }));
    showNotification(`Bought ${ingredient.name}`);
  };

  const handleBrewPotion = (potion: Potion, success: boolean) => {
    setCharacter(prev => {
      const newIngredients = { ...prev.ingredients };
      potion.ingredients.forEach(ingId => {
        if (newIngredients[ingId] > 0) newIngredients[ingId]--;
      });
      const newPotions = { ...prev.potions };
      if (success) {
        newPotions[potion.id] = (newPotions[potion.id] || 0) + 1;
      }
      return { ...prev, ingredients: newIngredients, potions: newPotions };
    });
    if (success) {
        showNotification(`Brewed ${potion.name}!`);
    } else {
        showNotification(`Brew failed! Ingredients lost.`, 'error');
    }
  };

  const handleBuyCreature = (creature: CreatureDefinition) => {
      if (character.gold < creature.price) {
          showNotification("Insufficient funds.", 'error');
          return;
      }
      const newPet: OwnedCreature = {
          ...creature,
          instanceId: Date.now().toString(),
          happiness: 50,
          hunger: 50,
          lastInteraction: Date.now()
      };
      setCharacter(prev => ({
          ...prev,
          gold: prev.gold - creature.price,
          creatures: [...prev.creatures, newPet]
      }));
      showNotification(`Adopted ${creature.name}!`);
  };

  const handleFeedCreature = (instanceId: string) => {
      if (character.gold < 10) {
          showNotification("Not enough gold for food.", 'error');
          return;
      }
      setCharacter(prev => ({
          ...prev,
          gold: prev.gold - 10,
          creatures: prev.creatures.map(c => 
              c.instanceId === instanceId 
              ? { ...c, hunger: Math.min(100, c.hunger + 30), lastInteraction: Date.now() }
              : c
          )
      }));
      showNotification("Creature fed.");
  };

  const handlePlayCreature = (instanceId: string) => {
      if (character.gold < 20) {
          showNotification("Not enough gold for toys.", 'error');
          return;
      }
      setCharacter(prev => ({
          ...prev,
          gold: prev.gold - 20,
          creatures: prev.creatures.map(c => 
              c.instanceId === instanceId 
              ? { ...c, happiness: Math.min(100, c.happiness + 25), lastInteraction: Date.now() }
              : c
          )
      }));
      showNotification("Played with creature.");
  };

  // --- BANK HANDLERS ---
  const handleBuyStock = (stockId: string, amount: number) => {
      const stockPrice = character.marketPrices[stockId];
      if (!stockPrice) return;
      
      const cost = Math.floor(stockPrice * amount * 1.05); // 5% Fee
      
      if (character.gold < cost) {
          showNotification("Insufficient funds for transaction.", 'error');
          return;
      }

      setCharacter(prev => {
          const currentShares = prev.portfolio[stockId]?.shares || 0;
          const currentTotalCost = prev.portfolio[stockId]?.totalCost || 0;

          return {
              ...prev,
              gold: prev.gold - cost,
              portfolio: {
                  ...prev.portfolio,
                  [stockId]: {
                      shares: currentShares + amount,
                      totalCost: currentTotalCost + cost // Simple weighted cost
                  }
              }
          }
      });
      showNotification(`Purchased ${amount} shares.`);
  };

  const handleSellStock = (stockId: string, amount: number) => {
      const stockPrice = character.marketPrices[stockId];
      const currentShares = character.portfolio[stockId]?.shares || 0;
      
      if (!stockPrice || currentShares < amount) return;

      const revenue = Math.floor(stockPrice * amount);

      setCharacter(prev => {
          const newShares = currentShares - amount;
          const newPortfolio = { ...prev.portfolio };
          
          if (newShares <= 0) {
              delete newPortfolio[stockId];
          } else {
              // Pro-rate the cost basis removal (simplified)
              const currentTotalCost = prev.portfolio[stockId].totalCost;
              const costRemoved = (currentTotalCost / currentShares) * amount;
              newPortfolio[stockId] = {
                  shares: newShares,
                  totalCost: currentTotalCost - costRemoved
              };
          }

          return {
              ...prev,
              gold: prev.gold + revenue,
              portfolio: newPortfolio
          }
      });
      showNotification(`Sold ${amount} shares for ${revenue} G.`);
  };

  const handleUpgradeVault = () => {
      const nextLevel = character.vaultLevel + 1;
      const upgrade = VAULT_UPGRADES.find(u => u.level === nextLevel);
      
      if (!upgrade) return;
      
      if (character.gold < upgrade.cost) {
          showNotification("Not enough gold for upgrade.", 'error');
          return;
      }

      setCharacter(prev => ({
          ...prev,
          gold: prev.gold - upgrade.cost,
          vaultLevel: nextLevel
      }));
      showNotification(`Vault upgraded to ${upgrade.name}!`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050510] text-slate-200 font-serif overflow-hidden transition-colors duration-700">
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <Navigation currentView={currentView} onNavigate={setCurrentView} house={character.house} />

      <main className="flex-1 p-4 md:p-8 md:pb-12 overflow-y-auto h-screen relative z-10 scrollbar-hide">
        <AnimatePresence mode="wait">
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-6 right-6 z-[100] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
                notification.type === 'success' 
                ? 'bg-green-900/90 border-green-500 text-green-100' 
                : 'bg-red-900/90 border-red-500 text-red-100'
              }`}
            >
              <span className="font-bold font-serif tracking-wide">{notification.msg}</span>
              <button onClick={() => setNotification(null)}><X className="w-4 h-4 opacity-70 hover:opacity-100" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto mt-4 md:mt-0 pb-20 md:pb-0 h-full">
          {currentView === View.DASHBOARD && <Dashboard character={character} onUpdateGold={handleUpdateGold} onUpdateName={handleUpdateName} onUpdateHouse={handleUpdateHouse} onUpdateAvatar={handleUpdateAvatar} />}
          {currentView === View.SHOP && <Shop character={character} onBuy={handleBuy} onUpdateItemImage={handleUpdateItemImage} />}
          {currentView === View.INVENTORY && <Inventory character={character} onEquip={handleEquip} onUnequip={handleUnequip} onSell={handleSell} />}
          {currentView === View.DUEL && <DuelingClub character={character} onBattleComplete={handleBattleComplete} />}
          {currentView === View.QUIZ && <QuizRoom character={character} onComplete={handleQuizComplete} />}
          {currentView === View.POTIONS && <PotionsClass character={character} onBuyIngredient={handleBuyIngredient} onBrewPotion={handleBrewPotion} />}
          {currentView === View.CREATURES && <MagicalMenagerie character={character} onBuyCreature={handleBuyCreature} onFeedCreature={handleFeedCreature} onPlayCreature={handlePlayCreature} />}
          {currentView === View.BANK && <GringottsBank character={character} onBuyStock={handleBuyStock} onSellStock={handleSellStock} onUpgradeVault={handleUpgradeVault} />}
        </div>
      </main>
    </div>
  );
};

export default App;
