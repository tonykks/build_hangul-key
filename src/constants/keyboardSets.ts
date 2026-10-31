import { PracticeSet, MusicTrack } from '../types/practice';

export const PRACTICE_SETS: PracticeSet[] = [
  {
    id: 1,
    name: '1세트: 기본자리 왼손',
    nameKey: 'set1_name',
    descriptionKey: 'set1_desc',
    hand: 'left',
    keys: [
      { id: 'set1_f', char: 'ㄹ', label: 'ㄹ(F)', code: 'KeyF', hand: 'left', englishChar: 'f' },
      { id: 'set1_d', char: 'ㅇ', label: 'ㅇ(D)', code: 'KeyD', hand: 'left', englishChar: 'd' },
      { id: 'set1_s', char: 'ㄴ', label: 'ㄴ(S)', code: 'KeyS', hand: 'left', englishChar: 's' },
      { id: 'set1_a', char: 'ㅁ', label: 'ㅁ(A)', code: 'KeyA', hand: 'left', englishChar: 'a' },
    ],
  },
  {
    id: 2,
    name: '2세트: 기본자리 오른손',
    nameKey: 'set2_name',
    descriptionKey: 'set2_desc',
    hand: 'right',
    keys: [
      { id: 'set2_j', char: 'ㅓ', label: 'ㅓ(J)', code: 'KeyJ', hand: 'right', englishChar: 'j' },
      { id: 'set2_k', char: 'ㅏ', label: 'ㅏ(K)', code: 'KeyK', hand: 'right', englishChar: 'k' },
      { id: 'set2_l', char: 'ㅣ', label: 'ㅣ(L)', code: 'KeyL', hand: 'right', englishChar: 'l' },
      { id: 'set2_semi', char: ';', label: ';(Semicolon)', code: 'Semicolon', hand: 'right', englishChar: ';' },
    ],
  },
  {
    id: 3,
    name: '3세트: 윗자리 왼손',
    nameKey: 'set3_name',
    descriptionKey: 'set3_desc',
    hand: 'left',
    keys: [
      { id: 'set3_r', char: 'ㄱ', label: 'ㄱ(R)', code: 'KeyR', hand: 'left', englishChar: 'r' },
      { id: 'set3_e', char: 'ㄷ', label: 'ㄷ(E)', code: 'KeyE', hand: 'left', englishChar: 'e' },
      { id: 'set3_w', char: 'ㅈ', label: 'ㅈ(W)', code: 'KeyW', hand: 'left', englishChar: 'w' },
      { id: 'set3_q', char: 'ㅂ', label: 'ㅂ(Q)', code: 'KeyQ', hand: 'left', englishChar: 'q' },
    ],
  },
  {
    id: 4,
    name: '4세트: 윗자리 오른손',
    nameKey: 'set4_name',
    descriptionKey: 'set4_desc',
    hand: 'right',
    keys: [
      { id: 'set4_u', char: 'ㅕ', label: 'ㅕ(U)', code: 'KeyU', hand: 'right', englishChar: 'u' },
      { id: 'set4_i', char: 'ㅑ', label: 'ㅑ(I)', code: 'KeyI', hand: 'right', englishChar: 'i' },
      { id: 'set4_o', char: 'ㅐ', label: 'ㅐ(O)', code: 'KeyO', hand: 'right', englishChar: 'o' },
      { id: 'set4_p', char: 'ㅔ', label: 'ㅔ(P)', code: 'KeyP', hand: 'right', englishChar: 'p' },
    ],
  },
  {
    id: 5,
    name: '5세트: 아랫자리 왼손',
    nameKey: 'set5_name',
    descriptionKey: 'set5_desc',
    hand: 'left',
    keys: [
      { id: 'set5_v', char: 'ㅍ', label: 'ㅍ(V)', code: 'KeyV', hand: 'left', englishChar: 'v' },
      { id: 'set5_c', char: 'ㅊ', label: 'ㅊ(C)', code: 'KeyC', hand: 'left', englishChar: 'c' },
      { id: 'set5_x', char: 'ㅌ', label: 'ㅌ(X)', code: 'KeyX', hand: 'left', englishChar: 'x' },
      { id: 'set5_z', char: 'ㅋ', label: 'ㅋ(Z)', code: 'KeyZ', hand: 'left', englishChar: 'z' },
    ],
  },
  {
    id: 6,
    name: '6세트: 아랫자리 오른손',
    nameKey: 'set6_name',
    descriptionKey: 'set6_desc',
    hand: 'right',
    keys: [
      { id: 'set6_m', char: 'ㅡ', label: 'ㅡ(M)', code: 'KeyM', hand: 'right', englishChar: 'm' },
      { id: 'set6_comma', char: ',', label: ',(Comma)', code: 'Comma', hand: 'right', englishChar: ',' },
      { id: 'set6_period', char: '.', label: '.(Period)', code: 'Period', hand: 'right', englishChar: '.' },
      { id: 'set6_slash', char: '/', label: '/(Slash)', code: 'Slash', hand: 'right', englishChar: '/' },
    ],
  },
  {
    id: 7,
    name: '7세트: 가운데자리 왼쪽 열',
    nameKey: 'set7_name',
    descriptionKey: 'set7_desc',
    hand: 'left',
    keys: [
      { id: 'set7_g', char: 'ㅎ', label: 'ㅎ(G)', code: 'KeyG', hand: 'left', englishChar: 'g' },
      { id: 'set7_t', char: 'ㅅ', label: 'ㅅ(T)', code: 'KeyT', hand: 'left', englishChar: 't' },
      { id: 'set7_b', char: 'ㅠ', label: 'ㅠ(B)', code: 'KeyB', hand: 'left', isException: true, englishChar: 'b' },
    ],
  },
  {
    id: 8,
    name: '8세트: 가운데자리 오른쪽 열',
    nameKey: 'set8_name',
    descriptionKey: 'set8_desc',
    hand: 'right',
    keys: [
      { id: 'set8_h', char: 'ㅗ', label: 'ㅗ(H)', code: 'KeyH', hand: 'right', englishChar: 'h' },
      { id: 'set8_y', char: 'ㅛ', label: 'ㅛ(Y)', code: 'KeyY', hand: 'right', englishChar: 'y' },
      { id: 'set8_n', char: 'ㅜ', label: 'ㅜ(N)', code: 'KeyN', hand: 'right', englishChar: 'n' },
    ],
  },
  {
    id: 9,
    name: '9세트: Shift + 왼손 윗자리',
    nameKey: 'set9_name',
    descriptionKey: 'set9_desc',
    hand: 'left',
    requiresShift: true,
    requiredShiftSide: 'right',
    keys: [
      { id: 'set9_q', char: 'ㅃ', label: 'ㅃ(Q)', code: 'KeyQ', hand: 'left', requiresShift: true, requiredShiftSide: 'right', englishChar: 'q', shiftChar: 'ㅃ' },
      { id: 'set9_w', char: 'ㅉ', label: 'ㅉ(W)', code: 'KeyW', hand: 'left', requiresShift: true, requiredShiftSide: 'right', englishChar: 'w', shiftChar: 'ㅉ' },
      { id: 'set9_e', char: 'ㄸ', label: 'ㄸ(E)', code: 'KeyE', hand: 'left', requiresShift: true, requiredShiftSide: 'right', englishChar: 'e', shiftChar: 'ㄸ' },
      { id: 'set9_r', char: 'ㄲ', label: 'ㄲ(R)', code: 'KeyR', hand: 'left', requiresShift: true, requiredShiftSide: 'right', englishChar: 'r', shiftChar: 'ㄲ' },
      { id: 'set9_t', char: 'ㅆ', label: 'ㅆ(T)', code: 'KeyT', hand: 'left', requiresShift: true, requiredShiftSide: 'right', englishChar: 't', shiftChar: 'ㅆ' },
    ],
  },
  {
    id: 10,
    name: '10세트: Shift + 오른손 윗자리',
    nameKey: 'set10_name',
    descriptionKey: 'set10_desc',
    hand: 'right',
    requiresShift: true,
    requiredShiftSide: 'left',
    keys: [
      { id: 'set10_y', char: 'ㅛ', label: 'ㅛ(Y)', code: 'KeyY', hand: 'right', requiresShift: true, requiredShiftSide: 'left', englishChar: 'y', shiftChar: 'ㅛ' },
      { id: 'set10_u', char: 'ㅕ', label: 'ㅕ(U)', code: 'KeyU', hand: 'right', requiresShift: true, requiredShiftSide: 'left', englishChar: 'u', shiftChar: 'ㅕ' },
      { id: 'set10_i', char: 'ㅑ', label: 'ㅑ(I)', code: 'KeyI', hand: 'right', requiresShift: true, requiredShiftSide: 'left', englishChar: 'i', shiftChar: 'ㅑ' },
      { id: 'set10_o', char: 'ㅒ', label: 'ㅒ(O)', code: 'KeyO', hand: 'right', requiresShift: true, requiredShiftSide: 'left', englishChar: 'o', shiftChar: 'ㅒ' },
      { id: 'set10_p', char: 'ㅖ', label: 'ㅖ(P)', code: 'KeyP', hand: 'right', requiresShift: true, requiredShiftSide: 'left', englishChar: 'p', shiftChar: 'ㅖ' },
    ],
  },
];

