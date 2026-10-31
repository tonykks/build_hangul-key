import React, { useEffect, useRef } from 'react';
import { KeyDefinition, KeyRecord, Language } from '../types/practice';
import { TRANSLATIONS } from '../locales/translations';

interface ResultDisplayProps {
  activeKey: KeyDefinition;
  record: KeyRecord | undefined;
  currentLang: Language;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  activeKey,
  record,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang];
  const containerRef = useRef<HTMLDivElement>(null);

  const items = record ? record.items : [];
  const chunkSize = 20;

  // Split into chunks of 20
  const lines: typeof items[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    lines.push(items.slice(i, i + chunkSize));
  }

  const isLastLineFull = items.length > 0 && items.length % chunkSize === 0;
  const currentLineIndex = lines.length === 0 ? 0 : isLastLineFull ? lines.length : lines.length - 1;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [items.length]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs px-3 py-2 space-y-1.5 flex-1 min-h-[100px] max-h-[160px] flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wide">
            입력 결과 (20자 단위 줄바꿈)
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
            총 {items.length}회 입력
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-800 inline-block"></span>
            정답
          </span>
          <span className="flex items-center gap-1 font-semibold text-rose-600">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
            오답 (빨간색)
          </span>
        </div>
      </div>

      {/* Lines Container (scrollable if many lines) */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-sm scrollbar-none"
      >
        {lines.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <p className="text-xs font-semibold text-slate-400">
              키보드로 <span className="text-amber-600 font-bold">"{activeKey.char}"</span> 글쇠를 누르면 20자씩 기록됩니다.
            </p>
            <div className="mt-1.5 flex gap-1">
              {Array.from({ length: 20 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-5 sm:w-6 h-6 rounded border border-slate-200 bg-white flex items-center justify-center text-[10px] text-slate-300"
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>
        ) : (
          lines.map((lineChunk, lineIdx) => {
            const wrongCount = lineChunk.filter((item) => !item.isCorrect).length;
            const isCompletedLine = lineChunk.length === chunkSize;
            const remainingEmptySlots = chunkSize - lineChunk.length;

            return (
              <div
                key={lineIdx}
                className={`px-2 py-1 rounded-lg border flex items-center justify-between gap-1.5 ${
                  lineIdx === currentLineIndex
                    ? 'bg-amber-50/50 border-amber-300 shadow-2xs'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                {/* 20 slots row */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] font-bold text-slate-400 w-5 shrink-0 select-none">
                    #{lineIdx + 1}
                  </span>

                  {lineChunk.map((item, itemIdx) => (
                    <div
                      key={item.id || itemIdx}
                      className={`w-6 sm:w-7 h-6 sm:h-7 rounded flex items-center justify-center font-bold text-xs sm:text-sm select-none transition-all ${
                        item.isCorrect
                          ? 'bg-white text-slate-900 border border-slate-300 shadow-2xs'
                          : 'bg-rose-50 text-rose-600 border border-rose-300 shadow-2xs'
                      }`}
                    >
                      {item.char}
                    </div>
                  ))}

                  {/* Empty slots for current row */}
                  {Array.from({ length: remainingEmptySlots }).map((_, emptyIdx) => {
                    const slotNum = lineChunk.length + emptyIdx + 1;
                    return (
                      <div
                        key={`empty_${emptyIdx}`}
                        className={`w-6 sm:w-7 h-6 sm:h-7 rounded border border-dashed flex items-center justify-center text-[9px] select-none ${
                          emptyIdx === 0
                            ? 'border-indigo-400 bg-indigo-50 text-indigo-600 font-bold animate-pulse'
                            : 'border-slate-200 bg-white/60 text-slate-300'
                        }`}
                      >
                        {slotNum}
                      </div>
                    );
                  })}
                </div>

                {/* Line summary: 오답 횟수 */}
                <div className="flex items-center justify-end gap-1.5 shrink-0 select-none text-xs">
                  {wrongCount > 0 ? (
                    <span className="font-extrabold text-rose-600 bg-rose-100 px-1.5 py-0.2 rounded border border-rose-200 text-[11px]">
                      : -{wrongCount}
                    </span>
                  ) : isCompletedLine ? (
                    <span className="font-extrabold text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-200 text-[11px]">
                      : -0
                    </span>
                  ) : null}
                  <span className="text-[10px] text-slate-400 font-semibold">
                    ({lineChunk.length}/20)
                  </span>
                </div>
              </div>
            );
          })
        )}

        {/* If last line was just completed */}
        {isLastLineFull && (
          <div className="px-2 py-1 rounded-lg border border-indigo-200 bg-indigo-50/40 flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 w-5 shrink-0 select-none">
              #{lines.length + 1}
            </span>
            {Array.from({ length: 20 }).map((_, idx) => (
              <div
                key={`next_${idx}`}
                className={`w-6 sm:w-7 h-6 sm:h-7 rounded border border-dashed flex items-center justify-center text-[9px] select-none ${
                  idx === 0
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-600 font-bold animate-pulse'
                    : 'border-slate-200 bg-white text-slate-300'
                }`}
              >
                {idx + 1}
              </div>
            ))}
            <span className="text-[10px] font-bold text-indigo-600 ml-1">다음 줄 시작</span>
          </div>
        )}
      </div>
    </div>
  );
};
