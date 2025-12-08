

import React from 'react';
import { View } from '../types';
import { Sword, ShoppingBag, Backpack, User, BookOpen, FlaskConical, Bird, Landmark, Hammer } from 'lucide-react';
import { HOUSE_THEMES } from '../constants';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
  house: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, house }) => {
  const theme = HOUSE_THEMES[house] || HOUSE_THEMES.Gryffindor;

  const navItems = [
    { id: View.DASHBOARD, label: 'Common Room', icon: User },
    { id: View.INVENTORY, label: 'Trunk', icon: Backpack },
    { id: View.SHOP, label: 'Diagon Alley', icon: ShoppingBag },
    { id: View.WAND_WORKSHOP, label: 'Ollivanders', icon: Hammer },
    { id: View.DUEL, label: 'Dueling Club', icon: Sword },
    { id: View.POTIONS, label: 'Potions', icon: FlaskConical },
    { id: View.CREATURES, label: 'Menagerie', icon: Bird },
    { id: View.BANK, label: 'Gringotts', icon: Landmark },
    { id: View.QUIZ, label: 'Riddles', icon: BookOpen },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 w-full bg-[#1a1a2e] border-t ${theme.border} z-50 pb-safe md:static md:w-64 md:h-screen md:border-t-0 md:border-r md:flex-col md:justify-start md:pb-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] texture-parchment-dark`}>
      <div className="hidden md:flex items-center justify-center p-8">
         <h1 className={`text-3xl ${theme.secondary} font-magic text-center drop-shadow-glow`}>Starwarts<br/><span className="text-sm text-slate-400 font-serif tracking-widest uppercase mt-2 block border-t border-slate-700 pt-2">Duelist Academy</span></h1>
      </div>
      <div className="flex md:flex-col justify-around md:justify-start w-full h-full md:px-4 md:gap-2 overflow-x-auto md:overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col md:flex-row items-center md:px-4 md:py-4 rounded-lg transition-all duration-300 group relative overflow-hidden min-w-[60px] md:min-w-full
                ${isActive 
                  ? `${theme.primary} bg-white/5 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] border border-${theme.secondary.split('-')[1]}-500/20` 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <Icon className={`w-6 h-6 mb-1 md:mb-0 md:mr-3 transition-transform group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : ''}`} />
              <span className={`text-[10px] md:text-base font-magic tracking-widest uppercase ${isActive ? 'font-bold' : 'font-normal'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
