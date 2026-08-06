import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CATEGORICAL, CHART_CHROME, chartFont } from './chartTheme';

function formatBucketLabel(isoString, bucket) {
  const date = new Date(isoString);

  if (bucket === 'hour') {
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    });
  }

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function TurnoutTrendChart({ data, bucket = 'day' }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No voting activity recorded yet.
      </div>
    );
  }

  const chartData = data.map((point) => ({
    ...point,
    label: formatBucketLabel(point.bucket_start, bucket),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={chartData} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid stroke={CHART_CHROME.grid} vertical={false} />
        <XAxis
          dataKey="label"
          tick={chartFont}
          axisLine={{ stroke: CHART_CHROME.axis }}
          tickLine={false}
        />
        <YAxis tick={chartFont} axisLine={false} tickLine={false} width={40} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: CHART_CHROME.tooltipBg,
            border: `1px solid ${CHART_CHROME.tooltipBorder}`,
            borderRadius: 12,
            fontSize: 12,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar
          dataKey="votes"
          name="Votes"
          fill={CATEGORICAL.secondary}
          radius={[4, 4, 0, 0]}
          barSize={18}
        />
        <Line
          type="monotone"
          dataKey="cumulative_votes"
          name="Cumulative votes"
          stroke={CATEGORICAL.primary}
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
