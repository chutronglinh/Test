import { Task, Filter, Stats, Priority, Status } from '../types';

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  return tasks.filter((task) => {
    // Filter by authors
    if (filter.authors.length > 0 && !filter.authors.includes(task.assignee.id)) {
      return false;
    }

    // Filter by tags
    if (filter.tags.length > 0 && !filter.tags.some((tag) => task.tags.includes(tag))) {
      return false;
    }

    // Filter by priorities
    if (filter.priorities.length > 0 && !filter.priorities.includes(task.priority)) {
      return false;
    }

    // Filter by search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });
}

export function calculateStats(tasks: Task[]): Stats {
  const now = new Date();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;

  const tasksWithDueDate = tasks.filter((t) => t.dueDate !== null);
  const completedOnTime = tasksWithDueDate.filter(
    (t) => t.status === 'done' && t.dueDate && t.updatedAt <= t.dueDate
  ).length;
  const onTimeCompletion = tasksWithDueDate.length > 0
    ? (completedOnTime / tasksWithDueDate.length) * 100
    : 100;

  const overdueTasks = tasks.filter(
    (t) => t.status !== 'done' && t.dueDate && t.dueDate < now
  ).length;

  const tasksByStatus: Record<Status, number> = {
    todo: 0,
    in_progress: 0,
    in_review: 0,
    done: 0,
  };

  const tasksByPriority: Record<Priority, number> = {
    low: 0,
    medium: 0,
    high: 0,
  };

  const tasksByUser: Record<string, number> = {};

  tasks.forEach((task) => {
    tasksByStatus[task.status]++;
    tasksByPriority[task.priority]++;
    tasksByUser[task.assignee.id] = (tasksByUser[task.assignee.id] || 0) + 1;
  });

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return {
    totalTasks,
    completedTasks,
    onTimeCompletion,
    overdueTasks,
    tasksByStatus,
    tasksByPriority,
    tasksByUser,
    completionRate,
  };
}

export function getTasksByStatus(tasks: Task[]): Record<Status, Task[]> {
  return tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<Status, Task[]>);
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
  return [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
}

export function getUpcomingTasks(tasks: Task[], days: number = 7): Task[] {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return tasks
    .filter((task) => {
      if (!task.dueDate || task.status === 'done') return false;
      return task.dueDate >= now && task.dueDate <= futureDate;
    })
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
}

export const statusConfig: Record<Status, { label: string; color: string }> = {
  todo: { label: 'To Do', color: '#64748b' },
  in_progress: { label: 'In Progress', color: '#3b82f6' },
  in_review: { label: 'In Review', color: '#f59e0b' },
  done: { label: 'Done', color: '#10b981' },
};

export const priorityConfig: Record<Priority, { label: string; color: string }> = {
  low: { label: 'Low', color: '#64748b' },
  medium: { label: 'Medium', color: '#f59e0b' },
  high: { label: 'High', color: '#ef4444' },
};
