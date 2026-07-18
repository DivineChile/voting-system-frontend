export default function AISkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-6 w-52 rounded bg-slate-200" />

      <div className="space-y-2">
        <div className="h-4 rounded bg-slate-200" />
        <div className="h-4 w-11/12 rounded bg-slate-200" />
        <div className="h-4 w-10/12 rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 rounded bg-slate-200" />
        <div className="h-24 rounded bg-slate-200" />
      </div>

      <div className="h-28 rounded bg-slate-200" />
    </div>
  );
}
