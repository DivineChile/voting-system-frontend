import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SEQUENTIAL_VIOLET, CHART_CHROME, chartFont } from './chartTheme';

export default function BreakdownBarChart({ data, labelKey, emptyMessage }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 34)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
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
          dataKey={labelKey}
          tick={chartFont}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip
          formatter={(value, name, item) => [
            `${value}% (${item.payload.voted_count}/${item.payload.eligible_count} eligible)`,
            'Turnout',
          ]}
          contentStyle={{
            background: CHART_CHROME.tooltipBg,
            border: `1px solid ${CHART_CHROME.tooltipBorder}`,
            borderRadius: 12,
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="turnout_percentage"
          fill={SEQUENTIAL_VIOLET[400]}
          radius={[0, 4, 4, 0]}
          barSize={16}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
