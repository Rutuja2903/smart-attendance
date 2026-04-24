import { useState, useEffect } from "react";
import { Calendar, QrCode, History, User, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BottomNav } from "./BottomNav";
import { useAuth } from "../../contexts/AuthContext";
import { attendanceService } from "../../services/attendanceService";

export function StudentDashboard() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const todayLectures = [
    {
      id: 1,
      subject: "Data Structures",
      time: "9:00 AM - 10:00 AM",
      teacher: "Dr. Sarah Johnson",
      room: "Room 101",
      status: "upcoming",
    },
    {
      id: 2,
      subject: "Web Development",
      time: "10:15 AM - 11:15 AM",
      teacher: "Prof. Mike Wilson",
      room: "Lab 2",
      status: "present",
    },
    {
      id: 3,
      subject: "Database Management",
      time: "11:30 AM - 12:30 PM",
      teacher: "Dr. Emily Davis",
      room: "Room 203",
      status: "upcoming",
    },
    {
      id: 4,
      subject: "Software Engineering",
      time: "2:00 PM - 3:00 PM",
      teacher: "Prof. John Smith",
      room: "Room 105",
      status: "upcoming",
    },
  ];

  useEffect(() => {
    if (user && accessToken) {
      fetchAttendanceData();
    }
  }, [user, accessToken]);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const analytics = await attendanceService.getAnalytics(accessToken!, user!.id);
      setAttendancePercentage(analytics.percentage || 0);

      const today = await attendanceService.getTodayAttendance(accessToken!, user!.id);
      setTodayAttendance(today);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-32 px-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold mb-1">
              Hello, {user?.name || 'Student'} 👋
            </h1>
            <p className="text-white/80">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={() => navigate("/student/notifications")}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>

        {/* Attendance Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Overall Attendance</p>
              <h2 className="text-white text-4xl font-bold">
                {attendancePercentage}%
              </h2>
              <p className="text-white/70 text-sm mt-1">
                {attendancePercentage >= 75 ? "Great job!" : "Needs improvement"}
              </p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${attendancePercentage * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {attendancePercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-20 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/student/scan-qr")}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center mb-3">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Scan QR</h3>
            <p className="text-sm text-gray-500">Mark attendance</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/student/timetable")}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Timetable</h3>
            <p className="text-sm text-gray-500">View schedule</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/student/attendance-history")}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl flex items-center justify-center mb-3">
              <History className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">History</h3>
            <p className="text-sm text-gray-500">View records</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/student/profile")}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-2xl flex items-center justify-center mb-3">
              <User className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Profile</h3>
            <p className="text-sm text-gray-500">View details</p>
          </motion.button>
        </div>
      </div>

      {/* Today's Lectures */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#0F172A]">
            Today's Lectures
          </h2>
          <button className="text-[#4F46E5] text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {todayLectures.map((lecture) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all border-l-4 border-[#4F46E5]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] text-lg mb-1">
                    {lecture.subject}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{lecture.time}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{lecture.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{lecture.room}</span>
                  </div>
                </div>
                <div>
                  {lecture.status === "present" ? (
                    <span className="px-3 py-1.5 bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold rounded-full">
                      Present
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav role="student" />
    </div>
  );
}
