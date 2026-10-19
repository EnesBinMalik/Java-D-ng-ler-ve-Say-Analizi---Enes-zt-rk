import React, { useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Play, RotateCcw, Sparkles } from 'lucide-react';
import { ProgramMode } from '../types';

interface TerminalViewProps {
  mode: ProgramMode;
  logs: string[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isTerminated: boolean;
  onReset: () => void;
  onQuickNumber: (num: number) => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  mode,
  logs,
  inputValue,
  onInputChange,
  onSubmit,
  isTerminated,
  onReset,
  onQuickNumber,
}) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTerminated) return;
    onSubmit(e);
  };

  const quickNumbers = mode === 'odev' ? [4, 8, 12, 14, 16, 2, 7, 9] : [3, 7, 10, 15, 20, -1, -5];

  return (
    <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-slate-400 font-sans text-xs ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Java Console (System.out / Scanner)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded text-[11px] transition-colors cursor-pointer"
            title="Konsolu temizle ve sıfırla"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 text-xs leading-relaxed max-h-80 min-h-64 overflow-y-auto space-y-1 bg-slate-950/90 text-slate-300">
        {logs.map((log, idx) => {
          const isBanner = log.startsWith('===') || log.startsWith('---');
          const isSuccess = log.includes('eklendi');
          const isSkip = log.includes('DEĞİLDİR') || log.includes('atlandı');
          const isEnd = log.includes('sonlandı') || log.includes('bitti') || log.includes('İmza');
          const isInputEcho = log.startsWith('> ');

          let textClass = 'text-slate-300';
          if (isBanner) textClass = 'text-amber-400/90 font-semibold';
          else if (isSuccess) textClass = 'text-emerald-400 font-medium';
          else if (isSkip) textClass = 'text-slate-400 italic';
          else if (isEnd) textClass = 'text-amber-300 font-bold';
          else if (isInputEcho) textClass = 'text-cyan-400';

          return (
            <div key={idx} className={`${textClass} whitespace-pre-wrap break-words`}>
              {log}
            </div>
          );
        })}

        {/* Live Input Prompt if loop active */}
        {!isTerminated ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1 text-amber-400">
            <span className="text-slate-400">Lütfen bir sayı giriniz:</span>
            <input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Sayı yazıp Enter'a bas"
              className="bg-transparent border-b border-amber-400/50 focus:border-amber-400 outline-none text-white text-xs w-36 px-1 py-0.5"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded text-[11px] flex items-center gap-1 border border-amber-500/30 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <CornerDownLeft className="w-3 h-3" />
              <span>Gönder</span>
            </button>
          </form>
        ) : (
          <div className="pt-2 text-rose-400 flex items-center justify-between border-t border-slate-900 mt-2">
            <span>[Döngü Koşulu Sağlanmadı - Program Sonlandı]</span>
            <button
              type="button"
              onClick={onReset}
              className="text-amber-400 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Play className="w-3 h-3" />
              Yeni Giriş Başlat
            </button>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Input Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px]">Hızlı Sayı Girişi:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {quickNumbers.map((num) => (
            <button
              key={num}
              type="button"
              disabled={isTerminated}
              onClick={() => onQuickNumber(num)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 text-slate-200 hover:text-white rounded text-xs transition-colors cursor-pointer border border-slate-700/60"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
