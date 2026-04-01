import { Product } from '../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const TAG_CLASS: Record<string, string> = {
  red: styles.tagRed,
  orange: styles.tagOrange,
  blue: styles.tagBlue,
};

export default function ProductCard({ product }: ProductCardProps) {
  const { min, max } = product.estimatedApplicants;

  return (
    <div className={`${styles.card} ${product.isTopPick ? styles.topCard : ''}`}>
      {product.isTopPick && (
        <div className={styles.topBadge}>AI 최우선 추천</div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.nameRow}>
          {product.tag && (
            <span className={`${styles.tag} ${product.tagColor ? TAG_CLASS[product.tagColor] : ''}`}>
              {product.tag}
            </span>
          )}
          <h3 className={styles.name}>{product.name}</h3>
        </div>
        <div className={styles.price}>
          {product.pricePerDay.toLocaleString()}
          <span className={styles.priceUnit}>{product.priceUnit}</span>
        </div>
      </div>

      {/* Top pick: applicant guarantee */}
      {product.isTopPick && (
        <div className={styles.guarantee}>
          <span className={styles.guaranteeIcon}>👥</span>
          <span>
            <strong>{min}~{max}명</strong> 지원자 예상
          </span>
        </div>
      )}

      {/* ROI Row */}
      <div className={styles.roiRow}>
        <div className={styles.roiItem}>
          <span className={styles.roiLabel}>지원 효과</span>
          <span className={styles.roiValue}>{product.applicantMultiplier.toFixed(1)}배</span>
        </div>
        <div className={styles.roiDivider} />
        <div className={styles.roiItem}>
          <span className={styles.roiLabel}>지원자당 비용</span>
          <span className={styles.roiValue}>
            약 {product.costPerApplicant.toLocaleString()}원
          </span>
        </div>
        <div className={styles.roiDivider} />
        <div className={styles.roiItem}>
          <span className={styles.roiLabel}>예상 지원자</span>
          <span className={styles.roiValue}>{min}~{max}명</span>
        </div>
      </div>

      {/* Highlights */}
      <ul className={styles.highlights}>
        {product.highlights.map((h, i) => (
          <li key={i} className={styles.highlight}>
            <span className={styles.checkIcon}>✓</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Platforms */}
      <div className={styles.platforms}>
        {product.platforms.map((p) => (
          <span key={p} className={styles.platform}>{p}</span>
        ))}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.detailBtn}>상세</button>
        <button className={`${styles.applyBtn} ${product.isTopPick ? styles.applyBtnPrimary : ''}`}>
          신청하기
        </button>
      </div>
    </div>
  );
}