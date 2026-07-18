import { useCallback, useEffect, useRef, useState } from "react";

import { fetchElectionAIInsights } from "../api/aiElectionApi";

const REFRESH_INTERVAL = 120000; // 2 minutes

export default function useElectionAI(electionId, accessToken, electionStatus) {
  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(null);

  const intervalRef = useRef(null);

  const fetchInsights = useCallback(
    async (manual = false) => {
      if (!electionId || !accessToken) {
        return;
      }

      try {
        if (manual) {
          setRefreshing(true);
        } else {
          setLoading(true);

          // Prevent showing the previous election while loading
          setReport(null);
        }

        setError(null);

        const response = await fetchElectionAIInsights(accessToken, electionId);

        setReport(response);
        console.log(response);

        // Prefer backend generation time
        setLastUpdated(response.generatedAt || new Date().toISOString());
      } catch (err) {
        console.error(err);

        setError(err.message || "Unable to generate AI election insights.");
      } finally {
        setLoading(false);

        setRefreshing(false);
      }
    },
    [accessToken, electionId],
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchInsights, electionStatus]);

  const refresh = useCallback(() => {
    fetchInsights(true);
  }, [fetchInsights]);

  return {
    report,

    loading,

    refreshing,

    error,

    lastUpdated,

    refresh,
  };
}
