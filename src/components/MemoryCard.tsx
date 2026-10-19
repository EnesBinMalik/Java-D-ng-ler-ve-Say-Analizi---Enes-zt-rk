import React from 'react';
import { ProgramMode } from '../types';
import { Cpu, Variable, Layers, CheckCircle, AlertCircle } from 'lucide-react';

interface MemoryCardProps {
  mode: ProgramMode;
  currentInput: number | null;
  totalSum: number;
  stepCount: number;
  isTerminated: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  mode,
  currentInput,
  totalSum,
  stepCount,
  isTerminated,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Variable: sayi */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Variable className="w-3.5 h-3.5 text-cyan-400" />
            <span>Son Girilen Değer (sayi)</span>
          </span>
          <span className="font-mono text-[11px] text-slate-400">int sayi</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-white tabular-nums">
            {currentInput !== null ? currentInput : '—'}
          </span>
          {currentInput !== null && (
            <span className="text-xs font-mono text-slate-400">
              {mode === 'odev'
                ? currentInput % 2 === 0
                  ? currentInput % 4 === 0
                    ? '4 ün katı'
                    : 'Çift (4 ün katı değil)'
                  : 'Tek Sayı'
                : currentInput >= 0
                ? currentInput % 2 !== 0
                  ? 'Pozitif Tek'
                  : 'Pozitif Çift'
                : 'Negatif Değer'}
            </span>
          )}
        </div>
      </div>

      {/* Variable: toplam */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Kümülatif Toplam (toplam)</span>
          </span>
          <span className="font-mono text-[11px] text-slate-400">int toplam</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
            {totalSum}
          </span>
          <span className="text-xs text-slate-400">
            {stepCount} iterasyon yapıldı
          </span>
        </div>
      </div>

      {/* Loop status */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Döngü Durumu (Loop State)</span>
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            {mode === 'odev' ? 'while (sayi % 2 == 0)' : 'while (sayi >= 0)'}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          {isTerminated ? (
            <div className="flex items-center gap-1.5 text-rose-400 text-sm font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Döngüden Çıkıldı</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Döngü Aktif (Girdi Bekleniyor)</span>
            </div>
          )}
          <span className="text-xs text-slate-400">
            {isTerminated ? 'Program Tamamlandı' : 'Sıradaki giriş'}
          </span>
        </div>
      </div>
    </div>
  );
};
