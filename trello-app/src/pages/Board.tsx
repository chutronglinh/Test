import { useState } from 'react';
import { KanbanBoard } from '../components/KanbanBoard';
import { ListView } from '../components/ListView';
import { FilterBar } from '../components/FilterBar';
import { LayoutGrid, List } from 'lucide-react';
import { Task, Status, User, Filter, Priority } from '../types';

interface BoardProps {
  tasks: Task[];
  filter: Filter;
  onFilterChange: (filter: Partial<Filter>) => void;
  onClearFilter: () => void;
  onUpdateStatus: (taskId: string, newStatus: Status) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task;
  users: User[];
}

export function Board({
  tasks,
  filter,
  onFilterChange,
  onClearFilter,
  onUpdateStatus,
  onUpdateTask,
  onDeleteTask,
  onCreateTask,
  users,
}: BoardProps) {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const handleCreateTask = (status: Status) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const priorities: Priority[] = ['low', 'medium', 'high'];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

    onCreateTask({
      title: 'New Task',
      description: 'Add a description for this task',
      status,
      priority: randomPriority,
      assignee: randomUser,
      tags: [],
      dueDate: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Task Board</h1>
          <p className="text-slate-400 mt-1">
            Manage and track your team's tasks
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'kanban'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filter={filter}
        users={users}
        onFilterChange={onFilterChange}
        onClearFilter={onClearFilter}
      />

      {/* View */}
      <div className="min-h-[600px]">
        {viewMode === 'kanban' ? (
          <KanbanBoard
            tasks={tasks}
            onUpdateStatus={onUpdateStatus}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onCreateTask={handleCreateTask}
            users={users}
          />
        ) : (
          <ListView
            tasks={tasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            users={users}
          />
        )}
      </div>
    </div>
  );
}
