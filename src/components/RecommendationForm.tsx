import { useState } from 'react';
import { FormValues } from '../types';
import {
  JOB_TYPE_OPTIONS,
  REGION_OPTIONS,
  HEADCOUNT_OPTIONS,
  PERIOD_OPTIONS,
} from '../data/options';
import FormSelect from './FormSelect';
import styles from './RecommendationForm.module.css';

interface RecommendationFormProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
}

const INITIAL: FormValues = {
  jobType: '',
  region: '',
  headcount: '',
  period: '',
  budget: '',
};

export default function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const [values, setValues] = useState<FormValues>(INITIAL);

  const set = (key: keyof FormValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setValues((prev) => ({ ...prev, budget: raw }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const hasAnyInput = Object.values(values).some((v) => v !== '');

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid2}>
        <FormSelect
          label="업직종"
          value={values.jobType}
          onChange={set('jobType')}
          options={JOB_TYPE_OPTIONS}
        />
        <FormSelect
          label="지역"
          value={values.region}
          onChange={set('region')}
          options={REGION_OPTIONS}
        />
      </div>

      <div className={styles.grid2}>
        <FormSelect
          label="모집인원"
          value={values.headcount}
          onChange={set('headcount')}
          options={HEADCOUNT_OPTIONS}
          placeholder="선택"
        />
        <FormSelect
          label="모집기간"
          value={values.period}
          onChange={set('period')}
          options={PERIOD_OPTIONS}
          placeholder="선택"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>1일 예산</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            inputMode="numeric"
            className={styles.input}
            placeholder="예: 50000"
            value={values.budget ? Number(values.budget).toLocaleString() : ''}
            onChange={handleBudget}
          />
          <span className={styles.unit}>원/일</span>
        </div>
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading || !hasAnyInput}
      >
        {isLoading ? (
          <span className={styles.loadingRow}>
            <span className={styles.spinner} />
            AI가 분석 중입니다...
          </span>
        ) : (
          'AI 추천 받기'
        )}
      </button>
    </form>
  );
}