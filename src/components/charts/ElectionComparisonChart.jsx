import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SEQUENTIAL_VIOLET, CHART_CHROME, chartFont } from './chartTheme';

function truncateTitle(title, max = 18) {
  if (!title) return '';
  return title.length > max ? `${title.slice(0, max - 1)}…` : title;
}

export default function ElectionComparisonChart({ data, selectedElectionId }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No elections available for comparison.
      </div>
    );
  }

  const chartData = [...data]
    .sort((a, b) => b.turnout_percentage - a.turnout_percentage)
    .map((election) => ({
      ...election,
      label: truncateTitle(election.title),
    }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(220, chartData.length * 36)}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 4, right: 24, left: 0, bottom: 0 }}
      >
        <CartesianGrid stroke={CHART_CHROME.grid} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={chartFont}
          axisLine={{ stroke: CHART_CHROME.axis }}
          tickLine={false}
          unit="%"
        />
        <YAxis
          type="category"
          dataKey="label"
          tick={chartFont}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Turnout']}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.title || ''}
          contentStyle={{
            background: CHART_CHROME.tooltipBg,
            border: `1px solid ${CHART_CHROME.tooltipBorder}`,
            borderRadius: 12,
            fontSize: 12,
          }}
        />
        <Bar dataKey="turnout_percentage" radius={[0, 4, 4, 0]} barSize={16}>
          {chartData.map((election) => (
            <Cell
              key={election.id}
              fill={
                election.id === selectedElectionId
                  ? SEQUENTIAL_VIOLET[400]
                  : SEQUENTIAL_VIOLET[200]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
