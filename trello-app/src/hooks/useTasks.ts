import { useState, useMemo } from 'react';
import { Task, Filter, Status } from '../types';
import { tasks as initialTasks, users } from '../data/mockData';
import { filterTasks, calculateStats } from '../utils/taskUtils';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>({
    authors: [],
    tags: [],
    priorities: [],
    searchQuery: '',
  });

  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const stats = useMemo(() => calculateStats(tasks), [tasks]);

  const updateTaskStatus = (taskId: string, newStatus: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task
      )
    );
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const updateFilter = (newFilter: Partial<Filter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const clearFilter = () => {
    setFilter({
      authors: [],
      tags: [],
      priorities: [],
      searchQuery: '',
    });
  };

  return {
    tasks,
    filteredTasks,
    filter,
    stats,
    users,
    updateTaskStatus,
    updateTask,
    createTask,
    deleteTask,
    updateFilter,
    clearFilter,
  };
}
