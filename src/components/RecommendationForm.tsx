import { useState } from 'react';
import { FormValues } from '../types';
import {
  JOB_TYPE_OPTIONS,
  REGION_OPTIONS,
  HEADCOUNT_OPTIONS,
  PERIOD_OPTIONS,
} from '../data/options';
import FormSelect from './FormSelect';
import BudgetSlider from './BudgetSlider';
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
  budgetMin: 0,
  budgetMax: 0,
};

export default function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const [values, setValues] = useState<FormValues>(INITIAL);

  const set = (key: keyof FormValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleBudget = (min: number, max: number) => {
    setValues((prev) => ({ ...prev, budgetMin: min, budgetMax: max }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const hasAnyInput =
    values.jobType !== '' ||
    values.region !== '' ||
    values.headcount !== '' ||
    values.period !== '' ||
    values.budgetMax > 0;

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

      <BudgetSlider
        min={values.budgetMin}
        max={values.budgetMax}
        onChange={handleBudget}
      />

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