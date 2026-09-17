import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useTasks } from './hooks/useTasks.js';
import { useWakeUp } from './hooks/useWakeUp.js';
import { TaskInput } from './components/TaskInput.js';
import { TaskList } from './components/TaskList.js';
import { QuadrantGrid } from './components/QuadrantGrid.js';
import type { Quadrant } from './types/task.js';

export default function App() {
  const { isWakingUp, wakeupError } = useWakeUp();
  const { tasks, isLoading, error, addTask, moveTask } = useTasks();

  if (isWakingUp) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Waking up servers...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This can take up to 60 seconds on first load.
          </p>
        </div>
      </div>
    );
  }
  if (wakeupError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-red-500">{wakeupError}</p>
      </div>
    );
  }

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const task = tasks.find((t) => t._id === taskId);

    if (!task) return;

    const quadrant = over.id as Quadrant;
    void moveTask(taskId, task._rev, quadrant);
  };

  return (
    <DndContext onDragEnd={handleDragEvent}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-screen bg-gray-100">
        {/* Left sidebar — todo list */}
        <aside className="flex w-72 flex-col border-r border-gray-200 bg-white shadow-sm">
          <div className=" p-4">
            <h1 className="text-lg font-bold text-gray-800">Quadrent</h1>
            <p className="text-xs text-gray-500">Drag tasks into the matrix</p>
          </div>
          <TaskInput onAdd={addTask} />
          <TaskList tasks={tasks} isLoading={isLoading} error={error} />
        </aside>

        {/* Right — quadrant grid */}
        <main className="flex-1">
          <QuadrantGrid tasks={tasks} />
        </main>
      </div>
    </DndContext>
  );
}
