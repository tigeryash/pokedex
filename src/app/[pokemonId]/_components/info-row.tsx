type InfoRowProps = {
  icon?: React.ReactNode;
  label: string;
  tooltip?: string;
  value: string;
  bar?: boolean;
  barColor?: string;
  barWidth?: string;
  extra?: React.ReactNode;
};

export const InfoRow = ({
  icon,
  label,
  tooltip,
  value,
  bar,
  barColor = '#71717a',
  barWidth = '0%',
  extra,
}: InfoRowProps) => {
  return (
    <div className="flex items-center gap-3.5 py-3.5 border-b border-white/[0.04] relative">
      {icon && (
        <div className="w-8 h-8 bg-white/10 rounded-lg border border-white/10 flex items-center justify-center text-[#71717a] shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[0.72rem] text-[#404040] uppercase tracking-[0.06em] font-semibold mb-1 flex items-center gap-1.5">
          {label}
          {tooltip && (
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white/[0.07] text-[#404040] text-[0.6rem] font-bold cursor-default relative">
              ?
            </span>
          )}
        </div>
        <div className="text-[0.95rem] font-semibold text-white">
          {value}
          {extra}
        </div>
        {bar && (
          <div className="h-[3px] bg-white/[0.05] rounded-[2px] mt-1.5 overflow-hidden">
            <div
              className="h-full rounded-[2px]"
              style={{ background: barColor, width: barWidth }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
