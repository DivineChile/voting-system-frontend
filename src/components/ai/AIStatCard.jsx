import AICard from "./AICard";

export default function AIStatCard({
  title,

  value,

  subtitle,

  icon: Icon,

  color = "text-indigo-600",
}) {
  return (
    <AICard>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">{value}</h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-slate-100 p-3">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        )}
      </div>
    </AICard>
  );
}
