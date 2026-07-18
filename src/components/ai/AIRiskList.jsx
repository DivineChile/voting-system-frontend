import { TriangleAlert } from "lucide-react";

import AICard from "./AICard";

export default function AIRiskList({ risks = [] }) {
  return (
    <AICard title="Potential Risks" subtitle="Areas requiring attention">
      {risks.length === 0 ? (
        <p className="text-sm text-emerald-600">
          No significant operational risks detected.
        </p>
      ) : (
        <ul className="space-y-3">
          {risks.map((risk, index) => (
            <li key={index} className="flex items-start gap-3">
              <TriangleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />

              <span className="text-sm leading-6 text-slate-700">
                {risk.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </AICard>
  );
}
