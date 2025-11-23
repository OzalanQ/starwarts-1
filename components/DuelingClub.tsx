import React, { useState } from 'react';
import { Character, BattleResult } from '../types';
import { OPPONENT_NAMES, HOUSE_THEMES } from '../constants';
import { Swords, Skull, Sparkles, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface DuelingClubProps {
  character: Character;
  onBattleComplete: (result: BattleResult) => void;
}

export const DuelingClub: React.FC<DuelingClubProps> = ({ character, onBattleComplete }) => {
  const [isBattling, setIsBattling] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;

  const startDuel = async () => {
    // Check if user has enough gold to start
    if (character.gold < 50) return;

    setIsBattling(true);
    setLogs([]);
    const oppName = OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)];

    // Simulate battle logic
    const tempLogs: string[] = [];
    const addLog = (msg: string) => tempLogs.push(msg);

    addLog(`Duel started against ${oppName}!`);
    addLog("The entry fee of 50 Galleons has been paid.");
    addLog("You bow to your opponent...");
    
    // Artificial delay for drama
    await new Promise(r => setTimeout(r, 1000));
    setLogs([...tempLogs]);

    const totalAttack = character.stats.attack + character.equipped.reduce((acc, item) => acc + (item.attack || 0), 0);
    const totalDefense = character.stats.defense + character.equipped.reduce((acc, item) => acc + (item.defense || 0), 0);
    
    // Calculate win probability (Force 40% win rate)
    const isVictory = Math.random() < 0.40;

    // Opponent scaling relative to player to make narration believable
    const oppAttack = isVictory ? totalDefense * 0.8 : totalDefense * 1.5; 
    
    let steps = 5;
    for(let i=0; i<steps; i++) {
        if (i % 2 === 0) {
            // Player turn
            const dmg = Math.floor(totalAttack * (0.8 + Math.random() * 0.4));
            addLog(`You cast a spell! Hit ${oppName} for ${dmg} damage.`);
        } else {
            // Opponent turn
            const dmg = Math.floor(oppAttack * (0.8 + Math.random() * 0.4));
            addLog(`${oppName} retaliates! You take ${dmg} damage.`);
        }
    }

    addLog(isVictory ? `You stunned ${oppName}! Victory!` : `You were disarmed by ${oppName}. Defeat.`);
    setLogs([...tempLogs]);

    // Finish
    setTimeout(() => {
      setIsBattling(false);
      onBattleComplete({
        victory: isVictory,
        goldEarned: isVictory ? 100 : -100,
        log: tempLogs,
        opponentName: oppName,
        date: new Date().toISOString()
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-[#1a1a2e] rounded-2xl overflow-hidden border ${theme.border} shadow-2xl relative`}
      >
        {/* Magical Atmosphere BG */}
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${theme.gradient} opacity-50 pointer-events-none`} />

        <div className="relative z-10 p-8 text-center">
          <h2 className={`text-4xl font-magic bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-500 mb-2`}>
            The Dueling Club
          </h2>
          <p className="text-slate-400 italic font-serif mb-8">"Wands at the ready!"</p>

          {!isBattling ? (
            <div className="space-y-8">
               <div className="flex justify-center gap-12 items-center">
                  <div className="text-center">
                      <div className={`w-24 h-24 rounded-full ${theme.accentBg} border-2 ${theme.border.replace('border', 'border-solid')} flex items-center justify-center mx-auto mb-3`}>
                        <img src={character.avatarUrl} className="w-20 h-20 rounded-full object-cover" />
                      </div>
                      <p className={`font-bold ${theme.primary}`}>{character.name}</p>
                  </div>
                  <div className="text-4xl font-magic text-red-500">VS</div>
                  <div className="text-center opacity-50">
                      <div className="w-24 h-24 rounded-full bg-slate-700/50 border-2 border-slate-600 flex items-center justify-center mx-auto mb-3">
                        <Skull className="w-10 h-10 text-slate-400" />
                      </div>
                      <p className="font-bold text-slate-400">Unknown Wizard</p>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-2">
                   <p className={`${theme.secondary} text-sm font-bold flex items-center gap-2`}>
                       <Coins className="w-4 h-4" /> Entry Fee: 50 Galleons
                   </p>
                   <button
                    onClick={startDuel}
                    disabled={character.gold < 50}
                    className={`
                        font-magic text-xl px-12 py-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center gap-3 mx-auto transition-all
                        ${character.gold >= 50 
                            ? `${theme.button} hover:scale-105` 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed grayscale'}
                    `}
                   >
                     <Swords className="w-6 h-6" />
                     Start Duel
                   </button>
                   {character.gold < 50 && <p className="text-red-500 text-xs">Not enough gold to enter.</p>}
               </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className={`flex justify-center items-center gap-4 animate-pulse ${theme.primary} font-magic text-xl`}>
                  <Sparkles className="w-6 h-6 animate-spin" />
                  Duel in Progress...
                  <Sparkles className="w-6 h-6 animate-spin" />
               </div>

               <div className="bg-black/40 rounded-lg p-4 h-64 overflow-y-auto text-left font-mono text-sm border border-slate-700">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-2 ${log.includes("Victory") ? 'text-green-400 font-bold' : log.includes("Defeat") ? 'text-red-400 font-bold' : 'text-slate-300'}`}
                    >
                      {`> ${log}`}
                    </motion.div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};