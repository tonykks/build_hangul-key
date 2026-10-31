import React from 'react';
import { Trophy, X, Medal, Clock } from 'lucide-react';

export interface RankingUser {
  uid: string;
  displayName: string;
  totalPracticeSeconds: number;
  email?: string;
}

interface RankingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rankings: RankingUser[];
  currentUserId?: string;
  onSelectStudent?: (user: RankingUser) => void;
}

export function formatSeconds(totalSecs: number): string {
  if (!totalSecs || totalSecs <= 0) return '0초';
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}시간`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}분`);
  parts.push(`${seconds}초`);
  return parts.join(' ');
}

export const RankingDrawer: React.FC<RankingDrawerProps> = ({
  isOpen,
  onClose,
  rankings,
  currentUserId,
  onSelectStudent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-indigo-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-200" />
            <h3 className="text-base font-bold">실시간 연습 랭킹 (Top 5)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            누적 연습 시간이 가장 많은 상위 5명 순위입니다. <span className="text-indigo-600 font-bold underline decoration-indigo-300">학생 별칭을 클릭하면</span> 그동안의 전체 연습시간, 점수(정확도), 세션별 기록을 모두 확인할 수 있습니다.
          </p>

          <div className="space-y-2">
            {rankings.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 font-medium">
                아직 기록된 학생 데이터가 없습니다.
              </div>
            ) : (
              rankings.slice(0, 5).map((user, idx) => {
                const rank = idx + 1;
                const isMe = user.uid === currentUserId;

                let rankBadge = (
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {rank}
                  </span>
                );

                if (rank === 1) {
                  rankBadge = (
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs">
                      🥇
                    </span>
                  );
                } else if (rank === 2) {
                  rankBadge = (
                    <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center shadow-xs">
                      🥈
                    </span>
                  );
                } else if (rank === 3) {
                  rankBadge = (
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      🥉
                    </span>
                  );
                }

                return (
                  <div
                    key={user.uid}
                    onClick={() => onSelectStudent?.(user)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer hover:border-indigo-400 hover:shadow-md group active:scale-[0.99] ${
                      isMe
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs ring-1 ring-amber-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-indigo-50/30'
                    }`}
                    title="클릭하여 학생의 전체 연습시간, 정확도 점수, 세션 기록 보기"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {rankBadge}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                            {user.displayName}
                          </span>
                          {isMe && (
                            <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold shrink-0">
                              나
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 transition-colors block">
                          기록 및 점수 보기 ↗
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-indigo-700 shrink-0 bg-white px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{formatSeconds(user.totalPracticeSeconds)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
