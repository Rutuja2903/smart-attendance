import { useNavigate } from "react-router";
import { Home } from "lucide-react";
import { motion } from "motion/react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-['Inter']">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Home className="w-5 h-5" />
          Go to Login
        </button>
      </motion.div>
    </div>
  );
}
