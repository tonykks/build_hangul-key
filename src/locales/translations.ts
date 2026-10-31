import { Language } from '../types/practice';

export interface TranslationSchema {
  app_title: string;
  app_subtitle: string;
  rhythm_principle: string;
  rhythm_kung: string;
  rhythm_jjak: string;
  select_set: string;
  select_key: string;
  target_key: string;
  input_instruction: string;
  auto_newline_note: string;
  wrong_note: string;
  shift_rule_left: string;
  shift_rule_right: string;
  yu_exception_title: string;
  yu_exception_desc: string;
  music_label: string;
  music_play: string;
  music_pause: string;
  music_track: string;
  end_and_download: string;
  start_time: string;
  not_started: string;
  wrong_count: string;
  total_inputs: string;
  current_line: string;
  home_keys_tip: string;
  download_confirm_title: string;
  download_confirm_desc: string;
  download_now: string;
  cancel: string;
  reset_records: string;
  reset_confirm: string;
  // Set names
  set1_name: string;
  set1_desc: string;
  set2_name: string;
  set2_desc: string;
  set3_name: string;
  set3_desc: string;
  set4_name: string;
  set4_desc: string;
  set5_name: string;
  set5_desc: string;
  set6_name: string;
  set6_desc: string;
  set7_name: string;
  set7_desc: string;
  set8_name: string;
  set8_desc: string;
  set9_name: string;
  set9_desc: string;
  set10_name: string;
  set10_desc: string;
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  ko: {
    app_title: '한글 글쇠·손가락 기초 연습',
    app_subtitle: '두벌식 키보드 글쇠 위치와 올바른 손가락 복귀 습관 연습',
    rhythm_principle: '2/4박자 리듬: 쿵(글쇠 누름) ➔ 짝(손가락 기본자리 복귀)',
    rhythm_kung: '쿵: 해당 글쇠를 누릅니다.',
    rhythm_jjak: '짝: 글쇠를 놓고 손가락을 기본 자리(F, J)로 돌려놓습니다.',
    select_set: '연습 세트 선택',
    select_key: '연습할 글쇠 선택',
    target_key: '현재 연습 글쇠',
    input_instruction: '키보드로 글쇠를 누르면 자동으로 기록됩니다. 소리 내어 글쇠 이름을 말하며 연습하세요.',
    auto_newline_note: '20회 입력마다 자동으로 다음 줄로 이동합니다. (Enter 키 필요 없음)',
    wrong_note: '잘못 누른 글자는 빨간색으로 표시되며 1회 입력으로 계산됩니다.',
    shift_rule_left: '【왼손 글쇠】 오른쪽 Shift를 먼저 누른 상태에서 글쇠를 누르고, 두 손가락 모두 기본 자리로 복귀합니다.',
    shift_rule_right: '【오른손 글쇠】 왼쪽 Shift를 먼저 누른 상태에서 글쇠를 누르고, 두 손가락 모두 기본 자리로 복귀합니다.',
    yu_exception_title: 'ㅠ(B) 글쇠 특별 안내',
    yu_exception_desc: 'ㅠ는 모음이지만, 두벌식 자판 배열 구조상 한컴타자와 동일하게 【왼손 검지】로 누릅니다.',
    music_label: '연습 음악',
    music_play: '재생',
    music_pause: '정지',
    music_track: '음악 선택',
    end_and_download: '종료 및 TXT 저장',
    start_time: '연습 시작 시각',
    not_started: '첫 글쇠를 누르면 시작됩니다',
    wrong_count: '오답 수',
    total_inputs: '총 입력 수',
    current_line: '현재 줄',
    home_keys_tip: '초록색 테두리의 F(ㄹ)와 J(ㅓ)는 양손 검지의 기준 자리입니다.',
    download_confirm_title: '연습을 종료하고 결과를 저장할까요?',
    download_confirm_desc: '지금까지 연습한 모든 글쇠의 결과가 TXT 파일로 다운로드됩니다.',
    download_now: '결과 다운로드 및 종료',
    cancel: '계속 연습하기',
    reset_records: '기록 초기화',
    reset_confirm: '지금까지의 모든 연습 기록을 지우고 새로 시작하시겠습니까?',
    set1_name: '1세트: 기본자리 왼손',
    set1_desc: '왼손 네 손가락의 기본 자리 (ㄹ, ㅇ, ㄴ, ㅁ)',
    set2_name: '2세트: 기본자리 오른손',
    set2_desc: '오른손 네 손가락의 기본 자리 (ㅓ, ㅏ, ㅣ, ;)',
    set3_name: '3세트: 윗자리 왼손',
    set3_desc: '왼손 손가락을 위로 뻗어 누르기 (ㄱ, ㄷ, ㅈ, ㅂ)',
    set4_name: '4세트: 윗자리 오른손',
    set4_desc: '오른손 손가락을 위로 뻗어 누르기 (ㅕ, ㅑ, ㅐ, ㅔ)',
    set5_name: '5세트: 아랫자리 왼손',
    set5_desc: '왼손 손가락을 아래로 내려 누르기 (ㅍ, ㅊ, ㅌ, ㅋ)',
    set6_name: '6세트: 아랫자리 오른손',
    set6_desc: '오른손 손가락을 아래로 내려 누르기 (ㅡ, ,, ., /)',
    set7_name: '7세트: 가운데자리 왼쪽 열',
    set7_desc: '왼손 검지를 오른쪽으로 뻗어 누르기 (ㅎ, ㅅ, ㅠ)',
    set8_name: '8세트: 가운데자리 오른쪽 열',
    set8_desc: '오른손 검지를 왼쪽으로 뻗어 누르기 (ㅗ, ㅛ, ㅜ)',
    set9_name: '9세트: Shift + 왼손 윗자리',
    set9_desc: '오른쪽 Shift를 누른 채 왼손으로 누르기 (ㅃ, ㅉ, ㄸ, ㄲ, ㅆ)',
    set10_name: '10세트: Shift + 오른손 윗자리',
    set10_desc: '왼쪽 Shift를 누른 채 오른손으로 누르기 (ㅛ, ㅕ, ㅑ, ㅒ, ㅖ)',
  },
  my: {
    app_title: 'ကိုရီးယား ကီးဘုတ်နှင့် လက်ချောင်း အခြေခံ လေ့ကျင့်ခန်း',
    app_subtitle: 'ဟန်ဂူ ကီးဘုတ် နေရာနှင့် မှန်ကန်သော လက်ချောင်း အနေအထား အလေ့အကျင့်',
    rhythm_principle: '၂/၄ စည်းဝါး - ကွန်း (ကီးနှိပ်ပါ) ➔ ကျတ် (မူလနေရာ ပြန်ထားပါ)',
    rhythm_kung: 'ကွန်း: ကီးကို နှိပ်ပါ။',
    rhythm_jjak: 'ကျတ်: မူလနေရာ(F, J) ပြန်ထားပါ။',
    select_set: 'လေ့ကျင့်ခန်း အတွဲ ရွေးချယ်ပါ',
    select_key: 'လေ့ကျင့်မည့် ကီး ရွေးပါ',
    target_key: 'လက်ရှိ လေ့ကျင့်နေသော ကီး',
    input_instruction: 'ကီးဘုတ်တွင် နှိပ်လျှင် အလိုအလျောက် မှတ်တမ်းတင်ပါမည်။ အသံထွက်၍ ဆိုရင်း လေ့ကျင့်ပါ။',
    auto_newline_note: 'အကြိမ် ၂၀ ပြည့်လျှင် အလိုအလျောက် နောက်တစ်ကြောင်း ကူးပါမည်။',
    wrong_note: 'မှားနှိပ်သော စာလုံးများကို အနီရောင်ဖြင့် ပြသပြီး ၁ ကြိမ်အဖြစ် ရေတွက်ပါမည်။',
    shift_rule_left: '【ဘယ်လက် ကီး】 ညာဘက် Shift ကို အရင်ဖိထားပြီး ကီးကို နှိပ်ပါ။ ပြီးလျှင် လက်နှစ်ဖက်လုံး မူလနေရာသို့ ပြန်ထားပါ။',
    shift_rule_right: '【ညာလက် ကီး】 ဘယ်ဘက် Shift ကို အရင်ဖိထားပြီး ကီးကို နှိပ်ပါ။ ပြီးလျှင် လက်နှစ်ဖက်လုံး မူလနေရာသို့ ပြန်ထားပါ။',
    yu_exception_title: 'ㅠ (B) ကီး အထူး လမ်းညွှန်ချက်',
    yu_exception_desc: 'ㅠ သည် သရ ဖြစ်သော်လည်း ကီးဘုတ် ဖွဲ့စည်းပုံအရ 【ဘယ်လက် လက်ညှိုး】 ဖြင့် နှိပ်ရပါမည်။',
    music_label: 'တေးဂီတ',
    music_play: 'ဖွင့်မည်',
    music_pause: 'ရပ်မည်',
    music_track: 'တေးဂီတ ရွေးပါ',
    end_and_download: 'ရလဒ် ဒေါင်းလုဒ် (TXT)',
    start_time: 'စတင်ချိန်',
    not_started: 'ပထမဆုံး ကီးကို နှိပ်လိုက်သည်နှင့် စတင်ပါမည်',
    wrong_count: 'အမှား အရေအတွက်',
    total_inputs: 'စုစုပေါင်း အကြိမ်ရေ',
    current_line: 'လက်ရှိ အကြောင်း',
    home_keys_tip: 'အစိမ်းရောင် အနားကွပ်ရှိသော F(ㄹ) နှင့် J(ㅓ) သည် လက်ညှိုးနှစ်ဖက်၏ အခြေခံ နေရာဖြစ်ပါသည်။',
    download_confirm_title: 'လေ့ကျင့်ခန်း ရပ်နားပြီး ရလဒ်ကို သိမ်းဆည်းမလား?',
    download_confirm_desc: 'ယခုထိ လေ့ကျင့်ထားသော ကီးများအားလုံး၏ ရလဒ်ကို TXT ဖိုင်ဖြင့် ဒေါင်းလုဒ်လုပ်ပါမည်။',
    download_now: 'ဒေါင်းလုဒ်လုပ်ပြီး အဆုံးသတ်မည်',
    cancel: 'ဆက်လက် လေ့ကျင့်မည်',
    reset_records: 'မှတ်တမ်း ရှင်းလင်းမည်',
    reset_confirm: 'မှတ်တမ်းဟောင်းများကို အားလုံးဖျက်ပြီး အစမှ ပြန်စမလား?',
    set1_name: 'အတွဲ ၁: မူလနေရာ ဘယ်လက်',
    set1_desc: 'ဘယ်လက် ၄ ချောင်း၏ မူလနေရာ (ㄹ, ㅇ, ㄴ, ㅁ)',
    set2_name: 'အတွဲ ၂: မူလနေရာ ညာလက်',
    set2_desc: 'ညာလက် ၄ ချောင်း၏ မူလနေရာ (ㅓ, ㅏ, ㅣ, ;)',
    set3_name: 'အတွဲ ၃: အပေါ်တန်း ဘယ်လက်',
    set3_desc: 'ဘယ်လက်ချောင်း အပေါ်တန်း သို့ ဆန့်နှိပ်ခြင်း (ㄱ, ㄷ, ㅈ, ㅂ)',
    set4_name: 'အတွဲ ၄: အပေါ်တန်း ညာလက်',
    set4_desc: 'ညာလက်ချောင်း အပေါ်တန်း သို့ ဆန့်နှိပ်ခြင်း (ㅕ, ㅑ, ㅐ, ㅔ)',
    set5_name: 'အတွဲ ၅: အောက်တန်း ဘယ်လက်',
    set5_desc: 'ဘယ်လက်ချောင်း အောက်တန်း သို့ ချနှိပ်ခြင်း (ㅍ, ㅊ, ㅌ, ㅋ)',
    set6_name: 'အတွဲ ၆: အောက်တန်း ညာလက်',
    set6_desc: 'ညာလက်ချောင်း အောက်တန်း သို့ ချနှိပ်ခြင်း (ㅡ, ,, ., /)',
    set7_name: 'အတွဲ ၇: အလယ်တန်း ဘယ်ဘက်ကော်လံ',
    set7_desc: 'ဘယ်လက် လက်ညှိုးကို ညာဘက်သို့ ဆန့်နှိပ်ခြင်း (ㅎ, ㅅ, ㅠ)',
    set8_name: 'အတွဲ ၈: အလယ်တန်း ညာဘက်ကော်လံ',
    set8_desc: 'ညာလက် လက်ညှိုးကို ဘယ်ဘက်သို့ ဆန့်နှိပ်ခြင်း (ㅗ, ㅛ, ㅜ)',
    set9_name: 'အတွဲ ၉: Shift + ဘယ်လက် အပေါ်တန်း',
    set9_desc: 'ညာဘက် Shift ကို ဖိထားပြီး ဘယ်လက်ဖြင့် နှိပ်ခြင်း (ㅃ, ㅉ, ㄸ, ㄲ, ㅆ)',
    set10_name: 'အတွဲ ၁၀: Shift + ညာလက် အပေါ်တန်း',
    set10_desc: 'ဘယ်ဘက် Shift ကို ဖိထားပြီး ညာလက်ဖြင့် နှိပ်ခြင်း (ㅛ, ㅕ, ㅑ, ㅒ, ㅖ)',
  },
  vi: {
    app_title: 'Luyện gõ phím & ngón tay tiếng Hàn cơ bản',
    app_subtitle: 'Luyện vị trí phím bàn phím 2-beol-sik và thói quen đưa ngón tay về vị trí chuẩn',
    rhythm_principle: 'Nhịp điệu 2/4: Cung (Nhấn phím) ➔ Chát (Đưa ngón tay về vị trí chuẩn)',
    rhythm_kung: 'Cung: Nhấn phím tương ứng.',
    rhythm_jjak: 'Chát: Thả phím và đưa ngón tay về vị trí chuẩn (F, J).',
    select_set: 'Chọn bộ bài tập',
    select_key: 'Chọn phím cần luyện',
    target_key: 'Phím đang luyện',
    input_instruction: 'Gõ phím trên bàn phím vật lý để tự động ghi nhận. Hãy đọc to tên phím khi gõ.',
    auto_newline_note: 'Tự động xuống dòng sau mỗi 20 lần gõ (Không cần nhấn phím Enter).',
    wrong_note: 'Ký tự gõ sai sẽ hiển thị màu đỏ và vẫn tính là 1 lần gõ.',
    shift_rule_left: '【Phím tay trái】 Giữ Shift bên phải trước, nhấn phím cần gõ, sau đó thả cả hai và đưa ngón tay về vị trí chuẩn.',
    shift_rule_right: '【Phím tay phải】 Giữ Shift bên trái trước, nhấn phím cần gõ, sau đó thả cả hai và đưa ngón tay về vị trí chuẩn.',
    yu_exception_title: 'Lưu ý đặc biệt cho phím ㅠ (B)',
    yu_exception_desc: 'Dù ㅠ là nguyên âm, theo cấu trúc bàn phím tiếng Hàn chuẩn, hãy dùng 【ngón trỏ tay trái】 để nhấn.',
    music_label: 'Âm nhạc',
    music_play: 'Phát',
    music_pause: 'Dừng',
    music_track: 'Chọn nhạc',
    end_and_download: 'Kết thúc & Tải (TXT)',
    start_time: 'Thời gian bắt đầu',
    not_started: 'Bắt đầu khi bạn nhấn phím đầu tiên',
    wrong_count: 'Số lần sai',
    total_inputs: 'Tổng số lần gõ',
    current_line: 'Dòng hiện tại',
    home_keys_tip: 'Phím F(ㄹ) và J(ㅓ) có viền màu xanh lá là vị trí chuẩn cố định của hai ngón trỏ.',
    download_confirm_title: 'Kết thúc bài luyện và lưu kết quả?',
    download_confirm_desc: 'Toàn bộ kết quả các phím bạn đã luyện tập sẽ được tải về dưới dạng tệp TXT.',
    download_now: 'Tải kết quả & Kết thúc',
    cancel: 'Tiếp tục luyện tập',
    reset_records: 'Xóa kết quả cũ',
    reset_confirm: 'Bạn có muốn xóa toàn bộ kết quả đã luyện và bắt đầu lại từ đầu không?',
    set1_name: 'Bộ 1: Hàng cơ sở tay trái',
    set1_desc: 'Bốn ngón tay trái ở hàng cơ sở (ㄹ, ㅇ, ㄴ, ㅁ)',
    set2_name: 'Bộ 2: Hàng cơ sở tay phải',
    set2_desc: 'Bốn ngón tay phải ở hàng cơ sở (ㅓ, ㅏ, ㅣ, ;)',
    set3_name: 'Bộ 3: Hàng trên tay trái',
    set3_desc: 'Ngón tay trái vươn lên hàng trên (ㄱ, ㄷ, ㅈ, ㅂ)',
    set4_name: 'Bộ 4: Hàng trên tay phải',
    set4_desc: 'Ngón tay phải vươn lên hàng trên (ㅕ, ㅑ, ㅐ, ㅔ)',
    set5_name: 'Bộ 5: Hàng dưới tay trái',
    set5_desc: 'Ngón tay trái hạ xuống hàng dưới (ㅍ, ㅊ, ㅌ, ㅋ)',
    set6_name: 'Bộ 6: Hàng dưới tay phải',
    set6_desc: 'Ngón tay phải hạ xuống hàng dưới (ㅡ, ,, ., /)',
    set7_name: 'Bộ 7: Cột giữa bên trái',
    set7_desc: 'Ngón trỏ trái vươn sang phải (ㅎ, ㅅ, ㅠ)',
    set8_name: 'Bộ 8: Cột giữa bên phải',
    set8_desc: 'Ngón trỏ phải vươn sang trái (ㅗ, ㅛ, ㅜ)',
    set9_name: 'Bộ 9: Shift + Hàng trên tay trái',
    set9_desc: 'Giữ Shift phải và gõ bằng tay trái (ㅃ, ㅉ, ㄸ, ㄲ, ㅆ)',
    set10_name: 'Bộ 10: Shift + Hàng trên tay phải',
    set10_desc: 'Giữ Shift trái và gõ bằng tay phải (ㅛ, ㅕ, ㅑ, ㅒ, ㅖ)',
  },
};
