import {
  QrCode,
  Users,
  BarChart3,
  Calendar,
  Clock,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BottomNav } from "./BottomNav";

export function TeacherDashboard() {
  const navigate = useNavigate();

  const todayLectures = [
    {
      id: 1,
      subject: "Data Structures",
      time: "9:00 AM - 10:00 AM",
      class: "CSE-3A",
      room: "Room 101",
      studentsPresent: 45,
      totalStudents: 50,
    },
    {
      id: 2,
      subject: "Algorithms",
      time: "11:00 AM - 12:00 PM",
      class: "CSE-3B",
      room: "Room 203",
      studentsPresent: 0,
      totalStudents: 48,
    },
    {
      id: 3,
      subject: "Database Systems",
      time: "2:00 PM - 3:00 PM",
      class: "CSE-4A",
      room: "Lab 2",
      studentsPresent: 0,
      totalStudents: 52,
    },
  ];

  const stats = [
    {
      label: "Total Classes Today",
      value: "3",
      icon: Calendar,
      color: "from-[#4F46E5] to-[#7C3AED]",
    },
    {
      label: "Students Present",
      value: "45",
      icon: Users,
      color: "from-[#22C55E] to-[#16A34A]",
    },
    {
      label: "Avg Attendance",
      value: "85%",
      icon: BarChart3,
      color: "from-[#F59E0B] to-[#D97706]",
    },
    {
      label: "Pending Reports",
      value: "2",
      icon: Clock,
      color: "from-[#EF4444] to-[#DC2626]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-24 px-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold mb-1">
              Welcome, Professor 👋
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
            onClick={() => navigate("/teacher/notifications")}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-14 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-5 shadow-lg"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-3`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/teacher/generate-qr")}
            className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Generate QR</h3>
            <p className="text-sm text-white/80">Start attendance</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/teacher/analytics")}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all text-left border-2 border-[#4F46E5]"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center mb-3">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Analytics</h3>
            <p className="text-sm text-gray-500">View reports</p>
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
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] text-lg mb-1">
                    {lecture.subject}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {lecture.class} • {lecture.room}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{lecture.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {lecture.studentsPresent}/{lecture.totalStudents} Present
                  </span>
                </div>
                {lecture.studentsPresent > 0 ? (
                  <span className="px-3 py-1.5 bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold rounded-full">
                    Active
                  </span>
                ) : (
                  <button
                    onClick={() => navigate("/teacher/generate-qr")}
                    className="px-4 py-1.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-semibold rounded-full hover:shadow-lg transition-all"
                  >
                    Start
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav role="teacher" />
    </div>
  );
}
