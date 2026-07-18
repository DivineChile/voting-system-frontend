// src/components/ai/AIHeader.jsx

import {
  BrainCircuit,
  RefreshCw,
  Activity,
  ClipboardCheck,
  FileSearch,
  FileBarChart2,
} from "lucide-react";

const STATUS_CONFIG = {
  draft: {
    title: "Election Readiness Assistant",
    description: "AI assessment of election setup before voting begins.",
    icon: ClipboardCheck,
    badge: "Draft",
    badgeClass: "bg-amber-100 text-amber-700",
  },

  active: {
    title: "Live Election Intelligence",
    description: "Real-time AI monitoring and election analytics.",
    icon: Activity,
    badge: "Live",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },

  closed: {
    title: "Election Analysis",
    description: "AI review of completed election performance.",
    icon: FileSearch,
    badge: "Closed",
    badgeClass: "bg-sky-100 text-sky-700",
  },

  published: {
    title: "Election Intelligence Report",
    description: "AI-generated executive election report.",
    icon: FileBarChart2,
    badge: "Published",
    badgeClass: "bg-violet-100 text-violet-700",
  },
};

export default function AIHeader({ election, refreshing, onRefresh }) {
  const electionStatus = election?.status;
  const config = STATUS_CONFIG[electionStatus] ?? STATUS_CONFIG.draft;

  const StatusIcon = config.icon;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 p-6 text-white shadow-lg md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
          <BrainCircuit className="h-7 w-7" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{config.title}</h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${config.badgeClass}`}
            >
              {config.badge}
            </span>
          </div>

          <p className="mt-2 text-sm text-indigo-100">{config.description}</p>

          <div className="mt-3 flex items-center gap-2 text-sm text-indigo-100">
            <StatusIcon className="h-4 w-4" />

            <span>AI-powered election monitoring and analytical insights</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />

        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
