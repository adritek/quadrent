import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndContext } from '@dnd-kit/core';
import { TaskCard } from '../components/TaskCard';
import type { Task } from '../types/task.js';

const mockTask: Task = {
  _id: 'abc123',
  _rev: '1-xyz',
  type: 'task',
  title: 'Buy groceries',
  quadrant: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('TaskCard', () => {
  const removeTask = vi.fn().mockResolvedValue(undefined);

  it('should render the task title', () => {
    render(
      <DndContext>
        <TaskCard task={mockTask} removeTask={removeTask} />
      </DndContext>,
    );
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('should have a draggable role for acessibility', () => {
    render(
      <DndContext>
        <TaskCard task={mockTask} removeTask={removeTask} />
      </DndContext>,
    );
    const card = screen.getByRole('button', { name: /Buy groceries/ });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-roledescription', 'draggable');
    // expect(screen.getByRole('button', { name: /draggable/i })).toBeInTheDocument();
  });

  it('calls removeTask with the task id and revision when deleted', async () => {
    const user = userEvent.setup();
    render(
      <DndContext>
        <TaskCard task={mockTask} removeTask={removeTask} />
      </DndContext>,
    );

    await user.click(screen.getByRole('button', { name: 'Delete task' }));

    expect(removeTask).toHaveBeenCalledWith(mockTask._id, mockTask._rev);
  });
});
