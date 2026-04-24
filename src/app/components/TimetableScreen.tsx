import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { BottomNav } from "./BottomNav";

export function TimetableScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.includes("student") ? "student" : "teacher";

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const timetable: Record<
    string,
    Array<{
      subject: string;
      time: string;
      teacher?: string;
      class?: string;
      room: string;
      color: string;
    }>
  > = {
    Mon: [
      {
        subject: "Data Structures",
        time: "9:00 AM",
        teacher: "Dr. Sarah Johnson",
        class: "CSE-3A",
        room: "Room 101",
        color: "from-[#4F46E5] to-[#7C3AED]",
      },
      {
        subject: "Web Development",
        time: "10:15 AM",
        teacher: "Prof. Mike Wilson",
        class: "CSE-3A",
        room: "Lab 2",
        color: "from-[#22C55E] to-[#16A34A]",
      },
      {
        subject: "Database Management",
        time: "11:30 AM",
        teacher: "Dr. Emily Davis",
        class: "CSE-3A",
        room: "Room 203",
        color: "from-[#F59E0B] to-[#D97706]",
      },
      {
        subject: "Software Engineering",
        time: "2:00 PM",
        teacher: "Prof. John Smith",
        class: "CSE-3A",
        room: "Room 105",
        color: "from-[#EF4444] to-[#DC2626]",
      },
    ],
    Tue: [
      {
        subject: "Algorithms",
        time: "9:00 AM",
        teacher: "Dr. Sarah Johnson",
        class: "CSE-3B",
        room: "Room 102",
        color: "from-[#7C3AED] to-[#6D28D9]",
      },
      {
        subject: "Computer Networks",
        time: "11:00 AM",
        teacher: "Prof. Lisa Brown",
        class: "CSE-3B",
        room: "Lab 1",
        color: "from-[#06B6D4] to-[#0891B2]",
      },
      {
        subject: "Operating Systems",
        time: "2:00 PM",
        teacher: "Dr. Mark Taylor",
        class: "CSE-3B",
        room: "Room 201",
        color: "from-[#F59E0B] to-[#D97706]",
      },
    ],
    Wed: [
      {
        subject: "Data Structures",
        time: "9:00 AM",
        teacher: "Dr. Sarah Johnson",
        class: "CSE-3A",
        room: "Room 101",
        color: "from-[#4F46E5] to-[#7C3AED]",
      },
      {
        subject: "Machine Learning",
        time: "11:00 AM",
        teacher: "Prof. Alex Chen",
        class: "CSE-4A",
        room: "Lab 3",
        color: "from-[#EC4899] to-[#DB2777]",
      },
      {
        subject: "Database Management",
        time: "1:00 PM",
        teacher: "Dr. Emily Davis",
        class: "CSE-3A",
        room: "Room 203",
        color: "from-[#F59E0B] to-[#D97706]",
      },
    ],
    Thu: [
      {
        subject: "Web Development",
        time: "9:00 AM",
        teacher: "Prof. Mike Wilson",
        class: "CSE-3A",
        room: "Lab 2",
        color: "from-[#22C55E] to-[#16A34A]",
      },
      {
        subject: "Software Engineering",
        time: "11:00 AM",
        teacher: "Prof. John Smith",
        class: "CSE-3A",
        room: "Room 105",
        color: "from-[#EF4444] to-[#DC2626]",
      },
      {
        subject: "Theory of Computation",
        time: "2:00 PM",
        teacher: "Dr. Robert Lee",
        class: "CSE-3A",
        room: "Room 104",
        color: "from-[#06B6D4] to-[#0891B2]",
      },
    ],
    Fri: [
      {
        subject: "Algorithms",
        time: "10:00 AM",
        teacher: "Dr. Sarah Johnson",
        class: "CSE-3B",
        room: "Room 102",
        color: "from-[#7C3AED] to-[#6D28D9]",
      },
      {
        subject: "Computer Networks",
        time: "12:00 PM",
        teacher: "Prof. Lisa Brown",
        class: "CSE-3B",
        room: "Lab 1",
        color: "from-[#06B6D4] to-[#0891B2]",
      },
      {
        subject: "Project Work",
        time: "2:00 PM",
        teacher: "All Faculty",
        class: "CSE-3A",
        room: "Lab 4",
        color: "from-[#EC4899] to-[#DB2777]",
      },
    ],
    Sat: [
      {
        subject: "Machine Learning",
        time: "9:00 AM",
        teacher: "Prof. Alex Chen",
        class: "CSE-4A",
        room: "Lab 3",
        color: "from-[#EC4899] to-[#DB2777]",
      },
      {
        subject: "Workshop",
        time: "11:00 AM",
        teacher: "Guest Faculty",
        class: "All",
        room: "Auditorium",
        color: "from-[#8B5CF6] to-[#7C3AED]",
      },
    ],
  };

  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-2">
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
            <h1 className="text-white text-2xl font-bold">Weekly Timetable</h1>
            <p className="text-white/80 text-sm">
              {role === "student" ? "CSE 3A" : "Your Schedule"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {days.map((day) => (
            <button
              key={day}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-medium transition-all ${
                day === currentDay
                  ? "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:text-gray-900"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timetable Cards */}
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-lg font-bold text-[#0F172A]">{day}day</h2>
                {day === currentDay && (
                  <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold rounded-full">
                    Today
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {timetable[day]?.map((lecture, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    <div
                      className={`h-2 bg-gradient-to-r ${lecture.color}`}
                    />
                    <div className="p-5">
                      <h3 className="font-semibold text-[#0F172A] text-lg mb-2">
                        {lecture.subject}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{lecture.time}</span>
                        </div>
                        {role === "student" && lecture.teacher && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span>{lecture.teacher}</span>
                          </div>
                        )}
                        {role === "teacher" && lecture.class && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span>{lecture.class}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{lecture.room}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {!timetable[day] ||
                  (timetable[day].length === 0 && (
                    <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                      <p className="text-gray-500">No classes scheduled</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav role={role} />
    </div>
  );
}
