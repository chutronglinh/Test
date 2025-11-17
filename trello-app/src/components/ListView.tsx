import { useState } from 'react';
import { Task, Status } from '../types';
import { TaskModal } from './TaskModal';
import { Calendar, Tag, User } from 'lucide-react';
import { format } from 'date-fns';
import { statusConfig, priorityConfig } from '../utils/taskUtils';

interface ListViewProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  users: any[];
}

export function ListView({ tasks, onUpdateTask, onDeleteTask, users }: ListViewProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const statuses: Status[] = ['todo', 'in_progress', 'in_review', 'done'];

  const tasksByStatus = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<Status, Task[]>);

  return (
    <>
      <div className="space-y-6">
        {statuses.map((status) => {
          const columnTasks = tasksByStatus[status] || [];
          const config = statusConfig[status];

          if (columnTasks.length === 0) return null;

          return (
            <div key={status} className="bg-slate-900 rounded-lg overflow-hidden">
              <div
                className="px-6 py-3 flex items-center gap-3"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <h3 className="font-semibold text-slate-200">{config.label}</h3>
                <span className="text-sm text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {columnTasks.length}
                </span>
              </div>

              <div className="divide-y divide-slate-800">
                {columnTasks.map((task) => {
                  const isOverdue =
                    task.dueDate && task.dueDate < new Date() && task.status !== 'done';
                  const priorityColor = priorityConfig[task.priority].color;

                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="px-6 py-4 hover:bg-slate-800 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: priorityColor }}
                              title={`Priority: ${task.priority}`}
                            />
                            <h4 className="text-slate-100 font-medium group-hover:text-white transition-colors">
                              {task.title}
                            </h4>
                          </div>

                          <p className="text-slate-400 text-sm mb-3 line-clamp-1">
                            {task.description}
                          </p>

                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {task.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-8 h-8 rounded-full ring-2 ring-slate-700"
                              title={task.assignee.name}
                            />
                            <span className="text-sm text-slate-300 hidden sm:block">
                              {task.assignee.name}
                            </span>
                          </div>

                          {task.dueDate && (
                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                                isOverdue
                                  ? 'bg-red-500/10 text-red-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {format(task.dueDate, 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          users={users}
        />
      )}
    </>
  );
}
