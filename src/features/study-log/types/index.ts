// =============== Task 관련 ===============
export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface UpdateTaskRequest {
  studyLogId: string;
  tasks: Task[];
}

export interface TaskResponse {
  success: boolean;
  message: string;
}

// =============== StudyLog 관련 ===============
export interface StudyLog {
  id: string;
  date: string;
  todayGoal: string;
  studyTime: number;
  completionRate: number;
}

export interface StudyLogSummary extends StudyLog {
  totalTasks: number;
  incompleteTasks: number;
}

export interface StudyLogDetail extends StudyLog {
  tasks: Task[];
  review: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface StudyLogRequest {
  page: number;
  limit: number;
  date?: string;
}

export interface StudyLogResponse {
  success: boolean;
  data: {
    studyLogs: StudyLogSummary[];
    pagination: Pagination;
  };
}

export interface StudyLogDetailResponse {
  success: boolean;
  data: {
    StudyLog: StudyLogDetail;
  };
}

export interface StudyLogDeleteReponse {
  success: boolean;
  message: string;
}
