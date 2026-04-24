import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, Users, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../contexts/AuthContext";
import { attendanceService, QRSession } from "../../services/attendanceService";

export function QRGenerateScreen() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [countdown, setCountdown] = useState(300); // 5 minutes default
  const [session, setSession] = useState<QRSession | null>(null);
  const [studentsScanned, setStudentsScanned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    generateSession();
  }, []);

  useEffect(() => {
    if (!session) return;

    const timer = setInterval(() => {
      const expiresAt = new Date(session.expiresAt);
      const now = new Date();
      const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));

      setCountdown(remaining);

      if (remaining === 0) {
        generateSession();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  const generateSession = async () => {
    setLoading(true);
    setError("");

    try {
      const newSession = await attendanceService.generateQRSession(
        accessToken!,
        'CSE-3A-DS',
        'Data Structures - CSE 3A',
        5 // 5 minutes duration
      );
      setSession(newSession);
    } catch (err: any) {
      console.error("Generate session error:", err);
      setError(err.message || "Failed to generate QR session");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    generateSession();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">Generate QR Code</h1>
            <p className="text-white/80 text-sm">Data Structures - CSE 3A</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-6 text-center">
            <p className="text-gray-500">Generating QR session...</p>
          </div>
        ) : (
          <>
            {/* Timer Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 shadow-xl mb-6 text-center"
            >
              <p className="text-gray-500 mb-2">QR Code Expires In</p>
              <div className="text-5xl font-bold text-[#4F46E5] mb-2">
                {formatTime(countdown)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] h-2 rounded-full"
                  style={{ width: `${(countdown / 300) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">
                Session automatically expires after 5 minutes
              </p>
            </motion.div>
          </>
        )}

        {/* QR Code */}
        {!loading && session && (
          <motion.div
            key={session.code}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-6"
          >
            <div className="bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 rounded-3xl p-8 mb-4">
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-sm text-gray-500 mb-3">QR Code</p>
                <div className="text-6xl font-bold font-mono text-[#4F46E5] tracking-wider mb-4">
                  {session.code}
                </div>
                <p className="text-sm text-gray-500">
                  Show this code to students
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
                Students Enter This Code
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Students should enter this code in their app
              </p>

              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New Code
              </button>
            </div>
          </motion.div>
        )}

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Students Scanned</p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {studentsScanned}/50
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Session Active</p>
                <p className="text-2xl font-bold text-[#0F172A]">5m 30s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="font-semibold text-[#0F172A] mb-3">Recent Scans</h3>
          <div className="space-y-2">
            {[
              { name: "Sarah Johnson", time: "Just now", status: "present" },
              { name: "Mike Wilson", time: "2s ago", status: "present" },
              { name: "Emily Davis", time: "5s ago", status: "late" },
              { name: "John Smith", time: "8s ago", status: "present" },
            ].map((scan, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {scan.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      {scan.name}
                    </p>
                    <p className="text-xs text-gray-500">{scan.time}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    scan.status === "present"
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "bg-[#F59E0B]/10 text-[#F59E0B]"
                  }`}
                >
                  {scan.status === "present" ? "On Time" : "Late"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
