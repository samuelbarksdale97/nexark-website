import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCkIaTyPpnvYTy_FTQjHDXFcFgHaRmmZaw";

export async function POST(request: NextRequest) {
  try {
    const { taskName, description, category } = await request.json();

    if (!taskName) {
      return NextResponse.json(
        { error: "Task name is required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert business automation consultant. Analyze this automation task and provide a brief assessment.

Task: ${taskName}
Category: ${category || "General"}
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
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
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      
      // Return a fallback analysis
      return NextResponse.json({
        analysis: {
          impactSummary: "This task could streamline your workflow and save valuable time by automating repetitive steps.",
          effortSummary: "Implementation complexity depends on your current systems and integration requirements.",
          difficulty: "Moderate",
          estimatedTime: "1-2 weeks",
        },
      });
    }

    const data = await response.json();
    
    // Extract the text content from Gemini's response
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error("No content in response");
    }

    // Parse the JSON from the response (it might be wrapped in markdown code blocks)
    let analysisJson;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        analysisJson = JSON.parse(jsonMatch[1]);
      } else {
        analysisJson = JSON.parse(textContent);
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      // Return fallback if parsing fails
      return NextResponse.json({
        analysis: {
          impactSummary: "This task has potential to improve efficiency and reduce manual work.",
          effortSummary: "Requires careful planning and testing before deployment.",
          difficulty: "Moderate",
          estimatedTime: "1-2 weeks",
        },
      });
    }

    return NextResponse.json({
      analysis: {
        impactSummary: analysisJson.impactSummary || "Could improve workflow efficiency.",
        effortSummary: analysisJson.effortSummary || "Requires standard implementation effort.",
        difficulty: analysisJson.difficulty || "Moderate",
        estimatedTime: analysisJson.estimatedTime || "1-2 weeks",
      },
    });
  } catch (error) {
    console.error("Error in analyze-task API:", error);
    
    // Return fallback analysis on any error
    return NextResponse.json({
      analysis: {
        impactSummary: "This automation could save significant time and reduce errors in your workflow.",
        effortSummary: "Implementation will depend on your existing systems and technical requirements.",
        difficulty: "Moderate",
        estimatedTime: "1-2 weeks",
      },
    });
  }
}
