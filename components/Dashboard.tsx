
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
                        className={`bg-[#1a1a2e] border-2 ${theme.border} p-8 rounded-xl w-full max-w-md shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                    >
                        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                            <h3 className={`text-2xl font-magic ${theme.secondary}`}>
                                {activeModal === 'gold' ? 'Gringotts Vault Access' : 'Sorting Hat Override'}
                            </h3>
                            <button onClick={closeModal}><X className="w-6 h-6 text-slate-400 hover:text-white" /></button>
                        </div>
                        
                        <div className="space-y-6">
                            <p className="text-slate-300 text-sm font-serif italic">"Secrets are a heavy burden..." - Enter the security code.</p>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Magical Password"
                                className={`w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-${theme.secondary.split('-')[1]}-500 outline-none font-serif`}
                            />
                            {error && <p className="text-red-400 text-xs">{error}</p>}

                            {activeModal === 'gold' && (
                                 <input 
                                    type="number" 
                                    value={newGold}
                                    onChange={(e) => setNewGold(e.target.value)}
                                    placeholder="New Gold Amount"
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white outline-none font-serif"
                                />
                            )}

                             {activeModal === 'house' && (
                                <div className={`p-4 border border-slate-700 rounded bg-slate-800 text-center`}>
                                    Changing allegiance to <span className="font-bold text-white block text-xl font-magic mt-2">{pendingHouse}</span>
                                </div>
                            )}

                            <button 
                                onClick={() => activeModal === 'gold' ? handleAuth(saveGold) : handleAuth(saveHouse)}
                                className={`w-full ${theme.button} font-bold py-3 rounded font-magic tracking-wider shadow-lg hover:shadow-xl transition-all`}
                            >
                                Confirm Authorization
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      {/* PROFILE HEADER */}
      <div className={`relative p-1 rounded-2xl bg-gradient-to-br ${theme.gradient} shadow-2xl`}>
        <div className={`bg-[#0f172a]/90 backdrop-blur-md rounded-xl p-8 border ${theme.border} relative overflow-hidden`}>
          {/* Decorative Background Elements */}
          <div className={`absolute top-0 right-0 w-96 h-96 ${theme.accentBg} rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <div className={`absolute -inset-2 bg-gradient-to-r ${theme.gradient} rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <img 
                src={character.avatarUrl} 
                alt={character.name}
                className={`relative w-36 h-36 rounded-full object-cover border-4 ${theme.border.replace('border', 'border-solid')} shadow-2xl`}
              />
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${theme.button} text-xs font-bold px-3 py-1 rounded-full border-2 border-[#0f172a] z-30 pointer-events-none whitespace-nowrap shadow-lg`}>
                Level {level}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3 w-full">
              <div className="flex items-center justify-center md:justify-start gap-3">
                {isEditingName ? (
                    <div className="flex items-center gap-2">
                        <input 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="bg-slate-800 text-white border border-slate-600 rounded px-3 py-1 font-magic text-2xl w-full"
                            autoFocus
                        />
                        <button onClick={saveName} className="text-green-400 hover:bg-green-400/10 p-1 rounded"><Check className="w-6 h-6" /></button>
                        <button onClick={() => setIsEditingName(false)} className="text-red-400 hover:bg-red-400/10 p-1 rounded"><X className="w-6 h-6" /></button>
                    </div>
                ) : (
                    <h2 className={`text-5xl font-magic ${theme.secondary} flex items-center gap-3 drop-shadow-md`}>
                        {character.name}
                        <Edit2 onClick={() => { setTempName(character.name); setIsEditingName(true); }} className="w-5 h-5 opacity-30 hover:opacity-100 cursor-pointer text-slate-400 transition-opacity" />
                    </h2>
                )}
              </div>
              
              {/* Gold Display */}
              <div className={`flex items-center justify-center md:justify-start gap-2 ${theme.secondary} font-bold text-2xl group cursor-pointer`} onClick={() => setActiveModal('gold')}>
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                    <Coins className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-yellow-100 font-serif tracking-wide">{character.gold} Galleons</span>
                <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
              </div>

              <div className="text-slate-400 font-serif italic text-sm mt-2 border-t border-slate-700/50 pt-2 inline-block">
                  "It is our choices that show what we truly are..."
              </div>
            </div>

            {/* Power/Defense Display */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[120px] shadow-lg">
                <div className="p-2 bg-red-500/10 rounded-full mb-2">
                    <Sword className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Power</span>
                <span className="text-3xl font-magic text-white mt-1">{totalAttack}</span>
              </div>
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[120px] shadow-lg">
                <div className="p-2 bg-blue-500/10 rounded-full mb-2">
                    <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Defense</span>
                <span className="text-3xl font-magic text-white mt-1">{totalDefense}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOUSE ALLEGIANCE SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-[#1a1a2e] p-6 rounded-xl border ${theme.border} relative overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-20 pointer-events-none`} />
        
        <div className="flex flex-col items-start gap-6 relative z-10 w-full">
            <div className="flex items-center gap-6 mb-4">
                <div className={`p-4 rounded-full ${theme.accentBg} border-2 ${theme.border} shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                    <Home className={`w-8 h-8 ${theme.primary}`} />
                </div>
                <div>
                    <h3 className={`text-2xl font-magic ${theme.secondary}`}>House Allegiance</h3>
                    <p className="text-slate-400 font-serif italic">Choose wisely, for the hat makes no mistakes.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {Object.entries(HOUSE_THEMES).map(([name, houseTheme]) => (
                    <button 
                        key={name}
                        onClick={() => initiateHouseChange(name)}
                        className={`
                            relative overflow-hidden p-4 rounded-lg border-2 transition-all duration-300 group
                            ${character.house === name 
                                ? `${houseTheme.border} bg-slate-800 ring-2 ring-offset-2 ring-offset-slate-900 ${houseTheme.primary}` 
                                : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-500 text-slate-400'}
                        `}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${houseTheme.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                        <span className="font-magic text-lg tracking-wider relative z-10">{name}</span>
                        {character.house === name && <Check className="absolute top-2 right-2 w-4 h-4 opacity-50" />}
                    </button>
                ))}
            </div>
        </div>
      </motion.div>

      {/* STATS & HISTORY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -2 }}
          className={`bg-[#1a1a2e] p-8 rounded-xl border ${theme.border} shadow-lg`}
        >
          <h3 className={`text-xl font-magic ${theme.primary} mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-slate-800 pb-2`}>
            <Trophy className="w-5 h-5" />
            Combat Record
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
                    <span className="text-slate-500 text-xs uppercase tracking-wider font-bold block mb-1">Victories</span>
                    <span className="text-green-400 font-magic text-3xl">{character.stats.wins}</span>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
                    <span className="text-slate-500 text-xs uppercase tracking-wider font-bold block mb-1">Defeats</span>
                    <span className="text-red-400 font-magic text-3xl">{character.stats.losses}</span>
                </div>
            </div>
            
            <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    <span>Win Rate</span>
                    <span>{character.stats.wins + character.stats.losses > 0 ? Math.round((character.stats.wins / (character.stats.wins + character.stats.losses)) * 100) : 0}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                    className={`h-full bg-gradient-to-r ${theme.gradient}`}
                    style={{ 
                    width: `${(character.stats.wins + character.stats.losses) > 0 
                        ? (character.stats.wins / (character.stats.wins + character.stats.losses)) * 100 
                        : 0}%` 
                    }}
                />
                </div>
            </div>
          </div>
        </motion.div>

        <div className={`bg-[#1a1a2e] p-8 rounded-xl border ${theme.border} h-[450px] flex flex-col shadow-lg`}>
            <h3 className={`text-xl font-magic ${theme.primary} mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-slate-800 pb-2`}>
                <History className="w-5 h-5" />
                Duel History
            </h3>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-2">
                {character.matchHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-600 italic">
                        <Sword className="w-12 h-12 mb-2 opacity-20" />
                        <p>The chronicles are empty.</p>
                    </div>
                ) : (
                    character.matchHistory.slice().reverse().map((match, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                            <div>
                                <p className="text-slate-300 font-serif text-lg">vs <span className="text-white font-bold">{match.opponentName}</span></p>
                                <p className="text-xs text-slate-500 uppercase tracking-wide">{new Date(match.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${match.victory ? 'bg-green-900/30 text-green-400 border border-green-500/20' : 'bg-red-900/30 text-red-400 border border-red-500/20'}`}>
                                    {match.victory ? 'Victory' : 'Defeat'}
                                </span>
                                <p className={`text-sm font-bold mt-2 ${match.goldEarned >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
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
