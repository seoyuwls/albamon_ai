import { useState } from 'react';
import { FormValues, Product } from './types';
import { getRecommendedProducts } from './data/mockProducts';
import RecommendationForm from './components/RecommendationForm';
import ResultSection from './components/ResultSection';
import styles from './App.module.css';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);
    setHasResult(false);

    // AI 분석 시뮬레이션 (1.5초 딜레이)
    setTimeout(() => {
      const recommended = getRecommendedProducts(values);
      setProducts(recommended);
      setIsLoading(false);
      setHasResult(true);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Hero */}
        <header className={styles.hero}>
          <span className={styles.badge}>AI 상품 추천</span>
          <h1 className={styles.heroTitle}>
            내 공고에 맞는 상품을<br />찾아드릴게요
          </h1>
          <p className={styles.heroSub}>
            업직종·지역·조건을 입력하면 최적의 상품을 추천해드려요
          </p>
        </header>

        {/* Form Card */}
        <div className={styles.card}>
          <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Result */}
        {hasResult && (
          <ResultSection products={products} />
        )}
      </div>
    </div>
  );
}