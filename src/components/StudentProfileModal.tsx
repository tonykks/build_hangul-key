import React, { useEffect, useState } from 'react';
import { User, X, Clock, Award, Target, AlertCircle, Calendar, ExternalLink } from 'lucide-react';
import { formatSeconds } from './RankingDrawer';
import { db, doc, collection, onSnapshot, handleFirestoreError, OperationType } from '../lib/firebase';

export interface StudentProfileData {
  uid: string;
  displayName: string;
  email?: string;
  totalPracticeSeconds: number;
  totalKeyInputs?: number;
  totalWrongInputs?: number;
  updatedAt?: string;
}

interface PracticeLogItem {
  id: string;
  durationSeconds: number;
  totalInputs: number;
  wrongInputs: number;
  createdAt: string;
}

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfileData | null;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [logs, setLogs] = useState<PracticeLogItem[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [liveUserData, setLiveUserData] = useState<StudentProfileData | null>(null);

  // Real-time listener for the student's user document
  useEffect(() => {
    if (!isOpen || !student?.uid) {
      setLiveUserData(null);
      return;
    }

    const userDocRef = doc(db, 'users', student.uid);
    const unsubUser = onSnapshot(
      userDocRef,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setLiveUserData({
            uid: snap.id,
            displayName: d.displayName || student.displayName,
            email: d.email || student.email || '',
            totalPracticeSeconds: Number(d.totalPracticeSeconds) || 0,
            totalKeyInputs: Number(d.totalKeyInputs) || 0,
            totalWrongInputs: Number(d.totalWrongInputs) || 0,
            updatedAt: d.updatedAt || '',
          });
        }
      },
      (error) => {
        console.warn('Could not read user profile doc:', error);
      }
    );

    return () => unsubUser();
  }, [isOpen, student?.uid, student?.displayName, student?.email]);

  // Real-time listener for the student's practice logs
  useEffect(() => {
    if (!isOpen || !student?.uid) {
      setLogs([]);
      return;
    }

    setIsLoadingLogs(true);
    const logsCol = collection(db, 'practice_logs');
    const unsubscribe = onSnapshot(
      logsCol,
      (snapshot) => {
        const userLogs: PracticeLogItem[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          if (d.userId === student.uid) {
            userLogs.push({
              id: docSnap.id,
              durationSeconds: Number(d.durationSeconds) || 0,
              totalInputs: Number(d.totalInputs) || 0,
              wrongInputs: Number(d.wrongInputs) || 0,
              createdAt: d.createdAt || '',
            });
          }
        });

        // Sort latest first
        userLogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLogs(userLogs);
        setIsLoadingLogs(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'practice_logs');
        setIsLoadingLogs(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, student?.uid]);

  if (!isOpen || !student) return null;

  const currentData = liveUserData || student;
  const totalPracticeSeconds = currentData.totalPracticeSeconds || 0;
  const totalInputs = currentData.totalKeyInputs || 0;
  const totalWrongs = currentData.totalWrongInputs || 0;
  const correctInputs = Math.max(0, totalInputs - totalWrongs);
  const accuracy = totalInputs > 0 ? Math.round((correctInputs / totalInputs) * 100) : 100;
  const accuracyPercent = totalInputs > 0 ? ((correctInputs / totalInputs) * 100).toFixed(1) : '100.0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white p-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-1.5">
                <span>{currentData.displayName}</span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.2 rounded-full font-bold">
                  학생 상세 기록
                </span>
              </h3>
              <p className="text-[11px] text-indigo-200">
                그동안의 전체 연습 시간과 점수(정확도) 및 세션별 기록입니다.
                {currentData.email && <span className="text-indigo-300 ml-1.5 opacity-80">({currentData.email})</span>}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Summary Cards */}
        <div className="p-4 grid grid-cols-3 gap-2 bg-slate-50 border-b border-slate-200 shrink-0 text-xs">
          {/* Practice Time */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>총 연습 시간</span>
            </div>
            <div className="text-sm font-black text-indigo-700 font-mono">
              {formatSeconds(totalPracticeSeconds)}
            </div>
          </div>

          {/* Accuracy & Score */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>정확도(점수)</span>
            </div>
            <div className="text-sm font-black text-amber-600 font-mono flex items-baseline gap-1">
              <span>{accuracy}점</span>
              <span className="text-[10px] text-slate-400 font-medium">({accuracyPercent}%)</span>
            </div>
          </div>

          {/* Total Key Inputs */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              <span>총 타건 수</span>
            </div>
            <div className="text-sm font-black text-slate-800 font-mono">
              {totalInputs.toLocaleString()}회
            </div>
            <div className="text-[10px] text-rose-500 font-semibold">
              오답: {totalWrongs.toLocaleString()}회
            </div>
          </div>
        </div>

        {/* Session Logs History */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>세션별 연습 기록 목록 ({logs.length}회)</span>
            </h4>
          </div>

          {isLoadingLogs ? (
            <div className="text-center py-8 text-xs text-slate-400">
              기록을 불러오는 중...
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-4">
              저장된 세션 기록이 없습니다. (연습 후 로그아웃 시 세션 로그가 저장됩니다)
            </div>
          ) : (
            <div className="space-y-1.5">
              {logs.map((log, idx) => {
                const sessionInputs = log.totalInputs || 0;
                const sessionWrongs = log.wrongInputs || 0;
                const sessionAcc =
                  sessionInputs > 0
                    ? Math.round(((sessionInputs - sessionWrongs) / sessionInputs) * 100)
                    : 100;

                const dateStr = log.createdAt
                  ? new Date(log.createdAt).toLocaleString('ko-KR', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-';

                return (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-700 flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-[11px]">#{logs.length - idx}</span>
                        <span>{dateStr}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>타건: {sessionInputs}회</span>
                        <span className="text-rose-500 font-medium">오답: {sessionWrongs}회</span>
                      </div>
                    </div>

                    <div className="text-right space-y-0.5">
                      <div className="font-bold text-indigo-700 font-mono">
                        {formatSeconds(log.durationSeconds)}
                      </div>
                      <div className="text-[11px] font-bold text-amber-600">
                        {sessionAcc}점 ({sessionAcc}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-end shrink-0">
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
