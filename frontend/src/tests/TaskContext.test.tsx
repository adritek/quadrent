import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndContext } from '@dnd-kit/core';
import { useTaskContext } from '../context/TaskContext';
import { TaskProvider } from '../context/TaskProvider';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks');

const createdTask = {
  _id: 'new-task',
  _rev: '1-new',
  type: 'task' as const,
  title: 'Added from task context',
  quadrant: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('Task context', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
    vi.mocked(tasksApi.createTask).mockResolvedValue(createdTask);
    vi.mocked(tasksApi.deleteTask).mockResolvedValue(undefined);
  });

  it('shares task creation and deletion between task input and list', async () => {
    const user = userEvent.setup();

    render(
      <TaskProvider>
        <DndContext>
          <TaskInput />
          <TaskList />
        </DndContext>
      </TaskProvider>,
    );

    await waitFor(() => expect(tasksApi.getTasks).toHaveBeenCalled());
    await user.type(screen.getByPlaceholderText('New task'), createdTask.title);
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(await screen.findByText(createdTask.title)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete task' }));

    await waitFor(() =>
      expect(screen.queryByText(createdTask.title)).not.toBeInTheDocument(),
    );
    expect(tasksApi.deleteTask).toHaveBeenCalledWith(
      createdTask._id,
      createdTask._rev,
    );
  });

  it('throws when the task context hook is used outside its provider', () => {
    expect(() => renderHook(() => useTaskContext())).toThrow(
      'useTaskContext must be used within a TaskProvider',
    );
  });
});
