import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ onSelectRole }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("portfolioUsers") || "[]");

    // Check if user already exists
    if (users.some((u) => u.email === email && u.role === role)) {
      setError("Email already registered for this role");
      return;
    }

    // Add new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("portfolioUsers", JSON.stringify(users));

    setSuccess(true);
    setTimeout(() => {
      onSelectRole(role);
      navigate(role === "student" ? "/student" : "/admin");
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 animate-fadeIn"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), #090912" }}>
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.2)", border: "2px solid rgba(16,185,129,0.5)" }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Account Created!
          </h2>
          <p className="text-slate-400 text-sm">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

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
            Sign Up
          </h1>
          <p className="text-slate-400 text-sm">Create your account and start building</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4 mb-6">
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

          {/* Name */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block uppercase tracking-widest font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="John Doe"
              className="w-full text-sm text-white placeholder-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
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

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block uppercase tracking-widest font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}>
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-400 mb-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Login
          </button>
        </p>

        {/* Back Link */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          ← Back
        </button>
      </div>
    </div>
  );
}
