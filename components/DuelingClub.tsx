
import React, { useState, useEffect } from 'react';
import { Character, BattleResult } from '../types';
import { OPPONENT_NAMES, HOUSE_THEMES } from '../constants';
import { Swords, Skull, Sparkles, Coins, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DuelingClubProps {
  character: Character;
  onBattleComplete: (result: BattleResult) => void;
}

export const DuelingClub: React.FC<DuelingClubProps> = ({ character, onBattleComplete }) => {
  const [isBattling, setIsBattling] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentOpponent, setCurrentOpponent] = useState<string | null>(null);
  const [currentOpponentImage, setCurrentOpponentImage] = useState<string>("");
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;

  // Animation States
  const [playerAction, setPlayerAction] = useState<'idle' | 'attack' | 'hit'>('idle');
  const [opponentAction, setOpponentAction] = useState<'idle' | 'attack' | 'hit'>('idle');
  const [projectile, setProjectile] = useState<'none' | 'player' | 'opponent'>('none');

  const startDuel = async () => {
    // Check if user has enough gold to start
    if (character.gold < 50) return;

    setIsBattling(true);
    setLogs([]);
    const oppName = OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)];
    const oppImage = `https://picsum.photos/seed/${oppName.replace(/ /g, '')}/200/200`;
    setCurrentOpponent(oppName);
    setCurrentOpponentImage(oppImage);

    // Initial logs
    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);
    addLog(`Duel started against ${oppName}!`);
    addLog("Entry fee paid.");
    
    // Battle Logic Setup
    // 1. Base Equip Stats
    let totalAttack = character.stats.attack + character.equipped.reduce((acc, item) => acc + (item.attack || 0), 0);
    let totalDefense = character.stats.defense + character.equipped.reduce((acc, item) => acc + (item.defense || 0), 0);
    
    // 2. Creature Bonuses
    character.creatures.forEach(c => {
        if (c.happiness > 50 && c.hunger > 30) {
            if (c.bonusType === 'ATTACK_BOOST') totalAttack += c.bonusValue;
            if (c.bonusType === 'DEFENSE_BOOST') totalDefense += c.bonusValue;
        }
    });

    // Simulation Logic
    const isVictory = Math.random() < 0.40;
    const oppAttack = isVictory ? totalDefense * 0.8 : totalDefense * 1.5; 

    // Simulation Sequence
    const steps = 3; // Number of exchanges
    for(let i=0; i<steps; i++) {
        // --- Player Turn ---
        await new Promise(r => setTimeout(r, 1000));
        setPlayerAction('attack');
        setProjectile('player');
        
        await new Promise(r => setTimeout(r, 600)); // Travel time
        setProjectile('none');
        setOpponentAction('hit');
        const dmg = Math.floor(totalAttack * (0.8 + Math.random() * 0.4));
        addLog(`You cast a spell! Hit ${oppName} for ${dmg} damage.`);
        
        await new Promise(r => setTimeout(r, 500));
        setPlayerAction('idle');
        setOpponentAction('idle');

        // --- Opponent Turn ---
        await new Promise(r => setTimeout(r, 1000));
        setOpponentAction('attack');
        setProjectile('opponent');

        await new Promise(r => setTimeout(r, 600));
        setProjectile('none');
        setPlayerAction('hit');
        const dmgTaken = Math.floor(oppAttack * (0.8 + Math.random() * 0.4));
        addLog(`${oppName} retaliates! You take ${dmgTaken} damage.`);

        await new Promise(r => setTimeout(r, 500));
        setPlayerAction('idle');
        setOpponentAction('idle');
    }

    // Final Blow
    await new Promise(r => setTimeout(r, 1000));
    if (isVictory) {
        setPlayerAction('attack');
        setProjectile('player');
        await new Promise(r => setTimeout(r, 600));
        setOpponentAction('hit'); // Stays hit for a bit?
        addLog(`You stunned ${oppName}! Victory!`);
    } else {
        setOpponentAction('attack');
        setProjectile('opponent');
        await new Promise(r => setTimeout(r, 600));
        setPlayerAction('hit');
        addLog(`You were disarmed by ${oppName}. Defeat.`);
    }

    setProjectile('none');

    // Finish
    setTimeout(() => {
      setIsBattling(false);
      onBattleComplete({
        victory: isVictory,
        goldEarned: isVictory ? 100 : -100,
        log: logs, // Pass the accumulated logs
        opponentName: oppName,
        date: new Date().toISOString()
      });
      setCurrentOpponent(null);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-[#1a1a2e] rounded-2xl overflow-hidden border ${theme.border} shadow-2xl relative min-h-[600px] flex flex-col`}
      >
        {/* Magical Atmosphere BG */}
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${theme.gradient} opacity-50 pointer-events-none`} />

        <div className="relative z-10 p-8 flex-1 flex flex-col">
          <h2 className={`text-4xl font-magic text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-500 mb-2`}>
            The Dueling Club
          </h2>
          <p className="text-slate-400 italic font-serif text-center mb-8">"Wands at the ready!"</p>

          {!isBattling ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-12">
               <div className="flex justify-center gap-12 items-center">
                  <div className="text-center">
                      <div className={`w-32 h-32 rounded-full ${theme.accentBg} border-4 ${theme.border.replace('border', 'border-solid')} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <img src={character.avatarUrl} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <p className={`font-bold text-xl ${theme.primary}`}>{character.name}</p>
                      <p className="text-slate-500 text-sm">Level {Math.floor((character.stats.attack + character.stats.defense)/50) + 1}</p>
                  </div>
                  <div className="flex flex-col items-center">
                     <span className="text-6xl font-magic text-red-500/80 drop-shadow-lg">VS</span>
                  </div>
                  <div className="text-center opacity-60 grayscale">
                      <div className="w-32 h-32 rounded-full bg-slate-700/50 border-4 border-slate-600 flex items-center justify-center mx-auto mb-4">
                        <Skull className="w-12 h-12 text-slate-400" />
                      </div>
                      <p className="font-bold text-xl text-slate-400">???</p>
                      <p className="text-slate-600 text-sm">Dark Wizard</p>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-4">
                   <div className="bg-slate-900/80 px-6 py-2 rounded-lg border border-slate-700">
                       <p className={`${theme.secondary} font-bold flex items-center gap-2`}>
                           <Coins className="w-4 h-4" /> Entry Fee: 50 Galleons
                       </p>
                   </div>
                   <button
                    onClick={startDuel}
                    disabled={character.gold < 50}
                    className={`
                        font-magic text-2xl px-12 py-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95
                        ${character.gold >= 50 
                            ? `${theme.button}` 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed grayscale'}
                    `}
                   >
                     <Swords className="w-6 h-6" />
                     Start Duel
                   </button>
                   {character.gold < 50 && <p className="text-red-500 text-sm animate-pulse">Insufficient funds to compete.</p>}
               </div>
            </div>
          ) : (
            <div className="flex-1 relative flex flex-col">
               {/* BATTLE ARENA VISUAL */}
               <div className="flex-1 flex justify-between items-center px-8 relative bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>

                    {/* PLAYER */}
                    <motion.div 
                        animate={playerAction === 'attack' ? { x: 50 } : playerAction === 'hit' ? { x: -20, rotate: -5, opacity: [1, 0.5, 1] } : { x: 0 }}
                        className="relative z-10 text-center"
                    >
                        <div className={`w-32 h-32 rounded-full border-4 ${theme.border.replace('border', 'border-solid')} shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                             <img src={character.avatarUrl} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className={`mt-4 h-2 bg-slate-700 rounded-full w-32 overflow-hidden mx-auto border border-slate-600`}>
                             <motion.div 
                                initial={{ width: '100%' }}
                                animate={{ width: playerAction === 'hit' ? ['100%', '80%', '60%'] : '100%' }}
                                className="h-full bg-green-500" 
                             />
                        </div>
                    </motion.div>

                    {/* SPELL PROJECTILES */}
                    <AnimatePresence>
                        {projectile === 'player' && (
                            <motion.div
                                initial={{ left: '25%', opacity: 0, scale: 0.5 }}
                                animate={{ left: '75%', opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                                transition={{ duration: 0.6, ease: "anticipate" }} // Slower, punchier
                                className="absolute top-1/2 -translate-y-1/2 z-20"
                            >
                                <div className="relative">
                                    {/* Core Bolt */}
                                    <div className="w-12 h-3 rounded-full bg-cyan-300 shadow-[0_0_20px_#22d3ee] animate-pulse"></div>
                                    {/* Trail */}
                                    <div className="absolute top-0 left-0 w-20 h-3 bg-gradient-to-r from-cyan-500/0 to-cyan-400/50 rounded-full blur-sm transform -translate-x-full"></div>
                                    {/* Sparkles */}
                                    <div className="absolute -top-2 -left-2 w-full h-full animate-ping opacity-75">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                         {projectile === 'opponent' && (
                            <motion.div
                                initial={{ right: '25%', opacity: 0, scale: 0.5 }}
                                animate={{ right: '75%', opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                                transition={{ duration: 0.6, ease: "anticipate" }}
                                className="absolute top-1/2 -translate-y-1/2 z-20"
                            >
                                <div className="relative">
                                     {/* Core Bolt */}
                                     <div className="w-12 h-3 rounded-full bg-green-500 shadow-[0_0_20px_#22c55e] animate-pulse"></div>
                                     {/* Trail */}
                                     <div className="absolute top-0 right-0 w-20 h-3 bg-gradient-to-l from-green-600/0 to-green-500/50 rounded-full blur-sm transform translate-x-full"></div>
                                      <div className="absolute -top-2 -left-2 w-full h-full animate-ping opacity-75">
                                        <Zap className="w-8 h-8 text-green-200" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* OPPONENT */}
                    <motion.div 
                        animate={opponentAction === 'attack' ? { x: -50 } : opponentAction === 'hit' ? { x: 20, rotate: 5, opacity: [1, 0.5, 1] } : { x: 0 }}
                        className="relative z-10 text-center"
                    >
                         <div className="w-32 h-32 rounded-full border-4 border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                             <img src={currentOpponentImage} className="w-full h-full rounded-full object-cover grayscale-[0.2]" />
                        </div>
                         <div className={`mt-4 h-2 bg-slate-700 rounded-full w-32 overflow-hidden mx-auto border border-slate-600`}>
                             <motion.div 
                                initial={{ width: '100%' }}
                                animate={{ width: opponentAction === 'hit' ? ['100%', '80%', '60%'] : '100%' }}
                                className="h-full bg-red-500" 
                             />
                        </div>
                        <p className="mt-2 text-red-400 font-bold">{currentOpponent}</p>
                    </motion.div>
               </div>

               {/* Battle Log */}
               <div className="h-32 mt-6 overflow-y-auto bg-black/30 rounded-lg p-4 font-mono text-sm border border-slate-800 shadow-inner">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-1 ${log.includes("Victory") ? 'text-green-400 font-bold' : log.includes("Defeat") ? 'text-red-400 font-bold' : 'text-slate-400'}`}
                    >
                      {`> ${log}`}
                    </motion.div>
                  ))}
                  <div id="log-end" />
               </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
