import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import { TaskProvider } from '../context/TaskProvider';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks');

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
  });

  it('renders without crashing', () => {
    render(
      <TaskProvider>
        <App />
      </TaskProvider>,
    );
    expect(document.body).toBeInTheDocument();
  });
});
