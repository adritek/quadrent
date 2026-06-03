import type { Task } from '../types/task.js';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export const TaskList = ({ tasks, isLoading, error }: TaskListProps) => {
  const unassigned = tasks.filter((t) => t.quadrant === null);

  if (isLoading) return <p className="p-4 text-sm text-gray-500">Loading...</p>;
  if (error) return <p className="p-4 text-sm text-gray-500">{error}</p>;

  return (
    <ul className="flex flex-col gap-2 p-2">
      {unassigned.length === 0 && (
        <p className="text-sm text-gray-400 p-2">No tasks yet</p>
      )}
      {unassigned.map((task) => (
        <li
          key={task._id}
          className="rounded border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm cursor-grab"
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
};
