import { AlertTriangle } from "lucide-react";

export default function AIErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-500" />

      <h3 className="text-lg font-semibold text-red-700">
        Unable to Generate AI Report
      </h3>

      <p className="mt-2 text-sm text-red-600">{message}</p>

      <button
        onClick={onRetry}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}
