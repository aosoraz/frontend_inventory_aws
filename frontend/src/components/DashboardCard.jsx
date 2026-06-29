export default function DashboardCard({ title, icon, value, subText, subTextColor, iconBgColor, iconTextColor, trendIcon, borderClass }) {
  return (
    <div className={`bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow ${borderClass || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{title}</h3>
        <span className={`material-symbols-outlined p-2 rounded-lg ${iconTextColor} ${iconBgColor}`} data-icon={icon}>
          {icon}
        </span>
      </div>
      <div className="flex items-end gap-3">
        <span className="font-h1 text-h1 text-on-surface">{value}</span>
        <span className={`font-body-sm text-body-sm mb-1 flex items-center ${subTextColor || 'text-on-surface-variant'}`}>
          {trendIcon && <span className="material-symbols-outlined text-sm mr-1" data-icon={trendIcon}>{trendIcon}</span>}
          {subText}
        </span>
      </div>
    </div>
  );
}
