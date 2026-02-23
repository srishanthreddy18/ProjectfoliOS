import { useParams, useNavigate } from "react-router-dom";
import { mockStudents, statusColors } from "../data/mockData";
import ProgressBar from "../components/ProgressBar";
import Rating from "../components/Rating";
import FeedbackBox from "../components/FeedbackBox";

export default function ProjectDetails() {
  const { studentId, projectId } = useParams();
  const navigate = useNavigate();

  const students = (() => {
    const saved = localStorage.getItem("portfolioStudents");
    return saved ? JSON.parse(saved) : mockStudents;
  })();

  const student = students.find((s) => s.id === studentId);
  const project = student?.projects.find((p) => p.id === projectId);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#090912" }}>
      <div className="text-center">
        <p className="text-slate-400">Project not found.</p>
        <button onClick={() => navigate(-1)} className="text-indigo-400 text-sm mt-2 hover:underline block">← Go Back</button>
      </div>
    </div>
  );

  const sc = statusColors[project.status] || statusColors.Pending;

  return (
    <div className="min-h-screen pt-20 px-4 pb-12" style={{ background: "#090912" }}>
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="rounded-2xl p-6 space-y-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{project.title}</h1>
            <span className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap ${sc.bg} ${sc.text} border ${sc.border}`}>
              {project.status}
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed">{project.description}</p>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="text-sm px-3 py-1 rounded-full text-slate-300"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>{t}</span>
              ))}
            </div>
          </div>

          {project.liveUrl && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Live URL</p>
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors flex items-center gap-2">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                </svg>
                {project.liveUrl}
              </a>
            </div>
          )}

          <ProgressBar value={project.progress} />

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Rating</p>
            <Rating value={project.rating} />
          </div>

          <FeedbackBox feedback={project.feedback} editable={false} />

          <p className="text-xs text-slate-600">Added on {project.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
