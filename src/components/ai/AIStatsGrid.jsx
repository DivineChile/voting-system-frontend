import { Users, Vote, Trophy } from "lucide-react";

import AIHealthCard from "./AIHealthCard";
import AIStatCard from "./AIStatCard";

export default function AIStatsGrid({ analytics }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <AIHealthCard score={analytics.health_score} />

      <AIStatCard
        title="Turnout"
        value={`${analytics.turnout_percentage}%`}
        subtitle={`${analytics.total_votes} votes`}
        icon={Vote}
        color="text-emerald-600"
      />

      <AIStatCard
        title="Candidates"
        value={analytics.total_candidates}
        subtitle={`${analytics.total_positions} positions`}
        icon={Users}
        color="text-blue-600"
      />

      <AIStatCard
        title="Competition"
        value={analytics.average_candidates_per_position}
        subtitle="Candidates / Position"
        icon={Trophy}
        color="text-violet-600"
      />
    </div>
  );
}
