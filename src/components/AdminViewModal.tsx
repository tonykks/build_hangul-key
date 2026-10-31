import React, { useState } from 'react';
import { Shield, X, Search, Users, Clock, Hash } from 'lucide-react';
import { formatSeconds } from './RankingDrawer';

export interface AdminStudentData {
  uid: string;
  nickname: string;
  displayName: string;
  email: string;
  totalPracticeSeconds: number;
  totalKeyInputs?: number;
  totalWrongInputs?: number;
  updatedAt?: string;
}

interface AdminViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: AdminStudentData[];
  onSelectStudent?: (student: AdminStudentData) => void;
}

export const AdminViewModal: React.FC<AdminViewModalProps> = ({
  isOpen,
  onClose,
  students,
  onSelectStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = students.filter(
    (s) =>
      s.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalTimeAll = students.reduce((acc, s) => acc + (s.totalPracticeSeconds || 0), 0);
  const totalInputsAll = students.reduce((acc, s) => acc + (s.totalKeyInputs || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>관리자 뷰 (전체 학생 연습 데이터)</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.2 rounded-full font-bold">
                  ADMIN ONLY
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Firestore에 저장된 모든 학생의 누적 연습 통계를 실시간으로 조회합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Cards */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 grid grid-cols-3 gap-2 shrink-0 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold">등록 학생 수</div>
              <div className="font-bold text-slate-800">{students.length}명</div>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold">전체 누적 연습 시간</div>
              <div className="font-bold text-slate-800">{formatSeconds(totalTimeAll)}</div>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <Hash className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold">전체 총 타건 수</div>
              <div className="font-bold text-slate-800">{totalInputsAll.toLocaleString()}회</div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-3 border-b border-slate-100 flex items-center gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="학생 별칭 또는 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="flex-1 overflow-y-auto p-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold">
                <th className="py-2 px-2">순번</th>
                <th className="py-2 px-2">별칭(UID끝4자리)</th>
                <th className="py-2 px-2">이메일</th>
                <th className="py-2 px-2 text-right">누적 연습 시간</th>
                <th className="py-2 px-2 text-right">총 타건수</th>
                <th className="py-2 px-2 text-right">오답수</th>
                <th className="py-2 px-2 text-right">최근 업데이트</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((s, idx) => (
                  <tr
                    key={s.uid}
                    onClick={() => onSelectStudent?.(s)}
                    className="border-b border-slate-100 hover:bg-indigo-50/60 transition-colors cursor-pointer group"
                    title="클릭하여 학생의 전체 연습시간, 점수, 세션 기록 보기"
                  >
                    <td className="py-2.5 px-2 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span>{s.displayName}</span>
                        <span className="text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          상세보기 ↗
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-slate-500 font-mono text-[11px]">{s.email || '-'}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-indigo-600">
                      {formatSeconds(s.totalPracticeSeconds)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                      {(s.totalKeyInputs || 0).toLocaleString()}회
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-rose-600 font-semibold">
                      {(s.totalWrongInputs || 0).toLocaleString()}회
                    </td>
                    <td className="py-2.5 px-2 text-right text-[10px] text-slate-400">
                      {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex justify-end shrink-0">
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
