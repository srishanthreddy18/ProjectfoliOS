import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onSelectRole }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("portfolioUsers") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      onSelectRole(role);
      navigate(role === "student" ? "/student" : "/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleDemoLogin = () => {
    onSelectRole(role);
    navigate(role === "student" ? "/student" : "/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), #090912" }}>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 w-full max-w-md animate-slideUp">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.4" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Login
          </h1>
          <p className="text-slate-400 text-sm">Access your portfolio dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          {/* Role Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block uppercase tracking-widest font-medium">Role</label>
            <div className="flex gap-3">
              {["student", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg transition-all font-medium text-sm ${
                    role === r
                      ? r === "student"
                        ? "bg-indigo-500/30 text-indigo-300 border border-indigo-500/50"
                        : "bg-red-500/30 text-red-300 border border-red-500/50"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                  }`}>
                  {r === "student" ? "🎓 Student" : "👨‍🏫 Admin"}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block uppercase tracking-widest font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="your@email.com"
              className="w-full text-sm text-white placeholder-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block uppercase tracking-widest font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="w-full text-sm text-white placeholder-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg text-sm text-red-300 animate-slideUp"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}>
            Login
          </button>
        </form>

        {/* Demo Login */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="w-full h-px" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 text-slate-600" style={{ background: "#090912" }}>or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95 text-slate-300"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          Demo Access ({role === "student" ? "Student" : "Admin"})
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Sign Up
          </button>
        </p>

        {/* Back Link */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          ← Back
        </button>
      </div>
    </div>
  );
}
