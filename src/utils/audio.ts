export interface PlayMusicResult {
  success: boolean;
  reason?: 'autoplay_blocked' | 'load_error' | 'unsupported' | 'unknown';
  errorMessage?: string;
  attemptedUrls?: string[];
  finalUrl?: string;
}

class SoundManager {
  private ctx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private currentTrackSrc: string = '';
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private errorListenerBound: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play short error warning beep (A04: 오답 빨간색 표시 및 경고음)
  public playErrorBeep(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // Low A note (220 Hz warning sound)
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio might be blocked by browser policy until interaction
    }
  }

  public getCandidateUrls(src: string): string[] {
    if (!src) return [];
    if (
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('data:') ||
      src.startsWith('blob:')
    ) {
      return [src];
    }

    const cleanPath = src.split(/[?#]/)[0];
    const filename = cleanPath.split('/').pop() || 'track1.mp3';
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;

    const candidates: string[] = [
      // 1. Vite BASE_URL path (e.g. /build_hangul-key/musics/track1.mp3)
      `${cleanBase}musics/${filename}`,
      // 2. Relative path (e.g. ./musics/track1.mp3)
      `./musics/${filename}`,
      // 3. Simple relative path
      `musics/${filename}`,
    ];

    if (typeof window !== 'undefined') {
      try {
        // 4. Absolute URL resolved with window.location.href
        const resolvedUrl = new URL(`${cleanBase}musics/${filename}`, window.location.href).href;
        candidates.push(resolvedUrl);
        const relativeUrl = new URL(`./musics/${filename}`, window.location.href).href;
        candidates.push(relativeUrl);
      } catch {
        // ignore url parse error
      }
      // 5. Root domain path fallback
      candidates.push(`/musics/${filename}`);
    }

    return Array.from(new Set(candidates.filter(Boolean)));
  }

  public resolveAudioUrl(src: string): string {
    const candidates = this.getCandidateUrls(src);
    return candidates[0] || src;
  }

  // Music Player methods
  public initMusic(src: string): void {
    if (typeof window === 'undefined') return;
    const candidates = this.getCandidateUrls(src);
    const primarySrc = candidates[0] || src;

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
      this.audioElement.preload = 'auto';

      if (!this.errorListenerBound) {
        this.errorListenerBound = true;
        this.audioElement.addEventListener('error', (e) => {
          const mediaError = this.audioElement?.error;
          console.error('[오디오 로드 에러 이벤트 (Audio Error Event)]', {
            code: mediaError?.code,
            message: mediaError?.message,
            currentSrc: this.audioElement?.currentSrc,
            event: e,
          });
        });
      }
    }

    if (this.currentTrackSrc !== primarySrc) {
      this.currentTrackSrc = primarySrc;
      this.audioElement.src = primarySrc;
    }
  }

  public async playMusic(src?: string): Promise<PlayMusicResult> {
    if (typeof window === 'undefined') {
      return { success: false, reason: 'unknown', errorMessage: 'Window not found' };
    }

    // Try unlocking Web Audio context
    try {
      const ctx = this.getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        await ctx.resume().catch(() => {});
      }
    } catch {}

    const rawSrc = src || this.currentTrackSrc || 'musics/track1.mp3';
    const candidates = this.getCandidateUrls(rawSrc);

    if (!this.audioElement) {
      this.initMusic(rawSrc);
    }
    if (!this.audioElement) {
      return { success: false, reason: 'unknown', errorMessage: 'Audio element initialization failed' };
    }

    let lastError: any = null;
    let isAutoplayBlocked = false;

    // Try each candidate URL in order
    for (let i = 0; i < candidates.length; i++) {
      const candidateUrl = candidates[i];
      try {
        if (this.audioElement.src !== candidateUrl) {
          this.audioElement.src = candidateUrl;
        }
        this.audioElement.volume = this.volume;
        this.audioElement.loop = true;

        await this.audioElement.play();

        // Successful playback
        this.currentTrackSrc = candidateUrl;
        return {
          success: true,
          finalUrl: candidateUrl,
          attemptedUrls: candidates.slice(0, i + 1),
        };
      } catch (err: any) {
        lastError = err;
        console.warn(`[Audio] Candidate ${i + 1}/${candidates.length} failed (${candidateUrl}):`, err);

        // Check for browser autoplay policy restriction
        if (
          err.name === 'NotAllowedError' ||
          (err.message && err.message.toLowerCase().includes('gesture')) ||
          (err.message && err.message.toLowerCase().includes('interact'))
        ) {
          isAutoplayBlocked = true;
          // Retrying other URLs will not bypass autoplay gesture requirement
          break;
        }
      }
    }

    const failureResult: PlayMusicResult = {
      success: false,
      reason: isAutoplayBlocked ? 'autoplay_blocked' : 'load_error',
      errorMessage:
        lastError?.message ||
        (isAutoplayBlocked
          ? '브라우저 자동 재생 정책 차단 (사용자 상호작용 필요)'
          : '오디오 파일 로드 실패 (404 Not Found 또는 지원하지 않는 형식)'),
      attemptedUrls: candidates,
      finalUrl: candidates[0],
    };

    console.error('[오디오 재생 실패 (Audio Playback Error)]', {
      isAutoplayBlocked,
      errorName: lastError?.name,
      errorMessage: lastError?.message,
      attemptedCandidates: candidates,
      currentTrackSrc: this.currentTrackSrc,
    });

    return failureResult;
  }

  public pauseMusic(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const soundManager = new SoundManager();
