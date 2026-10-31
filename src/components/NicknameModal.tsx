import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';

interface NicknameModalProps {
  isOpen: boolean;
  uid: string;
  onSave: (nickname: string) => Promise<void>;
}

export const NicknameModal: React.FC<NicknameModalProps> = ({
  isOpen,
  uid,
  onSave,
}) => {
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uidSuffix = uid ? uid.slice(-4) : '0000';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      await onSave(trimmed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white p-4 flex items-center gap-2.5">
          <UserCheck className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold">학생 별칭(Nickname) 입력</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            처음 로그인하셨습니다. 연습 화면과 랭킹에 표시될 본인의 별칭(이름)을 입력해 주세요.
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">별칭 입력</label>
            <input
              type="text"
              required
              maxLength={20}
              placeholder="예: 민우, Thiri, Linh"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium"
              autoFocus
            />
            {nickname.trim() && (
              <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                화면 표시 형태: <span className="font-bold underline">{nickname.trim()}({uidSuffix})</span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !nickname.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
            >
              {isSubmitting ? '저장 중...' : '별칭 저장하고 시작하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
