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
