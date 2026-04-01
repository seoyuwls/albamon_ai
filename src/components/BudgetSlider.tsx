import styles from './BudgetSlider.module.css';

const RANGE_MIN = 0;
const RANGE_MAX = 300000;
const STEP = 10000;

const QUICK_OPTIONS = [
  { label: '1만원 이하',   min: 0,       max: 10000  },
  { label: '1~2만원',     min: 10000,   max: 20000  },
  { label: '2~4만원',     min: 20000,   max: 40000  },
  { label: '4~7만원',     min: 40000,   max: 70000  },
  { label: '7~10만원',    min: 70000,   max: 100000 },
  { label: '10만원 이상', min: 100000,  max: 300000 },
];

interface BudgetSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

function formatWon(val: number): string {
  if (val === 0) return '0원';
  if (val >= 10000) return `${val / 10000}만원`;
  return `${val.toLocaleString()}원`;
}

export default function BudgetSlider({ min, max, onChange }: BudgetSliderProps) {
  const minPct = (min / RANGE_MAX) * 100;
  const maxPct = (max / RANGE_MAX) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange(Math.min(val, max - STEP), max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange(min, Math.max(val, min + STEP));
  };

  const handleQuick = (qMin: number, qMax: number) => {
    onChange(qMin, qMax);
  };

  const isActive = (qMin: number, qMax: number) => min === qMin && max === qMax;

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>희망 가격</label>

      {/* 선택된 범위 표시 */}
      <div className={styles.rangeDisplay}>
        {formatWon(min)} — {formatWon(max)}
      </div>

      {/* 슬라이더 */}
      <div className={styles.sliderContainer}>
        {/* 트랙 배경 */}
        <div className={styles.trackBg} />
        {/* 채워진 트랙 */}
        <div
          className={styles.trackFill}
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />
        {/* Min handle */}
        <input
          type="range"
          className={styles.rangeInput}
          min={RANGE_MIN}
          max={RANGE_MAX}
          step={STEP}
          value={min}
          onChange={handleMinChange}
        />
        {/* Max handle */}
        <input
          type="range"
          className={styles.rangeInput}
          min={RANGE_MIN}
          max={RANGE_MAX}
          step={STEP}
          value={max}
          onChange={handleMaxChange}
        />
      </div>

      {/* 최솟값/최댓값 레이블 */}
      <div className={styles.trackLabels}>
        <span>0원</span>
        <span>30만원</span>
      </div>

      {/* 퀵 선택 버튼 */}
      <div className={styles.quickOptions}>
        {QUICK_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            type="button"
            className={`${styles.quickBtn} ${isActive(opt.min, opt.max) ? styles.quickBtnActive : ''}`}
            onClick={() => handleQuick(opt.min, opt.max)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}