import { useCallback, useEffect, useRef, useState } from "react";
import { fetchElectionAIInsights } from "../api/aiElectionApi";

const REFRESH_INTERVAL = 120000; // 2 minutes

export default function useElectionAI(accessToken, electionId, electionStatus) {
  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(null);

  const intervalRef = useRef(null);

  const fetchInsights = useCallback(
    async (manual = false) => {
      if (!electionId) return;

      try {
        manual ? setRefreshing(true) : setLoading(true);

        setError(null);

        const data = await fetchElectionAIInsights(accessToken, electionId);

        setReport(data.data);

        setLastUpdated(new Date());
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to generate AI insights.",
        );
      } finally {
        setLoading(false);

        setRefreshing(false);
      }
    },
    [electionId],
  );

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (electionStatus !== "active") {
      return;
    }

    intervalRef.current = setInterval(() => {
      fetchInsights(true);
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [fetchInsights, electionStatus]);

  return {
    report,

    loading,

    refreshing,

    error,

    lastUpdated,

    refresh: () => fetchInsights(true),
  };
}
