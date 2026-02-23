import { useState } from "react";

export default function FeedbackBox({ feedback, onSave, editable = false }) {
  const [text, setText] = useState(feedback || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave && onSave(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!editable) {
    return feedback ? (
      <div className="p-4 rounded-xl text-sm text-slate-300 leading-relaxed animate-slideUp hover:shadow-lg transition-all duration-300"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-medium">Feedback</p>
        {feedback}
      </div>
    ) : (
      <p className="text-sm text-slate-600 italic animate-slideUp">No feedback yet.</p>
    );
  }

  return (
    <div className="space-y-2 animate-slideUp">
      <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Write Feedback</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Provide constructive feedback..."
        className="w-full text-sm text-slate-200 placeholder-slate-600 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 hover:shadow-md"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      />
      <button
        onClick={handleSave}
        className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: saved ? "rgba(16,185,129,0.2)" : "rgba(99,102,241,0.2)",
          color: saved ? "#34d399" : "#818cf8",
          border: saved ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(99,102,241,0.3)",
        }}>
        {saved ? "✓ Saved" : "Save Feedback"}
      </button>
    </div>
  );
}
