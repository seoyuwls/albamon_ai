import { Product } from '../types';
import styles from './EffectChart.module.css';

interface EffectChartProps {
  products: Product[];
}

const MAX_MULTIPLIER = 6;

export default function EffectChart({ products }: EffectChartProps) {
  const rows = [
    { label: '무료등록 (기준)', multiplier: 1.0, isBaseline: true },
    ...products.map((p) => ({
      label: p.name,
      multiplier: p.applicantMultiplier,
      isBaseline: false,
      tag: p.tag,
    })),
  ];

  return (
    <div className={styles.chart}>
      <div className={styles.chartTitle}>
        <span className={styles.icon}>📊</span>
        무료등록 대비 지원자 유입 효과
      </div>
      <div className={styles.rows}>
        {rows.map((row) => (
          <div key={row.label} className={`${styles.row} ${row.isBaseline ? styles.baseline : ''}`}>
            <span className={styles.rowLabel}>{row.label}</span>
            <div className={styles.barWrap}>
              <div
                className={`${styles.bar} ${row.isBaseline ? styles.barGray : styles.barOrange}`}
                style={{ width: `${(row.multiplier / MAX_MULTIPLIER) * 100}%` }}
              />
            </div>
            <span className={`${styles.multiplier} ${row.isBaseline ? '' : styles.multiplierActive}`}>
              {row.multiplier.toFixed(1)}배
            </span>
          </div>
        ))}
      </div>
      <p className={styles.note}>* 무료등록 대비 평균 지원자 유입 기준</p>
    </div>
  );
}