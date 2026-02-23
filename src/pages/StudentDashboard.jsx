import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import ProgressBar from "../components/ProgressBar";
import { mockStudents } from "../data/mockData";

// For demo: student is always the first student
const STUDENT_ID = "s1";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // Load from localStorage or fall back to mock
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("portfolioStudents");
    return saved ? JSON.parse(saved) : mockStudents;
  });

  const student = students.find((s) => s.id === STUDENT_ID);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: "", description: "", technologies: "", liveUrl: "", progress: 0,
  });

  const avgProgress = student.projects.length
    ? Math.round(student.projects.reduce((a, p) => a + p.progress, 0) / student.projects.length)
    : 0;

  const save = (updated) => {
    const newStudents = students.map((s) => s.id === STUDENT_ID ? { ...s, projects: updated } : s);
    setStudents(newStudents);
    localStorage.setItem("portfolioStudents", JSON.stringify(newStudents));
  };

  const openAdd = () => {
    setEditProject(null);
    setForm({ title: "", description: "", technologies: "", liveUrl: "", progress: 0 });
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditProject(project);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      liveUrl: project.liveUrl,
      progress: project.progress,
    });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    const techArray = form.technologies.split(",").map((t) => t.trim()).filter(Boolean);

    if (editProject) {
      const updated = student.projects.map((p) =>
        p.id === editProject.id ? { ...p, ...form, technologies: techArray } : p
      );
      save(updated);
    } else {
      const newProject = {
        id: `p${Date.now()}`,
        ...form,
        technologies: techArray,
        status: "Pending",
        feedback: "",
        rating: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      save([...student.projects, newProject]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    save(student.projects.filter((p) => p.id !== id));
  };

  const handleShare = () => {
    const url = student.portfolioLink || `${window.location.origin}/portfolio/${STUDENT_ID}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-12"
      style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(99,102,241,0.08) 0%, transparent 60%), #090912" }}>
      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 p-6 rounded-2xl animate-slideUp"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "'Syne', sans-serif" }}>
            {student.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{student.name}</h1>
            {student.branch && student.university && (
              <p className="text-sm text-indigo-400 font-semibold mt-0.5">{student.branch} • {student.university}</p>
            )}
            <p className="text-slate-400 text-sm mt-1">{student.bio}</p>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span>{student.github}</span>
              <span>{student.linkedin}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-1">Avg Progress</p>
              <p className="text-3xl font-black text-white animate-pulse2" style={{ fontFamily: "'Syne', sans-serif" }}>{avgProgress}%</p>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              {student.portfolioLink && (
                <a href={student.portfolioLink} target="_blank" rel="noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95 hover:scale-105 flex items-center gap-1"
                  style={{
                    background: "rgba(99,102,241,0.2)",
                    color: "#818cf8",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Portfolio
                </a>
              )}
              <button onClick={handleShare}
                className="text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95 hover:scale-105"
                style={{
                  background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
                  color: copied ? "#34d399" : "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                {copied ? "✓ Link Copied!" : "🔗 Share Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Projects", value: student.projects.length },
            { label: "Approved", value: student.projects.filter((p) => p.status === "Approved").length },
            { label: "Avg Rating", value: (student.projects.filter(p => p.rating > 0).reduce((a, p) => a + p.rating, 0) / (student.projects.filter(p => p.rating > 0).length || 1)).toFixed(1) },
          ].map(({ label, value }, idx) => (
            <div key={label} className="p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover-lift animate-slideUp"
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.07)",
                animationDelay: `${idx * 50}ms`
              }}>
              <p className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Projects header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white animate-slideLeft" style={{ fontFamily: "'Syne', sans-serif" }}>My Projects</h2>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 hover:shadow-lg animate-slideRight"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}>
            <span>+</span> Add Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.projects.map((project, idx) => (
            <div key={project.id} style={{ animation: `slideUp 0.6s ease-out ${idx * 50}ms both` }}>
              <ProjectCard
                project={project}
                studentId={STUDENT_ID}
                role="student"
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
          {student.projects.length === 0 && (
            <div className="col-span-2 text-center py-16 text-slate-600 animate-fadeIn">
              No projects yet. Add your first project!
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-6 space-y-4 animate-slideUp"
            style={{ background: "#0f0f1e", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {editProject ? "Edit Project" : "Add New Project"}
            </h3>

            {[
              { key: "title", label: "Project Title", placeholder: "My Awesome App" },
              { key: "liveUrl", label: "Live URL", placeholder: "https://..." },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-xs text-slate-400 mb-1 block">{label}</label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full text-sm text-white placeholder-slate-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
            ))}

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Describe your project..."
                className="w-full text-sm text-white placeholder-slate-600 px-3 py-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Technologies (comma-separated)</label>
              <input
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                placeholder="React, Node.js, Tailwind"
                className="w-full text-sm text-white placeholder-slate-600 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Progress: {form.progress}%</label>
              <input
                type="range" min={0} max={100} value={form.progress}
                onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                className="w-full accent-indigo-500 hover:accent-indigo-400 transition-all"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSubmit}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}>
                {editProject ? "Save Changes" : "Add Project"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors hover:bg-white/5 active:scale-95"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
