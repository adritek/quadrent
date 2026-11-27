import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import { QuadrantBox } from '../components/QuadrantBox';
import { TaskProvider } from '../context/TaskProvider';
import type { Task } from '../types/task.js';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks');

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
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(tasksApi.getTasks).mockResolvedValue(mockTasks);
  });

  it('should render the quadrant titles', async () => {
    render(
      <TaskProvider>
        <DndContext>
          <QuadrantBox
            title="Urgent & Important"
            quadrant="urgent-important"
          />
        </DndContext>
      </TaskProvider>,
    );
    await screen.findByText('Write tests');
    expect(screen.getByText('Urgent & Important')).toBeInTheDocument();
  });

  it('only renders tasks assigned to its quadrant', async () => {
    render(
      <TaskProvider>
        <DndContext>
          <QuadrantBox
            title="Urgent & Important"
            quadrant="urgent-important"
          />
        </DndContext>
      </TaskProvider>,
    );
    expect(await screen.findByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Check emails')).not.toBeInTheDocument();
  });
});
