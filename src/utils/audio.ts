// Audio utility for error beep (Web Audio API) and music playback

class SoundManager {
  private ctx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private currentTrackSrc: string = '';
  private isMuted: boolean = false;
  private volume: number = 0.6;

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

  // Music Player methods
  public initMusic(src: string): void {
    if (typeof window === 'undefined') return;
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true; // A13: 음악 자동 반복 재생
      this.audioElement.volume = this.volume;
    }
    if (this.currentTrackSrc !== src) {
      this.currentTrackSrc = src;
      this.audioElement.src = src;
    }
  }

  public async playMusic(src?: string): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const track = src || this.currentTrackSrc;
    if (!track) return false;

    this.initMusic(track);
    if (!this.audioElement) return false;

    try {
      this.audioElement.volume = this.volume;
      this.audioElement.loop = true;
      await this.audioElement.play();
      return true;
    } catch (err) {
      console.warn('Audio play prevented or file not ready:', err);
      return false;
    }
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
