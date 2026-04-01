import { FormValues, Product } from '../types';

// 실제 알바몬 상품 풀
const PRODUCT_POOL: Product[] = [
  {
    id: 'grand-combo',
    name: 'M 지역 Grand 결합',
    pricePerDay: 105300,
    priceUnit: '원/일',
    applicantMultiplier: 5.2,
    estimatedApplicants: { min: 18, max: 26 },
    costPerApplicant: 4050,
    tag: 'PREMIUM',
    tagColor: 'blue',
    platforms: ['모바일+PC', '지역별 알바', '로고형'],
    highlights: ['지역 최상단 + 통합검색 동시 노출', '모바일·PC 전 지면 커버', 'M 지역 배너 무료 제공'],
  },
  {
    id: 'm-top-plus',
    name: 'M TOP-Plus',
    pricePerDay: 57200,
    priceUnit: '원/일',
    applicantMultiplier: 4.8,
    estimatedApplicants: { min: 14, max: 20 },
    costPerApplicant: 3580,
    tag: 'HOT',
    tagColor: 'red',
    platforms: ['모바일', '지역별·입직종별 알바', '로고형'],
    highlights: ['하루 2회 점프 포함', '지역별 상단 고정 노출', '유료상품 2개 무료 제공'],
  },
  {
    id: 'super-jump-8',
    name: '슈퍼점프 8회',
    pricePerDay: 35200,
    priceUnit: '원/일',
    applicantMultiplier: 4.0,
    estimatedApplicants: { min: 12, max: 16 },
    costPerApplicant: 2600,
    tag: 'HOT',
    tagColor: 'red',
    platforms: ['모바일+PC', '일반리스트', '출광고형'],
    highlights: ['하루 8회 리스트 최상단 점프', '모바일+PC 동시 노출', '약 4배의 조회수 효과'],
  },
  {
    id: 'urgent-combo',
    name: 'M 급구 결합',
    pricePerDay: 34300,
    priceUnit: '원/일',
    applicantMultiplier: 3.8,
    estimatedApplicants: { min: 10, max: 15 },
    costPerApplicant: 2630,
    tag: '급구',
    tagColor: 'orange',
    platforms: ['모바일+PC', '급구 배너', '급구 아이콘'],
    highlights: ['급구 전용 배너 강조 노출', '하루 2회 점프 포함', '유료상품 1개 무료 제공'],
  },
  {
    id: 'super-jump-5',
    name: '슈퍼점프 5회',
    pricePerDay: 33000,
    priceUnit: '원/일',
    applicantMultiplier: 3.5,
    estimatedApplicants: { min: 10, max: 14 },
    costPerApplicant: 2750,
    tag: 'HOT',
    tagColor: 'red',
    platforms: ['모바일+PC', '일반리스트', '출광고형'],
    highlights: ['하루 5회 리스트 최상단 점프', '모바일+PC 동시 노출'],
  },
  {
    id: 'm-jump',
    name: 'M 점프',
    pricePerDay: 28600,
    priceUnit: '원/일',
    applicantMultiplier: 3.0,
    estimatedApplicants: { min: 8, max: 12 },
    costPerApplicant: 2860,
    platforms: ['모바일', '일반리스트', '출광고형'],
    highlights: ['하루 5회 점프 노출', '모바일 리스트 상단 고정'],
  },
  {
    id: 'instant',
    name: '즉시등록',
    pricePerDay: 15400,
    priceUnit: '원/건',
    applicantMultiplier: 3.0,
    estimatedApplicants: { min: 8, max: 12 },
    costPerApplicant: 1540,
    tag: '즉시',
    tagColor: 'orange',
    platforms: ['모바일+PC', '일반리스트', '출광고형'],
    highlights: ['심사 없이 즉시 게재 (최대 14일)', '약 3배의 지원자수 효과'],
  },
  {
    id: 'keyword-logo',
    name: '키워드-Logo',
    pricePerDay: 8800,
    priceUnit: '원/일',
    applicantMultiplier: 2.2,
    estimatedApplicants: { min: 5, max: 8 },
    costPerApplicant: 1760,
    platforms: ['모바일+PC', '통합검색', '로고형'],
    highlights: ['구직자 통합검색 키워드 노출', '로고형 노출로 브랜드 강조'],
  },
];

export function getRecommendedProducts(values: FormValues): Product[] {
  const budget = values.budgetMax;
  const isShortPeriod = ['1week', '2weeks'].includes(values.period);
  const isLargeHeadcount = ['6-10', '11+'].includes(values.headcount);

  // 예산 기반 후보 선택
  let candidates: Product[];

  if (budget >= 80000 || isLargeHeadcount) {
    candidates = PRODUCT_POOL.filter((p) =>
      ['grand-combo', 'm-top-plus', 'super-jump-8'].includes(p.id)
    );
  } else if (budget >= 30000) {
    candidates = PRODUCT_POOL.filter((p) =>
      isShortPeriod
        ? ['super-jump-8', 'urgent-combo', 'm-jump'].includes(p.id)
        : ['super-jump-8', 'super-jump-5', 'm-jump'].includes(p.id)
    );
  } else if (budget >= 10000) {
    candidates = PRODUCT_POOL.filter((p) =>
      isShortPeriod
        ? ['urgent-combo', 'instant', 'keyword-logo'].includes(p.id)
        : ['m-jump', 'instant', 'keyword-logo'].includes(p.id)
    );
  } else {
    // 예산 미입력 or 낮은 예산 → 효율 좋은 기본 상품
    candidates = PRODUCT_POOL.filter((p) =>
      ['super-jump-8', 'instant', 'keyword-logo'].includes(p.id)
    );
  }

  // 상위 3개, 첫 번째에 isTopPick 마킹
  return candidates.slice(0, 3).map((p, i) => ({ ...p, isTopPick: i === 0 }));
}