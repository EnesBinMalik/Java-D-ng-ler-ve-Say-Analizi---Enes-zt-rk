import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthorSignatureCard } from './components/AuthorSignatureCard';
import { Simulator } from './components/Simulator';
import { Flowchart } from './components/Flowchart';
import { CodeViewer } from './components/CodeViewer';
import { EducationalNotes } from './components/EducationalNotes';
import { LogicTester } from './components/LogicTester';
import { ProgramMode } from './types';
import { Terminal, Code, GitFork, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'odev' | 'pratik' | 'flowchart' | 'code'>('odev');
  const [mode, setMode] = useState<ProgramMode>('odev');

  const handleTabChange = (tab: 'odev' | 'pratik' | 'flowchart' | 'code') => {
    setActiveTab(tab);
    if (tab === 'odev') setMode('odev');
    if (tab === 'pratik') setMode('pratik');
  };

  const handleRunDefault = () => {
    setActiveTab('odev');
    setMode('odev');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar following 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onRunDefault={handleRunDefault}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Author & Homework Signature Banner */}
        <AuthorSignatureCard />

        {/* Primary Interactive Segmented Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('odev');
                setMode('odev');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'odev'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Ödev: Çift &amp; 4'ün Katları Toplamı</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('pratik');
                setMode('pratik');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'pratik'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Pratik: Tek Sayı Toplamı</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('flowchart')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'flowchart'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Akış Şeması</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'code'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Java Kodu &amp; İndir</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Seçili Mod:</span>
            <strong className="text-amber-400 font-mono">
              {activeTab === 'odev'
                ? "Ödev (Tek sayıda dur, 4'ün katlarını topla)"
                : activeTab === 'pratik'
                ? "Pratik (Negatifte dur, tek sayıları topla)"
                : activeTab === 'flowchart'
                ? "Döngü Algoritma Şeması"
                : "Java Kaynak Kodları"}
            </strong>
          </div>
        </div>

        {/* View Switcher */}
        {activeTab === 'odev' && (
          <div className="space-y-8">
            <Simulator mode="odev" />
            <LogicTester />
            <EducationalNotes />
          </div>
        )}

        {activeTab === 'pratik' && (
          <div className="space-y-8">
            <Simulator mode="pratik" />
            <LogicTester />
            <EducationalNotes />
          </div>
        )}

        {activeTab === 'flowchart' && (
          <div className="space-y-8">
            <Flowchart mode={mode} currentInput={null} isTerminated={false} />
            <EducationalNotes />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-8">
            <CodeViewer mode={mode} />
            <EducationalNotes />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Java 101 Döngüler Dersi · Ödev ve Pratik Çözümleri
          </p>
          <p className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Hazırlayan &amp; İmza: </span>
            <span className="text-amber-400 font-bold">Enes Öztürk</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