// Physical Key Code to Korean Character Mapping (without Shift vs with Shift)
export interface KeyMapping {
  code: string;
  normalKo: string;
  shiftKo: string;
  normalEn: string;
  shiftEn: string;
  hand: 'left' | 'right';
  row: number; // 1 to 4
  col: number;
}

export const KEY_CODE_MAP: Record<string, KeyMapping> = {
  // Number row
  Backquote: { code: 'Backquote', normalKo: '`', shiftKo: '~', normalEn: '`', shiftEn: '~', hand: 'left', row: 1, col: 0 },
  Digit1: { code: 'Digit1', normalKo: '1', shiftKo: '!', normalEn: '1', shiftEn: '!', hand: 'left', row: 1, col: 1 },
  Digit2: { code: 'Digit2', normalKo: '2', shiftKo: '@', normalEn: '2', shiftEn: '@', hand: 'left', row: 1, col: 2 },
  Digit3: { code: 'Digit3', normalKo: '3', shiftKo: '#', normalEn: '3', shiftEn: '#', hand: 'left', row: 1, col: 3 },
  Digit4: { code: 'Digit4', normalKo: '4', shiftKo: '$', normalEn: '4', shiftEn: '$', hand: 'left', row: 1, col: 4 },
  Digit5: { code: 'Digit5', normalKo: '5', shiftKo: '%', normalEn: '5', shiftEn: '%', hand: 'left', row: 1, col: 5 },
  Digit6: { code: 'Digit6', normalKo: '6', shiftKo: '^', normalEn: '6', shiftEn: '^', hand: 'right', row: 1, col: 6 },
  Digit7: { code: 'Digit7', normalKo: '7', shiftKo: '&', normalEn: '7', shiftEn: '&', hand: 'right', row: 1, col: 7 },
  Digit8: { code: 'Digit8', normalKo: '8', shiftKo: '*', normalEn: '8', shiftEn: '*', hand: 'right', row: 1, col: 8 },
  Digit9: { code: 'Digit9', normalKo: '9', shiftKo: '(', normalEn: '9', shiftEn: '(', hand: 'right', row: 1, col: 9 },
  Digit0: { code: 'Digit0', normalKo: '0', shiftKo: ')', normalEn: '0', shiftEn: ')', hand: 'right', row: 1, col: 10 },
  Minus: { code: 'Minus', normalKo: '-', shiftKo: '_', normalEn: '-', shiftEn: '_', hand: 'right', row: 1, col: 11 },
  Equal: { code: 'Equal', normalKo: '=', shiftKo: '+', normalEn: '=', shiftEn: '+', hand: 'right', row: 1, col: 12 },

  // Top row (QWERTY)
  KeyQ: { code: 'KeyQ', normalKo: 'ㅂ', shiftKo: 'ㅃ', normalEn: 'q', shiftEn: 'Q', hand: 'left', row: 2, col: 1 },
  KeyW: { code: 'KeyW', normalKo: 'ㅈ', shiftKo: 'ㅉ', normalEn: 'w', shiftEn: 'W', hand: 'left', row: 2, col: 2 },
  KeyE: { code: 'KeyE', normalKo: 'ㄷ', shiftKo: 'ㄸ', normalEn: 'e', shiftEn: 'E', hand: 'left', row: 2, col: 3 },
  KeyR: { code: 'KeyR', normalKo: 'ㄱ', shiftKo: 'ㄲ', normalEn: 'r', shiftEn: 'R', hand: 'left', row: 2, col: 4 },
  KeyT: { code: 'KeyT', normalKo: 'ㅅ', shiftKo: 'ㅆ', normalEn: 't', shiftEn: 'T', hand: 'left', row: 2, col: 5 },
  KeyY: { code: 'KeyY', normalKo: 'ㅛ', shiftKo: 'ㅛ', normalEn: 'y', shiftEn: 'Y', hand: 'right', row: 2, col: 6 },
  KeyU: { code: 'KeyU', normalKo: 'ㅕ', shiftKo: 'ㅕ', normalEn: 'u', shiftEn: 'U', hand: 'right', row: 2, col: 7 },
  KeyI: { code: 'KeyI', normalKo: 'ㅑ', shiftKo: 'ㅑ', normalEn: 'i', shiftEn: 'I', hand: 'right', row: 2, col: 8 },
  KeyO: { code: 'KeyO', normalKo: 'ㅐ', shiftKo: 'ㅒ', normalEn: 'o', shiftEn: 'O', hand: 'right', row: 2, col: 9 },
  KeyP: { code: 'KeyP', normalKo: 'ㅔ', shiftKo: 'ㅖ', normalEn: 'p', shiftEn: 'P', hand: 'right', row: 2, col: 10 },
  BracketLeft: { code: 'BracketLeft', normalKo: '[', shiftKo: '{', normalEn: '[', shiftEn: '{', hand: 'right', row: 2, col: 11 },
  BracketRight: { code: 'BracketRight', normalKo: ']', shiftKo: '}', normalEn: ']', shiftEn: '}', hand: 'right', row: 2, col: 12 },
  Backslash: { code: 'Backslash', normalKo: '\\', shiftKo: '|', normalEn: '\\', shiftEn: '|', hand: 'right', row: 2, col: 13 },

  // Home row (ASDFGHJKL;)
  KeyA: { code: 'KeyA', normalKo: 'ㅁ', shiftKo: 'ㅁ', normalEn: 'a', shiftEn: 'A', hand: 'left', row: 3, col: 1 },
  KeyS: { code: 'KeyS', normalKo: 'ㄴ', shiftKo: 'ㄴ', normalEn: 's', shiftEn: 'S', hand: 'left', row: 3, col: 2 },
  KeyD: { code: 'KeyD', normalKo: 'ㅇ', shiftKo: 'ㅇ', normalEn: 'd', shiftEn: 'D', hand: 'left', row: 3, col: 3 },
  KeyF: { code: 'KeyF', normalKo: 'ㄹ', shiftKo: 'ㄹ', normalEn: 'f', shiftEn: 'F', hand: 'left', row: 3, col: 4 },
  KeyG: { code: 'KeyG', normalKo: 'ㅎ', shiftKo: 'ㅎ', normalEn: 'g', shiftEn: 'G', hand: 'left', row: 3, col: 5 },
  KeyH: { code: 'KeyH', normalKo: 'ㅗ', shiftKo: 'ㅗ', normalEn: 'h', shiftEn: 'H', hand: 'right', row: 3, col: 6 },
  KeyJ: { code: 'KeyJ', normalKo: 'ㅓ', shiftKo: 'ㅓ', normalEn: 'j', shiftEn: 'J', hand: 'right', row: 3, col: 7 },
  KeyK: { code: 'KeyK', normalKo: 'ㅏ', shiftKo: 'ㅏ', normalEn: 'k', shiftEn: 'K', hand: 'right', row: 3, col: 8 },
  KeyL: { code: 'KeyL', normalKo: 'ㅣ', shiftKo: 'ㅣ', normalEn: 'l', shiftEn: 'L', hand: 'right', row: 3, col: 9 },
  Semicolon: { code: 'Semicolon', normalKo: ';', shiftKo: ':', normalEn: ';', shiftEn: ':', hand: 'right', row: 3, col: 10 },
  Quote: { code: 'Quote', normalKo: '\'', shiftKo: '"', normalEn: '\'', shiftEn: '"', hand: 'right', row: 3, col: 11 },

  // Bottom row (ZXCVBNM,./)
  KeyZ: { code: 'KeyZ', normalKo: 'ㅋ', shiftKo: 'ㅋ', normalEn: 'z', shiftEn: 'Z', hand: 'left', row: 4, col: 1 },
  KeyX: { code: 'KeyX', normalKo: 'ㅌ', shiftKo: 'ㅌ', normalEn: 'x', shiftEn: 'X', hand: 'left', row: 4, col: 2 },
  KeyC: { code: 'KeyC', normalKo: 'ㅊ', shiftKo: 'ㅊ', normalEn: 'c', shiftEn: 'C', hand: 'left', row: 4, col: 3 },
  KeyV: { code: 'KeyV', normalKo: 'ㅍ', shiftKo: 'ㅍ', normalEn: 'v', shiftEn: 'V', hand: 'left', row: 4, col: 4 },
  KeyB: { code: 'KeyB', normalKo: 'ㅠ', shiftKo: 'ㅠ', normalEn: 'b', shiftEn: 'B', hand: 'left', row: 4, col: 5 }, // B (ㅠ) is left hand index
  KeyN: { code: 'KeyN', normalKo: 'ㅜ', shiftKo: 'ㅜ', normalEn: 'n', shiftEn: 'N', hand: 'right', row: 4, col: 6 },
  KeyM: { code: 'KeyM', normalKo: 'ㅡ', shiftKo: 'ㅡ', normalEn: 'm', shiftEn: 'M', hand: 'right', row: 4, col: 7 },
  Comma: { code: 'Comma', normalKo: ',', shiftKo: '<', normalEn: ',', shiftEn: '<', hand: 'right', row: 4, col: 8 },
  Period: { code: 'Period', normalKo: '.', shiftKo: '>', normalEn: '.', shiftEn: '>', hand: 'right', row: 4, col: 9 },
  Slash: { code: 'Slash', normalKo: '/', shiftKo: '?', normalEn: '/', shiftEn: '?', hand: 'right', row: 4, col: 10 },
};

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'track1', title: '리듬 1 (2/4 박자 경쾌한 리듬)', src: '/musics/track1.mp3' },
  { id: 'track2', title: '리듬 2 (2/4 박자 안정된 템포)', src: '/musics/track2.mp3' },
  { id: 'track3', title: '리듬 3 (2/4 박자 차분한 리듬)', src: '/musics/track3.mp3' },
  { id: 'track4', title: '리듬 4 (2/4 박자 활기찬 리듬)', src: '/musics/track4.mp3' },
];
