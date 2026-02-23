import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Rating from "../components/Rating";
import FeedbackBox from "../components/FeedbackBox";
import { mockStudents, statusColors } from "../data/mockData";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("portfolioStudents");
    return saved ? JSON.parse(saved) : mockStudents;
  });

  const [selected, setSelected] = useState(null); // { student, project }

  const totalProjects = students.reduce((a, s) => a + s.projects.length, 0);
  const approved = students.reduce((a, s) => a + s.projects.filter(p => p.status === "Approved").length, 0);
  const pending = students.reduce((a, s) => a + s.projects.filter(p => p.status === "Pending").length, 0);

  const saveStudents = (updated) => {
    setStudents(updated);
    localStorage.setItem("portfolioStudents", JSON.stringify(updated));
  };

  const updateProject = (studentId, projectId, changes) => {
    const updated = students.map((s) =>
      s.id === studentId
        ? { ...s, projects: s.projects.map((p) => p.id === projectId ? { ...p, ...changes } : p) }
        : s
    );
    saveStudents(updated);
    // Refresh selected
    if (selected) {
      const student = updated.find(s => s.id === studentId);
      const project = student?.projects.find(p => p.id === projectId);
      if (project) setSelected({ student, project });
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-12"
      style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(239,68,68,0.06) 0%, transparent 60%), #090912" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-slate-400 text-sm">Review and evaluate student portfolios</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Students", value: students.length, color: "#818cf8" },
            { label: "Total Projects", value: totalProjects, color: "#a78bfa" },
            { label: "Approved", value: approved, color: "#34d399" },
            { label: "Pending Review", value: pending, color: "#f59e0b" },
          ].map(({ label, value, color }, idx) => (
            <div key={label} className="p-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover-lift animate-slideUp"
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.07)",
                animationDelay: `${idx * 50}ms`
              }}>
              <p className="text-2xl font-black" style={{ fontFamily: "'Syne', sans-serif", color }}>{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Student Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student, idx) => {
            const avg = student.projects.length
              ? Math.round(student.projects.reduce((a, p) => a + p.progress, 0) / student.projects.length)
              : 0;

            return (
              <div key={student.id} className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-slideUp hover-lift"
                style={{ 
                  background: "rgba(255,255,255,0.03)", 
                  border: "1px solid rgba(255,255,255,0.07)",
                  animationDelay: `${idx * 50}ms`
                }}>

                {/* Student header */}
                <div className="flex items-center gap-3 mb-4 group hover:gap-4 transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "'Syne', sans-serif" }}>
                    {student.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {student.name}
                    </h3>
                    {student.branch && student.university && (
                      <p className="text-xs text-indigo-400 font-semibold truncate">{student.branch} • {student.university}</p>
                    )}
                    <p className="text-xs text-slate-500 truncate">{student.email}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <ProgressBar value={avg} />
                </div>

                {/* Project list */}
                <div className="space-y-2 mb-4">
                  {student.projects.map((p) => {
                    const sc = statusColors[p.status] || statusColors.Pending;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelected({ student, project: p })}
                        className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:bg-white/5 hover:scale-[1.02] active:scale-95"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <span className="text-xs text-slate-300 truncate hover:text-slate-100 transition-colors">{p.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${sc.bg} ${sc.text} transition-all duration-300`}>{p.status}</span>
                      </button>
                    );
                  })}
                </div>

                {student.portfolioLink && (
                  <a href={student.portfolioLink} target="_blank" rel="noreferrer"
                    className="w-full py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-all hover:bg-white/5 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Public Portfolio
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-slideUp"
            style={{ background: "#0f0f1e", border: "1px solid rgba(255,255,255,0.1)" }}>

            {/* Modal header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-1">{selected.student.name}</p>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {selected.project.title}
                </h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white text-xl leading-none transition-colors hover:scale-125 active:scale-95">×</button>
            </div>

            <p className="text-sm text-slate-400">{selected.project.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {selected.project.technologies.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full text-slate-400 hover:text-slate-200 transition-colors hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
              ))}
            </div>

            <ProgressBar value={selected.project.progress} />

            {/* Rating */}
            <div className="animate-slideUp" style={{ animationDelay: '50ms' }}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Rating</p>
              <Rating
                value={selected.project.rating}
                editable
                onRate={(r) => updateProject(selected.student.id, selected.project.id, { rating: r })}
              />
            </div>

            {/* Status */}
            <div className="animate-slideUp" style={{ animationDelay: '100ms' }}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Status</p>
              <div className="flex gap-2 flex-wrap">
                {["Approved", "Needs Revision", "Rejected"].map((s) => {
                  const sc = statusColors[s];
                  const isActive = selected.project.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => updateProject(selected.student.id, selected.project.id, { status: s })}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 ${sc.text} ${isActive ? sc.bg : "bg-transparent"} border ${sc.border}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback */}
            <div className="animate-slideUp" style={{ animationDelay: '150ms' }}>
              <FeedbackBox
                feedback={selected.project.feedback}
                editable
                onSave={(fb) => updateProject(selected.student.id, selected.project.id, { feedback: fb })}
              />
            </div>

            <button onClick={() => setSelected(null)}
              className="w-full py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-all hover:bg-white/5 active:scale-95"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
