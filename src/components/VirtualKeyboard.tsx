import React from 'react';
import { KeyDefinition } from '../types/practice';

interface VirtualKeyboardProps {
  activeKey: KeyDefinition;
  pressedCodes: Set<string>;
  onVirtualKeyPress?: (code: string) => void;
  shiftCompatMode?: boolean;
}

interface KeyConfig {
  code: string;
  ko: string;
  koShift?: string;
  en: string;
  width?: string;
  isHomeKey?: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeKey,
  pressedCodes,
  onVirtualKeyPress,
  shiftCompatMode,
}) => {
  const requiresShift = !!activeKey.requiresShift;
  const targetShiftSide = activeKey.requiredShiftSide; // 'left' or 'right'

  const row1: KeyConfig[] = [
    { code: 'Backquote', ko: '`', koShift: '~', en: '`' },
    { code: 'Digit1', ko: '1', koShift: '!', en: '1' },
    { code: 'Digit2', ko: '2', koShift: '@', en: '2' },
    { code: 'Digit3', ko: '3', koShift: '#', en: '3' },
    { code: 'Digit4', ko: '4', koShift: '$', en: '4' },
    { code: 'Digit5', ko: '5', koShift: '%', en: '5' },
    { code: 'Digit6', ko: '6', koShift: '^', en: '6' },
    { code: 'Digit7', ko: '7', koShift: '&', en: '7' },
    { code: 'Digit8', ko: '8', koShift: '*', en: '8' },
    { code: 'Digit9', ko: '9', koShift: '(', en: '9' },
    { code: 'Digit0', ko: '0', koShift: ')', en: '0' },
    { code: 'Minus', ko: '-', koShift: '_', en: '-' },
    { code: 'Equal', ko: '=', koShift: '+', en: '=' },
    { code: 'Backspace', ko: '←', en: 'Backspace', width: 'w-12 sm:w-16' },
  ];

  const row2: KeyConfig[] = [
    { code: 'Tab', ko: 'Tab', en: 'Tab', width: 'w-10 sm:w-12' },
    { code: 'KeyQ', ko: 'ㅂ', koShift: 'ㅃ', en: 'Q' },
    { code: 'KeyW', ko: 'ㅈ', koShift: 'ㅉ', en: 'W' },
    { code: 'KeyE', ko: 'ㄷ', koShift: 'ㄸ', en: 'E' },
    { code: 'KeyR', ko: 'ㄱ', koShift: 'ㄲ', en: 'R' },
    { code: 'KeyT', ko: 'ㅅ', koShift: 'ㅆ', en: 'T' },
    { code: 'KeyY', ko: 'ㅛ', koShift: 'ㅛ', en: 'Y' },
    { code: 'KeyU', ko: 'ㅕ', koShift: 'ㅕ', en: 'U' },
    { code: 'KeyI', ko: 'ㅑ', koShift: 'ㅑ', en: 'I' },
    { code: 'KeyO', ko: 'ㅐ', koShift: 'ㅒ', en: 'O' },
    { code: 'KeyP', ko: 'ㅔ', koShift: 'ㅖ', en: 'P' },
    { code: 'BracketLeft', ko: '[', koShift: '{', en: '[' },
    { code: 'BracketRight', ko: ']', koShift: '}', en: ']' },
    { code: 'Backslash', ko: '\\', koShift: '|', en: '\\', width: 'w-10 sm:w-12' },
  ];

  const row3: KeyConfig[] = [
    { code: 'CapsLock', ko: 'Caps', en: 'Caps', width: 'w-12 sm:w-14' },
    { code: 'KeyA', ko: 'ㅁ', en: 'A' },
    { code: 'KeyS', ko: 'ㄴ', en: 'S' },
    { code: 'KeyD', ko: 'ㅇ', en: 'D' },
    { code: 'KeyF', ko: 'ㄹ', en: 'F', isHomeKey: true },
    { code: 'KeyG', ko: 'ㅎ', en: 'G' },
    { code: 'KeyH', ko: 'ㅗ', en: 'H' },
    { code: 'KeyJ', ko: 'ㅓ', en: 'J', isHomeKey: true },
    { code: 'KeyK', ko: 'ㅏ', en: 'K' },
    { code: 'KeyL', ko: 'ㅣ', en: 'L' },
    { code: 'Semicolon', ko: ';', koShift: ':', en: ';' },
    { code: 'Quote', ko: '\'', koShift: '"', en: '\'' },
    { code: 'Enter', ko: 'Enter', en: 'Enter', width: 'w-14 sm:w-16' },
  ];

  const row4: KeyConfig[] = [
    { code: 'ShiftLeft', ko: 'Shift', en: 'Shift', width: 'w-14 sm:w-18' },
    { code: 'KeyZ', ko: 'ㅋ', en: 'Z' },
    { code: 'KeyX', ko: 'ㅌ', en: 'X' },
    { code: 'KeyC', ko: 'ㅊ', en: 'C' },
    { code: 'KeyV', ko: 'ㅍ', en: 'V' },
    { code: 'KeyB', ko: 'ㅠ', en: 'B' },
    { code: 'KeyN', ko: 'ㅜ', en: 'N' },
    { code: 'KeyM', ko: 'ㅡ', en: 'M' },
    { code: 'Comma', ko: ',', koShift: '<', en: ',' },
    { code: 'Period', ko: '.', koShift: '>', en: '.' },
    { code: 'Slash', ko: '/', koShift: '?', en: '/' },
    { code: 'ShiftRight', ko: 'Shift', en: 'Shift', width: 'w-16 sm:w-20' },
  ];

  const row5 = [
    { code: 'ControlLeft', label: 'Ctrl', width: 'w-10 sm:w-12' },
    { code: 'AltLeft', label: 'Alt', width: 'w-10 sm:w-12' },
    { code: 'Space', label: 'Space', width: 'flex-1' },
    { code: 'AltRight', label: '한/영', width: 'w-10 sm:w-12' },
    { code: 'ControlRight', label: 'Ctrl', width: 'w-10 sm:w-12' },
  ];

  const renderKey = (key: KeyConfig) => {
    // Check if pressed directly or via Shift aliasing
    let isPressed = pressedCodes.has(key.code);
    if (key.code === 'ShiftRight' && pressedCodes.has('Shift') && !pressedCodes.has('ShiftLeft')) {
      isPressed = true;
    }

    const isHome = !!key.isHomeKey;
    const isTargetKey = key.code === activeKey.code;

    // Check if this key is the opposite shift key required for target
    const isRequiredShiftKey =
      requiresShift &&
      ((targetShiftSide === 'left' && key.code === 'ShiftLeft') ||
        (targetShiftSide === 'right' && key.code === 'ShiftRight'));

    let bgStyle = 'bg-slate-100 text-slate-700 border-b-2 sm:border-b-3 border-slate-300';
    let labelColor = 'text-slate-900';

    if (isTargetKey) {
      bgStyle = 'bg-amber-400 text-slate-950 border-b-2 sm:border-b-3 border-amber-600 shadow-md ring-2 ring-amber-300';
      labelColor = 'text-slate-950 font-black';
    } else if (isHome) {
      bgStyle = 'bg-emerald-500 text-white border-b-2 sm:border-b-3 border-emerald-700 shadow-xs ring-2 ring-emerald-300';
      labelColor = 'text-white font-extrabold';
    } else if (isRequiredShiftKey) {
      bgStyle = isPressed
        ? 'bg-indigo-700 text-white border-b-0 translate-y-0.5 shadow-inner'
        : 'bg-indigo-600 text-white border-b-2 sm:border-b-3 border-indigo-800 ring-2 ring-indigo-400 animate-pulse';
      labelColor = 'text-white font-bold';
    }

    const pressTransform = isPressed
      ? 'translate-y-0.5 shadow-inner opacity-90'
      : '';

    const widthClass = key.width || 'w-8 sm:w-10 md:w-11';

    return (
      <div
        key={key.code}
        onClick={() => onVirtualKeyPress?.(key.code)}
        className={`relative h-8 sm:h-9 md:h-10 ${widthClass} rounded-md flex flex-col items-center justify-center p-0.5 select-none transition-all duration-75 text-center font-sans ${bgStyle} ${pressTransform} cursor-default`}
      >
        {/* Tactile bar for Home Keys F & J */}
        {isHome && (
          <div className="absolute bottom-0.5 w-2.5 sm:w-3.5 h-0.5 rounded-full bg-white/90 shadow-2xs" />
        )}

        {/* Opposite Shift reminder indicator */}
        {isRequiredShiftKey && !isPressed && (
          <span className="absolute -top-2 px-1 py-0.2 bg-indigo-700 text-[8px] text-white rounded font-bold uppercase shadow-2xs">
            누르기
          </span>
        )}

        {/* Target indicator tag */}
        {isTargetKey && (
          <span className="absolute -top-2 px-1 py-0.2 bg-amber-600 text-[8px] text-white rounded-full font-black uppercase shadow-2xs">
            목표
          </span>
        )}

        {/* Korean Character Display */}
        <div className="flex items-center gap-0.5 justify-center leading-none">
          {key.koShift && key.koShift !== key.ko && (
            <span className="text-[9px] text-slate-400 opacity-80">
              {key.koShift}
            </span>
          )}
          <span className={`text-xs sm:text-sm md:text-base font-bold ${labelColor}`}>
            {key.ko}
          </span>
        </div>

        {/* English key code symbol */}
        {key.en && key.en !== key.ko && (
          <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono leading-none">
            {key.en}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-md p-2 sm:p-2.5 text-white shrink-0">
      {/* Visual Guide Header above keyboard */}
      <div className="flex items-center justify-between gap-2 mb-1.5 px-1 text-[11px] text-slate-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-600 inline-block"></span>
            <span className="font-semibold text-emerald-300">F / J 기준 자리 (양손 검지 홈키)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-600 inline-block"></span>
            <span className="font-semibold text-amber-300">현재 목표 글쇠</span>
          </span>
        </div>

        {requiresShift && (
          <span className="text-indigo-300 font-bold bg-indigo-950 px-2 py-0.2 rounded border border-indigo-800 text-[10px]">
            {targetShiftSide === 'right' ? '오른쪽 Shift(ShiftRight) 사용' : '왼쪽 Shift(ShiftLeft) 사용'}
          </span>
        )}
      </div>

      {/* Keyboard Matrix */}
      <div className="space-y-1 overflow-x-auto pb-0.5">
        <div className="flex justify-center gap-1">{row1.map(renderKey)}</div>
        <div className="flex justify-center gap-1">{row2.map(renderKey)}</div>
        <div className="flex justify-center gap-1">{row3.map(renderKey)}</div>
        <div className="flex justify-center gap-1">{row4.map(renderKey)}</div>
        <div className="flex justify-center gap-1">
          {row5.map((k) => {
            const isPressed = pressedCodes.has(k.code);
            return (
              <div
                key={k.code}
                className={`h-7 sm:h-8 ${k.width} rounded-md flex items-center justify-center text-[10px] font-semibold select-none text-slate-400 bg-slate-800 border-b-2 border-slate-950 ${
                  isPressed ? 'translate-y-0.5 bg-slate-700 text-white' : ''
                }`}
              >
                {k.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
