
import React, { useState } from 'react';
import { Character, Stock, VaultUpgrade, PortfolioItem } from '../types';
import { STOCK_MARKET_LIST, VAULT_UPGRADES, HOUSE_THEMES } from '../constants';
import { Landmark, TrendingUp, TrendingDown, Lock, Coins, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GringottsBankProps {
  character: Character;
  onBuyStock: (stockId: string, amount: number) => void;
  onSellStock: (stockId: string, amount: number) => void;
  onUpgradeVault: () => void;
}

export const GringottsBank: React.FC<GringottsBankProps> = ({ character, onBuyStock, onSellStock, onUpgradeVault }) => {
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;
  const [activeTab, setActiveTab] = useState<'vault' | 'invest'>('vault');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeAmount, setTradeAmount] = useState(1);

  const currentVault = VAULT_UPGRADES[character.vaultLevel - 1] || VAULT_UPGRADES[0];
  const nextVault = VAULT_UPGRADES[character.vaultLevel] || null;

  // Calculate total portfolio value
  const portfolioValue = Object.entries(character.portfolio).reduce((acc, [id, item]) => {
    const stockItem = item as PortfolioItem;
    const price = character.marketPrices[id] || 0;
    return acc + (price * stockItem.shares);
  }, 0);

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!selectedStock) return;
    if (type === 'buy') {
        onBuyStock(selectedStock.id, tradeAmount);
    } else {
        onSellStock(selectedStock.id, tradeAmount);
    }
    // Reset amount after trade? Maybe keep it for convenience.
  };

  return (
    <div className="space-y-6 relative min-h-screen pb-20">
      {/* Marble Hall BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] opacity-10"></div>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#1a1a2e]/90 p-6 rounded-xl border border-yellow-900/30 relative z-10">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-900/20 rounded-full border border-yellow-700/50">
                <Landmark className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
                <h2 className="text-3xl font-magic text-yellow-100">Gringotts Bank</h2>
                <p className="text-yellow-500/60 font-serif italic">Fortius Quo Fidelius</p>
            </div>
         </div>
         <div className="mt-4 md:mt-0 text-right">
             <p className="text-slate-400 text-sm uppercase tracking-widest">Net Worth</p>
             <p className="text-2xl font-bold text-white font-magic">{(character.gold + portfolioValue).toLocaleString()} G</p>
         </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 border-b border-slate-700 pb-2 relative z-10">
        <button 
            onClick={() => setActiveTab('vault')}
            className={`px-6 py-3 font-magic text-lg transition-colors flex items-center gap-2 ${activeTab === 'vault' ? `text-yellow-400 border-b-2 border-yellow-500` : 'text-slate-500 hover:text-slate-300'}`}
        >
            <Lock className="w-5 h-5" /> Vault Security
        </button>
        <button 
            onClick={() => setActiveTab('invest')}
            className={`px-6 py-3 font-magic text-lg transition-colors flex items-center gap-2 ${activeTab === 'invest' ? `text-green-400 border-b-2 border-green-500` : 'text-slate-500 hover:text-slate-300'}`}
        >
            <TrendingUp className="w-5 h-5" /> Goblin Investments
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'vault' ? (
            <motion.div 
                key="vault"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
            >
                {/* Current Vault Status */}
                <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl text-center relative overflow-hidden">
                    <div className="text-[100px] mb-4 animate-pulse drop-shadow-2xl">{currentVault.image}</div>
                    <h3 className="text-2xl font-magic text-white mb-2">{currentVault.name}</h3>
                    <p className="text-slate-400 mb-6">{currentVault.description}</p>
                    <div className="inline-block bg-slate-900 px-4 py-2 rounded text-sm text-slate-300 border border-slate-700">
                        Security Level: {currentVault.level}
                    </div>
                </div>

                {/* Upgrade Panel */}
                <div className="bg-[#1e293b] border border-slate-700 p-8 rounded-xl flex flex-col justify-center">
                    <h3 className="text-xl font-serif font-bold text-slate-200 mb-6 border-b border-slate-700 pb-4">Vault Upgrades</h3>
                    
                    {nextVault ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">{nextVault.image}</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">{nextVault.name}</h4>
                                    <p className="text-sm text-slate-400">{nextVault.description}</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Upgrade Cost</span>
                                <span className="text-yellow-400 font-bold text-xl">{nextVault.cost.toLocaleString()} G</span>
                            </div>

                            <button
                                onClick={onUpgradeVault}
                                disabled={character.gold < nextVault.cost}
                                className={`w-full py-4 rounded-lg font-magic text-lg transition-all ${
                                    character.gold >= nextVault.cost 
                                    ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg hover:shadow-yellow-500/20' 
                                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                }`}
                            >
                                {character.gold >= nextVault.cost ? 'Purchase Upgrade' : 'Insufficient Funds'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-10">
                            <Lock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Maximum security level achieved.</p>
                            <p className="text-sm">Even Voldemort couldn't break in here.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        ) : (
            <motion.div 
                key="invest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10"
            >
                {/* Market List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-2 px-2">
                        <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider">Market Listings</h3>
                        <span className="text-xs text-slate-500 italic">Prices update constantly</span>
                    </div>
                    {STOCK_MARKET_LIST.map(stock => {
                        const currentPrice = character.marketPrices[stock.id] || stock.basePrice;
                        const previousPrice = stock.basePrice; // Simplified trend logic (base vs current)
                        const isUp = currentPrice >= previousPrice;
                        const holdings = character.portfolio[stock.id]?.shares || 0;

                        return (
                            <div 
                                key={stock.id}
                                onClick={() => setSelectedStock(stock)}
                                className={`bg-slate-800/50 p-4 rounded-xl border transition-all cursor-pointer hover:bg-slate-800 flex justify-between items-center ${selectedStock?.id === stock.id ? 'border-yellow-500/50 bg-slate-800' : 'border-slate-700'}`}
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white text-lg">{stock.ticker}</span>
                                        {holdings > 0 && <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">{holdings} Shares</span>}
                                    </div>
                                    <p className="text-slate-400 text-sm">{stock.name}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xl font-mono font-bold flex items-center gap-2 justify-end ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                                        {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                        {Math.floor(currentPrice)} G
                                    </div>
                                    <p className="text-xs text-slate-500">Vol: {stock.volatility * 100}%</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Trading Panel */}
                <div className="lg:col-span-1 bg-[#1e293b] border border-slate-700 rounded-xl p-6 sticky top-6 h-fit">
                    {selectedStock ? (
                        <>
                            <h3 className="text-xl font-serif font-bold text-white mb-1">{selectedStock.name}</h3>
                            <p className="text-slate-400 text-sm mb-6">{selectedStock.description}</p>
                            
                            <div className="bg-slate-900 rounded-lg p-4 mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Current Price</span>
                                    <span className="text-white font-bold">{Math.floor(character.marketPrices[selectedStock.id] || selectedStock.basePrice)} G</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Your Shares</span>
                                    <span className="text-white font-bold">{character.portfolio[selectedStock.id]?.shares || 0}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
                                    <span className="text-slate-400">Total Value</span>
                                    <span className="text-yellow-400 font-bold">
                                        {Math.floor((character.portfolio[selectedStock.id]?.shares || 0) * (character.marketPrices[selectedStock.id] || selectedStock.basePrice))} G
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase font-bold block mb-2">Amount</label>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={tradeAmount}
                                            onChange={(e) => setTradeAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white text-center font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleTrade('buy')}
                                        className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold transition-colors"
                                    >
                                        Buy
                                    </button>
                                    <button 
                                        onClick={() => handleTrade('sell')}
                                        disabled={(character.portfolio[selectedStock.id]?.shares || 0) < tradeAmount}
                                        className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Sell
                                    </button>
                                </div>
                                <p className="text-center text-xs text-slate-500 mt-2">5% Transaction Fee applies to buys.</p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-slate-500 py-20">
                            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Select a stock to view details and trade.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
