export interface Stats {
  consecutiveDays: number;
  totalStudyTime: number;
  averageDailyStudyTime: number;
  taskCompletionRate: number;
  weekdayStudyTime: WeekdayStudyTime;
}

export interface WeekdayStudyTime {
  Monday: number;
  TuesDay: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
}
