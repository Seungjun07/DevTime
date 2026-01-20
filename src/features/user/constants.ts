export const CAREER_OPTIONS = [
  { value: "경력 없음", label: "경력 없음" },
  { value: "0 - 3년", label: "0-3년" },
  { value: "4 - 7년", label: "4-7년" },
  { value: "8 - 10년", label: "8-10년" },
  { value: "11년 이상", label: "11년 이상" },
] as const;

export const PURPOSE_OPTIONS = [
  { value: "취업 준비", label: "취업 준비" },
  { value: "이직 준비", label: "이직 준비" },
  { value: "단순 개발 역량 향상", label: "단순 개발 역량 향상" },
  {
    value: "회사 내 프로젝트 원활하게 수행",
    label: "회사 내 프로젝트 원활하게 수행",
  },
  { value: "기타", label: "기타(직접 입력)" },
] as const;
