import { API_BASE_URL } from '../utils/supabase/client';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  status: 'present' | 'late' | 'absent';
  location?: { latitude: number; longitude: number };
  markedAt: string;
  markedBy: string;
}

export interface QRSession {
  id: string;
  classId: string;
  className: string;
  teacherId: string;
  code: string;
  createdAt: string;
  expiresAt: string;
  active: boolean;
}

export const attendanceService = {
  markAttendance: async (
    accessToken: string,
    data: {
      studentId: string;
      classId: string;
      className: string;
      date: string;
      time: string;
      status: 'present' | 'late' | 'absent';
      location?: { latitude: number; longitude: number };
    }
  ): Promise<AttendanceRecord> => {
    const response = await fetch(`${API_BASE_URL}/attendance/mark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to mark attendance');
    }

    return result.attendance;
  },

  getStudentAttendance: async (accessToken: string, studentId: string): Promise<AttendanceRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/attendance/student/${studentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get attendance history');
    }

    return result.attendance;
  },

  getTodayAttendance: async (accessToken: string, studentId: string): Promise<AttendanceRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/attendance/today/${studentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get today\'s attendance');
    }

    return result.attendance;
  },

  generateQRSession: async (
    accessToken: string,
    classId: string,
    className: string,
    duration: number
  ): Promise<QRSession> => {
    const response = await fetch(`${API_BASE_URL}/qr/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ classId, className, duration })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to generate QR session');
    }

    return result.session;
  },

  verifyQRCode: async (accessToken: string, code: string): Promise<QRSession> => {
    const response = await fetch(`${API_BASE_URL}/qr/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ code })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to verify QR code');
    }

    return result.session;
  },

  getTimetable: async (accessToken: string, userId: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/timetable/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get timetable');
    }

    return result.timetable;
  },

  saveTimetable: async (accessToken: string, userId: string, timetable: any[]): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/timetable/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ timetable })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to save timetable');
    }
  },

  getAnalytics: async (accessToken: string, userId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/analytics/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get analytics');
    }

    return result.analytics;
  }
};
