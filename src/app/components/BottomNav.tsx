import { Home, QrCode, Calendar, BarChart3, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface BottomNavProps {
  role: "student" | "teacher";
}

export function BottomNav({ role }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: role === "student" ? "/student/dashboard" : "/teacher/dashboard",
    },
    {
      icon: QrCode,
      label: "Scan",
      path: role === "student" ? "/student/scan-qr" : "/teacher/generate-qr",
    },
    {
      icon: Calendar,
      label: "Timetable",
      path: `/${role}/timetable`,
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: `/${role}/analytics`,
    },
    {
      icon: User,
      label: "Profile",
      path: `/${role}/profile`,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? "text-[#4F46E5]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
