import { describe, it, expect } from 'vitest';
import type { Task, Quadrant } from '../types/task.js';

describe('Task type', () => {
  it('should create a valid task object', () => {
    const task: Task = {
      type: 'task',
      title: 'Buy groceries',
      quadrant: null,
      createdAt: new Date().toISOString(),
    };

    expect(task.type).toBe('task');
    expect(task.title).toBe('Buy groceries');
    expect(task.quadrant).toBeNull();
    expect(task.createdAt).toBeTruthy();
  });

  it('should accept a valid quadrant value', () => {
    const task: Task = {
      type: 'task',
      title: 'Buy groceries',
      quadrant: 'urgent-important',
      createdAt: new Date().toISOString(),
    };

    expect(task.quadrant).toBe('urgent-important');
  });

  it('should validate that the title is not empty', () => {
    const isValidTitle = (title: string): boolean => title.trim().length > 0;

    expect(isValidTitle('Buy groceries')).toBe(true);
    expect(isValidTitle('')).toBe(false);
    expect(isValidTitle('   ')).toBe(false);
  });
});
