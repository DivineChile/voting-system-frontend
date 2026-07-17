const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Get AI-powered election monitoring insights
 */
export async function fetchElectionAIInsights(accessToken, electionId) {
  const response = await fetch(
    `${API_BASE_URL}/ai/elections/${electionId}/insights`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to generate AI insights.");
  }

  return result;
}
