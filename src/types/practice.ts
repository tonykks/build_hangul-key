export type Language = 'ko' | 'my' | 'vi';

export interface KeyDefinition {
  id: string; // e.g. 'F_ㄹ', 'Semicolon_;'
  char: string; // Display Korean char or punctuation e.g. 'ㄹ', ';'
  label: string; // Key label e.g. 'ㄹ(F)'
  code: string; // KeyboardEvent.code e.g. 'KeyF', 'Semicolon'
  hand: 'left' | 'right';
  requiresShift?: boolean;
  requiredShiftSide?: 'left' | 'right'; // opposite shift: 'left' requires 'right', 'right' requires 'left'
  isException?: boolean; // e.g. ㅠ (B) is left index finger
  englishChar?: string;
  shiftChar?: string;
}

export interface PracticeSet {
  id: number;
  name: string;
  nameKey: string;
  descriptionKey: string;
  hand: 'left' | 'right' | 'both';
  requiresShift?: boolean;
  requiredShiftSide?: 'left' | 'right';
  keys: KeyDefinition[];
}

export interface InputItem {
  id: string;
  char: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface KeyRecord {
  setId: number;
  keyId: string;
  keyChar: string;
  keyLabel: string;
  items: InputItem[];
}

export interface SessionData {
  startTime: string | null; // ISO string or formatted
  records: Record<string, KeyRecord>; // keyId -> KeyRecord
}

export interface MusicTrack {
  id: string;
  title: string;
  src: string;
}
