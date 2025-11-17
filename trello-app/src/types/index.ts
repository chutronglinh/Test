export type Priority = 'low' | 'medium' | 'high';

export type Status = 'todo' | 'in_progress' | 'in_review' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: User;
  tags: string[];
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: 'created' | 'updated' | 'status_changed' | 'assigned' | 'commented';
  taskId: string;
  taskTitle: string;
  user: User;
  timestamp: Date;
  details: string;
}

export interface Filter {
  authors: string[];
  tags: string[];
  priorities: Priority[];
  searchQuery: string;
}

export interface Stats {
  totalTasks: number;
  completedTasks: number;
  onTimeCompletion: number;
  overdueTasks: number;
  tasksByStatus: Record<Status, number>;
  tasksByPriority: Record<Priority, number>;
  tasksByUser: Record<string, number>;
  completionRate: number;
}
