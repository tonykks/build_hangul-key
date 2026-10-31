import { SessionData, KeyRecord } from '../types/practice';
import { PRACTICE_SETS } from '../constants/keyboardSets';

function formatDateTime(d: Date): { display: string; filePrefix: string } {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  return {
    display: `${yyyy}.${mm}.${dd}.${hh}:${min}`,
    filePrefix: `${yyyy}${mm}${dd}_${hh}${min}`,
  };
}

export function generateTxtReport(session: SessionData, endTime: Date): { content: string; filename: string } {
  const startDate = session.startTime ? new Date(session.startTime) : endTime;
  const startFormatted = formatDateTime(startDate);
  const endFormatted = formatDateTime(endTime);

  const lines: string[] = [];
  lines.push(`연습 시작 시간: ${startFormatted.display}`);
  lines.push('');

  // Collect records in the defined order of sets and keys
  const sortedRecords: KeyRecord[] = [];
  
  for (const set of PRACTICE_SETS) {
    for (const key of set.keys) {
      const rec = session.records[key.id];
      if (rec && rec.items && rec.items.length > 0) {
        sortedRecords.push(rec);
      }
    }
  }

  // Also catch any orphan records not in predefined sets if any
  for (const [keyId, rec] of Object.entries(session.records)) {
    if (!sortedRecords.some(r => r.keyId === keyId) && rec.items.length > 0) {
      sortedRecords.push(rec);
    }
  }

  if (sortedRecords.length === 0) {
    lines.push('(연습 기록이 없습니다)');
    lines.push('');
  } else {
    for (const rec of sortedRecords) {
      const setDef = PRACTICE_SETS.find(s => s.id === rec.setId);
      const setName = setDef ? setDef.name.replace(/^[0-9]+세트:\s*/, '') : '';
      const headerTitle = setName ? `${setName} "${rec.keyChar}"` : `글쇠 "${rec.keyChar}"`;

      lines.push(headerTitle);

      const items = rec.items;
      const chunkSize = 20;
      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        const chars = chunk.map(item => item.char).join('');
        const wrongCount = chunk.filter(item => !item.isCorrect).length;
        lines.push(`${chars} : -${wrongCount}`);
      }
      lines.push('');
    }
  }

  lines.push(`연습 종료 시간: ${endFormatted.display}`);

  const content = lines.join('\n');
  const filename = `${startFormatted.filePrefix}.txt`;

  return { content, filename };
}

export function downloadTxtFile(content: string, filename: string): void {
  // Use UTF-8 BOM so Notepad and Windows Chrome open Korean text cleanly
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
