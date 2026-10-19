import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export const EducationalNotes: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <BookOpen className="w-4 h-4 text-amber-400" />
        <h3 className="text-base font-bold text-white tracking-tight">
          Java Döngüler ve Algoritma Eğitimi
        </h3>
        <span className="text-xs text-slate-400">· Enes Öztürk Rehberi</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: do-while vs while */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Döngü Seçimi</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Neden do-while Seçildi?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standart <code>while</code> döngüsü koşulu döngüye girmeden <em>önce</em> test eder. Fakat bu programda kullanıcının girdiği sayıyı bilmeden döngü koşulunu test edemeyiz. <code>do-while</code> bloğu en az 1 kez çalışmayı garanti ederek kullanıcıdan ilk girdiyi almayı en doğal yolla sağlar.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-300">
            <code>do &#123; ... &#125; while (sayi % 2 == 0);</code>
          </div>
        </div>

        {/* Card 2: 4'ün Katı ve Çiftlik */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Matematiksel Kural</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Çift ve 4'ün Katları Kuralı
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bir tam sayı 4'ün katı ise ($n = 4k = 2 \times 2k$), o sayı tanım gereği zaten 2'nin de katıdır yani çifttir. Bu nedenle:
              <br />
              <code className="text-amber-300">sayi % 4 == 0</code> kontrolü, çiftlik şartını da otomatik olarak karşılar. 14 sayısı çifttir ama 4'ün katı olmadığı için elenir.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-300">
            <code>4, 8, 12, 16, 20... (Kabul)</code>
          </div>
        </div>

        {/* Card 3: Common Pitfall */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Sık Yapılan Hata</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Döngüyü Bitiren Tek Sayı
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Döngüyü sonlandıran tek sayı (örneğin kullanıcı 7 girdiğinde), toplam değişkenine <strong>eklenmemelidir</strong>. do-while gövdesinde önce toplama yapılıp sonra şart kontrol edilirse hata oluşur. Çözüm: Toplama şartına <code>sayi % 4 == 0</code> koymaktır.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-300">
            <code>7 % 4 == 3 &rarr; Toplama eklenmez!</code>
          </div>
        </div>
      </div>
    </div>
  );
};
