import React from 'react';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'odev' | 'pratik' | 'flowchart' | 'code';
  onTabChange: (tab: 'odev' | 'pratik' | 'flowchart' | 'code') => void;
  onRunDefault: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onRunDefault }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
          Java Döngüler Lab
        </span>
      </div>

      {/* Zone 2: 4 single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          type="button"
          onClick={() => onTabChange('odev')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            activeTab === 'odev' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Ödev (4'ün Katları)
        </button>
        <button
          type="button"
          onClick={() => onTabChange('pratik')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            activeTab === 'pratik' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Pratik (Tek Sayılar)
        </button>
        <button
          type="button"
          onClick={() => onTabChange('flowchart')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            activeTab === 'flowchart' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Akış Diyagramı
        </button>
        <button
          type="button"
          onClick={() => onTabChange('code')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer ${
            activeTab === 'code' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Java Kodları & İndir
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onRunDefault}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
        >
          Örnek Çalıştır
        </button>
      </div>
    </header>
  );
};
