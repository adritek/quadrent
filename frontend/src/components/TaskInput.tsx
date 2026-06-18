import React, { useState } from 'react';
import type { CreateTaskInput } from '../types/task.js';

interface TaskInputProps {
  onAdd: (input: CreateTaskInput) => Promise<void>;
}

export const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [title, setTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (title.trim() === '') return;
    setIsSubmitting(true);
    await onAdd({ title });
    setTitle('');
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') void handleSubmit();
  };

  return (
    <div className="flex gap-2 px-2.5 mb-1">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="New task"
        disabled={isSubmitting}
        name="NewTask"
        className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500"
      />
      <button
        onClick={() => void handleSubmit()}
        disabled={isSubmitting || title.trim() === ''}
        className="rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
      >
        Add
      </button>
    </div>
  );
};
