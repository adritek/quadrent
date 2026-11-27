import { QuadrantBox } from './QuadrantBox.js';

export const QuadrantGrid = () => {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-3 p-3">
      <QuadrantBox
        title="Urgent & Important (DO)"
        quadrant="urgent-important"
        className="border-red-400 bg-red-50"
      />
      <QuadrantBox
        title="Important & Not Urgent (Schedule)"
        quadrant="not-urgent-important"
        className="border-blue-400 bg-blue-50"
      />
      <QuadrantBox
        title="Urgent & Not Important (Delegate)"
        quadrant="urgent-not-important"
        className="border-yellow-400 bg-yellow-50"
      />
      <QuadrantBox
        title="Not Urgent & Not Important (Delete)"
        quadrant="not-urgent-not-important"
        className="border-gray-400 bg-gray-50"
      />
    </div>
  );
};
