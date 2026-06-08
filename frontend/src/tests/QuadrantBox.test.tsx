import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import { QuadrantBox } from '../components/QuadrantBox';
import type { Task } from '../types/task.js';

const mockTasks: Task[] = [
  {
    _id: 'abc123',
    _rev: '1-xyz',
    type: 'task',
    title: 'Write tests',
    quadrant: 'urgent-important',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: 'def456',
    _rev: '1-xyz',
    type: 'task',
    title: 'Check emails',
    quadrant: 'urgent-not-important',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

describe('Quadrant box', () => {
  it('should render the quadrant titles', () => {
    render(
      <DndContext>
        <QuadrantBox
          title="Urgent & Important"
          quadrant="urgent-important"
          tasks={mockTasks}
        />
      </DndContext>,
    );
    expect(screen.getByText('Urgent & Important')).toBeInTheDocument();
  });

  it('only renders tasks assigned to its quadrant', () => {
    render(
      <DndContext>
        <QuadrantBox
          title="Urgent & Important"
          quadrant="urgent-important"
          tasks={mockTasks}
        />
      </DndContext>,
    );
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Check emails')).not.toBeInTheDocument();
  });
});
