import React from 'react';
import { View } from '../types';
import { Sword, ShoppingBag, Backpack, User } from 'lucide-react';
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
    { id: View.DUEL, label: 'Dueling Club', icon: Sword },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 w-full bg-[#1a1a2e]/95 backdrop-blur-md border-t ${theme.border} z-50 pb-safe md:static md:w-64 md:h-screen md:border-t-0 md:border-r md:flex-col md:justify-start md:pb-0`}>
      <div className="hidden md:flex items-center justify-center p-8">
         <h1 className={`text-2xl ${theme.secondary} font-magic text-center drop-shadow-glow`}>Starwarts<br/><span className="text-sm text-slate-400">Duelist Academy</span></h1>
      </div>
      <div className="flex md:flex-col justify-around md:justify-start w-full h-full md:px-4 md:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col md:flex-row items-center md:px-4 md:py-3 rounded-lg transition-all duration-300 group
                ${isActive 
                  ? `${theme.primary} ${theme.accentBg} shadow-[0_0_15px_rgba(0,0,0,0.2)]` 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
              `}
            >
              <Icon className={`w-6 h-6 mb-1 md:mb-0 md:mr-3 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs md:text-base font-magic tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};