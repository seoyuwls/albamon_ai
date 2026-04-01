import { Product } from '../types';
import EffectChart from './EffectChart';
import ProductCard from './ProductCard';
import styles from './ResultSection.module.css';

interface ResultSectionProps {
  products: Product[];
}

export default function ResultSection({ products }: ResultSectionProps) {
  const top = products[0];

  return (
    <section className={styles.section}>
      {/* Summary */}
      <div className={styles.summary}>
        <p className={styles.summaryText}>
          최적 조건 분석 완료 —{' '}
          <strong>
            {top.estimatedApplicants.min}~{top.estimatedApplicants.max}명
          </strong>{' '}
          지원자 유입이 예상되는 상품을 찾았어요
        </p>
      </div>

      {/* Effect Chart */}
      <EffectChart products={products} />

      {/* Top 3 Products */}
      <div className={styles.list}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}