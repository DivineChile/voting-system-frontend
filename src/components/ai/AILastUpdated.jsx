import { BrainCircuit, Clock3 } from "lucide-react";

export default function AILastUpdated({ generatedAt }) {
  if (!generatedAt) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Clock3 className="h-5 w-5 text-slate-500" />

        <div>
          <p className="text-sm font-medium text-slate-900">Last Updated</p>

          <p className="text-xs text-slate-500">
            {new Date(generatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1">
        <BrainCircuit className="h-4 w-4 text-indigo-600" />

        <span className="text-xs font-medium text-indigo-600">
          Gemini 2.5 Flash
        </span>
      </div>
    </div>
  );
}
