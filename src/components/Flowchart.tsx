import React from 'react';
import { ProgramMode } from '../types';
import { ArrowDown, HelpCircle, Check, X, Sparkles } from 'lucide-react';

interface FlowchartProps {
  mode: ProgramMode;
  currentInput: number | null;
  isTerminated: boolean;
}

export const Flowchart: React.FC<FlowchartProps> = ({ mode, currentInput, isTerminated }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Algoritma Akış Şeması (Flowchart)</span>
            <span className="text-xs text-amber-400 font-mono font-normal">
              {mode === 'odev' ? 'Ödev: Çift & 4ün Katı' : 'Pratik: Tek Sayı Toplamı'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Döngünün çalışma mantığını adım adım gösteren mantıksal şema
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>İmza: Enes Öztürk</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center max-w-xl mx-auto space-y-3 text-xs font-mono">
        {/* Step 1: Start */}
        <div className="w-64 py-2.5 px-4 rounded-full bg-slate-800 border border-slate-700 text-center text-slate-200 font-semibold shadow-sm">
          BAŞLA (int toplam = 0, sayi)
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Step 2: Scanner Input */}
        <div className="w-72 py-2.5 px-4 rounded-lg bg-blue-950/40 border border-blue-800/60 text-center text-blue-200 shadow-sm">
          <div className="font-sans font-semibold text-white">Girdi Alma (do bloğu)</div>
          <div className="text-[11px] text-blue-300 mt-0.5">sayi = scanner.nextInt();</div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Step 3: Condition Check for Adding to Sum */}
        <div className="w-80 p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-center shadow-md">
          <div className="text-amber-400 font-semibold flex items-center justify-center gap-1.5 font-sans">
            <HelpCircle className="w-4 h-4" />
            <span>Filtre Şartı: Toplama Eklenecek mi?</span>
          </div>
          <div className="text-xs text-slate-200 mt-2 bg-slate-900/90 py-1.5 px-3 rounded border border-slate-800">
            {mode === 'odev' ? (
              <span>sayi % 4 == 0 (ve sayi % 2 == 0) ?</span>
            ) : (
              <span>sayi &gt; 0 &amp;&amp; sayi % 2 != 0 ?</span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-1 rounded">
              <Check className="w-3 h-3" />
              <span>EVET: toplam += sayi</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              <X className="w-3 h-3" />
              <span>HAYIR: Atla</span>
            </div>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Step 4: Loop Continuation Check (while condition) */}
        <div className="w-80 p-4 rounded-xl bg-slate-950 border border-indigo-500/40 text-center shadow-md">
          <div className="text-indigo-400 font-semibold flex items-center justify-center gap-1.5 font-sans">
            <HelpCircle className="w-4 h-4" />
            <span>Döngü Devam Koşulu (while)</span>
          </div>
          <div className="text-xs text-slate-200 mt-2 bg-slate-900/90 py-1.5 px-3 rounded border border-slate-800">
            {mode === 'odev' ? (
              <span>while (sayi % 2 == 0)</span>
            ) : (
              <span>while (sayi &gt;= 0)</span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 p-2 rounded text-center">
              <div className="font-bold">EVET (Koşul Sağlandı)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Döngü Başına Dön &uarr;</div>
            </div>
            <div className="text-rose-400 bg-rose-950/30 border border-rose-800/40 p-2 rounded text-center">
              <div className="font-bold">HAYIR (Tek/Negatif)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Döngüden Çık &darr;</div>
            </div>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Step 5: Output & Terminate */}
        <div className="w-72 py-3 px-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-center text-emerald-200 shadow-sm">
          <div className="font-sans font-semibold text-white">Ekrana Yazdır (System.out.println)</div>
          <div className="text-[11px] text-emerald-300 mt-0.5">
            {mode === 'odev'
              ? 'Toplam: " + toplam + " | Enes Öztürk'
              : 'Tek Sayılar Toplamı: " + toplam'}
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Step 6: End */}
        <div className="w-48 py-2 px-4 rounded-full bg-slate-800 border border-slate-700 text-center text-slate-400 font-semibold">
          BİTİR (scanner.close())
        </div>
      </div>

      {/* Logic Note Card */}
      <div className="mt-6 p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <h4 className="font-bold text-amber-400 mb-1 font-sans">
          Matematiksel Mantık Notu (Enes Öztürk):
        </h4>
        <p>
          4 sayısı çift bir sayıdır ($4 = 2 \times 2$). Bir sayı 4 ile tam bölünüyorsa (<code>sayi % 4 == 0</code>), o sayı mutlaka 2 ile de tam bölünür (çifttir). Dolayısıyla programda <code>sayi % 4 == 0</code> kontrolü, çiftlik şartını otomatik olarak içinde barındırır. Döngü ise tek sayı (<code>sayi % 2 != 0</code>) girilene kadar dönmeye devam eder.
        </p>
      </div>
    </div>
  );
};
