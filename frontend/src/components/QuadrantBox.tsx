import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard.js';
import type { Task, Quadrant } from '../types/task.js';

interface QuadrantBoxProps {
  title: string;
  quadrant: Quadrant;
  tasks: Task[];
  className?: string;
  removeTask: (id: string, rev: string) => Promise<void>;
}

export const QuadrantBox = ({
  title,
  quadrant,
  tasks,
  className = '',
  removeTask,
}: QuadrantBoxProps) => {
  const assigned = tasks.filter((t) => t.quadrant === quadrant);

  const { setNodeRef, isOver } = useDroppable({
    id: quadrant as string,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded border-2 p-3 transition-colors ${isOver ? 'brightness-95' : ''} ${className}`}
    >
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">
        {title}
      </h2>
      <ul className="flex flex-col gap-2">
        {assigned.map((task) => (
          <TaskCard removeTask={removeTask} key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};
