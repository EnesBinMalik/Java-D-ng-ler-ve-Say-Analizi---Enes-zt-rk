export type ProgramMode = 'odev' | 'pratik';

export interface StepRecord {
  id: number;
  stepNumber: number;
  inputNumber: number;
  isEven?: boolean;
  isMultipleOfFour?: boolean;
  isOdd?: boolean;
  isNegative?: boolean;
  actionTaken: 'added' | 'skipped' | 'terminated';
  actionNote: string;
  previousSum: number;
  newSum: number;
  loopContinues: boolean;
}

export interface PresetScenario {
  id: string;
  title: string;
  description: string;
  inputs: number[];
  tag: string;
}

export interface JavaCodeSnippet {
  id: string;
  title: string;
  loopType: 'do-while' | 'while' | 'break';
  description: string;
  code: string;
  fileName: string;
}
