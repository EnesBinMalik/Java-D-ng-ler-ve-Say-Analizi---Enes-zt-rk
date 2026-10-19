import React, { useState, useEffect } from 'react';
import { ProgramMode, StepRecord, PresetScenario } from '../types';
import { ODEV_PRESETS, PRATIK_PRESETS } from '../data/codeData';
import { TerminalView } from './TerminalView';
import { MemoryCard } from './MemoryCard';
import { TraceTable } from './TraceTable';
import { Play, RotateCcw, FastForward, PlayCircle } from 'lucide-react';

interface SimulatorProps {
  mode: ProgramMode;
}

export const Simulator: React.FC<SimulatorProps> = ({ mode }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [steps, setSteps] = useState<StepRecord[]>([]);
  const [currentInput, setCurrentInput] = useState<number | null>(null);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [isTerminated, setIsTerminated] = useState<boolean>(false);

  // Initialize terminal banner whenever mode changes
  const initTerminal = (targetMode: ProgramMode) => {
    setSteps([]);
    setCurrentInput(null);
    setTotalSum(0);
    setIsTerminated(false);
    setInputValue('');

    if (targetMode === 'odev') {
      setLogs([
        '==================================================',
        '       JAVA DÖNGÜLER ÖDEVİ - ENES ÖZTÜRK          ',
        '  (Tek sayı girilene kadar çift ve 4\'ün katı toplamı) ',
        '==================================================',
        'Program başlatıldı. do-while döngüsüne girildi.',
      ]);
    } else {
      setLogs([
        '==================================================',
        '       TEK SAYILARI TOPLAMA PROGRAMI              ',
        '      (Negatif sayı girilene kadar devam eder)    ',
        '==================================================',
        'Program başlatıldı. do-while döngüsüne girildi.',
      ]);
    }
  };

  useEffect(() => {
    initTerminal(mode);
  }, [mode]);

  // Process a single number input following Java logic
  const processNumber = (num: number, currentSum: number, currentSteps: StepRecord[]) => {
    if (isTerminated) return;

    const stepNumber = currentSteps.length + 1;
    let newSum = currentSum;
    let actionTaken: 'added' | 'skipped' | 'terminated' = 'skipped';
    let actionNote = '';
    let loopContinues = true;
    const newLogs: string[] = [`> Bir sayı giriniz: ${num}`];

    if (mode === 'odev') {
      const isEven = num % 2 === 0;
      const isMultipleOfFour = num % 4 === 0;

      if (!isEven) {
        // Termination condition: Tek sayı girildi!
        actionTaken = 'terminated';
        loopContinues = false;
        actionNote = `Tek sayı (${num}) girildi, döngü sonlandırıldı.`;
        newLogs.push(`Tek sayı (${num}) girildi! Döngü sonlandırıldı.`);
        newLogs.push('--------------------------------------------------');
        newLogs.push(`Girilen çift ve 4'ün katı olan sayıların toplamı: ${currentSum}`);
        newLogs.push('İmza: Enes Öztürk');
        newLogs.push('--------------------------------------------------');
      } else {
        // Sayı çift
        if (isMultipleOfFour) {
          newSum = currentSum + num;
          actionTaken = 'added';
          actionNote = `${num} sayısı 4'ün katıdır, toplama eklendi!`;
          newLogs.push(`-> ${num} sayısı 4'ün katıdır, toplama eklendi! (Güncel Toplam: ${newSum})`);
        } else {
          actionTaken = 'skipped';
          actionNote = `${num} sayısı çifttir fakat 4'ün katı değildir, atlandı.`;
          newLogs.push(`-> ${num} sayısı çifttir fakat 4'ün katı DEĞİLDİR, toplama eklenmedi.`);
        }
      }

      const newStep: StepRecord = {
        id: Date.now() + Math.random(),
        stepNumber,
        inputNumber: num,
        isEven,
        isMultipleOfFour,
        actionTaken,
        actionNote,
        previousSum: currentSum,
        newSum,
        loopContinues,
      };

      setCurrentInput(num);
      setTotalSum(newSum);
      setSteps([...currentSteps, newStep]);
      setLogs((prev) => [...prev, ...newLogs]);

      if (!loopContinues) {
        setIsTerminated(true);
      }
    } else {
      // Pratik mode: Negatif bir değer girilene kadar tek sayıları topla
      const isNegative = num < 0;
      const isOdd = num % 2 !== 0;

      if (isNegative) {
        actionTaken = 'terminated';
        loopContinues = false;
        actionNote = `Negatif sayı (${num}) girildi, döngü sonlandırıldı.`;
        newLogs.push(`Negatif sayı (${num}) girildi! Döngü sonlandırıldı.`);
        newLogs.push('--------------------------------------------------');
        newLogs.push(`Girilen tek sayıların toplamı: ${currentSum}`);
        newLogs.push('İmza: Enes Öztürk');
        newLogs.push('--------------------------------------------------');
      } else {
        if (isOdd && num > 0) {
          newSum = currentSum + num;
          actionTaken = 'added';
          actionNote = `${num} tek sayıdır, toplama eklendi!`;
          newLogs.push(`-> ${num} tek sayıdır, toplama eklendi! (Güncel Toplam: ${newSum})`);
        } else {
          actionTaken = 'skipped';
          actionNote = `${num} çift sayıdır veya 0'dır, atlandı.`;
          newLogs.push(`-> ${num} çift sayıdır, atlandı.`);
        }
      }

      const newStep: StepRecord = {
        id: Date.now() + Math.random(),
        stepNumber,
        inputNumber: num,
        isNegative,
        isOdd,
        actionTaken,
        actionNote,
        previousSum: currentSum,
        newSum,
        loopContinues,
      };

      setCurrentInput(num);
      setTotalSum(newSum);
      setSteps([...currentSteps, newStep]);
      setLogs((prev) => [...prev, ...newLogs]);

      if (!loopContinues) {
        setIsTerminated(true);
      }
    }
  };

  const handleManualSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = parseInt(inputValue, 10);
    if (isNaN(parsed)) return;
    setInputValue('');
    processNumber(parsed, totalSum, steps);
  };

  const handleQuickNumber = (num: number) => {
    processNumber(num, totalSum, steps);
  };

  // Load a preset batch and simulate it cleanly
  const runPreset = (preset: PresetScenario) => {
    let currentSum = 0;
    const accumulatedSteps: StepRecord[] = [];
    const accumulatedLogs: string[] =
      mode === 'odev'
        ? [
            '==================================================',
            '       JAVA DÖNGÜLER ÖDEVİ - ENES ÖZTÜRK          ',
            `  [Hazır Senaryo Yüklendi: ${preset.title}]`,
            '==================================================',
          ]
        : [
            '==================================================',
            '       TEK SAYILARI TOPLAMA PROGRAMI              ',
            `  [Hazır Senaryo Yüklendi: ${preset.title}]`,
            '==================================================',
          ];

    let terminated = false;

    for (let i = 0; i < preset.inputs.length; i++) {
      const num = preset.inputs[i];
      const stepNumber = i + 1;
      accumulatedLogs.push(`> Bir sayı giriniz: ${num}`);

      if (mode === 'odev') {
        const isEven = num % 2 === 0;
        const isMultipleOfFour = num % 4 === 0;

        if (!isEven) {
          terminated = true;
          accumulatedSteps.push({
            id: Date.now() + i,
            stepNumber,
            inputNumber: num,
            isEven,
            isMultipleOfFour,
            actionTaken: 'terminated',
            actionNote: `Tek sayı (${num}) döngüyü bitirdi.`,
            previousSum: currentSum,
            newSum: currentSum,
            loopContinues: false,
          });
          accumulatedLogs.push(`Tek sayı (${num}) girildi! Döngü sonlandırıldı.`);
          accumulatedLogs.push('--------------------------------------------------');
          accumulatedLogs.push(`Girilen çift ve 4'ün katı olan sayıların toplamı: ${currentSum}`);
          accumulatedLogs.push('İmza: Enes Öztürk');
          accumulatedLogs.push('--------------------------------------------------');
          break;
        } else {
          let prev = currentSum;
          let added = false;
          if (isMultipleOfFour) {
            currentSum += num;
            added = true;
            accumulatedLogs.push(
              `-> ${num} sayısı 4'ün katıdır, toplama eklendi! (Güncel Toplam: ${currentSum})`
            );
          } else {
            accumulatedLogs.push(`-> ${num} sayısı çifttir fakat 4'ün katı DEĞİLDİR, toplama eklenmedi.`);
          }

          accumulatedSteps.push({
            id: Date.now() + i,
            stepNumber,
            inputNumber: num,
            isEven,
            isMultipleOfFour,
            actionTaken: added ? 'added' : 'skipped',
            actionNote: added ? `${num} eklendi` : `${num} atlandı`,
            previousSum: prev,
            newSum: currentSum,
            loopContinues: true,
          });
        }
      } else {
        // Pratik mode
        const isNegative = num < 0;
        const isOdd = num % 2 !== 0;

        if (isNegative) {
          terminated = true;
          accumulatedSteps.push({
            id: Date.now() + i,
            stepNumber,
            inputNumber: num,
            isNegative,
            isOdd,
            actionTaken: 'terminated',
            actionNote: `Negatif sayı (${num}) döngüyü bitirdi.`,
            previousSum: currentSum,
            newSum: currentSum,
            loopContinues: false,
          });
          accumulatedLogs.push(`Negatif sayı (${num}) girildi! Döngü sonlandırıldı.`);
          accumulatedLogs.push('--------------------------------------------------');
          accumulatedLogs.push(`Girilen tek sayıların toplamı: ${currentSum}`);
          accumulatedLogs.push('İmza: Enes Öztürk');
          accumulatedLogs.push('--------------------------------------------------');
          break;
        } else {
          let prev = currentSum;
          let added = false;
          if (isOdd && num > 0) {
            currentSum += num;
            added = true;
            accumulatedLogs.push(`-> ${num} tek sayıdır, toplama eklendi! (Güncel: ${currentSum})`);
          } else {
            accumulatedLogs.push(`-> ${num} çift sayıdır, atlandı.`);
          }

          accumulatedSteps.push({
            id: Date.now() + i,
            stepNumber,
            inputNumber: num,
            isNegative,
            isOdd,
            actionTaken: added ? 'added' : 'skipped',
            actionNote: added ? `${num} eklendi` : `${num} atlandı`,
            previousSum: prev,
            newSum: currentSum,
            loopContinues: true,
          });
        }
      }
    }

    setSteps(accumulatedSteps);
    setTotalSum(currentSum);
    setCurrentInput(preset.inputs[preset.inputs.length - 1]);
    setIsTerminated(terminated);
    setLogs(accumulatedLogs);
  };

  const presets = mode === 'odev' ? ODEV_PRESETS : PRATIK_PRESETS;

  return (
    <div className="space-y-6">
      {/* Preset Selector Strip */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Hazır Test Senaryoları:</span>
          </span>
          <span className="text-xs text-slate-400 block mt-0.5">
            Farklı girdi kombinasyonlarını tek tıkla konsolda çalıştırın
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => runPreset(preset)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{preset.title}</span>
              <span className="text-[10px] text-amber-400 font-mono">
                [{preset.inputs.join(', ')}]
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Memory Stack Indicators */}
      <MemoryCard
        mode={mode}
        currentInput={currentInput}
        totalSum={totalSum}
        stepCount={steps.length}
        isTerminated={isTerminated}
      />

      {/* Terminal View */}
      <TerminalView
        mode={mode}
        logs={logs}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleManualSubmit}
        isTerminated={isTerminated}
        onReset={() => initTerminal(mode)}
        onQuickNumber={handleQuickNumber}
      />

      {/* Execution Trace Table */}
      <TraceTable steps={steps} mode={mode} totalSum={totalSum} />
    </div>
  );
};
