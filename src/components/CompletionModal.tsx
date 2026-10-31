import React from 'react';
import { SessionData, Language } from '../types/practice';
import { TRANSLATIONS } from '../locales/translations';
import { Download, X, CheckCircle2, Clock } from 'lucide-react';
import { generateTxtReport, downloadTxtFile } from '../utils/txtExport';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: SessionData;
  currentLang: Language;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  session,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang];
  const now = new Date();
  const { content, filename } = generateTxtReport(session, now);

  const totalKeysPracticed = Object.keys(session.records).length;
  let totalInputCount = 0;
  let totalWrongCount = 0;

  Object.values(session.records).forEach((rec) => {
    totalInputCount += rec.items.length;
    totalWrongCount += rec.items.filter((i) => !i.isCorrect).length;
  });

  const handleDownload = () => {
    downloadTxtFile(content, filename);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold">{t.download_confirm_title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 font-medium">
            {t.download_confirm_desc}
          </p>

          {/* Session Summary Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-slate-500" />
                {t.start_time}:
              </span>
              <span className="font-mono font-bold">
                {session.startTime ? new Date(session.startTime).toLocaleString('ko-KR') : t.not_started}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">연습한 글쇠 수:</span>
              <span className="font-mono font-bold text-indigo-600">{totalKeysPracticed}개</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">{t.total_inputs}:</span>
              <span className="font-mono font-bold text-slate-900">{totalInputCount}회</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">{t.wrong_count}:</span>
              <span className="font-mono font-bold text-rose-600">{totalWrongCount}회</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500">
              <span>저장될 파일명:</span>
              <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-300">
                {filename}
              </span>
            </div>
          </div>

          {/* TXT Preview Snippet */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              미리보기 (TXT Preview)
            </span>
            <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-xs font-mono max-h-36 overflow-y-auto leading-relaxed border border-slate-800">
              {content}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{t.download_now}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
