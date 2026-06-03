import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useTasks } from './hooks/useTasks.js';
import { TaskInput } from './components/TaskInput.js';
import { TaskList } from './components/TaskList.js';
import { QuadrantGrid } from './components/QuadrantGrid.js';
import type { Quadrant } from './types/task.js';

export default function App() {
  const { tasks, isLoading, error, addTask } = useTasks();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar — todo list */}
      <aside className="flex w-72 flex-col border-r border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4">
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
  );
}
