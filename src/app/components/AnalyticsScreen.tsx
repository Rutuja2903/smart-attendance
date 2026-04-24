import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, TrendingUp, Calendar, Award } from "lucide-react";
import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { BottomNav } from "./BottomNav";

export function AnalyticsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.includes("student") ? "student" : "teacher";

  // Pie Chart Data
  const attendanceData = [
    { name: "Present", value: 75, color: "#22C55E" },
    { name: "Late", value: 12, color: "#F59E0B" },
    { name: "Absent", value: 13, color: "#EF4444" },
  ];

  // Subject-wise Attendance Data
  const subjectData = [
    { subject: "DS", attendance: 92 },
    { subject: "Web Dev", attendance: 88 },
    { subject: "DBMS", attendance: 85 },
    { subject: "SE", attendance: 78 },
    { subject: "Algo", attendance: 82 },
  ];

  // Weekly Trend Data
  const weeklyData = [
    { day: "Mon", attendance: 85 },
    { day: "Tue", attendance: 88 },
    { day: "Wed", attendance: 82 },
    { day: "Thu", attendance: 90 },
    { day: "Fri", attendance: 87 },
    { day: "Sat", attendance: 80 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              navigate(
                role === "student" ? "/student/dashboard" : "/teacher/dashboard"
              )
            }
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold">
              Attendance Analytics
            </h1>
            <p className="text-white/80 text-sm">
              {role === "student"
                ? "Track your performance"
                : "Class performance insights"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-[#22C55E]" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">87%</p>
            <p className="text-xs text-gray-500">Overall</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">145</p>
            <p className="text-xs text-gray-500">Classes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">15</p>
            <p className="text-xs text-gray-500">Streak</p>
          </motion.div>
        </div>

        {/* Attendance Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">
            Attendance Distribution
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {attendanceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subject-wise Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">
            Subject-wise Attendance
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="subject"
                tick={{ fontSize: 12 }}
                stroke="#999"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="attendance" fill="url(#colorGradient)" radius={8} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">
            Weekly Trend
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ fill: "#4F46E5", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-bold text-white mb-3">
            Performance Insights
          </h2>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Best Day</p>
              <p className="text-white font-semibold">Thursday - 90%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Top Subject</p>
              <p className="text-white font-semibold">Data Structures - 92%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-1">Late Arrivals</p>
              <p className="text-white font-semibold">12 times this semester</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav role={role} />
    </div>
  );
}
