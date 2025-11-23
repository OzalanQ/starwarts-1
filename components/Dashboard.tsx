import React, { useState, useRef } from 'react';
import { Character } from '../types';
import { HOUSE_THEMES } from '../constants';
import { Shield, Sword, Trophy, Coins, Edit2, Lock, X, Check, ChevronDown, History, Camera, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  character: Character;
  onUpdateGold?: (newAmount: number) => void;
  onUpdateName?: (newName: string) => void;
  onUpdateHouse?: (newHouse: any) => void;
  onUpdateAvatar?: (newUrl: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ character, onUpdateGold, onUpdateName, onUpdateHouse, onUpdateAvatar }) => {
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal States
  const [activeModal, setActiveModal] = useState<'none' | 'gold' | 'house'>('none');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Input States
  const [newGold, setNewGold] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(character.name);
  const [pendingHouse, setPendingHouse] = useState('');

  const totalAttack = character.stats.attack + character.equipped.reduce((acc, item) => acc + (item.attack || 0), 0);
  const totalDefense = character.stats.defense + character.equipped.reduce((acc, item) => acc + (item.defense || 0), 0);
  
  // Level Calculation: Base 1, max 100. Scale: 50 stats = 1 level.
  const level = Math.min(100, 1 + Math.floor((totalAttack + totalDefense) / 50));

  const handleAuth = (action: () => void) => {
    if (password === '900504') {
        action();
        closeModal();
    } else {
        setError('Invalid magical signature (Wrong Password)');
    }
  };

  const saveGold = () => {
    const amount = parseInt(newGold);
    if (!isNaN(amount) && amount >= 0 && onUpdateGold) {
        onUpdateGold(amount);
    }
  };

  const saveHouse = () => {
    if (onUpdateHouse && pendingHouse) {
        onUpdateHouse(pendingHouse);
    }
  };

  const closeModal = () => {
    setActiveModal('none');
    setPassword('');
    setNewGold('');
    setError('');
    setPendingHouse('');
  };

  const initiateHouseChange = (house: string) => {
    if (house === character.house) return;
    setPendingHouse(house);
    setActiveModal('house');
  };

  const saveName = () => {
    if (tempName.trim() && onUpdateName) {
        onUpdateName(tempName);
        setIsEditingName(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string' && onUpdateAvatar) {
          onUpdateAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 relative"
    >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />

        <AnimatePresence>
            {activeModal !== 'none' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className={`bg-[#1a1a2e] border ${theme.border} p-6 rounded-xl w-full max-w-md shadow-2xl`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-xl font-magic ${theme.secondary}`}>
                                {activeModal === 'gold' ? 'Gringotts Vault Access' : 'Sorting Hat Override'}
                            </h3>
                            <button onClick={closeModal}><X className="w-6 h-6 text-slate-400 hover:text-white" /></button>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-slate-300 text-sm">Enter the security code to authorize this change.</p>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Code"
                                className={`w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-${theme.secondary.split('-')[1]}-500 outline-none`}
                            />
                            {error && <p className="text-red-400 text-xs">{error}</p>}

                            {activeModal === 'gold' && (
                                 <input 
                                    type="number" 
                                    value={newGold}
                                    onChange={(e) => setNewGold(e.target.value)}
                                    placeholder="New Gold Amount"
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white outline-none mt-2"
                                />
                            )}

                             {activeModal === 'house' && (
                                <div className={`p-3 border border-slate-700 rounded bg-slate-800 text-center`}>
                                    Changing allegiance to <span className="font-bold text-white">{pendingHouse}</span>
                                </div>
                            )}

                            <button 
                                onClick={() => activeModal === 'gold' ? handleAuth(saveGold) : handleAuth(saveHouse)}
                                className={`w-full ${theme.button} font-bold py-2 rounded transition-colors`}
                            >
                                Confirm Authorization
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      {/* PROFILE HEADER */}
      <div className={`relative p-1 rounded-2xl bg-gradient-to-br ${theme.gradient}`}>
        <div className={`bg-[#0f172a] rounded-xl p-6 border ${theme.border} shadow-2xl relative overflow-hidden`}>
          {/* Decorative Background Elements */}
          <div className={`absolute top-0 right-0 w-64 h-64 ${theme.accentBg} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-full blur opacity-75`}></div>
              <img 
                src={character.avatarUrl} 
                alt={character.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-[#0f172a] shadow-xl"
              />
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className={`absolute bottom-0 right-0 ${theme.button} text-xs font-bold px-2 py-1 rounded-full border-2 border-[#0f172a] z-30 pointer-events-none`}>
                Lvl {level}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2 w-full">
              <div className="flex items-center justify-center md:justify-start gap-3">
                {isEditingName ? (
                    <div className="flex items-center gap-2">
                        <input 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="bg-slate-800 text-white border border-slate-600 rounded px-2 py-1 font-magic text-xl"
                            autoFocus
                        />
                        <button onClick={saveName} className="text-green-400"><Check className="w-5 h-5" /></button>
                        <button onClick={() => setIsEditingName(false)} className="text-red-400"><X className="w-5 h-5" /></button>
                    </div>
                ) : (
                    <h2 className={`text-4xl font-magic ${theme.secondary} flex items-center gap-3`}>
                        {character.name}
                        <Edit2 onClick={() => { setTempName(character.name); setIsEditingName(true); }} className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer text-slate-400" />
                    </h2>
                )}
              </div>
              
              {/* Gold Display */}
              <div className={`flex items-center justify-center md:justify-start gap-2 ${theme.secondary} font-bold text-xl group cursor-pointer`} onClick={() => setActiveModal('gold')}>
                <Coins className="w-5 h-5" />
                <span>{character.gold} Galleons</span>
                <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
              </div>
            </div>

            {/* Power/Defense Display */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20 backdrop-blur-sm flex flex-col items-center min-w-[100px]">
                <Sword className="w-6 h-6 text-red-400 mb-2" />
                <span className="text-xs text-red-300 uppercase tracking-wider">Power</span>
                <span className="text-2xl font-bold text-red-100">{totalAttack}</span>
              </div>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20 backdrop-blur-sm flex flex-col items-center min-w-[100px]">
                <Shield className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-xs text-blue-300 uppercase tracking-wider">Defense</span>
                <span className="text-2xl font-bold text-blue-100">{totalDefense}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOUSE ALLEGIANCE SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-[#1a1a2e] p-6 rounded-xl border ${theme.border}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${theme.accentBg} border border-${theme.border}`}>
                    <Home className={`w-8 h-8 ${theme.primary}`} />
                </div>
                <div>
                    <h3 className={`text-xl font-magic ${theme.secondary}`}>House Allegiance: {character.house}</h3>
                    <p className="text-slate-400 text-sm">Your magical traits align with the values of {character.house}.</p>
                </div>
            </div>
            
            <div className="relative group z-20">
                <button className={`flex items-center gap-2 ${theme.button} px-6 py-2 rounded-lg font-bold transition-all`}>
                    Switch House <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {Object.keys(HOUSE_THEMES).map(h => (
                        <button 
                            key={h}
                            onClick={() => initiateHouseChange(h)}
                            className={`block w-full text-left px-4 py-3 hover:bg-slate-800 ${character.house === h ? theme.primary : 'text-slate-400'} border-b border-slate-800 last:border-0`}
                        >
                            {h}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>

      {/* STATS & HISTORY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={`bg-[#1a1a2e] p-6 rounded-xl border ${theme.border}`}
        >
          <h3 className={`text-xl font-magic ${theme.primary} mb-4 flex items-center gap-2`}>
            <Trophy className="w-5 h-5" />
            Combat Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Victories</span>
              <span className="text-green-400 font-bold text-lg">{character.stats.wins}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Defeats</span>
              <span className="text-red-400 font-bold text-lg">{character.stats.losses}</span>
            </div>
            <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white z-10">
                    {character.stats.wins + character.stats.losses > 0 ? Math.round((character.stats.wins / (character.stats.wins + character.stats.losses)) * 100) : 0}% Win Rate
               </div>
              <div 
                className={`h-full ${theme.button}`}
                style={{ 
                  width: `${(character.stats.wins + character.stats.losses) > 0 
                    ? (character.stats.wins / (character.stats.wins + character.stats.losses)) * 100 
                    : 0}%` 
                }}
              />
            </div>
          </div>
        </motion.div>

        <div className={`bg-[#1a1a2e] p-6 rounded-xl border ${theme.border} h-[400px] flex flex-col`}>
            <h3 className={`text-xl font-magic ${theme.primary} mb-4 flex items-center gap-2`}>
                <History className="w-5 h-5" />
                Duel History
            </h3>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
                {character.matchHistory.length === 0 ? (
                    <p className="text-slate-500 text-center mt-12 italic">No duels recorded yet.</p>
                ) : (
                    character.matchHistory.slice().reverse().map((match, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-800/40 rounded border border-slate-700/50">
                            <div>
                                <p className="text-slate-300 font-bold text-sm">vs {match.opponentName}</p>
                                <p className="text-xs text-slate-500">{new Date(match.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${match.victory ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                    {match.victory ? 'Victory' : 'Defeat'}
                                </span>
                                <p className={`text-xs mt-1 ${match.goldEarned >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {match.goldEarned > 0 ? '+' : ''}{match.goldEarned} G
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </motion.div>
  );
};