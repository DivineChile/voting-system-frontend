import { CheckCircle2 } from "lucide-react";

import AICard from "./AICard";

export default function AIObservationList({ observations = [] }) {
  return (
    <AICard
      title="Positive Indicators"
      subtitle="Strengths identified by the analytics engine"
    >
      {observations.length === 0 ? (
        <p className="text-sm text-slate-500">
          No positive indicators available.
        </p>
      ) : (
        <ul className="space-y-3">
          {observations.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />

              <span className="text-sm leading-6 text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </AICard>
  );
}
