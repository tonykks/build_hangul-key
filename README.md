# 한글 글쇠·손가락 기초 연습 프로그램 (build_hangul-key)

제주관광대학교 요양보호사 양성과정 외국인 유학생(미얀마 39명, 베트남 1명)을 위한 한글 두벌식 키보드 글쇠 위치와 올바른 손가락 사용 습관(2/4 박자: 쿵 타건, 짝 기본자리 복귀) 훈련 웹 프로그램입니다.

---

## 🌟 주요 특징 및 기능

1. **10개 체계적 연습 세트**:
   - 1~2세트: 기본자리(왼손 `ㅁ,ㄴ,ㅇ,ㄹ` / 오른손 `ㅓ,ㅏ,ㅣ,;`)
   - 3~4세트: 윗자리(왼손 `ㅂ,ㅈ,ㄷ,ㄱ` / 오른손 `ㅕ,ㅑ,ㅐ,ㅔ`)
   - 5~6세트: 아랫자리(왼손 `ㅋ,ㅌ,ㅊ` / 오른손 `ㅡ,ㅜ`)
   - 7~8세트: 가운데자리(왼쪽 열 `ㅅ,ㅎ,ㅍ` / 오른쪽 열 `ㅛ,ㅗ,ㅜ,ㅠ`)
   - 9~10세트: Shift 조합 자리(왼손 `ㅃ,ㅉ,ㄸ,ㄲ,ㅆ` / 오른손 `ㅒ,ㅖ`)
2. **리듬 타건 및 반대쪽 Shift 원칙**:
   - `쿵`: 지정된 손가락으로 글쇠 타건
   - `짝`: 손가락을 떼고 기본자리(F/J 홈키)로 즉각 복귀
   - 9, 10세트 Shift 타건 시 **반대쪽 Shift** 사용 원칙 완벽 준수(왼손 글쇠 ➔ 오른쪽 Shift, 오른손 글쇠 ➔ 왼쪽 Shift)
3. **오답 처리 & 실시간 피드백**:
   - 잘못 입력 시 빨간색 표시 및 1회 부드러운 경고 비프음
   - 20자 입력 시 자동 줄바꿈 (Enter 키 입력 불필요)
4. **글로벌 다국어 지원**:
   - 한국어 (KO), 미얀마어 (MY), 베트남어 (VI) 3개 국어 UI 지원
5. **학습자 랭킹 및 연습 기록 관리 (Firebase Firestore 연동)**:
   - Google 계정 연동 및 학생별 맞춤 별칭 설정
   - 누적 연습 시간 순위 Top 5 표시 (학생 랭킹 클릭 시 상세 연습 통계 확인)
   - 관리자 전용 뷰 및 데이터 관리
6. **결과 다운로드**:
   - 연습 종료 시 시작 시각 기준 `YYYYMMDD_HHMM.txt` 파일로 전체 글쇠별 타건 수 및 오답 수 자동 생성/저장

---

## 🚀 배포(Deployment) 안내

본 프로젝트는 React + Vite SPA 기반으로 제작되었으며, GitHub Pages 및 클라우드 호스팅에 바로 배포될 수 있도록 최적화되어 있습니다.

### 1. GitHub Pages 자동 배포 (GitHub Actions 연동 완료)
저장소의 `.github/workflows/deploy.yml` 파일에 자동 빌드 및 배포 워크플로우가 구성되어 있습니다:
1. GitHub 저장소(`build_hangul-key`)로 코드를 Push합니다.
2. GitHub 저장소 상단 **Settings** 탭으로 이동합니다.
3. 좌측 메뉴에서 **Pages**를 클릭합니다.
4. **Build and deployment > Source**를 **`GitHub Actions`**로 선택합니다.
5. `main` 또는 `master` 브랜치에 코드가 푸시되면 자동으로 `npm run build`가 실행되어 `https://<깃허브-아이디>.github.io/build_hangul-key/` 주소로 즉시 무료 배포됩니다.

### 2. Google Cloud Run 실시간 호스팅 (AI Studio 호스팅)
현재 AI Studio 환경을 통해 Google Cloud Run 실시간 서버에서 이미 가동 중입니다:
- **실시간 호스팅 주소**: `https://ais-pre-k5hc4mtkpxw4roiky3zvrv-173639681965.asia-northeast1.run.app`

---

## 🔒 보안 및 환경변수 (.gitignore / .env)

- `.gitignore` 설정을 통해 `.env`, `.env.local`, 임시 파일, `node_modules/`, `dist/`, 내부 `.aistudio/` 캐시 등이 저장소에 노출되지 않도록 철저히 차단되어 있습니다.
- 필요한 환경변수는 `.env.example`을 참고하여 설정할 수 있습니다.

---

## 🎵 배경 음악(MP3) 추가 안내

본 프로그램은 `public/musics/` 디렉터리에 위치한 음원 파일을 참조합니다:
1. 2/4 박자 MP3 음원 파일을 `public/musics/` 폴더에 복사합니다. (예: `public/musics/track5.mp3`)
2. `src/constants/keyboardSets.ts` 파일의 `MUSIC_TRACKS` 배열에 해당 트랙 정보를 추가합니다.
