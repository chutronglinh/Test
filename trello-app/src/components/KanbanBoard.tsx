import { useState } from 'react';
import { Task, Status } from '../types';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { Plus } from 'lucide-react';
import { statusConfig } from '../utils/taskUtils';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: Status) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateTask: (status: Status) => void;
  users: any[];
}

function SortableTaskCard({
  task,
  onClick,
}: {
  task: Task;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onClick={onClick} isDragging={isDragging} />
    </div>
  );
}

export function KanbanBoard({
  tasks,
  onUpdateStatus,
  onUpdateTask,
  onDeleteTask,
  onCreateTask,
  users,
}: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const statuses: Status[] = ['todo', 'in_progress', 'in_review', 'done'];

  const tasksByStatus = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<Status, Task[]>);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as Status;

      // Check if dropping onto a column
      if (statuses.includes(newStatus)) {
        onUpdateStatus(taskId, newStatus);
      }
    }

    setActiveTask(null);
  };

  return (
    <>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
          {statuses.map((status) => {
            const columnTasks = tasksByStatus[status] || [];
            const config = statusConfig[status];

            return (
              <div
                key={status}
                className="bg-slate-900 rounded-lg p-4 flex flex-col min-h-[500px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <h3 className="font-semibold text-slate-200">{config.label}</h3>
                    <span className="text-sm text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => onCreateTask(status)}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-200"
                    title="Add task"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <SortableContext
                  id={status}
                  items={columnTasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {columnTasks.map((task) => (
                      <SortableTaskCard
                        key={task.id}
                        task={task}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                  </div>
                </SortableContext>

                {/* Drop zone for empty columns */}
                {columnTasks.length === 0 && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-lg text-slate-500 text-sm">
                    Drop tasks here
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} onClick={() => {}} isDragging /> : null}
        </DragOverlay>
      </DndContext>

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
