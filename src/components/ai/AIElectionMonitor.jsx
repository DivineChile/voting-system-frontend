import useElectionAI from "../../hooks/useElectionAI";

import AISkeleton from "./AISkeleton";
import AIErrorState from "./AIErrorState";

import AIHeader from "./AIHeader";
import AIHealthCard from "./AIHealthCard";
import AISummary from "./AISummaryCard";
import AIObservationList from "./AIObservationList";
import AIRecommendationList from "./AIRecommendationList";
import AILastUpdated from "./AILastUpdated";
import AIRiskList from "./AIRiskList";

export default function AIElectionMonitor({
  electionId,
  accessToken,
  electionStatus,
}) {
  const { report, loading, error, refresh, refreshing, lastUpdated } =
    useElectionAI(electionId, accessToken, electionStatus);

  if (loading) {
    return <AISkeleton />;
  }

  if (error) {
    return <AIErrorState message={error} onRetry={refresh} />;
  }

  if (!report) {
    return <AIErrorState message="No AI report available." onRetry={refresh} />;
  }

  const { intelligence, summary } = report;

  return (
    <div className="space-y-6">
      <AIHeader
        election={intelligence.election}
        refreshing={refreshing}
        onRefresh={refresh}
      />

      <AIHealthCard health={intelligence.health} />

      <AISummary summary={summary} />

      <AIObservationList observations={intelligence.positiveIndicators} />

      <AIRiskList risks={intelligence.riskIndicators} />

      <AIRecommendationList recommendations={intelligence.recommendations} />

      <AILastUpdated updatedAt={lastUpdated} />
    </div>
  );
}
