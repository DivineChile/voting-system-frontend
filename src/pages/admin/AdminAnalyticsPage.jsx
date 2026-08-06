import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Info,
  Percent,
} from 'lucide-react';
import { useAuth } from '../../contexts/auth-context';
import { fetchAdminElections } from '../../api/adminElectionApi';
import {
  fetchAdminAnalyticsOverview,
  fetchElectionAnalyticsDetail,
} from '../../api/analyticsApi';
import AICard from '../../components/ai/AICard';
import AIStatCard from '../../components/ai/AIStatCard';
import ChartCard from '../../components/charts/ChartCard';
import TurnoutTrendChart from '../../components/charts/TurnoutTrendChart';
import ElectionComparisonChart from '../../components/charts/ElectionComparisonChart';
import DepartmentTurnoutChart from '../../components/charts/DepartmentTurnoutChart';

function StatusMessage({ type = 'info', children }) {
  const styles = {
    error: 'border-red-200 bg-red-50 text-red-700',
    info: 'border-slate-200 bg-slate-50 text-slate-700',
  };

  const Icon = type === 'error' ? AlertTriangle : Info;

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[type] || styles.info}`}>
      <div className="flex items-start gap-2.5">
        <Icon size={16} className="mt-0.5 flex-shrink-0" />
        <div>{children}</div>
      </div>
    </div>
  );
}

function PageHero() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D9D6FB] bg-[#F7F6FF] px-3 py-1 text-[11px] font-medium text-[#534AB7]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#534AB7]" />
        Admin analytics
      </div>
      <h1 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">Analytics</h1>
      <p className="mt-2 max-w-3xl text-sm md:text-[15px] leading-relaxed text-gray-500">
        Cross-election turnout, participation trends, and department breakdowns across the
        platform. Select an election below for a detailed spotlight.
      </p>
    </div>
  );
}

function ScopeControls({
  elections,
  loadingElections,
  selectedElectionId,
  onElectionChange,
  bucket,
  onBucketChange,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-end gap-4">
      <div className="flex-1">
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
          Election scope
        </label>
        <select
          value={selectedElectionId}
          onChange={(event) => onElectionChange(event.target.value)}
          disabled={loadingElections}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#534AB7]"
        >
          <option value="">All elections</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>
              {election.title} ({election.status})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
          Trend granularity
        </label>
        <div className="inline-flex rounded-xl border border-gray-200 p-1">
          {['day', 'hour'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onBucketChange(option)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium capitalize transition ${
                bucket === option
                  ? 'bg-[#534AB7] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiRow({ totals, loading }) {
  const items = [
    { label: 'Total elections', value: totals?.total_elections },
    { label: 'Total ballots (all-time)', value: totals?.total_ballots_all_time },
    { label: 'Eligible students', value: totals?.eligible_students },
    { label: 'Active elections', value: totals?.active },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="bg-gray-100 rounded-lg px-4 py-3.5">
          <p className="text-[11px] text-gray-500 mb-1.5">{item.label}</p>
          <p className="text-[22px] font-medium text-gray-900">
            {loading ? '...' : item.value ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}

function BreakdownTable({ rows, labelKey, labelHeader }) {
  if (!rows || rows.length === 0) {
    return <p className="mt-4 text-sm text-gray-400">No data available.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wide">
            <th className="py-2 pr-3 font-medium">{labelHeader}</th>
            <th className="py-2 px-3 font-medium">Eligible</th>
            <th className="py-2 px-3 font-medium">Voted</th>
            <th className="py-2 pl-3 font-medium">Turnout</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[labelKey]} className="border-b border-gray-50 last:border-0">
              <td className="py-2 pr-3 text-gray-900">{row[labelKey]}</td>
              <td className="py-2 px-3 text-gray-600">{row.eligible_count}</td>
              <td className="py-2 px-3 text-gray-600">{row.voted_count}</td>
              <td className="py-2 pl-3 text-gray-900 font-medium">{row.turnout_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ElectionSpotlight({ detail }) {
  if (!detail) return null;

  const { election, current, historical, health, riskIndicators, positiveIndicators, recommendations } =
    detail;

  const TrendIcon =
    historical.turnoutTrend === 'Declining'
      ? TrendingDown
      : historical.turnoutTrend === 'Increasing'
      ? TrendingUp
      : Activity;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{election.title}</h2>
        <p className="mt-1 text-[13px] text-gray-500">Election spotlight</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <AIStatCard
          title="Election health"
          value={`${health.score}`}
          subtitle={health.status}
          icon={Activity}
        />
        <AIStatCard
          title="Turnout"
          value={`${current.turnoutPercentage}%`}
          subtitle={current.participationLevel}
          icon={Percent}
        />
        <AIStatCard
          title="Voting velocity"
          value={`${current.averageVotesPerHour}/hr`}
          subtitle={`${current.ballotsLastHour} in the last hour`}
          icon={Zap}
        />
        <AIStatCard
          title="Competition"
          value={current.competitionLevel}
          subtitle={`${current.averageCandidatesPerPosition} candidates/position`}
          icon={TrendingUp}
        />
      </div>

      <AICard title="Historical comparison" subtitle="Versus past published elections" icon={TrendIcon}>
        {historical.previousElectionCount === 0 ? (
          <p className="text-sm text-gray-500">
            No previously published elections to compare against yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[11px] text-gray-400">Turnout trend</p>
              <p className="mt-1 font-medium text-gray-900">{historical.turnoutTrend}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Vs. average</p>
              <p className="mt-1 font-medium text-gray-900">{historical.turnoutPerformance}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Best turnout</p>
              <p className="mt-1 font-medium text-gray-900">{historical.bestTurnout}%</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Lowest turnout</p>
              <p className="mt-1 font-medium text-gray-900">{historical.lowestTurnout}%</p>
            </div>
          </div>
        )}
      </AICard>

      {riskIndicators.length > 0 || positiveIndicators.length > 0 || recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AICard title="Risk indicators" icon={AlertTriangle}>
            {riskIndicators.length === 0 ? (
              <p className="text-sm text-gray-500">No active risk indicators.</p>
            ) : (
              <ul className="space-y-2">
                {riskIndicators.map((risk) => (
                  <li key={risk.type} className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">{risk.type}</span>
                    <span className="text-gray-400"> · {risk.severity}</span>
                    <p className="text-gray-500">{risk.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </AICard>

          <AICard title="Positive signals & recommendations" icon={CheckCircle2}>
            <ul className="space-y-1.5 text-sm text-gray-700 list-disc list-inside">
              {positiveIndicators.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
              {recommendations.map((recommendation) => (
                <li key={recommendation} className="text-gray-500">
                  {recommendation}
                </li>
              ))}
              {positiveIndicators.length === 0 && recommendations.length === 0 ? (
                <p className="text-gray-500 list-none">Nothing to report.</p>
              ) : null}
            </ul>
          </AICard>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const { session } = useAuth();

  const [elections, setElections] = useState([]);
  const [loadingElections, setLoadingElections] = useState(true);
  const [selectedElectionId, setSelectedElectionId] = useState('');
  const [bucket, setBucket] = useState('day');

  const [overview, setOverview] = useState(null);
  const [loadingOverview, setLoadingOverview] = useState(true);

  const [detail, setDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadElections() {
      try {
        const result = await fetchAdminElections(session?.access_token);
        setElections(result.data || []);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to load elections.');
      } finally {
        setLoadingElections(false);
      }
    }

    if (session?.access_token) {
      loadElections();
    }
  }, [session]);

  useEffect(() => {
    async function loadOverview() {
      setLoadingOverview(true);
      setErrorMessage('');

      try {
        const result = await fetchAdminAnalyticsOverview(session?.access_token, {
          electionId: selectedElectionId || undefined,
          bucket,
        });
        setOverview(result.data);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to load analytics overview.');
      } finally {
        setLoadingOverview(false);
      }
    }

    if (session?.access_token) {
      loadOverview();
    }
  }, [session, selectedElectionId, bucket]);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedElectionId) {
        setDetail(null);
        return;
      }

      setLoadingDetail(true);

      try {
        const result = await fetchElectionAnalyticsDetail(
          session?.access_token,
          selectedElectionId
        );
        setDetail(result.data);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to load election analytics.');
        setDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    }

    if (session?.access_token) {
      loadDetail();
    }
  }, [session, selectedElectionId]);

  return (
    <div className="max-w-6xl space-y-6">
      <PageHero />

      {errorMessage ? <StatusMessage type="error">{errorMessage}</StatusMessage> : null}

      <ScopeControls
        elections={elections}
        loadingElections={loadingElections}
        selectedElectionId={selectedElectionId}
        onElectionChange={setSelectedElectionId}
        bucket={bucket}
        onBucketChange={setBucket}
      />

      <KpiRow totals={overview?.totals} loading={loadingOverview} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ChartCard
          title="Voting activity over time"
          subtitle={`Votes per ${bucket} with cumulative total`}
        >
          <TurnoutTrendChart data={overview?.votes_over_time} bucket={bucket} />
        </ChartCard>

        <ChartCard title="Turnout by election" subtitle="Ballots cast vs. eligible students">
          <ElectionComparisonChart
            data={overview?.election_comparison}
            selectedElectionId={overview?.scope?.electionId}
          />
        </ChartCard>

        <ChartCard
          title="Turnout by department"
          subtitle="Top 8 departments, remainder folded"
          className="xl:col-span-2"
        >
          <DepartmentTurnoutChart data={overview?.department_breakdown} />
          <BreakdownTable
            rows={overview?.department_breakdown}
            labelKey="department"
            labelHeader="Department"
          />
        </ChartCard>
      </div>

      {selectedElectionId ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          {loadingDetail ? (
            <p className="text-sm text-gray-500">Loading election spotlight...</p>
          ) : (
            <ElectionSpotlight detail={detail} />
          )}
        </div>
      ) : null}
    </div>
  );
}
