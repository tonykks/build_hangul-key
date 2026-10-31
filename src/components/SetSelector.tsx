import React from 'react';
import { PracticeSet, KeyDefinition, Language, SessionData } from '../types/practice';
import { TRANSLATIONS } from '../locales/translations';

interface SetSelectorProps {
  sets: PracticeSet[];
  activeSetId: number;
  activeKey: KeyDefinition;
  onSelectSet: (setId: number) => void;
  onSelectKey: (key: KeyDefinition) => void;
  currentLang: Language;
  session: SessionData;
}

export const SetSelector: React.FC<SetSelectorProps> = ({
  sets,
  activeSetId,
  activeKey,
  onSelectSet,
  onSelectKey,
  currentLang,
  session,
}) => {
  const t = TRANSLATIONS[currentLang];
  const activeSet = sets.find((s) => s.id === activeSetId) || sets[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs px-3 py-1.5 space-y-1 shrink-0 overflow-hidden">
      {/* 10 Sets Row without any scrollbar */}
      <div className="flex items-center gap-1 overflow-hidden">
        <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1 hidden sm:inline">
          {t.select_set}:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {sets.map((set) => {
            const isSelected = set.id === activeSetId;
            return (
              <button
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`flex items-center gap-1 h-7 px-2 rounded-lg text-xs whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-extrabold shadow-sm ring-1 ring-indigo-400'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold'
                }`}
              >
                <span>{set.id}세트</span>
                <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {set.hand === 'left' ? '왼손' : set.hand === 'right' ? '오른손' : '가운데'}
                  {set.requiresShift ? '+S' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keys in Current Set Row without any scrollbar or scaling expansion */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-1">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1 hidden sm:inline">
            {t.select_key}:
          </span>
          {activeSet.keys.map((k) => {
            const isSelected = k.id === activeKey.id;
            const record = session.records[k.id];
            const typedCount = record ? record.items.length : 0;
            const wrongCount = record ? record.items.filter((i) => !i.isCorrect).length : 0;

            return (
              <button
                key={k.id}
                onClick={() => onSelectKey(k)}
                className={`relative flex items-center gap-1.5 h-7.5 px-3 rounded-lg text-xs whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-white font-extrabold shadow-sm ring-2 ring-amber-300'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs font-bold'
                }`}
              >
                <span className="text-sm font-black leading-none">{k.char}</span>
                <span className={`text-[11px] ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                  {k.label}
                </span>

                {typedCount > 0 && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded-full font-bold leading-none ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : wrongCount > 0
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}
                  >
                    {typedCount}
                    {wrongCount > 0 ? `(-${wrongCount})` : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Set Name Label */}
        <span className="text-[11px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 shrink-0 hidden md:inline truncate max-w-[220px]">
          {t[activeSet.nameKey as keyof typeof t] || activeSet.name}
        </span>
      </div>
    </div>
  );
};
