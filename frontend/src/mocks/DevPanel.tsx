import {
  coldStartScenario,
  serverDownScenario,
  slowNetworkScenario,
} from './scenarios.js';

interface DevPanelProps {
  onRefetch: () => void;
}

export const DevPanel = ({ onRefetch }: DevPanelProps) => {
  if (import.meta.env.MODE !== 'development') return null;

  const reset = async () => {
    const { worker } = await import('./browser.js');
    worker.resetHandlers();
    onRefetch();
  };

  const applyColdStart = async () => {
    const { worker } = await import('./browser.js');
    worker.use(...coldStartScenario);
    onRefetch();
  };

  const applyServerDown = async () => {
    const { worker } = await import('./browser.js');
    worker.use(...serverDownScenario);
    onRefetch();
  };
  const applySlowNetwork = async () => {
    const { worker } = await import('./browser.js');
    worker.use(...slowNetworkScenario);
    onRefetch();
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-lg text-xs">
      <span className="font-semibold text-gray-500">MSW:</span>
      <button onClick={applyColdStart} className="text-amber-600 hover:underline">
        Cold start
      </button>
      <button onClick={applyServerDown} className="text-red-600 hover:underline">
        Server down
      </button>
      <button onClick={applySlowNetwork} className="text-red-300 hover:underline">
        Slow Network
      </button>
      <button onClick={reset} className="text-green-600 hover:underline">
        Reset
      </button>
    </div>
  );
};
