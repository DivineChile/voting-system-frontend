import { ShieldCheck, ShieldAlert, ShieldX, TrendingUp } from "lucide-react";

import AICard from "./AICard";

const HEALTH_CONFIG = {
  Excellent: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: ShieldCheck,
    message: "Election is operating within healthy parameters.",
  },

  Healthy: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: TrendingUp,
    message: "Minor issues detected. Continue monitoring.",
  },

  Fair: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: ShieldAlert,
    message: "Some indicators require administrator review.",
  },

  Poor: {
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: ShieldAlert,
    message: "Election performance is below expectations.",
  },

  Critical: {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: ShieldX,
    message: "Election health is poor. Immediate attention recommended.",
  },
};

export default function AIHealthCard({ health }) {
  if (!health) {
    return null;
  }

  const config = HEALTH_CONFIG[health.status] ?? HEALTH_CONFIG.Critical;

  const Icon = config.icon;

  return (
    <AICard title="Election Health Score" subtitle="Overall AI assessment">
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${config.bg} ${config.color}`}
          >
            <Icon className="h-4 w-4" />

            {health.status}
          </div>

          <h2 className="mt-4 text-6xl font-bold text-slate-900">
            {health.score}
          </h2>

          <p className="mt-1 text-sm text-slate-500">out of 100</p>
        </div>

        <div
          className={`flex h-32 w-32 items-center justify-center rounded-full border-8 ${config.border}`}
        >
          <span className={`text-4xl font-bold ${config.color}`}>
            {health.score}
          </span>
        </div>
      </div>

      <div className={`mt-6 rounded-xl ${config.bg} p-4`}>
        <p className={`font-semibold ${config.color}`}>{config.message}</p>
      </div>
    </AICard>
  );
}
