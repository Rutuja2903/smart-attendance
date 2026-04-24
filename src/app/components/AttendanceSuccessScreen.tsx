import { useNavigate } from "react-router";
import { CheckCircle, Clock, MapPin, User } from "lucide-react";
import { motion } from "motion/react";

export function AttendanceSuccessScreen() {
  const navigate = useNavigate();

  const attendanceDetails = {
    subject: "Data Structures",
    teacher: "Dr. Sarah Johnson",
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    status: "Present",
    room: "Room 101",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center p-6 font-['Inter']">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-20 h-20 text-[#22C55E]" />
            </div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                delay: 0.3,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute inset-0 bg-white rounded-full"
            />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-3">
            Attendance Marked!
          </h1>
          <p className="text-white/90 text-lg">
            Your attendance has been recorded successfully
          </p>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-white/20">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#22C55E]" />
              </div>
              <div className="flex-1">
                <p className="text-white/70 text-sm mb-1">Status</p>
                <p className="text-white font-semibold text-xl">
                  {attendanceDetails.status}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-sm">Subject</p>
                  <p className="text-white font-medium">
                    {attendanceDetails.subject}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-sm">Teacher</p>
                  <p className="text-white font-medium">
                    {attendanceDetails.teacher}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-sm">Time & Date</p>
                  <p className="text-white font-medium">
                    {attendanceDetails.time} • {attendanceDetails.date}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-sm">Location</p>
                  <p className="text-white font-medium">
                    {attendanceDetails.room}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate("/student/dashboard")}
            className="w-full py-4 bg-white text-[#22C55E] font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/student/attendance-history")}
            className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all"
          >
            View Attendance History
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
