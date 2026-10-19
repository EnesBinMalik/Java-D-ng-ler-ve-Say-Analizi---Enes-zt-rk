import React, { useState } from 'react';
import { Calculator, Check, X, ArrowRight } from 'lucide-react';

export const LogicTester: React.FC = () => {
  const [testInput, setTestInput] = useState<number>(14);

  const isEven = testInput % 2 === 0;
  const isMultipleOf4 = testInput % 4 === 0;
  const odevContinues = isEven;
  const odevAdded = isMultipleOf4;

  const pratikContinues = testInput >= 0;
  const pratikAdded = testInput > 0 && !isEven;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white">
            Anlık Sayı Analizörü &amp; Koşul Test Aracı
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Test Sayısı:</span>
          <input
            type="number"
            value={testInput}
            onChange={(e) => setTestInput(parseInt(e.target.value, 10) || 0)}
            className="w-20 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-amber-400 font-mono text-center font-bold text-xs outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Homework Analysis (Ödev) */}
        <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between font-semibold text-amber-400 mb-2">
            <span>Ödev Programı Analizi</span>
            <span className="text-[11px] font-mono text-slate-400">Enes Öztürk</span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex items-center justify-between">
              <span>Sayı Tek/Çift Durumu:</span>
              <span className="font-mono font-bold">
                {isEven ? 'Çift Sayı' : 'Tek Sayı'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>4 ile Bölümünden Kalan:</span>
              <span className="font-mono text-slate-400">
                {testInput} % 4 = {Math.abs(testInput % 4)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Döngü Devam Eder mi?</span>
              <span
                className={`flex items-center gap-1 font-bold ${
                  odevContinues ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {odevContinues ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Evet (Çift sayı)
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" /> HAYIR (Döngü Biter)
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Toplam Değişkenine Eklenir mi?</span>
              <span
                className={`flex items-center gap-1 font-bold ${
                  odevAdded ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {odevAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Evet (+{testInput})
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" /> Hayır (4ün katı değil)
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Practice Analysis (Pratik) */}
        <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between font-semibold text-cyan-400 mb-2">
            <span>Pratik Programı Analizi</span>
            <span className="text-[11px] font-mono text-slate-400">Tek Sayı Toplamı</span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex items-center justify-between">
              <span>İşaret Durumu:</span>
              <span className="font-mono font-bold">
                {testInput >= 0 ? 'Pozitif / Sıfır' : 'Negatif'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Tek Sayı mı? (sayi % 2 != 0):</span>
              <span className="font-mono text-slate-400">
                {!isEven ? 'Evet (Tek)' : 'Hayır (Çift)'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Döngü Devam Eder mi?</span>
              <span
                className={`flex items-center gap-1 font-bold ${
                  pratikContinues ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {pratikContinues ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Evet (Pozitif)
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" /> HAYIR (Negatif Değer)
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Toplam Değişkenine Eklenir mi?</span>
              <span
                className={`flex items-center gap-1 font-bold ${
                  pratikAdded ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {pratikAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Evet (+{testInput})
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" /> Hayır (Çift veya Negatif)
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset click buttons for quick test */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs text-slate-400">
        <span className="shrink-0 text-[11px]">Hızlı Örnek Seç:</span>
        {[4, 14, 28, 7, 0, -3, 32].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setTestInput(num)}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] font-mono cursor-pointer transition-colors"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
