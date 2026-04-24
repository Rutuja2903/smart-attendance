import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Bell, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function NotificationsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.includes("student") ? "student" : "teacher";

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Attendance Marked",
      message: "Your attendance for Data Structures has been marked as Present",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Timetable Update",
      message: "Tomorrow's Web Development class has been rescheduled to 11:00 AM",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Low Attendance Alert",
      message: "Your attendance in Software Engineering is 72%. Minimum required is 75%",
      time: "3 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "success",
      title: "Attendance Marked",
      message: "Your attendance for Database Management has been marked as Present",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "New Announcement",
      message: "Mid-semester exams schedule has been uploaded to the portal",
      time: "2 days ago",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-[#22C55E]" />;
      case "warning":
        return <AlertCircle className="w-6 h-6 text-[#F59E0B]" />;
      default:
        return <Bell className="w-6 h-6 text-[#4F46E5]" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-[#22C55E]/10";
      case "warning":
        return "bg-[#F59E0B]/10";
      default:
        return "bg-[#4F46E5]/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(
                  role === "student"
                    ? "/student/dashboard"
                    : "/teacher/dashboard"
                )
              }
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white text-2xl font-bold">Notifications</h1>
              <p className="text-white/80 text-sm">
                {notifications.filter((n) => !n.read).length} unread
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-medium hover:bg-white/30 transition-all">
            Mark all read
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all ${
                !notification.read ? "border-l-4 border-[#4F46E5]" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${getNotificationBg(
                    notification.type
                  )} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-[#0F172A]">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#4F46E5] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
              No Notifications
            </h3>
            <p className="text-gray-500">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
