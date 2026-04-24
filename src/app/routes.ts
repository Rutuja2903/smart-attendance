import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { QRGenerateScreen } from "./components/QRGenerateScreen";
import { QRScannerScreen } from "./components/QRScannerScreen";
import { AttendanceSuccessScreen } from "./components/AttendanceSuccessScreen";
import { TimetableScreen } from "./components/TimetableScreen";
import { AttendanceHistoryScreen } from "./components/AttendanceHistoryScreen";
import { AnalyticsScreen } from "./components/AnalyticsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/register",
    Component: RegisterScreen,
  },
  // Student Routes
  {
    path: "/student/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/student/scan-qr",
    Component: QRScannerScreen,
  },
  {
    path: "/student/attendance-success",
    Component: AttendanceSuccessScreen,
  },
  {
    path: "/student/timetable",
    Component: TimetableScreen,
  },
  {
    path: "/student/attendance-history",
    Component: AttendanceHistoryScreen,
  },
  {
    path: "/student/analytics",
    Component: AnalyticsScreen,
  },
  {
    path: "/student/profile",
    Component: ProfileScreen,
  },
  {
    path: "/student/notifications",
    Component: NotificationsScreen,
  },
  {
    path: "/student/settings",
    Component: SettingsScreen,
  },
  // Teacher Routes
  {
    path: "/teacher/dashboard",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/generate-qr",
    Component: QRGenerateScreen,
  },
  {
    path: "/teacher/timetable",
    Component: TimetableScreen,
  },
  {
    path: "/teacher/analytics",
    Component: AnalyticsScreen,
  },
  {
    path: "/teacher/profile",
    Component: ProfileScreen,
  },
  {
    path: "/teacher/notifications",
    Component: NotificationsScreen,
  },
  {
    path: "/teacher/settings",
    Component: SettingsScreen,
  },
  // 404 Not Found
  {
    path: "*",
    Component: NotFound,
  },
]);