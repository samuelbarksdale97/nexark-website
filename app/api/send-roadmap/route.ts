import { NextRequest, NextResponse } from "next/server";

// This endpoint is kept for future email integration
// Currently just returns success to allow the UI flow to work

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

    // Log for debugging
    console.log(`Roadmap requested for ${email} with ${tasks.length} tasks`);

    // Return success - email sending disabled
    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error("Error in send-roadmap:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

interface TaskAnalysis {
  impactSummary: string;
  effortSummary: string;
  difficulty: string;
  estimatedTime: string;
}

interface Task {
  name: string;
  category: string;
  impact: number;
  effort: number;
  score: number;
  description?: string;
  analysis?: TaskAnalysis;
}

interface RoadmapRequest {
  email: string;
  tasks: Task[];
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

const isRateLimited = (identifier: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
};

// Calculate timeline based on tasks
const calculateTimeline = (tasks: Task[]) => {
  const totalRawDevDays = tasks.reduce((sum, task) => {
    const timeStr = task.analysis?.estimatedTime || '';
    const numbers = timeStr.match(/(\d+)/g);
    if (!numbers) return sum + 1.5;
    const avgNum = numbers.length > 1 
      ? (parseInt(numbers[0]) + parseInt(numbers[1])) / 2 
      : parseInt(numbers[0]);
    
    if (timeStr.toLowerCase().includes('week')) return sum + avgNum * 5;
    if (timeStr.toLowerCase().includes('day')) return sum + avgNum;
    if (timeStr.toLowerCase().includes('hour')) return sum + avgNum / 8;
    return sum + avgNum;
  }, 0);

  const parallelizationFactor = tasks.length <= 3 ? 1.0 : 
                                tasks.length <= 6 ? 0.7 : 
                                tasks.length <= 10 ? 0.6 : 0.5;
  
  const developmentDays = Math.ceil(totalRawDevDays * parallelizationFactor);
  const discoveryDays = Math.max(1, Math.ceil(tasks.length / 5));
  const integrationDays = Math.max(1, Math.ceil(developmentDays * 0.3));
  const handoverDays = Math.max(1, Math.ceil(tasks.length / 6));
  
  const totalMinDays = discoveryDays + developmentDays + integrationDays + handoverDays;
  const totalMaxDays = Math.ceil(totalMinDays * 1.2);
  const totalWeeks = Math.ceil(totalMaxDays / 5);
  
  return {
    discovery: discoveryDays === 1 ? '1 day' : `${discoveryDays} days`,
    development: developmentDays === 1 ? '1 day' : `${developmentDays} days`,
    integration: integrationDays === 1 ? '1 day' : `${integrationDays} days`,
    handover: handoverDays === 1 ? '1 day' : `${handoverDays} days`,
    total: `${totalMinDays}–${totalMaxDays} business days (${totalWeeks} week${totalWeeks > 1 ? 's' : ''})`,
  };
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     request.headers.get("x-real-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body: RoadmapRequest = await request.json();
    const { email, tasks } = body;

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!tasks || tasks.length === 0) {
      return NextResponse.json(
        { error: "At least one task is required" },
        { status: 400 }
      );
    }

    // Sort tasks by score (descending)
    const sortedTasks = [...tasks].sort((a, b) => b.score - a.score);
    const totalTimeSaved = tasks.length * 4.3;
    const timeline = calculateTimeline(tasks);

    // Build HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Personalized Automation Roadmap</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: bold;
          }
          .header p {
            margin: 0;
            opacity: 0.95;
            font-size: 16px;
          }
          .stats-table {
            width: 100%;
            margin: 30px 0;
            border-collapse: collapse;
          }
          .stat-cell {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border: 8px solid white;
          }
          .stat-value {
            font-size: 32px;
            font-weight: bold;
            color: #6366F1;
            margin-bottom: 8px;
          }
          .stat-label {
            font-size: 14px;
            color: #666;
          }
          .content {
            padding: 30px;
          }
          .section-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #030305;
          }
          .task {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
          }
          .task-header {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .task-rank {
            display: inline-block;
            background: #6366F1;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            text-align: center;
            line-height: 36px;
            font-weight: bold;
            margin-right: 12px;
            font-size: 16px;
          }
          .task-name {
            font-weight: bold;
            font-size: 20px;
            color: #030305;
          }
          .task-category {
            color: #6366F1;
            font-size: 14px;
            font-weight: 600;
            margin: 8px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .task-metrics {
            font-size: 14px;
            color: #666;
            margin: 12px 0;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
          }
          .task-score {
            color: #6366F1;
            font-weight: bold;
            font-size: 16px;
          }
          .difficulty-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
          }
          .difficulty-easy {
            background: #d1fae5;
            color: #065f46;
          }
          .difficulty-moderate {
            background: #fef3c7;
            color: #92400e;
          }
          .difficulty-hard {
            background: #fee2e2;
            color: #991b1b;
          }
          .cta {
            background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
            color: white;
            text-align: center;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
          }
          .cta h2 {
            margin: 0 0 12px 0;
            font-size: 24px;
          }
          .cta p {
            margin: 0 0 20px 0;
            opacity: 0.9;
          }
          .cta-button {
            display: inline-block;
            background: white;
            color: #6366F1;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
          }
          .timeline-section {
            margin: 40px 0;
          }
          .timeline-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 24px;
            color: #030305;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .timeline-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border: 2px solid #e5e7eb;
          }
          .timeline-table th {
            background: #f8f9fa;
            padding: 16px;
            text-align: left;
            font-weight: bold;
            font-size: 14px;
            color: #030305;
            border-bottom: 2px solid #e5e7eb;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .timeline-table td {
            padding: 16px;
            border-bottom: 1px solid #e5e7eb;
            color: #333;
            font-size: 14px;
            line-height: 1.6;
          }
          .timeline-table tr:last-child td {
            border-bottom: none;
          }
          .phase-number {
            font-weight: bold;
            color: #6366F1;
          }
          .total-duration {
            font-weight: bold;
            font-size: 16px;
            color: #030305;
            margin-top: 20px;
            padding: 16px;
            background: #f0f4ff;
            border-left: 4px solid #6366F1;
            border-radius: 6px;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding: 20px 30px 40px;
            border-top: 1px solid #e5e7eb;
          }
          .ai-analysis {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px dashed #e5e7eb;
          }
          .ai-analysis-title {
            font-weight: bold;
            font-size: 14px;
            color: #6366F1;
            margin-bottom: 12px;
          }
          .analysis-section {
            margin-bottom: 12px;
          }
          .analysis-label {
            font-weight: bold;
            color: #030305;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .analysis-text {
            color: #555;
            font-size: 14px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Your Automation Opportunity Matrix</h1>
            <p>Here's your personalized automation roadmap</p>
          </div>

          <div class="content">
            <table class="stats-table">
              <tr>
                <td class="stat-cell">
                  <div class="stat-value">${totalTimeSaved.toFixed(1)}+ hrs</div>
                  <div class="stat-label">Potential weekly savings</div>
                </td>
                <td class="stat-cell">
                  <div class="stat-value">${tasks.length}</div>
                  <div class="stat-label">Workflows mapped</div>
                </td>
                <td class="stat-cell">
                  <div class="stat-value">${sortedTasks.length}</div>
                  <div class="stat-label">Quick wins identified</div>
                </td>
              </tr>
            </table>

            <div class="section-title">Your Workflows (${sortedTasks.length})</div>
            ${sortedTasks.map((task, index) => {
              const difficultyClass = task.analysis?.difficulty === 'Easy' ? 'difficulty-easy' : 
                                     task.analysis?.difficulty === 'Hard' ? 'difficulty-hard' : 'difficulty-moderate';
              
              const shortSummary = task.analysis?.impactSummary 
                ? task.analysis.impactSummary.split('.').slice(0, 2).join('.') + '.'
                : '';
              
              return `
              <div class="task">
                <div class="task-header">
                  <span class="task-rank">#${index + 1}</span>
                  <div>
                    <div class="task-name">${escapeHtml(task.name)}</div>
                    <div class="task-category">${escapeHtml(task.category)}</div>
                  </div>
                </div>
                
                <div class="task-metrics">
                  Impact: ${task.impact} &nbsp;|&nbsp; Effort: ${task.effort} &nbsp;|&nbsp; <span class="task-score">Score: ${task.score}</span>
                </div>
                
                ${task.description ? `
                  <div style="color: #333; font-size: 14px; line-height: 1.6; margin: 16px 0; padding: 12px; background: #f0f4ff; border-radius: 6px; border-left: 4px solid #6366F1;">
                    <div style="font-weight: bold; color: #6366F1; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Description</div>
                    ${escapeHtml(task.description)}
                  </div>
                ` : ''}
                
                ${shortSummary ? `
                  <div style="color: #555; font-size: 15px; line-height: 1.6; margin: 16px 0; padding: 12px; background: #f8f9fa; border-radius: 6px; font-style: italic;">
                    ${escapeHtml(shortSummary)}
                  </div>
                ` : ''}
                
                ${task.analysis ? `
                  <div class="ai-analysis">
                    <div class="ai-analysis-title">📊 AI Analysis</div>
                    
                    <div class="analysis-section">
                      <div class="analysis-label">Impact:</div>
                      <div class="analysis-text">${escapeHtml(task.analysis.impactSummary)}</div>
                    </div>
                    
                    <div class="analysis-section">
                      <div class="analysis-label">Effort:</div>
                      <div class="analysis-text">${escapeHtml(task.analysis.effortSummary)}</div>
                    </div>
                    
                    <div class="analysis-section">
                      <div class="analysis-label">Difficulty:</div>
                      <div><span class="difficulty-badge ${difficultyClass}">${escapeHtml(task.analysis.difficulty)}</span></div>
                    </div>
                    
                    <div class="analysis-section">
                      <div class="analysis-label">Est. Time:</div>
                      <div class="analysis-text">${escapeHtml(task.analysis.estimatedTime)}</div>
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
            }).join('')}
          </div>

          <div class="content">
            <div class="timeline-section">
              <div class="timeline-title">Project Timeline</div>
              <table class="timeline-table">
                <thead>
                  <tr>
                    <th style="width: 30%;">Phase</th>
                    <th style="width: 50%;">Description</th>
                    <th style="width: 20%;">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="phase-number">1.</span> Discovery & Planning</td>
                    <td>Review your current workflows, confirm system access requirements, and finalize automation specifications.</td>
                    <td>${timeline.discovery}</td>
                  </tr>
                  <tr>
                    <td><span class="phase-number">2.</span> Workflow Design & Development</td>
                    <td>Design automation logic, build custom integrations, and develop the workflows mapped in your matrix.</td>
                    <td>${timeline.development}</td>
                  </tr>
                  <tr>
                    <td><span class="phase-number">3.</span> Integration & Testing</td>
                    <td>Connect automations to your existing systems, test all triggers and actions, and refine based on results.</td>
                    <td>${timeline.integration}</td>
                  </tr>
                  <tr>
                    <td><span class="phase-number">4.</span> Handover & Training</td>
                    <td>Deliver complete documentation, provide walkthrough training, and ensure your team can manage the automations.</td>
                    <td>${timeline.handover}</td>
                  </tr>
                </tbody>
              </table>
              <div class="total-duration">
                <strong>Total Duration:</strong> ${timeline.total}
              </div>
            </div>
          </div>

          <div class="content">
            <div class="cta">
              <h2>Ready to Automate Your Business?</h2>
              <p>Let Nexark implement your top automation opportunities. We'll handle the technical setup while you focus on growing your business.</p>
              <a href="https://cal.com/sam-barksdale/discovery" class="cta-button">Book Free Systems Audit</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Nexark</strong> - Engineering Reality, Together</p>
            <p>Save 5-20 hours per week • No technical skills required • Done-for-you automation</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using SendGrid
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
    
    if (!SENDGRID_API_KEY) {
      console.error("SendGrid API key not configured");
      return NextResponse.json(
        { error: "Email service not configured. Please set SENDGRID_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: SENDGRID_FROM_EMAIL || "noreply@nexark.io",
      subject: "🎯 Your Personalized Automation Roadmap",
      html: htmlContent,
    };

    const response = await sgMail.send(msg);
    console.log("Email sent successfully, status:", response[0].statusCode);

    return NextResponse.json({ success: true, statusCode: response[0].statusCode });

  } catch (error: unknown) {
    console.error("Error in send-roadmap:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
