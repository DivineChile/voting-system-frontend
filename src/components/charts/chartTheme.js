// Colors validated with the dataviz skill's validate_palette.js against this
// app's light-only chart surface (#ffffff). Sequential ramp reuses the app's
// existing violet scale (badges, sidebar, active states) so charts read as
// part of the same system rather than introducing a new brand hue.

export const SEQUENTIAL_VIOLET = {
  100: '#EEEDFE',
  200: '#D9D6FB',
  300: '#AFA9EC',
  400: '#534AB7',
  500: '#3C3489',
  600: '#26215C',
};

// Two-series categorical pair — passes CVD + normal-vision checks in both
// adjacent and all-pairs mode (validate_palette.js "#534AB7,#eb6834").
export const CATEGORICAL = {
  primary: '#534AB7',
  secondary: '#eb6834',
};

export const CHART_CHROME = {
  grid: '#e5e7eb',
  axis: '#d1d5db',
  mutedText: '#9ca3af',
  tooltipBg: '#ffffff',
  tooltipBorder: '#e5e7eb',
};

export const chartFont = {
  fontSize: 11,
  fill: CHART_CHROME.mutedText,
};

// Folds breakdown rows ({ [labelKey], eligible_count, voted_count, turnout_percentage })
// past `limit` into a single "Other" row with a recomputed (not summed) percentage.
export function foldBreakdown(items, labelKey, limit = 8) {
  if (items.length <= limit) return items;

  const kept = items.slice(0, limit);
  const rest = items.slice(limit);

  const eligibleSum = rest.reduce((sum, item) => sum + (item.eligible_count || 0), 0);
  const votedSum = rest.reduce((sum, item) => sum + (item.voted_count || 0), 0);

  return [
    ...kept,
    {
      [labelKey]: `Other (${rest.length})`,
      eligible_count: eligibleSum,
      voted_count: votedSum,
      turnout_percentage: eligibleSum > 0 ? Number(((votedSum / eligibleSum) * 100).toFixed(2)) : 0,
    },
  ];
}
