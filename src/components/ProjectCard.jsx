import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Rating from "./Rating";
import { statusColors } from "../data/mockData";

export default function ProjectCard({ project, studentId, role, onEdit, onDelete, isPublic = false }) {
  const navigate = useNavigate();
  const status = project.status || "Pending";
  const sc = statusColors[status] || statusColors.Pending;

  return (
    <div
      className="group rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slideUp hover:shadow-2xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      onClick={() => !isPublic && navigate(`/student/${studentId}/project/${project.id}`)}>
      
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
        }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <h3 className="font-bold text-white text-base leading-tight group-hover:text-indigo-300 transition-all duration-300 group-hover:tracking-wide"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {project.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap transition-all duration-300 group-hover:scale-110 ${sc.bg} ${sc.text} border ${sc.border}`}
          style={{ transformOrigin: 'right center' }}>
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 relative z-10 group-hover:text-slate-300 transition-colors">{project.description}</p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {project.technologies.map((tech, idx) => (
          <span key={tech} 
            className="text-xs px-2 py-0.5 rounded-full text-slate-400 transition-all duration-300 hover:scale-110 hover:text-slate-200"
            style={{ 
              background: "rgba(255,255,255,0.06)", 
              border: "1px solid rgba(255,255,255,0.08)",
              animationDelay: `${idx * 50}ms`,
            }}>
            {tech}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div className="relative z-10">
        <ProgressBar value={project.progress} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5 relative z-10">
        <div className="group/rating transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: 'left center' }}>
          <Rating value={project.rating} />
        </div>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-all duration-300 flex items-center gap-1 hover:gap-2 group/link">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="group-hover/link:animate-bounce2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
              Live
            </a>
          )}
          {!isPublic && role === "student" && (
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => onEdit && onEdit(project)}
                className="text-xs px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-500/20 transition-all duration-300 hover:scale-105 active:scale-95">
                Edit
              </button>
              <button onClick={() => onDelete && onDelete(project.id)}
                className="text-xs px-2 py-1 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300 hover:scale-105 active:scale-95">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
