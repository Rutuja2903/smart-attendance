import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Search, Filter } from "lucide-react";
import { motion } from "motion/react";
import { BottomNav } from "./BottomNav";

export function AttendanceHistoryScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const attendanceRecords = [
    {
      id: 1,
      subject: "Data Structures",
      date: "March 23, 2026",
      time: "9:00 AM",
      status: "present",
      teacher: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      subject: "Web Development",
      date: "March 23, 2026",
      time: "10:15 AM",
      status: "present",
      teacher: "Prof. Mike Wilson",
    },
    {
      id: 3,
      subject: "Database Management",
      date: "March 22, 2026",
      time: "11:30 AM",
      status: "late",
      teacher: "Dr. Emily Davis",
    },
    {
      id: 4,
      subject: "Software Engineering",
      date: "March 22, 2026",
      time: "2:00 PM",
      status: "present",
      teacher: "Prof. John Smith",
    },
    {
      id: 5,
      subject: "Algorithms",
      date: "March 21, 2026",
      time: "9:00 AM",
      status: "absent",
      teacher: "Dr. Sarah Johnson",
    },
    {
      id: 6,
      subject: "Computer Networks",
      date: "March 21, 2026",
      time: "11:00 AM",
      status: "present",
      teacher: "Prof. Lisa Brown",
    },
    {
      id: 7,
      subject: "Data Structures",
      date: "March 20, 2026",
      time: "9:00 AM",
      status: "late",
      teacher: "Dr. Sarah Johnson",
    },
    {
      id: 8,
      subject: "Web Development",
      date: "March 20, 2026",
      time: "10:15 AM",
      status: "present",
      teacher: "Prof. Mike Wilson",
    },
  ];

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-[#22C55E]/10 text-[#22C55E]";
      case "late":
        return "bg-[#F59E0B]/10 text-[#F59E0B]";
      case "absent":
        return "bg-[#EF4444]/10 text-[#EF4444]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold">
              Attendance History
            </h1>
            <p className="text-white/80 text-sm">View your attendance records</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject or teacher"
            className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {[
            { label: "All", value: "all" },
            { label: "Present", value: "present" },
            { label: "Late", value: "late" },
            { label: "Absent", value: "absent" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-medium transition-all ${
                filterStatus === filter.value
                  ? "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:text-gray-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Attendance Records */}
        <div className="space-y-3">
          {filteredRecords.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] text-lg mb-1">
                    {record.subject}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {record.teacher}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {record.date} • {record.time}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                    record.status
                  )}`}
                >
                  {record.status}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredRecords.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                No Records Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav role="student" />
    </div>
  );
}
