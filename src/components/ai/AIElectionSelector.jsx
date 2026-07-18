import { CalendarDays, ChevronDown, Vote } from "lucide-react";

const STATUS_STYLES = {
  draft: {
    label: "Draft",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
  closed: {
    label: "Closed",
    className: "bg-sky-100 text-sky-700 border border-sky-200",
  },
  published: {
    label: "Published",
    className: "bg-violet-100 text-violet-700 border border-violet-200",
  },
};

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ElectionSelector({
  elections = [],
  selectedElectionId,
  onChange,
}) {
  const selectedElection =
    elections.find((e) => e.id === selectedElectionId) || null;

  if (!selectedElection) {
    return null;
  }

  const status = STATUS_STYLES[selectedElection.status] ?? STATUS_STYLES.draft;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Election Being Analysed
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
              <Vote className="h-6 w-6 text-indigo-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {selectedElection.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                >
                  {status.label}
                </span>

                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <CalendarDays className="h-4 w-4" />

                  <span>
                    {formatDate(selectedElection.start_time)}
                    {" - "}
                    {formatDate(selectedElection.end_time)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Analyze Another Election
            </label>

            <div className="relative">
              <select
                value={selectedElectionId}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {elections.map((election) => (
                  <option key={election.id} value={election.id}>
                    {election.title} • {election.status}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
