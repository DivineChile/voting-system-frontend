import BreakdownBarChart from './BreakdownBarChart';
import { foldBreakdown } from './chartTheme';

export default function DepartmentTurnoutChart({ data }) {
  const folded = data ? foldBreakdown(data, 'department', 8) : data;

  return (
    <BreakdownBarChart
      data={folded}
      labelKey="department"
      emptyMessage="No department data available."
    />
  );
}
