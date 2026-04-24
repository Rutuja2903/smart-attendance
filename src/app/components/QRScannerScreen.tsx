import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ScanLine } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../contexts/AuthContext";
import { attendanceService } from "../../services/attendanceService";

export function QRScannerScreen() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!qrCode.trim()) {
      setError("Please enter a QR code");
      return;
    }

    setIsScanning(true);
    setError("");

    try {
      const session = await attendanceService.verifyQRCode(accessToken!, qrCode.trim());

      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      await attendanceService.markAttendance(accessToken!, {
        studentId: user!.id,
        classId: session.classId,
        className: session.className,
        date: now.toISOString().split('T')[0],
        time: currentTime,
        status: 'present'
      });

      navigate("/student/attendance-success", {
        state: {
          className: session.className,
          time: currentTime
        }
      });
    } catch (err: any) {
      console.error("QR scan error:", err);
      setError(err.message || "Failed to verify QR code. Please try again.");
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] pt-12 pb-8 px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold">Scan QR Code</h1>
            <p className="text-white/80 text-sm">Mark your attendance</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Scanner Area */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="relative aspect-square bg-gradient-to-br from-[#4F46E5]/5 to-[#7C3AED]/5 rounded-2xl overflow-hidden mb-6">
            {/* Camera View Simulation */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.03) 2px,
                      rgba(255,255,255,0.03) 4px
                    )`,
                  }}
                />
              </div>
            </div>

            {/* Scanning Frame */}
            <div className="absolute inset-8 border-4 border-white rounded-2xl">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#22C55E] rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#22C55E] rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#22C55E] rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#22C55E] rounded-br-2xl" />

              {/* Scanning Line Animation */}
              {isScanning && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent"
                  animate={{
                    top: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </div>

            {/* Scan Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={
                isScanning
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <ScanLine className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
              {isScanning ? "Verifying QR Code..." : "Enter QR Code"}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {isScanning
                ? "Please wait while we verify"
                : "Enter the code shown by your teacher"}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {!isScanning && (
              <>
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value.toUpperCase())}
                  placeholder="Enter QR code"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all mb-4 text-center text-lg font-mono"
                  maxLength={10}
                />
                <button
                  onClick={handleScan}
                  disabled={!qrCode.trim()}
                  className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Mark Attendance
                </button>
              </>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="font-semibold text-[#0F172A] mb-3">
            How to Mark Attendance
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#4F46E5] font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">
                  Ask your teacher to display QR code
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Teacher will generate a QR code on their device
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#4F46E5] font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">
                  Scan the QR code
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Position your camera to capture the QR code
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#4F46E5] font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">
                  Attendance marked!
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You'll receive a confirmation instantly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl p-4">
          <p className="text-sm text-[#D97706]">
            <span className="font-semibold">Note:</span> QR codes expire after
            10 seconds for security. Make sure to scan within the time limit.
          </p>
        </div>
      </div>
    </div>
  );
}
