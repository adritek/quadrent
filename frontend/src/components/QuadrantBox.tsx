import type { Task, Quadrant } from '../types/task.js';

interface QuadrantBoxProps {
  title: string;
  quadrant: Quadrant;
  tasks: Task[];
  className?: string;
}

export const QuadrantBox = ({
  title,
  quadrant,
  tasks,
  className = '',
}: QuadrantBoxProps) => {
  const assigned = tasks.filter((t) => t.quadrant === quadrant);

  return (
    <div className={`flex flex-col rounded border-2 p-3 ${className}`}>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">
        {title}
      </h2>
      <ul className="flex flex-col gap-2">
        {assigned.map((task) => (
          <li
            key={task._id}
            className="rounded border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
