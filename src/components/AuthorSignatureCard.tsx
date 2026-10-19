import React from 'react';
import { Award, Code2, CheckCircle2, Copy, Check } from 'lucide-react';

export const AuthorSignatureCard: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const signatureText = `/**
 * Java 101 Döngüler Ödevi
 * @author Enes Öztürk
 * @date 2026
 * Açıklama: Tek bir sayı girilene kadar 4'ün katlarını toplayan program.
 */`;

  const handleCopy = () => {
    navigator.clipboard.writeText(signatureText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Enes Öztürk
              </h2>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Doğrulanmış Ödev Çözümü
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>Java 101 Ödevi</span>
              <span aria-hidden="true">·</span>
              <span>Döngüler (Loops)</span>
              <span aria-hidden="true">·</span>
              <span>do-while & while Mimarisi</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="İmza Javadoc bloğunu kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>İmza Bloğunu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <p className="leading-relaxed">
          <span className="text-amber-400/90 font-medium">Ödev Kuralı:</span> Kullanıcıdan tek bir sayı girilene kadar sayı alınır. Girilen değerlerden <strong className="text-slate-200">çift ve 4'ün katı</strong> olanlar toplanır.
        </p>
        <div className="flex items-center gap-2 text-slate-400 shrink-0 font-mono text-[11px]">
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          <span>sayi % 4 == 0 &amp;&amp; sayi % 2 == 0</span>
        </div>
      </div>
    </div>
  );
};
