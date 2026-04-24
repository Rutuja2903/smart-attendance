import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { BottomNav } from "./BottomNav";

export function ProfileScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.includes("student") ? "student" : "teacher";

  const userInfo = {
    name: role === "student" ? "John Doe" : "Dr. Sarah Johnson",
    email: role === "student" ? "john.doe@university.edu" : "sarah.j@university.edu",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    joinDate: "September 2023",
    studentId: "CSE2023045",
    department: "Computer Science",
  };

  const menuItems = [
    {
      icon: Settings,
      label: "Settings",
      path: `/${role}/settings`,
      color: "from-[#4F46E5] to-[#7C3AED]",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: `/${role}/notifications`,
      color: "from-[#F59E0B] to-[#D97706]",
    },
    {
      icon: Calendar,
      label: "Academic Calendar",
      path: `/${role}/calendar`,
      color: "from-[#22C55E] to-[#16A34A]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-24 px-6 rounded-b-[2rem]">
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
            <h1 className="text-white text-2xl font-bold">Profile</h1>
            <p className="text-white/80 text-sm">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-6"
        >
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                {userInfo.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#22C55E] rounded-full border-4 border-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#0F172A] mb-1">
                {userInfo.name}
              </h2>
              <p className="text-sm text-gray-500 capitalize">{role}</p>
            </div>
            <button className="px-4 py-2 bg-[#4F46E5]/10 text-[#4F46E5] font-medium rounded-xl hover:bg-[#4F46E5]/20 transition-all">
              Edit
            </button>
          </div>

          {/* Info Cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {userInfo.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {userInfo.phone}
                </p>
              </div>
            </div>

            {role === "student" && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Student ID</p>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {userInfo.studentId}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {userInfo.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {userInfo.joinDate}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(item.path)}
              className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex-1 text-left font-medium text-[#0F172A]">
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>
          ))}
        </div>

        {/* Stats */}
        {role === "student" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <p className="text-sm text-gray-500 mb-1">Overall Attendance</p>
              <p className="text-3xl font-bold text-[#0F172A]">87%</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <p className="text-sm text-gray-500 mb-1">Classes Attended</p>
              <p className="text-3xl font-bold text-[#0F172A]">145</p>
            </div>
          </motion.div>
        )}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/login")}
          className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 text-[#EF4444] font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>

      <BottomNav role={role} />
    </div>
  );
}
