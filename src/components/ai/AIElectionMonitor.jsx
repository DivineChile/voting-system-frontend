import useElectionAI from "../../hooks/useElectionAI";

import AISkeleton from "./AISkeleton";
import AIErrorState from "./AIErrorState";

import AIHeader from "./AIHeader";
import AIHealthScore from "./AIHealthScore";
import AISummary from "./AISummary";
import AIObservationList from "./AIObservationList";
import AIRiskList from "./AIRiskList";
import AIRecommendationList from "./AIRecommendationList";
import AILastUpdated from "./AILastUpdated";

export default function AIElectionMonitor({
  electionId,
  accessToken,
  electionStatus,
}) {
  const {
    report,

    loading,

    error,

    refresh,

    refreshing,

    lastUpdated,
  } = useElectionAI(electionId, accessToken, electionStatus);

  if (loading) {
    return <AISkeleton />;
  }

  if (error) {
    return <AIErrorState message={error} onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <AIHeader refreshing={refreshing} onRefresh={refresh} />

      <AIHealthScore health={report.intelligence.health} />

      <AISummary summary={report.summary} />

      <AIObservationList
        observations={report.intelligence.positiveIndicators}
      />

      <AIRiskList risks={report.intelligence.riskIndicators} />

      <AIRecommendationList
        recommendations={report.intelligence.recommendations}
      />

      <AILastUpdated updatedAt={lastUpdated} />
    </div>
  );
}
