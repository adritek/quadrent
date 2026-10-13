import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/task.js';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const stopPropagation = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable(
    {
      id: task._id,
    },
  );

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 25 : 30,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-baseline justify-between rounded border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm"
    >
      {task.title}
      <button
        className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 inline-block rounded"
        onPointerDown={stopPropagation}
        onClick={(e) => {
          console.log('delete');
          stopPropagation(e);
        }}
      >
        X
      </button>
    </li>
  );
};
