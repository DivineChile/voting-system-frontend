import { Lightbulb } from "lucide-react";

import AICard from "./AICard";

export default function AIRecommendationList({ recommendations = [] }) {
  return (
    <AICard title="Recommendations" subtitle="Suggested actions">
      {recommendations.length === 0 ? (
        <p className="text-sm text-slate-500">No recommendations available.</p>
      ) : (
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />

              <span className="text-sm leading-6 text-slate-700">
                {recommendation}
              </span>
            </li>
          ))}
        </ul>
      )}
    </AICard>
  );
}
