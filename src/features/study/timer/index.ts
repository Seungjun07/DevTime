export interface Timer {
  timerId: string;
  studyLogId: string;
  splitTimes: SplitTimes[];
  startTime: string;
  lastUpdateTime: string;
}

export interface SplitTimes {
  date: string;
  timeSpent: number;
}

export interface FinishTimerResponse {
  message: string;
  totalTime: number;
  endTime: string;
}
