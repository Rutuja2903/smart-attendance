import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  Bell,
  Lock,
  Globe,
  Moon,
  Smartphone,
  HelpCircle,
  Shield,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";

export function SettingsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.includes("student") ? "student" : "teacher";

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const settingsSections = [
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          type: "toggle",
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          icon: Moon,
          label: "Dark Mode",
          type: "toggle",
          value: darkModeEnabled,
          onChange: setDarkModeEnabled,
        },
        {
          icon: Globe,
          label: "Language",
          type: "link",
          value: "English",
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: Lock,
          label: "Change Password",
          type: "link",
        },
        {
          icon: Smartphone,
          label: "Biometric Login",
          type: "toggle",
          value: biometricEnabled,
          onChange: setBiometricEnabled,
        },
        {
          icon: Shield,
          label: "Privacy Settings",
          type: "link",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & FAQ",
          type: "link",
        },
        {
          icon: Bell,
          label: "Contact Support",
          type: "link",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/${role}/profile`)}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold">Settings</h1>
            <p className="text-white/80 text-sm">Manage your preferences</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
              {section.title}
            </h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: sectionIndex * 0.1 + itemIndex * 0.05,
                  }}
                  className={`flex items-center gap-4 p-4 ${
                    itemIndex !== section.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#0F172A]">{item.label}</p>
                    {item.type === "link" && item.value && (
                      <p className="text-sm text-gray-500">{item.value}</p>
                    )}
                  </div>
                  {item.type === "toggle" ? (
                    <button
                      onClick={() => item.onChange && item.onChange(!item.value)}
                      className={`relative w-12 h-7 rounded-full transition-all ${
                        item.value ? "bg-[#4F46E5]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                          item.value ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-[#0F172A] mb-1">SmartAttend</h3>
          <p className="text-sm text-gray-500 mb-1">Version 1.0.0</p>
          <p className="text-xs text-gray-400">© 2026 SmartAttend. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
