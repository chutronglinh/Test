import { Task } from '../types';
import { Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { priorityConfig } from '../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onClick, isDragging = false }: TaskCardProps) {
  const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== 'done';
  const priorityColor = priorityConfig[task.priority].color;

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800 rounded-lg p-4 border border-slate-700 cursor-pointer hover:border-slate-600 transition-all group ${
        isDragging ? 'opacity-50 rotate-3 scale-105' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-slate-100 font-medium text-sm line-clamp-2 flex-1 group-hover:text-white transition-colors">
          {task.title}
        </h3>
        <div
          className="w-2 h-2 rounded-full ml-2 mt-1 flex-shrink-0"
          style={{ backgroundColor: priorityColor }}
          title={`Priority: ${task.priority}`}
        />
      </div>

      <p className="text-slate-400 text-xs mb-3 line-clamp-2">{task.description}</p>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={task.assignee.avatar}
            alt={task.assignee.name}
            className="w-6 h-6 rounded-full ring-2 ring-slate-700"
            title={task.assignee.name}
          />
        </div>

        {task.dueDate && (
          <div
            className={`flex items-center gap-1 text-xs ${
              isOverdue ? 'text-red-400' : 'text-slate-400'
            }`}
          >
            <Calendar className="w-3 h-3" />
            {format(task.dueDate, 'MMM d')}
          </div>
        )}
      </div>
    </div>
  );
}
