import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, tasks } = body;

    if (!email || !tasks || tasks.length === 0) {
      return NextResponse.json(
        { error: "Email and tasks are required" },
        { status: 400 }
      );
    }

    // Log the request (email sending disabled)
    console.log(`Roadmap requested for ${email} with ${tasks.length} tasks`);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in send-roadmap:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
