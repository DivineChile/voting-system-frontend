export default function ChartCard({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
