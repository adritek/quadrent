import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  it('should render the task title', () => {
    render(
      <DndContext>
        <TaskCard task={mockTask} />
      </DndContext>,
    );
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('should have a draggable role for acessibility', () => {
    render(
      <DndContext>
        <TaskCard task={mockTask} />
      </DndContext>,
    );
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-roledescription', 'draggable');
    // expect(screen.getByRole('button', { name: /draggable/i })).toBeInTheDocument();
  });
});
