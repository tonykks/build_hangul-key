import React from 'react';
import { Volume2, VolumeX, Play, Pause, Download, RotateCcw, Music, Globe, LogIn, LogOut, Trophy, Shield, Info } from 'lucide-react';
import { Language, MusicTrack } from '../types/practice';
import { TRANSLATIONS } from '../locales/translations';

export interface UserProfile {
  uid: string;
  email: string;
  nickname: string;
  displayName: string;
  isAdmin: boolean;
}

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  tracks: MusicTrack[];
  currentTrackId: string;
  onSelectTrack: (trackId: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  onOpenDownloadModal: () => void;
  onResetSession: () => void;
  // Auth & 2nd Phase Props
  user: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
  onOpenRanking: () => void;
  onOpenAdminView: () => void;
  onOpenMyProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  tracks,
  currentTrackId,
  onSelectTrack,
  isPlayingMusic,
  onToggleMusic,
  volume,
  onChangeVolume,
  onOpenDownloadModal,
  onResetSession,
  user,
  onLogin,
  onLogout,
  onOpenRanking,
  onOpenAdminView,
  onOpenMyProfile,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-sm shrink-0 h-13 flex items-center">
      <div className="max-w-7xl w-full mx-auto px-3 flex items-center justify-between gap-2 overflow-hidden">
        {/* Left: App Title */}
        <div className="flex items-center gap-2 min-w-0 shrink">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center shadow font-black text-sm text-white shrink-0">
            한
          </div>
          <div className="leading-tight min-w-0">
            <h1 className="text-sm font-bold tracking-tight text-white whitespace-nowrap truncate max-w-[140px] sm:max-w-[200px]">
              {t.app_title}
            </h1>
            <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap truncate hidden xl:block">
              {t.app_subtitle}
            </p>
          </div>
        </div>

        {/* Center: Music Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 px-2 h-8 rounded-lg border border-slate-700/60 shrink-0">
          <Music className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <select
            value={currentTrackId}
            onChange={(e) => onSelectTrack(e.target.value)}
            className="bg-slate-900 text-[11px] text-slate-200 border border-slate-700 rounded px-1.5 h-6 outline-none cursor-pointer max-w-[100px] sm:max-w-[140px] truncate"
          >
            {tracks.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {tr.title}
              </option>
            ))}
          </select>

          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? t.music_pause : t.music_play}
            className={`flex items-center gap-1 px-2 h-6 rounded text-[11px] font-bold whitespace-nowrap shrink-0 transition-all shadow-xs ${
              isPlayingMusic
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isPlayingMusic ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            <span className="whitespace-nowrap">{isPlayingMusic ? t.music_pause : t.music_play}</span>
          </button>

          <div className="flex items-center gap-1 pl-1 border-l border-slate-700 hidden lg:flex">
            {volume === 0 ? (
              <VolumeX className="w-3 h-3 text-slate-400" />
            ) : (
              <Volume2 className="w-3 h-3 text-slate-300" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              className="w-10 h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Right: User State, Ranking, Language & Exit Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Real-time Ranking Button */}
          <button
            onClick={onOpenRanking}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2 h-8 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0"
            title="실시간 연습 시간 랭킹 보기"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">랭킹 Top 5</span>
          </button>

          {/* Admin View Button (Visible only to Admin) */}
          {user?.isAdmin && (
            <button
              onClick={onOpenAdminView}
              className="flex items-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 px-2 h-8 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              title="관리자 뷰: 전체 학생 연습 데이터 목록"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">관리자 뷰</span>
            </button>
          )}

          {/* User Account State or Google Login */}
          {user ? (
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 h-8 rounded-lg border border-slate-700 shrink-0">
              <button
                onClick={onOpenMyProfile}
                className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 px-1 py-0.5 rounded hover:bg-slate-700/60 transition-all cursor-pointer truncate max-w-[140px]"
                title="클릭하여 내 상세 연습 기록(총 연습 시간, 정확도 점수, 세션 기록) 보기"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{user.displayName}</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-[11px] text-rose-300 hover:text-white hover:bg-rose-600/60 px-1.5 py-0.5 rounded transition-colors font-bold whitespace-nowrap"
                title="로그아웃 및 세션 종료"
              >
                <LogOut className="w-3 h-3" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 shrink-0">
              {/* Login Button with Google mark */}
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 px-2.5 h-8 rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95 whitespace-nowrap shrink-0"
                title="구글 계정으로만 로그인할 수 있으며, 로그인하지 않은 사용자의 연습 데이터는 서버에 저장되지 않습니다."
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>구글 로그인</span>
              </button>
            </div>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 h-8 shrink-0">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0 hidden sm:inline" />
            {(['ko', 'my', 'vi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onSelectLang(lang)}
                className={`px-1.5 h-7 flex items-center justify-center font-bold text-xs whitespace-nowrap rounded transition-colors shrink-0 leading-none ${
                  currentLang === lang
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {lang === 'ko' ? '한국어' : lang === 'my' ? 'မြန်မာ' : 'Tiếng Việt'}
              </button>
            ))}
          </div>

          {/* Reset button */}
          <button
            onClick={onResetSession}
            title={t.reset_records}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* For Guest (Non-logged-in): Keep End & Download TXT button */}
          {!user && (
            <button
              onClick={onOpenDownloadModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 h-8 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
              title="비로그인 사용자: 당일 연습 결과를 파일로 즉시 저장"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">{t.end_and_download}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
