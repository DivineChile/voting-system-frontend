// src/components/ai/AICard.jsx

export default function AICard({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
  className = "",
}) {
  return (
    <div
      className={`
                bg-white
                border border-slate-200
                rounded-2xl
                shadow-sm
                transition-all
                duration-200
                hover:shadow-md
                ${className}
            `}
    >
      {(title || Icon || action) && (
        <div className="flex items-start justify-between px-6 pt-5">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
            )}

            <div>
              {title && (
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
              )}

              {subtitle && (
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
              )}
            </div>
          </div>

          {action}
        </div>
      )}

      <div className="px-6 pb-6 pt-5">{children}</div>
    </div>
  );
}
