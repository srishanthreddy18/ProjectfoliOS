export default function ProgressBar({ value, showLabel = true, height = "h-2" }) {
  const getColor = (v) => {
    if (v >= 80) return "from-emerald-500 to-teal-400";
    if (v >= 50) return "from-indigo-500 to-purple-500";
    return "from-amber-500 to-orange-400";
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-white animate-pulse2">{value}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-white/5 overflow-hidden relative`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColor(value)} transition-all duration-700 shadow-lg shadow-indigo-500/20`}
          style={{ width: `${value}%` }}
        />
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "shimmer 2s infinite",
          }} />
      </div>
    </div>
  );
}
