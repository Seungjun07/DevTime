// 타이머 관련 localStorage 기능들

export interface TimerStorage {
  timerId: string;
  studyLogId: string;
}

const TIMER_ID_KEY = "timerId";
const STUDY_LOG_ID_KEY = "studyLogId";

export const timerStorage = {
  setTimerId(timerId: string) {
    localStorage.setItem(TIMER_ID_KEY, JSON.stringify(timerId));
  },

  getTimerId() {
    try {
      const value = localStorage.getItem(TIMER_ID_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  },

  setStudyLogId(studyLogId: string) {
    localStorage.setItem(STUDY_LOG_ID_KEY, JSON.stringify(studyLogId));
  },

  getStudyLogId() {
    try {
      const value = localStorage.getItem(STUDY_LOG_ID_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  },

  setTimerData(timerId: string, studyLogId: string) {
    this.setTimerId(timerId);
    this.setStudyLogId(studyLogId);
  },

  getTimerData() {
    const timerId = this.getTimerId();
    const studyLogId = this.getStudyLogId();

    if (!timerId || !studyLogId) return null;

    return { timerId, studyLogId };
  },

  clearTimerData() {
    localStorage.removeItem(TIMER_ID_KEY);
    localStorage.removeItem(STUDY_LOG_ID_KEY);
  },
};
