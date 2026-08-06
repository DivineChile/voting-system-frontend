const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAdminAnalyticsOverview(accessToken, { electionId, bucket } = {}) {
  const params = new URLSearchParams();
  if (electionId) params.set('electionId', electionId);
  if (bucket) params.set('bucket', bucket);

  const query = params.toString();

  const response = await fetch(
    `${API_BASE_URL}/admin/analytics/overview${query ? `?${query}` : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to load analytics overview.');
  }

  return result;
}

export async function fetchElectionAnalyticsDetail(accessToken, electionId) {
  const response = await fetch(
    `${API_BASE_URL}/admin/analytics/elections/${electionId}/intelligence`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to load election analytics.');
  }

  return result;
}
