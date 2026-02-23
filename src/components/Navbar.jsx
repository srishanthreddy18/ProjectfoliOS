import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPublic = location.pathname.startsWith("/portfolio/");

  if (isPublic) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 animate-slideDown"
      style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer hover-scale group transition-all duration-300" 
        onClick={() => navigate(role === "admin" ? "/admin" : "/student")}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
          style={{ 
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 20px rgba(99,102,241,0.0)"
          }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:rotate-45">
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.4" />
          </svg>
        </div>
        <span className="font-bold text-white tracking-tight transition-all duration-300 group-hover:text-indigo-300"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
          ProjectfoliOS
        </span>
      </div>

      {/* Role badge + logout */}
      <div className="flex items-center gap-4">
        <span className="text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg"
          style={{
            background: role === "admin" ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)",
            color: role === "admin" ? "#f87171" : "#818cf8",
            border: `1px solid ${role === "admin" ? "rgba(239,68,68,0.3)" : "rgba(99,102,241,0.3)"}`,
          }}>
          {role === "admin" ? "👤 Admin" : "🎓 Student"}
        </span>
        <button onClick={onLogout}
          className="text-sm text-slate-400 hover:text-white transition-all px-3 py-1.5 rounded-lg hover:bg-white/5 hover:shadow-md active:scale-95">
          Logout
        </button>
      </div>
    </nav>
  );
}
