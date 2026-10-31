import React from 'react';
import { KeyDefinition, Language } from '../types/practice';
import { TRANSLATIONS } from '../locales/translations';
import { AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface InstructionBannerProps {
  activeKey: KeyDefinition;
  activeSetId: number;
  currentLang: Language;
  shiftState: {
    leftActive: boolean;
    rightActive: boolean;
  };
}

export const InstructionBanner: React.FC<InstructionBannerProps> = ({
  activeKey,
  activeSetId,
  currentLang,
  shiftState,
}) => {
  const t = TRANSLATIONS[currentLang];

  const isYuKey = activeKey.char === 'ㅠ' || activeKey.code === 'KeyB';
  const requiresShift = !!activeKey.requiresShift;
  const isLeftHandShift = requiresShift && activeKey.requiredShiftSide === 'right'; // Left key requires Right Shift
  const isRightHandShift = requiresShift && activeKey.requiredShiftSide === 'left'; // Right key requires Left Shift

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl px-3.5 py-2 shadow-xs border border-indigo-900/60 shrink-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2 overflow-hidden">
        {/* Left: Target Key Pill & Hand */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shrink-0 shadow">
            {activeKey.char}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-amber-300">
                {t.target_key}: "{activeKey.char}"
              </span>
              <span className="text-[10px] text-slate-300 bg-white/10 px-1.5 py-0.2 rounded">
                {activeKey.label}
              </span>
              <span className="text-[10px] text-indigo-300 font-semibold">
                {activeKey.hand === 'left' ? '왼손' : '오른손'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: 2/4 Rhythm Guide (쿵 & 짝) */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 h-7 rounded-lg border border-slate-700/80 text-[11px] whitespace-nowrap shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-bold text-amber-300">【쿵】</span>
          <span className="text-slate-200">{t.rhythm_kung.replace(/^[^:]*:\s*/, '')}</span>
          <span className="text-slate-500 font-bold mx-1">➔</span>
          <span className="font-bold text-emerald-300">【짝】</span>
          <span className="text-slate-200">{t.rhythm_jjak.replace(/^[^:]*:\s*/, '')}</span>
        </div>

        {/* Right: Shift or ㅠ Context Notification */}
        {requiresShift ? (
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            {/* Live Shift Detection Monitor Badge */}
            <div className="flex items-center gap-1 bg-slate-800 px-2.5 h-7 rounded-lg border border-slate-700 text-[10px] shrink-0">
              <span className="text-slate-400">Shift 감지:</span>
              <span
                className={`font-bold px-1.5 py-0.2 rounded ${
                  shiftState.rightActive
                    ? 'bg-emerald-500 text-white'
                    : shiftState.leftActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {shiftState.rightActive
                  ? '오른쪽 Shift'
                  : shiftState.leftActive
                  ? '왼쪽 Shift'
                  : '대기'}
              </span>
            </div>
          </div>
        ) : isYuKey ? (
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-200 border border-amber-500/40 px-2 h-7 rounded text-[10px] font-medium whitespace-nowrap shrink-0">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t.yu_exception_desc}</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 whitespace-nowrap shrink truncate hidden xl:block max-w-[320px]">
            {t.auto_newline_note}
          </div>
        )}
      </div>

      {/* Detail rule prompt if Shift */}
      {requiresShift && (
        <div className="mt-1 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-indigo-200">
          <span>{isLeftHandShift ? t.shift_rule_left : t.shift_rule_right}</span>
          <span className="text-rose-300 font-semibold">{t.wrong_note}</span>
        </div>
      )}
    </div>
  );
};
