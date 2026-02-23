import { useState } from "react";

export default function Rating({ value = 0, max = 5, editable = false, onRate }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1 group">
      {Array.from({ length: max }).map((_, i) => {
        const star = i + 1;
        const filled = editable ? star <= (hover || value) : star <= value;
        const half = !editable && !filled && star - 0.5 <= value;

        return (
          <button
            key={i}
            disabled={!editable}
            onClick={() => editable && onRate && onRate(star)}
            onMouseEnter={() => editable && setHover(star)}
            onMouseLeave={() => editable && setHover(0)}
            className={`text-lg transition-all duration-150 ${
              editable 
                ? "cursor-pointer hover:scale-125 hover:drop-shadow-[0_0_8px_#f59e0b]" 
                : "cursor-default"
            } ${filled || half ? "animate-bounce2" : ""}`}
            style={{ 
              color: filled || half ? "#f59e0b" : "rgba(255,255,255,0.15)",
              textShadow: (filled || half) ? "0 0 8px rgba(245,158,11,0.5)" : "none"
            }}>
            {half ? "★" : filled ? "★" : "☆"}
          </button>
        );
      })}
      {value > 0 && (
        <span className="text-xs text-slate-400 ml-1 group-hover:text-slate-300 transition-colors animate-pulse2">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
