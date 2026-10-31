/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PRACTICE_SETS, KEY_CODE_MAP, MUSIC_TRACKS } from './constants/keyboardSets';
import { KeyDefinition, Language, SessionData, KeyRecord, InputItem } from './types/practice';
import { Header, UserProfile } from './components/Header';
import { SetSelector } from './components/SetSelector';
import { InstructionBanner } from './components/InstructionBanner';
import { ResultDisplay } from './components/ResultDisplay';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { CompletionModal } from './components/CompletionModal';
import { NicknameModal } from './components/NicknameModal';
import { RankingDrawer, RankingUser } from './components/RankingDrawer';
import { AdminViewModal, AdminStudentData } from './components/AdminViewModal';
import { StudentProfileModal, StudentProfileData } from './components/StudentProfileModal';
import { soundManager } from './utils/audio';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  ADMIN_EMAIL,
  handleFirestoreError,
  OperationType,
} from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { AlertTriangle, LogOut, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'korean_keyboard_practice_v1';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ko');
  const [activeSetId, setActiveSetId] = useState<number>(1);
  const [activeKey, setActiveKey] = useState<KeyDefinition>(PRACTICE_SETS[0].keys[0]);

  // Auth & User Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState<boolean>(false);

  // Student Profile Detail Modal (Record, score, history)
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<StudentProfileData | null>(null);

  // Ranking & Admin State
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [allStudents, setAllStudents] = useState<AdminStudentData[]>([]);
  const [isRankingOpen, setIsRankingOpen] = useState<boolean>(false);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState<boolean>(false);

  // Confirmation Modals State (Replacing window.confirm which is blocked in iframes)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Session data (startTime, records per key)
  const [session, setSession] = useState<SessionData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        }
      } catch {
        // Ignore JSON parse error
      }
    }
    return { startTime: null, records: {} };
  });

  // Track session start time in milliseconds for accurate practice duration
  const sessionStartTimeMsRef = useRef<number | null>(null);
  const syncedPracticeSecondsRef = useRef<number>(0);
  const syncedKeyInputsRef = useRef<number>(0);
  const syncedWrongInputsRef = useRef<number>(0);

  // Track physical keys pressed synchronously with Ref
  const activeCodesRef = useRef<Set<string>>(new Set());
  const lastShiftSideRef = useRef<'left' | 'right' | null>(null);
  const [pressedCodes, setPressedCodes] = useState<Set<string>>(new Set());

  // Music state
  const [currentTrackId, setCurrentTrackId] = useState<string>('track1');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(0.6);

  // Modal state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  // Save session to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  }, [session]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);

          const isAdminUser =
            user.email === ADMIN_EMAIL ||
            (user.email != null && user.email.toLowerCase().includes('admin'));

          if (snap.exists()) {
            const data = snap.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email || '',
              nickname: data.nickname || '학생',
              displayName: data.displayName || `${data.nickname || '학생'}(${user.uid.slice(-4)})`,
              isAdmin: isAdminUser,
            });
          } else {
            // First time login: prompt for nickname
            setIsNicknameModalOpen(true);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save Nickname on First Login
  const handleSaveNickname = async (nickname: string) => {
    if (!firebaseUser) return;
    const uidSuffix = firebaseUser.uid.slice(-4);
    const displayName = `${nickname}(${uidSuffix})`;
    const isAdminUser =
      firebaseUser.email === ADMIN_EMAIL ||
      (firebaseUser.email != null && firebaseUser.email.toLowerCase().includes('admin'));

    const newUserDoc = {
      uid: firebaseUser.uid,
      nickname,
      displayName,
      email: firebaseUser.email || '',
      totalPracticeSeconds: 0,
      totalKeyInputs: 0,
      totalWrongInputs: 0,
      isAdmin: isAdminUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), newUserDoc);
      setCurrentUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        nickname,
        displayName,
        isAdmin: isAdminUser,
      });
      setIsNicknameModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
    }
  };

  // Real-time Rankings Listener (Cloud Firestore)
  useEffect(() => {
    if (!firebaseUser) {
      setRankings([]);
      setAllStudents([]);
      return;
    }

    const usersCol = collection(db, 'users');
    const unsubscribe = onSnapshot(
      usersCol,
      (snapshot) => {
        const studentList: AdminStudentData[] = [];
        const rankingList: RankingUser[] = [];

        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          const studentItem: AdminStudentData = {
            uid: d.uid || docSnap.id,
            nickname: d.nickname || '학생',
            displayName: d.displayName || `${d.nickname || '학생'}(${docSnap.id.slice(-4)})`,
            email: d.email || '',
            totalPracticeSeconds: Number(d.totalPracticeSeconds) || 0,
            totalKeyInputs: Number(d.totalKeyInputs) || 0,
            totalWrongInputs: Number(d.totalWrongInputs) || 0,
            updatedAt: d.updatedAt || '',
          };
          studentList.push(studentItem);

          // Exclude Admin from Top 5 rankings (Requirement 4-1)
          const isUserAdmin =
            d.isAdmin === true ||
            d.email === ADMIN_EMAIL ||
            (d.email && d.email.toLowerCase().includes('admin'));

          if (!isUserAdmin) {
            rankingList.push({
              uid: studentItem.uid,
              displayName: studentItem.displayName,
              totalPracticeSeconds: studentItem.totalPracticeSeconds,
              email: studentItem.email,
            });
          }
        });

        // Sort descending by total practice seconds
        rankingList.sort((a, b) => b.totalPracticeSeconds - a.totalPracticeSeconds);
        studentList.sort((a, b) => b.totalPracticeSeconds - a.totalPracticeSeconds);

        setRankings(rankingList);
        setAllStudents(studentList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'users');
      }
    );

    return () => unsubscribe();
  }, [firebaseUser]);

  // Sync session progress to Firestore for logged in user
  const syncSessionToFirestore = useCallback(async () => {
    if (!firebaseUser || !currentUser || !sessionStartTimeMsRef.current) return;

    const now = Date.now();
    const elapsedSeconds = Math.max(1, Math.floor((now - sessionStartTimeMsRef.current) / 1000));
    const newSeconds = elapsedSeconds - syncedPracticeSecondsRef.current;

    let totalInputs = 0;
    let wrongInputs = 0;
    Object.values(session.records).forEach((r) => {
      totalInputs += r.items.length;
      wrongInputs += r.items.filter((i) => !i.isCorrect).length;
    });

    const newInputs = Math.max(0, totalInputs - syncedKeyInputsRef.current);
    const newWrongs = Math.max(0, wrongInputs - syncedWrongInputsRef.current);

    if (newSeconds <= 0 && newInputs <= 0 && newWrongs <= 0) return;

    syncedPracticeSecondsRef.current = elapsedSeconds;
    syncedKeyInputsRef.current = totalInputs;
    syncedWrongInputsRef.current = wrongInputs;

    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const curData = userSnap.data();
        const updatedTotalSeconds = (Number(curData.totalPracticeSeconds) || 0) + newSeconds;
        const updatedTotalInputs = (Number(curData.totalKeyInputs) || 0) + newInputs;
        const updatedWrongInputs = (Number(curData.totalWrongInputs) || 0) + newWrongs;

        await updateDoc(userRef, {
          totalPracticeSeconds: updatedTotalSeconds,
          totalKeyInputs: updatedTotalInputs,
          totalWrongInputs: updatedWrongInputs,
          updatedAt: new Date().toISOString(),
        });

        // Also add log document to practice_logs
        const logId = `${firebaseUser.uid}_${Date.now()}`;
        await setDoc(doc(db, 'practice_logs', logId), {
          userId: firebaseUser.uid,
          userDisplay: currentUser.displayName,
          durationSeconds: newSeconds,
          totalInputs: newInputs,
          wrongInputs: newWrongs,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${firebaseUser.uid}`);
    }
  }, [firebaseUser, currentUser, session.records]);

  // Periodic Firestore sync every 30 seconds for logged-in users
  useEffect(() => {
    if (!firebaseUser) return;
    const interval = setInterval(() => {
      if (sessionStartTimeMsRef.current) {
        syncSessionToFirestore();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [firebaseUser, syncSessionToFirestore]);

  // Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  // Confirmed Logout Handler
  const executeLogout = async () => {
    setIsLogoutModalOpen(false);
    await syncSessionToFirestore();
    await signOut(auth);
    sessionStartTimeMsRef.current = null;
    syncedPracticeSecondsRef.current = 0;
    syncedKeyInputsRef.current = 0;
    syncedWrongInputsRef.current = 0;
    setSession({ startTime: null, records: {} });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // Confirmed Reset Session Handler
  const executeResetSession = () => {
    setIsResetModalOpen(false);
    setSession({ startTime: null, records: {} });
    sessionStartTimeMsRef.current = null;
    syncedPracticeSecondsRef.current = 0;
    syncedKeyInputsRef.current = 0;
    syncedWrongInputsRef.current = 0;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // Update active set
  const handleSelectSet = useCallback((setId: number) => {
    setActiveSetId(setId);
    const targetSet = PRACTICE_SETS.find((s) => s.id === setId);
    if (targetSet && targetSet.keys.length > 0) {
      setActiveKey(targetSet.keys[0]);
    }
  }, []);

  // Update active key
  const handleSelectKey = useCallback((key: KeyDefinition) => {
    setActiveKey(key);
  }, []);

  // Music controls
  const handleToggleMusic = useCallback(async () => {
    if (isPlayingMusic) {
      soundManager.pauseMusic();
      setIsPlayingMusic(false);
    } else {
      const track = MUSIC_TRACKS.find((t) => t.id === currentTrackId) || MUSIC_TRACKS[0];
      const ok = await soundManager.playMusic(track.src);
      if (ok) {
        setIsPlayingMusic(true);
      }
    }
  }, [isPlayingMusic, currentTrackId]);

  const handleSelectTrack = useCallback((trackId: string) => {
    setCurrentTrackId(trackId);
    const track = MUSIC_TRACKS.find((t) => t.id === trackId);
    if (track) {
      soundManager.initMusic(track.src);
      if (isPlayingMusic) {
        soundManager.playMusic(track.src);
      }
    }
  }, [isPlayingMusic]);

  const handleChangeVolume = useCallback((vol: number) => {
    setMusicVolume(vol);
    soundManager.setVolume(vol);
  }, []);

  // Handle typing evaluation
  const handleTypingInput = useCallback(
    (e: KeyboardEvent) => {
      if (
        isDownloadModalOpen ||
        isNicknameModalOpen ||
        isRankingOpen ||
        isAdminViewOpen ||
        isLogoutModalOpen ||
        isResetModalOpen
      ) {
        return;
      }
      if (e.repeat) return; // A05: 키 자동 반복의 중복 입력 방지

      const ignoredCodes = [
        'ShiftLeft',
        'ShiftRight',
        'ControlLeft',
        'ControlRight',
        'AltLeft',
        'AltRight',
        'MetaLeft',
        'MetaRight',
        'CapsLock',
        'Tab',
        'Escape',
        'Backspace',
        'Enter',
      ];
      if (ignoredCodes.includes(e.code) || e.code.startsWith('F')) {
        return;
      }

      const mapping = KEY_CODE_MAP[e.code];
      if (!mapping) return;

      if (e.code === 'Slash' || e.code === 'Quote' || e.code === 'Semicolon') {
        e.preventDefault();
      }

      // Check Shift state accurately across all keyboard drivers
      const activeCodes = activeCodesRef.current;
      const isShiftActive =
        e.shiftKey ||
        activeCodes.has('ShiftRight') ||
        activeCodes.has('ShiftLeft') ||
        activeCodes.has('Shift');

      const hasRightShift =
        activeCodes.has('ShiftRight') ||
        lastShiftSideRef.current === 'right' ||
        (isShiftActive && !activeCodes.has('ShiftLeft'));

      const hasLeftShift =
        activeCodes.has('ShiftLeft') ||
        lastShiftSideRef.current === 'left' ||
        (isShiftActive && !activeCodes.has('ShiftRight'));

      const targetCode = activeKey.code;
      const requiresShift = !!activeKey.requiresShift;
      const requiredShiftSide = activeKey.requiredShiftSide; // 'left' or 'right'

      let isCorrect = false;
      let typedChar = '';

      if (e.key && e.key.length === 1 && !/^[a-zA-Z]$/.test(e.key)) {
        typedChar = e.key;
      } else if (isShiftActive) {
        typedChar = mapping.shiftKo || mapping.normalKo;
      } else {
        typedChar = mapping.normalKo;
      }

      // Correctness Evaluation
      if (requiresShift) {
        const isTargetCodeMatch = e.code === targetCode || e.key === activeKey.char;

        let isCorrectShiftUsed = false;
        if (requiredShiftSide === 'right') {
          isCorrectShiftUsed = hasRightShift || (e.shiftKey && !activeCodes.has('ShiftLeft'));
        } else if (requiredShiftSide === 'left') {
          isCorrectShiftUsed = hasLeftShift || (e.shiftKey && !activeCodes.has('ShiftRight'));
        }

        if (isTargetCodeMatch && isCorrectShiftUsed) {
          isCorrect = true;
          typedChar = activeKey.char;
        } else {
          isCorrect = false;
        }
      } else {
        if (e.code === targetCode && !isShiftActive) {
          isCorrect = true;
          typedChar = activeKey.char;
        } else {
          isCorrect = false;
        }
      }

      // Play error warning beep if incorrect (A04)
      if (!isCorrect) {
        soundManager.playErrorBeep();
      }

      const now = Date.now();
      if (!sessionStartTimeMsRef.current) {
        sessionStartTimeMsRef.current = now;
      }

      const newItem: InputItem = {
        id: `${now}_${Math.random().toString(36).substring(2, 7)}`,
        char: typedChar,
        isCorrect,
        timestamp: now,
      };

      setSession((prev) => {
        const startTime = prev.startTime || new Date(now).toISOString();
        const currentRec = prev.records[activeKey.id] || {
          setId: activeSetId,
          keyId: activeKey.id,
          keyChar: activeKey.char,
          keyLabel: activeKey.label,
          items: [],
        };

        const updatedRec: KeyRecord = {
          ...currentRec,
          items: [...currentRec.items, newItem],
        };

        return {
          ...prev,
          startTime,
          records: {
            ...prev.records,
            [activeKey.id]: updatedRec,
          },
        };
      });
    },
    [
      activeKey,
      activeSetId,
      isDownloadModalOpen,
      isNicknameModalOpen,
      isRankingOpen,
      isAdminViewOpen,
      isLogoutModalOpen,
      isResetModalOpen,
    ]
  );

  // Global Key Listeners with robust Shift normalization
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default scrolling behavior (Space, Arrows, PageUp/Down)
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (!isInput) {
        if (
          e.code === 'Space' ||
          e.key === ' ' ||
          e.code === 'Tab' ||
          e.code === 'ArrowUp' ||
          e.code === 'ArrowDown' ||
          e.code === 'PageUp' ||
          e.code === 'PageDown'
        ) {
          e.preventDefault();
        }
      }

      let code = e.code;

      if (e.key === 'Shift' || e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.keyCode === 16) {
        if (e.location === 2 || e.code === 'ShiftRight') {
          code = 'ShiftRight';
          lastShiftSideRef.current = 'right';
        } else if (e.location === 1 || e.code === 'ShiftLeft') {
          code = 'ShiftLeft';
          lastShiftSideRef.current = 'left';
        } else {
          code = 'ShiftRight';
          lastShiftSideRef.current = 'right';
        }
      }

      activeCodesRef.current.add(code);
      if (e.code) activeCodesRef.current.add(e.code);

      setPressedCodes(new Set(activeCodesRef.current));

      handleTypingInput(e);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      let code = e.code;

      if (e.key === 'Shift' || e.keyCode === 16) {
        if (!e.shiftKey) {
          activeCodesRef.current.delete('ShiftLeft');
          activeCodesRef.current.delete('ShiftRight');
          activeCodesRef.current.delete('Shift');
          lastShiftSideRef.current = null;
        } else {
          if (e.location === 2 || e.code === 'ShiftRight') {
            activeCodesRef.current.delete('ShiftRight');
          } else if (e.location === 1 || e.code === 'ShiftLeft') {
            activeCodesRef.current.delete('ShiftLeft');
          }
        }
      } else {
        activeCodesRef.current.delete(code);
      }

      setPressedCodes(new Set(activeCodesRef.current));
    };

    const onBlur = () => {
      activeCodesRef.current.clear();
      lastShiftSideRef.current = null;
      setPressedCodes(new Set());
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [handleTypingInput]);

  const currentRecord = session.records[activeKey.id];

  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden bg-slate-100/80 text-slate-800 flex flex-col font-sans select-none antialiased">
      {/* Top Navigation & Controls with Auth & Ranking */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        tracks={MUSIC_TRACKS}
        currentTrackId={currentTrackId}
        onSelectTrack={handleSelectTrack}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        volume={musicVolume}
        onChangeVolume={handleChangeVolume}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onResetSession={() => setIsResetModalOpen(true)}
        user={currentUser}
        onLogin={handleGoogleLogin}
        onLogout={() => setIsLogoutModalOpen(true)}
        onOpenRanking={() => setIsRankingOpen(true)}
        onOpenAdminView={() => setIsAdminViewOpen(true)}
        onOpenMyProfile={() => {
          if (currentUser) {
            const found = allStudents.find((s) => s.uid === currentUser.uid);
            setSelectedStudentProfile(
              found || {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                totalPracticeSeconds: 0,
                totalKeyInputs: 0,
                totalWrongInputs: 0,
              }
            );
          }
        }}
      />

      {/* Main Practice Workspace - All in one view without viewport scrolling */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-2.5 flex flex-col gap-2 min-h-0 overflow-hidden">
        {/* Compact Set & Key Selector */}
        <SetSelector
          sets={PRACTICE_SETS}
          activeSetId={activeSetId}
          activeKey={activeKey}
          onSelectSet={handleSelectSet}
          onSelectKey={handleSelectKey}
          currentLang={currentLang}
          session={session}
        />

        {/* Compact Instruction & Shift Monitor Banner */}
        <InstructionBanner
          activeKey={activeKey}
          activeSetId={activeSetId}
          currentLang={currentLang}
          shiftState={{
            leftActive: pressedCodes.has('ShiftLeft') || lastShiftSideRef.current === 'left',
            rightActive: pressedCodes.has('ShiftRight') || lastShiftSideRef.current === 'right',
          }}
        />

        {/* 20-Character Line Result Display */}
        <ResultDisplay
          activeKey={activeKey}
          record={currentRecord}
          currentLang={currentLang}
        />

        {/* Virtual Keyboard (Fully visible on screen) */}
        <VirtualKeyboard
          activeKey={activeKey}
          pressedCodes={pressedCodes}
        />
      </main>

      {/* Footer info bar */}
      <footer className="text-center py-1 text-[11px] text-slate-500 border-t border-slate-200 bg-white/50 shrink-0">
        제주관광대학교 요양보호사 양성과정 유학생 기초 타자 훈련 프로그램 (두벌식 준비 과정)
      </footer>

      {/* Completion & Download Modal */}
      <CompletionModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        session={session}
        currentLang={currentLang}
      />

      {/* First-time Nickname Modal (Requirement 2) */}
      <NicknameModal
        isOpen={isNicknameModalOpen}
        uid={firebaseUser?.uid || ''}
        onSave={handleSaveNickname}
      />

      {/* Top 5 Real-time Ranking Drawer (Requirement 3 & 4) */}
      <RankingDrawer
        isOpen={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
        rankings={rankings}
        currentUserId={firebaseUser?.uid}
        onSelectStudent={(u) => {
          const found = allStudents.find((s) => s.uid === u.uid);
          setSelectedStudentProfile(
            found || {
              uid: u.uid,
              displayName: u.displayName,
              email: u.email,
              totalPracticeSeconds: u.totalPracticeSeconds,
              totalKeyInputs: 0,
              totalWrongInputs: 0,
            }
          );
        }}
      />

      {/* Admin View Modal (Requirement 4) */}
      <AdminViewModal
        isOpen={isAdminViewOpen}
        onClose={() => setIsAdminViewOpen(false)}
        students={allStudents}
        onSelectStudent={(s) => {
          setSelectedStudentProfile(s);
        }}
      />

      {/* Student Profile & Practice Record Modal (User Request: 클릭 시 그동안 기록/연습시간/점수 확인) */}
      <StudentProfileModal
        isOpen={!!selectedStudentProfile}
        onClose={() => setSelectedStudentProfile(null)}
        student={selectedStudentProfile}
      />

      {/* Custom Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2.5 text-slate-900">
              <LogOut className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold">로그아웃 및 세션 종료</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              로그아웃하시겠습니까? 지금까지의 연습 기록이 서버에 안전하게 자동 저장됩니다.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                계속 연습하기
              </button>
              <button
                onClick={executeLogout}
                className="px-4 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow transition-all active:scale-95"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Reset Records Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2.5 text-slate-900">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold">연습 기록 초기화</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              화면의 모든 글쇠 연습 기록을 지우고 처음부터 새로 시작하시겠습니까?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                취소
              </button>
              <button
                onClick={executeResetSession}
                className="px-4 py-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow transition-all active:scale-95"
              >
                기록 초기화
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
