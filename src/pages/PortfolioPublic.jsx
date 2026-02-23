import { useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Rating from "../components/Rating";
import { mockStudents, statusColors } from "../data/mockData";

export default function PortfolioPublic() {
  const { studentId } = useParams();

  const students = (() => {
    const saved = localStorage.getItem("portfolioStudents");
    return saved ? JSON.parse(saved) : mockStudents;
  })();

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#090912" }}>
        <div className="text-center">
          <p className="text-slate-400 text-lg">Portfolio not found.</p>
          <a href="/" className="text-indigo-400 text-sm mt-2 block hover:underline">← Go Home</a>
        </div>
      </div>
    );
  }

  const avgProgress = student.projects.length
    ? Math.round(student.projects.reduce((a, p) => a + p.progress, 0) / student.projects.length)
    : 0;

  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 60%), #090912" }}>

      {/* Public Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.4" />
            </svg>
          </div>
          <span className="text-white font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>Projectfolio</span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full text-slate-400"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          Public View
        </span>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-3xl font-black text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "'Syne', sans-serif", boxShadow: "0 0 60px rgba(99,102,241,0.3)" }}>
          {student.avatar}
        </div>
        <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}>
          {student.name}
        </h1>
        {student.branch && student.university && (
          <p className="text-sm text-indigo-400 mb-3 font-semibold">{student.branch} • {student.university}</p>
        )}
        <p className="text-slate-400 mb-4">{student.bio}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500 flex-wrap mb-4">
          {student.portfolioLink && (
            <a href={student.portfolioLink} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors font-medium flex items-center gap-1">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
              Portfolio
            </a>
          )}
          <a href={`https://${student.github}`} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
          <span>·</span>
          <a href={`https://${student.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
        </div>

        {/* Progress ring-style */}
        <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{avgProgress}%</p>
            <p className="text-xs text-slate-500">Avg Progress</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{student.projects.length}</p>
            <p className="text-xs text-slate-500">Projects</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {student.projects.filter(p => p.status === "Approved").length}
            </p>
            <p className="text-xs text-slate-500">Approved</p>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Projects</h2>
        <div className="space-y-4">
          {student.projects.map((project) => {
            const sc = statusColors[project.status] || statusColors.Pending;
            return (
              <div key={project.id} className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${sc.bg} ${sc.text} border ${sc.border}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full text-slate-400"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                  ))}
                </div>

                <div className="mb-4">
                  <ProgressBar value={project.progress} />
                </div>

                <div className="flex items-center justify-between">
                  <Rating value={project.rating} />
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>

                {project.feedback && (
                  <div className="mt-4 p-4 rounded-xl text-sm text-slate-300 leading-relaxed"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-widest">Mentor Feedback</p>
                    {project.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
