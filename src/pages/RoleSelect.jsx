import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect({ onSelectRole }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleAuthChoice = (authType) => {
    if (selectedRole) {
      onSelectRole(selectedRole);
      navigate(authType === "login" ? "/login" : "/signup");
    }
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), #090912" }}>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(50px)", animation: "float 4s ease-in-out infinite reverse" }} />

      <div className="relative z-10 text-center max-w-lg mx-auto animate-fadeIn flex flex-col items-center">
        {/* Logo and Title Container */}
        <div className="flex flex-col items-center gap-2 mb-8">
          {/* Logo mark */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer glow-indigo"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="animate-spin-slow">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.4" />
            </svg>
          </div>

          <h1 className="text-7xl font-light tracking-widest animate-slideUp" 
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.05em",
              color: "#f1f5f9",
              fontWeight: "300",
              textTransform: "uppercase",
              margin: 0
            }}>
            ProjectfoliOS
          </h1>
        </div>

        <p className="text-slate-400 text-lg mb-12 animate-slideUp" style={{ animationDelay: '100ms' }}>
          Where students build legacies &amp; mentors shape futures.
        </p>

        {!selectedRole ? (
          <>
            {/* Role cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Student */}
              <button
                onClick={() => handleRoleSelection("student")}
                className="group text-left p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl animate-slideUp active:scale-95"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  animationDelay: '150ms',
                }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, transparent 100%)",
                  }} />
                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">🎓</div>
                <h2 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Student
                </h2>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Showcase your projects, track progress, and receive feedback.</p>
                <div className="mt-4 flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Enter as Student
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Admin */}
              <button
                onClick={() => handleRoleSelection("admin")}
                className="group text-left p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl animate-slideUp active:scale-95"
                style={{
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  animationDelay: '250ms',
                }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, transparent 100%)",
                  }} />
                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">🧑‍🏫</div>
                <h2 className="text-lg font-bold text-white mb-1 group-hover:text-red-300 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Admin
                </h2>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Review portfolios, provide feedback, and rate student submissions.</p>
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Enter as Admin
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Auth Modal */}
            <div className="animate-slideUp">
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                {selectedRole === "student" ? "Student Access" : "Admin Access"}
              </h2>
              <p className="text-slate-400 text-sm mb-8">
                {selectedRole === "student" 
                  ? "Choose how you'd like to proceed"
                  : "Choose how you'd like to proceed"}
              </p>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={() => handleAuthChoice("login")}
                  className="w-full py-3 px-4 rounded-lg text-base font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{ 
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)", 
                    color: "#fff", 
                    boxShadow: "0 4px 24px rgba(99,102,241,0.3)"
                  }}>
                  🔐 Login
                </button>
                <button
                  onClick={() => handleAuthChoice("signup")}
                  className="w-full py-3 px-4 rounded-lg text-base font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{ 
                    background: "rgba(99,102,241,0.15)", 
                    color: "#c4b5fd", 
                    border: "1px solid rgba(99,102,241,0.3)"
                  }}>
                  ✨ Sign Up
                </button>
              </div>

              <button
                onClick={handleBackToRoles}
                className="mt-6 text-slate-400 hover:text-slate-300 transition-colors text-sm underline"
              >
                Back to Role Selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
