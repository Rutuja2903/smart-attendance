import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../contexts/AuthContext";

export function LoginScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/teacher/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-['Inter']">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl shadow-lg flex items-center justify-center mb-4">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to continue to SmartAttend</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          {/* Role Toggle */}
          <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl mb-6">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                role === "student"
                  ? "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Student
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                role === "teacher"
                  ? "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Teacher
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-[#4F46E5] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#4F46E5] font-semibold hover:underline"
            >
              Register Now
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
