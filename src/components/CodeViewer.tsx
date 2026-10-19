import React, { useState } from 'react';
import { ODEV_SNIPPETS, PRATIK_SNIPPETS } from '../data/codeData';
import { ProgramMode, JavaCodeSnippet } from '../types';
import { Copy, Check, Download, FileCode, Info } from 'lucide-react';

interface CodeViewerProps {
  mode: ProgramMode;
  onSelectSnippet?: (snippet: JavaCodeSnippet) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ mode }) => {
  const snippets = mode === 'odev' ? ODEV_SNIPPETS : PRATIK_SNIPPETS;
  const [activeSnippetId, setActiveSnippetId] = useState(snippets[0].id);
  const [copied, setCopied] = useState(false);

  const currentSnippet = snippets.find((s) => s.id === activeSnippetId) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentSnippet.code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = currentSnippet.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header bar with tabs and actions */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/70">
        {/* Snippet Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          {snippets.map((snip) => (
            <button
              key={snip.id}
              type="button"
              onClick={() => setActiveSnippetId(snip.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeSnippetId === snip.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {snip.title}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>

      {/* Snippet Note */}
      <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-slate-300 font-semibold">{currentSnippet.fileName}</span>
          <span aria-hidden="true">·</span>
          <span>{currentSnippet.description}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Java 17+ Uyumlu</span>
      </div>

      {/* Code Area with line numbers */}
      <div className="p-4 bg-slate-950 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300">
        <pre className="grid grid-cols-[auto_1fr] gap-4">
          <code className="select-none text-slate-400 text-right pr-2 border-r border-slate-800">
            {currentSnippet.code.split('\n').map((_, i) => (
              <span key={i} className="block leading-5 text-[11px]">
                {i + 1}
              </span>
            ))}
          </code>
          <code className="text-slate-200">
            {currentSnippet.code.split('\n').map((line, i) => {
              // Quick keyword color styling
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');
              const isAuthor = line.includes('@author Enes Öztürk') || line.includes('Enes Öztürk');

              return (
                <span
                  key={i}
                  className={`block leading-5 ${
                    isAuthor
                      ? 'text-amber-400 font-bold bg-amber-500/10 -mx-1 px-1 rounded'
                      : isComment
                      ? 'text-slate-400 italic'
                      : line.includes('import') || line.includes('public class') || line.includes('public static void')
                      ? 'text-indigo-300'
                      : line.includes('do {') || line.includes('while') || line.includes('if') || line.includes('else')
                      ? 'text-amber-300'
                      : line.includes('Scanner') || line.includes('System.out')
                      ? 'text-cyan-300'
                      : 'text-slate-300'
                  }`}
                >
                  {line || ' '}
                </span>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Explanation Box */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-200">
              Kod İnceleme ve Derleme İpuçları (Enes Öztürk Notları):
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
              <li>
                <strong className="text-slate-300">Neden do-while?</strong> Kullanıcıdan en az bir sayı almadan önce döngü koşulu test edilemez. <code>do-while</code> bloğu önce gövdeyi çalıştırır, sonra koşulu kontrol eder.
              </li>
              <li>
                <strong className="text-slate-300">Mod Alma (%):</strong> <code>sayi % 4 == 0</code> ifadesi 4'e kalansız bölünebilmeyi test eder.
              </li>
              <li>
                <strong className="text-slate-300">Döngüden Çıkış:</strong> <code>while (sayi % 2 == 0)</code> koşulu, girilen sayı tek olduğunda (<code>sayi % 2 != 0</code>) <code>false</code> döndürür ve döngüyü sonlandırır.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
