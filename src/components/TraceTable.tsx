import React from 'react';
import { StepRecord, ProgramMode } from '../types';
import { Check, X, ArrowRight, CornerDownRight } from 'lucide-react';

interface TraceTableProps {
  steps: StepRecord[];
  mode: ProgramMode;
  totalSum: number;
}

export const TraceTable: React.FC<TraceTableProps> = ({ steps, mode, totalSum }) => {
  if (steps.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
        <p className="text-sm">Henüz bir sayı girilmedi. Konsoldan bir sayı girerek veya hazır senaryo seçerek adımları görüntüleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Döngü İzleme Tablosu (Execution Trace Table)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Her iterasyonun değişken değerleri, modül hesapları ve kümülatif toplamı
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Son Toplam: </span>
          <span className="text-base font-bold text-amber-400 font-mono tabular-nums">{totalSum}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400">
              <th className="py-2.5 px-4 font-semibold">Adım</th>
              <th className="py-2.5 px-4 font-semibold">Girilen (sayi)</th>
              {mode === 'odev' ? (
                <>
                  <th className="py-2.5 px-4 font-semibold">Çift mi? (sayi % 2 == 0)</th>
                  <th className="py-2.5 px-4 font-semibold">4ün Katı mı? (sayi % 4 == 0)</th>
                  <th className="py-2.5 px-4 font-semibold">Döngü Devam Koşulu</th>
                </>
              ) : (
                <>
                  <th className="py-2.5 px-4 font-semibold">Pozitif mi? (sayi &gt;= 0)</th>
                  <th className="py-2.5 px-4 font-semibold">Tek mi? (sayi % 2 != 0)</th>
                  <th className="py-2.5 px-4 font-semibold">Döngü Devam Koşulu</th>
                </>
              )}
              <th className="py-2.5 px-4 font-semibold">İşlem / Karar</th>
              <th className="py-2.5 px-4 font-semibold text-right">Kümülatif Toplam</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {steps.map((s) => {
              const isTerminated = s.actionTaken === 'terminated';
              const isAdded = s.actionTaken === 'added';

              return (
                <tr
                  key={s.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isTerminated
                      ? 'bg-rose-950/20 text-rose-300'
                      : isAdded
                      ? 'bg-emerald-950/20'
                      : 'text-slate-300'
                  }`}
                >
                  <td className="py-3 px-4 font-sans text-slate-400">#{s.stepNumber}</td>
                  <td className="py-3 px-4 font-bold text-white text-sm tabular-nums">
                    {s.inputNumber}
                  </td>

                  {mode === 'odev' ? (
                    <>
                      <td className="py-3 px-4">
                        {s.isEven ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <Check className="w-3.5 h-3.5" /> Evet (Çift)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                            <X className="w-3.5 h-3.5" /> Hayır (Tek)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {s.isMultipleOfFour ? (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                            <Check className="w-3.5 h-3.5" /> 4ün Katı
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <X className="w-3.5 h-3.5" /> Katı Değil
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        {s.loopContinues ? (
                          <span className="text-emerald-400 text-[11px]">Devam Ediyor</span>
                        ) : (
                          <span className="text-rose-400 text-[11px] font-bold">Tek Sayı: SONLANDI</span>
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4">
                        {!s.isNegative ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <Check className="w-3.5 h-3.5" /> Pozitif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                            <X className="w-3.5 h-3.5" /> Negatif
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {s.isOdd ? (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                            <Check className="w-3.5 h-3.5" /> Tek Sayı
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <X className="w-3.5 h-3.5" /> Çift Sayı
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        {s.loopContinues ? (
                          <span className="text-emerald-400 text-[11px]">Devam Ediyor</span>
                        ) : (
                          <span className="text-rose-400 text-[11px] font-bold">Negatif: SONLANDI</span>
                        )}
                      </td>
                    </>
                  )}

                  <td className="py-3 px-4 font-sans">
                    {isAdded ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CornerDownRight className="w-3 h-3 text-emerald-400" />
                        +{s.inputNumber} toplandı
                      </span>
                    ) : isTerminated ? (
                      <span className="text-rose-400 font-medium">Döngüden Çıkıldı</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Şart sağlanmadı (atlandı)</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right font-bold text-white tabular-nums">
                    <span className="text-slate-400 text-xs font-normal mr-2">
                      {s.previousSum} <ArrowRight className="inline w-3 h-3 mx-0.5 text-slate-500" />
                    </span>
                    <span className={isAdded ? 'text-amber-400' : 'text-slate-200'}>
                      {s.newSum}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
