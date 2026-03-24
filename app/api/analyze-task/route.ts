import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ALLOWED_CATEGORIES = [
  "General", "Communication", "Finance", "HR",
  "Marketing", "Operations", "Sales", "Technology",
];

const FALLBACK_ANALYSIS = {
  impactSummary: "This automation could save significant time and reduce errors in your workflow.",
  effortSummary: "Implementation will depend on your existing systems and technical requirements.",
  difficulty: "Moderate",
  estimatedTime: "1-2 weeks",
};

export async function POST(request: NextRequest) {
  // Origin validation — only accept requests from nexark.ai
  const origin = request.headers.get("origin");
  const isAllowedOrigin =
    !origin ||
    origin === "https://www.nexark.ai" ||
    origin === "https://nexark.ai" ||
    origin.startsWith("http://localhost");

  if (!isAllowedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable is not set");
    return NextResponse.json({ analysis: FALLBACK_ANALYSIS });
  }

  try {
    const body = await request.json();
    const { taskName, description, category } = body;

    // Input validation
    if (!taskName || typeof taskName !== "string") {
      return NextResponse.json({ error: "Task name is required" }, { status: 400 });
    }
    if (taskName.length > 200) {
      return NextResponse.json({ error: "Task name must be 200 characters or less" }, { status: 400 });
    }
    if (description && (typeof description !== "string" || description.length > 2000)) {
      return NextResponse.json({ error: "Description must be 2000 characters or less" }, { status: 400 });
    }
    const safeCategory = ALLOWED_CATEGORIES.includes(category) ? category : "General";

    const prompt = `You are an expert business automation consultant. Analyze this automation task and provide a brief assessment.

Task: ${taskName}
Category: ${safeCategory}
Description: ${description || "No description provided"}

Respond in JSON format with these exact fields:
{
  "impactSummary": "1-2 sentences about the business impact and time savings potential",
  "effortSummary": "1-2 sentences about implementation complexity and requirements",
  "difficulty": "Easy" | "Moderate" | "Hard",
  "estimatedTime": "estimated implementation time (e.g., '1-2 days', '1-2 weeks')"
}

Be concise and practical. Focus on real business value.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", response.status);
      return NextResponse.json({ analysis: FALLBACK_ANALYSIS });
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error("No content in Gemini response");
    }

    let analysisJson;
    try {
      const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      analysisJson = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(textContent);
    } catch {
      console.error("Error parsing Gemini response JSON");
      return NextResponse.json({ analysis: FALLBACK_ANALYSIS });
    }

    return NextResponse.json({
      analysis: {
        impactSummary: analysisJson.impactSummary || FALLBACK_ANALYSIS.impactSummary,
        effortSummary: analysisJson.effortSummary || FALLBACK_ANALYSIS.effortSummary,
        difficulty: analysisJson.difficulty || "Moderate",
        estimatedTime: analysisJson.estimatedTime || "1-2 weeks",
      },
    });
  } catch (error) {
    console.error("Error in analyze-task API:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ analysis: FALLBACK_ANALYSIS });
  }
}
