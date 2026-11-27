import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndContext } from '@dnd-kit/core';
import { TaskCard } from '../components/TaskCard';
import { TaskProvider } from '../context/TaskProvider';
import type { Task } from '../types/task.js';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks');

const mockTask: Task = {
  _id: 'abc123',
  _rev: '1-xyz',
  type: 'task',
  title: 'Buy groceries',
  quadrant: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('TaskCard', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(tasksApi.getTasks).mockResolvedValue([mockTask]);
    vi.mocked(tasksApi.deleteTask).mockResolvedValue(undefined);
  });

  it('should render the task title', () => {
    render(
      <TaskProvider>
        <DndContext>
          <TaskCard task={mockTask} />
        </DndContext>
      </TaskProvider>,
    );
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('should have a draggable role for acessibility', () => {
    render(
      <TaskProvider>
        <DndContext>
          <TaskCard task={mockTask} />
        </DndContext>
      </TaskProvider>,
    );
    const card = screen.getByRole('button', { name: /Buy groceries/ });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-roledescription', 'draggable');
    // expect(screen.getByRole('button', { name: /draggable/i })).toBeInTheDocument();
  });

  it('calls removeTask with the task id and revision when deleted', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider>
        <DndContext>
          <TaskCard task={mockTask} />
        </DndContext>
      </TaskProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Delete task' }));

    await waitFor(() =>
      expect(tasksApi.deleteTask).toHaveBeenCalledWith(
        mockTask._id,
        mockTask._rev,
      ),
    );
  });
});
