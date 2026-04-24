import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-7295cc68/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== AUTHENTICATION ROUTES =====

// Sign up new user
app.post("/make-server-7295cc68/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();

    if (!email || !password || !name || !role) {
      return c.json({ error: "Missing required fields: email, password, name, role" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: `Signup failed: ${error.message}` }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    });

    return c.json({
      success: true,
      user: {
        id: data.user.id,
        email,
        name,
        role
      }
    });
  } catch (error) {
    console.log(`Signup error in main handler: ${error}`);
    return c.json({ error: `Signup failed: ${error.message}` }, 500);
  }
});

// ===== ATTENDANCE ROUTES =====

// Mark attendance
app.post("/make-server-7295cc68/attendance/mark", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const { studentId, classId, className, date, time, status, location } = await c.req.json();

    const attendanceRecord = {
      id: crypto.randomUUID(),
      studentId,
      classId,
      className,
      date,
      time,
      status,
      location,
      markedAt: new Date().toISOString(),
      markedBy: user.id
    };

    // Store attendance record
    await kv.set(`attendance:${attendanceRecord.id}`, attendanceRecord);

    // Add to student's attendance history
    const historyKey = `attendance:student:${studentId}`;
    const history = await kv.get(historyKey) || [];
    history.push(attendanceRecord);
    await kv.set(historyKey, history);

    return c.json({ success: true, attendance: attendanceRecord });
  } catch (error) {
    console.log(`Mark attendance error: ${error}`);
    return c.json({ error: `Failed to mark attendance: ${error.message}` }, 500);
  }
});

// Get student attendance history
app.get("/make-server-7295cc68/attendance/student/:studentId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const studentId = c.req.param('studentId');
    const history = await kv.get(`attendance:student:${studentId}`) || [];

    return c.json({ success: true, attendance: history });
  } catch (error) {
    console.log(`Get attendance history error: ${error}`);
    return c.json({ error: `Failed to get attendance history: ${error.message}` }, 500);
  }
});

// Get today's attendance summary
app.get("/make-server-7295cc68/attendance/today/:studentId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const studentId = c.req.param('studentId');
    const history = await kv.get(`attendance:student:${studentId}`) || [];

    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = history.filter(record => record.date === today);

    return c.json({ success: true, attendance: todayAttendance });
  } catch (error) {
    console.log(`Get today's attendance error: ${error}`);
    return c.json({ error: `Failed to get today's attendance: ${error.message}` }, 500);
  }
});

// ===== QR CODE SESSION ROUTES =====

// Generate QR code session (Teacher)
app.post("/make-server-7295cc68/qr/generate", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const { classId, className, duration } = await c.req.json();

    const session = {
      id: crypto.randomUUID(),
      classId,
      className,
      teacherId: user.id,
      code: Math.random().toString(36).substring(2, 10).toUpperCase(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + duration * 60000).toISOString(),
      active: true
    };

    await kv.set(`qr:session:${session.id}`, session);
    await kv.set(`qr:code:${session.code}`, session.id);

    return c.json({ success: true, session });
  } catch (error) {
    console.log(`Generate QR session error: ${error}`);
    return c.json({ error: `Failed to generate QR session: ${error.message}` }, 500);
  }
});

// Verify QR code (Student)
app.post("/make-server-7295cc68/qr/verify", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const { code } = await c.req.json();

    const sessionId = await kv.get(`qr:code:${code}`);
    if (!sessionId) {
      return c.json({ error: 'Invalid QR code' }, 404);
    }

    const session = await kv.get(`qr:session:${sessionId}`);
    if (!session || !session.active) {
      return c.json({ error: 'QR session expired or invalid' }, 400);
    }

    if (new Date(session.expiresAt) < new Date()) {
      return c.json({ error: 'QR code has expired' }, 400);
    }

    return c.json({ success: true, session });
  } catch (error) {
    console.log(`Verify QR code error: ${error}`);
    return c.json({ error: `Failed to verify QR code: ${error.message}` }, 500);
  }
});

// ===== TIMETABLE ROUTES =====

// Get user timetable
app.get("/make-server-7295cc68/timetable/:userId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const userId = c.req.param('userId');
    const timetable = await kv.get(`timetable:${userId}`) || [];

    return c.json({ success: true, timetable });
  } catch (error) {
    console.log(`Get timetable error: ${error}`);
    return c.json({ error: `Failed to get timetable: ${error.message}` }, 500);
  }
});

// Save/update timetable
app.post("/make-server-7295cc68/timetable/:userId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const userId = c.req.param('userId');
    const { timetable } = await c.req.json();

    await kv.set(`timetable:${userId}`, timetable);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Save timetable error: ${error}`);
    return c.json({ error: `Failed to save timetable: ${error.message}` }, 500);
  }
});

// ===== ANALYTICS ROUTES =====

// Get attendance analytics
app.get("/make-server-7295cc68/analytics/:userId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const userId = c.req.param('userId');
    const history = await kv.get(`attendance:student:${userId}`) || [];

    // Calculate analytics
    const total = history.length;
    const present = history.filter(r => r.status === 'present').length;
    const late = history.filter(r => r.status === 'late').length;
    const absent = history.filter(r => r.status === 'absent').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    // Weekly trend
    const weeklyData = {};
    history.forEach(record => {
      const date = record.date;
      if (!weeklyData[date]) {
        weeklyData[date] = { date, present: 0, late: 0, absent: 0 };
      }
      weeklyData[date][record.status]++;
    });

    const analytics = {
      total,
      present,
      late,
      absent,
      percentage,
      weeklyTrend: Object.values(weeklyData).slice(-7)
    };

    return c.json({ success: true, analytics });
  } catch (error) {
    console.log(`Get analytics error: ${error}`);
    return c.json({ error: `Failed to get analytics: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);