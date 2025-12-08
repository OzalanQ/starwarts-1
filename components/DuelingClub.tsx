
import React, { useState, useEffect } from 'react';
import { Character, BattleResult } from '../types';
import { OPPONENT_NAMES, HOUSE_THEMES } from '../constants';
import { Swords, Skull, Sparkles, Coins, Zap, Shield, Sword } from 'lucide-react';
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

  // Battle Stats State
  const [playerBattleStats, setPlayerBattleStats] = useState({ attack: 0, defense: 0, total: 0 });
  const [opponentBattleStats, setOpponentBattleStats] = useState({ attack: 0, defense: 0, total: 0 });

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

    // 1. Calculate Player Total Stats (Base + Equip + Creatures)
    let pAttack = character.stats.attack + character.equipped.reduce((acc, item) => acc + (item.attack || 0), 0);
    let pDefense = character.stats.defense + character.equipped.reduce((acc, item) => acc + (item.defense || 0), 0);
    
    // Creature Bonuses
    character.creatures.forEach(c => {
        if (c.happiness > 50 && c.hunger > 30) {
            if (c.bonusType === 'ATTACK_BOOST') pAttack += c.bonusValue;
            if (c.bonusType === 'DEFENSE_BOOST') pDefense += c.bonusValue;
        }
    });

    const pTotal = pAttack + pDefense;
    setPlayerBattleStats({ attack: pAttack, defense: pDefense, total: pTotal });

    // 2. Generate Opponent Stats (50% Win Rate Target)
    // We flip a coin: 50% chance opponent is weaker, 50% chance opponent is stronger
    const isPlayerWin = Math.random() >= 0.5;
    
    let oTotal = 0;
    if (isPlayerWin) {
        // Opponent is weaker (0.8x to 0.99x of player total)
        oTotal = Math.floor(pTotal * (0.8 + Math.random() * 0.19));
    } else {
        // Opponent is stronger (1.01x to 1.2x of player total)
        oTotal = Math.floor(pTotal * (1.01 + Math.random() * 0.2));
    }

    // Distribute Opponent Total into Attack/Defense randomly
    const oAttack = Math.floor(oTotal * (0.3 + Math.random() * 0.4)); // 30% to 70% of total
    const oDefense = oTotal - oAttack;

    setOpponentBattleStats({ attack: oAttack, defense: oDefense, total: oTotal });

    // Initial logs
    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);
    addLog(`Duel started against ${oppName}!`);
    addLog(`Your Power: ${pTotal} (Atk: ${pAttack}, Def: ${pDefense})`);
    addLog(`${oppName}'s Power: ${oTotal} (Atk: ${oAttack}, Def: ${oDefense})`);
    
    // Simulation Sequence
    const steps = 3; 
    for(let i=0; i<steps; i++) {
        // --- Player Turn ---
        await new Promise(r => setTimeout(r, 1000));
        setPlayerAction('attack');
        setProjectile('player');
        
        await new Promise(r => setTimeout(r, 600)); // Travel time
        setProjectile('none');
        setOpponentAction('hit');
        
        // Fluff damage calculation for logs (doesn't affect outcome)
        const hitDmg = Math.floor(pAttack * (0.8 + Math.random() * 0.4));
        const block = Math.floor(oDefense * 0.5);
        const actualDmg = Math.max(0, hitDmg - block);
        addLog(`You cast a spell! ${oppName} blocks ${block}, takes ${actualDmg} damage.`);
        
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

        const oppHit = Math.floor(oAttack * (0.8 + Math.random() * 0.4));
        const myBlock = Math.floor(pDefense * 0.5);
        const actualTaken = Math.max(0, oppHit - myBlock);
        addLog(`${oppName} retaliates! You block ${myBlock}, take ${actualTaken} damage.`);

        await new Promise(r => setTimeout(r, 500));
        setPlayerAction('idle');
        setOpponentAction('idle');
    }

    // Final Blow based on Total Stats
    await new Promise(r => setTimeout(r, 1000));
    const playerWins = pTotal >= oTotal; // Victory Condition

    if (playerWins) {
        setPlayerAction('attack');
        setProjectile('player');
        await new Promise(r => setTimeout(r, 600));
        setOpponentAction('hit'); 
        addLog(`Your magic overpowers ${oppName}! (Total ${pTotal} vs ${oTotal})`);
        addLog(`Victory!`);
    } else {
        setOpponentAction('attack');
        setProjectile('opponent');
        await new Promise(r => setTimeout(r, 600));
        setPlayerAction('hit');
        addLog(`${oppName}'s magic is too strong! (Total ${oTotal} vs ${pTotal})`);
        addLog(`Defeat.`);
    }

    setProjectile('none');

    // Finish
    setTimeout(() => {
      setIsBattling(false);
      onBattleComplete({
        victory: playerWins,
        goldEarned: playerWins ? 100 : -50,
        log: logs, 
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

        <div className="relative z-10 p-4 md:p-8 flex-1 flex flex-col">
          <h2 className={`text-4xl font-magic text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-500 mb-2`}>
            The Dueling Club
          </h2>
          <p className="text-slate-400 italic font-serif text-center mb-8">"Victory goes to the strongest wizard."</p>

          {!isBattling ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-12">
               <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
                  <div className="text-center">
                      <div className={`w-32 h-32 rounded-full ${theme.accentBg} border-4 ${theme.border.replace('border', 'border-solid')} flex items-center justify-center mx-auto mb-4 shadow-lg relative group`}>
                        <img src={character.avatarUrl} className="w-full h-full rounded-full object-cover" />
                        <div className="absolute -bottom-2 bg-slate-900 px-3 py-1 rounded-full text-xs font-bold border border-slate-700">
                           PWR: {(character.stats.attack + character.stats.defense + character.equipped.reduce((a,i)=>a+(i.attack||0)+(i.defense||0), 0))}
                        </div>
                      </div>
                      <p className={`font-bold text-xl ${theme.primary}`}>{character.name}</p>
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
               {/* STATS DISPLAY */}
               <div className="flex justify-between px-2 md:px-12 mb-4 text-sm font-bold uppercase tracking-wider">
                   <div className="flex flex-col items-center gap-1 bg-slate-900/80 p-3 rounded border border-slate-700 min-w-[120px]">
                        <span className="text-slate-400 text-xs">Your Power</span>
                        <div className="text-2xl text-white">{playerBattleStats.total}</div>
                        <div className="flex gap-3 text-xs mt-1 w-full justify-center border-t border-slate-700 pt-1">
                             <span className="flex items-center gap-1 text-red-400"><Sword className="w-3 h-3"/> {playerBattleStats.attack}</span>
                             <span className="flex items-center gap-1 text-blue-400"><Shield className="w-3 h-3"/> {playerBattleStats.defense}</span>
                        </div>
                   </div>
                   <div className="flex flex-col items-center gap-1 bg-slate-900/80 p-3 rounded border border-red-900/50 min-w-[120px]">
                        <span className="text-slate-400 text-xs">Enemy Power</span>
                        <div className="text-2xl text-red-400">{opponentBattleStats.total}</div>
                        <div className="flex gap-3 text-xs mt-1 w-full justify-center border-t border-slate-800 pt-1">
                             <span className="flex items-center gap-1 text-red-500"><Sword className="w-3 h-3"/> {opponentBattleStats.attack}</span>
                             <span className="flex items-center gap-1 text-blue-500"><Shield className="w-3 h-3"/> {opponentBattleStats.defense}</span>
                        </div>
                   </div>
               </div>

               {/* BATTLE ARENA VISUAL */}
               <div className="flex-1 flex justify-between items-center px-8 relative bg-black/20 rounded-xl border border-white/5 overflow-hidden min-h-[250px]">
                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>

                    {/* PLAYER */}
                    <motion.div 
                        animate={playerAction === 'attack' ? { x: 50 } : playerAction === 'hit' ? { x: -20, rotate: -5, opacity: [1, 0.5, 1] } : { x: 0 }}
                        className="relative z-10 text-center"
                    >
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${theme.border.replace('border', 'border-solid')} shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                             <img src={character.avatarUrl} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className={`mt-4 h-2 bg-slate-700 rounded-full w-24 md:w-32 overflow-hidden mx-auto border border-slate-600`}>
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
                         <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                             <img src={currentOpponentImage} className="w-full h-full rounded-full object-cover grayscale-[0.2]" />
                        </div>
                         <div className={`mt-4 h-2 bg-slate-700 rounded-full w-24 md:w-32 overflow-hidden mx-auto border border-slate-600`}>
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
