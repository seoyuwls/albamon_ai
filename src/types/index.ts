export interface FormValues {
  jobType: string;
  region: string;
  headcount: string;
  period: string;
  budgetMin: number;
  budgetMax: number;
}

export interface Product {
  id: string;
  name: string;
  pricePerDay: number;
  priceUnit: '원/일' | '원/건';
  applicantMultiplier: number; // vs free posting (1.0 = baseline)
  estimatedApplicants: { min: number; max: number };
  costPerApplicant: number;
  tag?: string;
  tagColor?: 'red' | 'orange' | 'blue';
  platforms: string[];
  highlights: string[];
  isTopPick?: boolean;
}