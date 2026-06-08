import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from '../hooks/useTasks';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks');

const mockTasks = [
  {
    _id: 'abc123',
    _rev: '1-xyz',
    type: 'task' as const,
    title: 'Write tests',
    quadrant: null,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

describe('useTasks', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch and return tasks on mount', async () => {
    vi.mocked(tasksApi.getTasks).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.error).toBeNull();
  });

  it('should set an error when fetch fails', async () => {
    vi.mocked(tasksApi.getTasks).mockRejectedValue(new Error('Network sux bro'));

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to load tasks');
    expect(result.current.tasks).toEqual([]);
  });

  it('adds a new task to the list', async () => {
    vi.mocked(tasksApi.getTasks).mockResolvedValue(mockTasks);

    const newTask = {
      _id: 'def456',
      _rev: '1-xyz',
      type: 'task' as const,
      title: 'New task',
      quadrant: null,
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    vi.mocked(tasksApi.createTask).mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addTask({ title: 'New task' });
    });

    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[1]?.title).toBe('New task');
  });
});
