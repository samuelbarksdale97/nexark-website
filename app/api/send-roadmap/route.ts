import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  // Origin validation
  const origin = request.headers.get("origin");
  const isAllowedOrigin =
    !origin ||
    origin === "https://www.nexark.ai" ||
    origin === "https://nexark.ai" ||
    origin.startsWith("http://localhost");

  if (!isAllowedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, tasks } = body;

    // Input validation
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json({ error: "At least one task is required" }, { status: 400 });
    }
    if (tasks.length > 50) {
      return NextResponse.json({ error: "Too many tasks" }, { status: 400 });
    }

    // Log without PII
    console.log(`Roadmap requested with ${tasks.length} tasks`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in send-roadmap:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
