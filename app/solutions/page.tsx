import Link from "next/link";
import { RefreshShell } from "@/components/refresh/RefreshShell";

export default function SolutionsPage() {
  return (
    <RefreshShell active="solutions">
      {/* HERO */}
      <section className="hero hero-page">
        <div className="hero-bg" style={{ backgroundImage: "url('/refresh/assets/page-solutions.png')" }} />
        <div className="hero-scrim" />
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">The journey from possibility to transformation</span>
            <h1>
              Success is not an accident. <em>It&apos;s engineered.</em>
            </h1>
            <p className="lede">
              We help businesses transition into their next generation through technology and long-term
              partnership. Whether you need your operation to run without you in the middle of it, or
              you want to build something that doesn&apos;t exist yet, the first step is the same: we
              learn where you are and where you want to go. Then we build the technology to close the
              gap.
            </p>
            <Link href="/start" className="btn btn-primary">
              Start Your Journey <span className="arw">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* THE AUDIT */}
      <section className="band tint">
        <div className="wrap band-narrow">
          <div className="sec-head reveal">
            <span className="eyebrow">Start here</span>
            <h2>The Nexark Audit</h2>
          </div>
          <p className="lead-para reveal d1" style={{ marginBottom: 16 }}>
            Most of our clients start here.
          </p>
          <p className="lead-para reveal d1">
            You might know exactly what&apos;s broken. You might have an idea you&apos;ve been sitting
            on. Either way, we start in the same place: understanding what&apos;s actually going on
            before we commit to building anything. We&apos;ve found that businesses arrive from one of
            two starting points.
          </p>

          <div className="two-cards reveal d2" style={{ marginTop: 44 }}>
            <div className="qcard">
              <h3>“Something in my business isn&apos;t working the way it should.”</h3>
              <p>
                You&apos;re spending time on work that shouldn&apos;t need you. Processes are slow,
                tools don&apos;t talk to each other, and you&apos;ve been too busy running the business
                to stop and fix what&apos;s underneath it.
              </p>
            </div>
            <div className="qcard">
              <h3>“I have an idea for something I want to build.”</h3>
              <p>
                You see an opportunity. A product, a platform, a new revenue model. The vision is clear
                — but you need someone who can hear what you&apos;re describing and actually build it.
              </p>
            </div>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 72 }}>
          <div className="sec-head wide reveal">
            <span className="eyebrow muted">How the audit works</span>
          </div>
          <div className="steps four">
            <div className="step reveal">
              <div className="idx">01</div>
              <h3>Discovery</h3>
              <p>
                We start with the pain or the opportunity. What brought you here? What&apos;s costing
                you time, money, or sleep? We listen, and we ask the questions that surface what&apos;s
                underneath the stated problem.
              </p>
            </div>
            <div className="step reveal d1">
              <div className="idx">02</div>
              <h3>Scope</h3>
              <p>
                We map where this actually lives. Pain points rarely stay in one lane. We scope the
                right problem, not just the stated one — including the people and communication inside
                it.
              </p>
            </div>
            <div className="step reveal d2">
              <div className="idx">03</div>
              <h3>Dream</h3>
              <p>
                Once we see reality clearly, we ask: where do you want this to be? The dream becomes the
                anchor for everything that follows — every recommendation, every priority, every dollar
                of ROI is measured against that destination.
              </p>
            </div>
            <div className="step reveal d3">
              <div className="idx">04</div>
              <h3>Fix</h3>
              <p>
                Every friction point and opportunity gets scored by impact and effort. Quick wins first,
                big swings next. We tell you what to prioritize and what to deprioritize. The roadmap
                answers what&apos;s first.
              </p>
            </div>
          </div>

          <div className="what-box reveal" style={{ marginTop: 44 }}>
            <h4>What you walk away with</h4>
            <ul>
              <li>Executive summary with the headlines</li>
              <li>Full findings report with data, visuals, and prioritized recommendations</li>
              <li>A reverse roadmap from current state to dream state, phased into sprints</li>
              <li>An ROI summary: total investment vs. total Year-1 value</li>
              <li>A roadmap you can execute with or without Nexark</li>
            </ul>
          </div>

          <div className="reveal" style={{ marginTop: 56, overflowX: "auto" }}>
            <table className="ptable">
              <thead>
                <tr>
                  <th></th>
                  <th>Starter</th>
                  <th>Growth</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Focus</th>
                  <td>One pain point, one area</td>
                  <td>Full operation + people and culture</td>
                  <td>Multi-department, cross-functional</td>
                </tr>
                <tr>
                  <th>Best for</th>
                  <td>“I know exactly where it hurts”</td>
                  <td>“I don&apos;t know what I don&apos;t know”</td>
                  <td>Complex orgs, M&amp;A due diligence</td>
                </tr>
                <tr>
                  <th>Timeline</th>
                  <td>About a week</td>
                  <td>Two to three weeks</td>
                  <td>Three to four weeks</td>
                </tr>
                <tr>
                  <th>Deliverable</th>
                  <td>Standalone diagnosis</td>
                  <td>Full operation + roadmap</td>
                  <td>Cross-functional roadmap</td>
                </tr>
              </tbody>
            </table>
            <p className="lead-para" style={{ fontSize: 15, color: "var(--muted)", marginTop: 24, maxWidth: 760 }}>
              A Starter audit often reveals issues that cross boundaries. If that happens, we credit
              your audit toward a deeper engagement. The audit is a standalone deliverable — the
              diagnosis stands on its own, and you decide whether to bring us in for the build.
            </p>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="band">
        <div className="wrap">
          <div className="offer reveal">
            <span className="eyebrow muted">01 · Optimize</span>
            <h2 style={{ marginTop: 18 }}>Optimize</h2>
            <div className="kicker">Take your current operation to its next generation.</div>
            <div className="body-copy">
              <p>
                You&apos;ve outgrown your tools. Your team is patching systems together that were never
                meant to talk to each other. There are bottlenecks you&apos;ve normalized because
                you&apos;ve been too busy running the business to stop and look at them.
              </p>
              <p>
                We sit on top of what you already use and build custom software that fits how your
                operation actually runs. Your existing tools start working together. Your team does more
                with the same resources. The current generation of your operation becomes the foundation
                for the next one.
              </p>
            </div>
            <div className="what-box">
              <h4>What this looks like</h4>
              <ul>
                <li>Custom CRMs built around your actual sales process</li>
                <li>Agentic workflows that handle multi-step tasks without someone manually pushing things along</li>
                <li>Dashboards that show what matters to your business, not what a template decided</li>
                <li>System integrations that replace the duct tape</li>
                <li>Compliance and reporting automation</li>
              </ul>
            </div>
            <div className="price-line">
              Scoped after the audit. <span>Priced to the work, not a template.</span>
            </div>
          </div>

          <div className="offer reveal">
            <span className="eyebrow muted">02 · Innovate</span>
            <h2 style={{ marginTop: 18 }}>Innovate</h2>
            <div className="kicker">Build the next generation of what your business could be.</div>
            <div className="body-copy">
              <p>
                You see an opportunity. A product your industry needs. A membership model that turns
                one-time customers into recurring revenue. A platform that creates a new line of
                business entirely. The vision is clear. You need a technology partner who can hear what
                you&apos;re describing and turn it into something real.
              </p>
              <p>
                We take your idea through discovery, architecture, and build, and we stay in your corner
                after launch. This is where the partnership matters most: we&apos;re engineering a
                product with revenue designed in from day one, and we&apos;re invested in its success
                long-term.
              </p>
            </div>
            <div className="what-box">
              <h4>What this looks like</h4>
              <ul>
                <li>Mobile apps from concept to App Store</li>
                <li>Membership platforms with digital wallets, automated billing, and member management</li>
                <li>SaaS products built for your specific market</li>
                <li>Intelligent tools that give your business capabilities nobody else in your space has</li>
              </ul>
            </div>
            <div className="price-line">
              Projects scoped individually. <span>Sized to the opportunity, not a menu.</span>
            </div>
          </div>

          <div className="offer reveal">
            <span className="eyebrow muted">03 · Partner</span>
            <h2 style={{ marginTop: 18 }}>Partner</h2>
            <div className="kicker">When you grow, we grow. That&apos;s how partnership works.</div>
            <div className="two-cards" style={{ marginTop: 26 }}>
              <div className="qcard">
                <h3>Maintenance &amp; Optimization</h3>
                <p>
                  Your systems stay current, secure, and evolving. We monitor performance, handle
                  dependency updates, and run quarterly optimization reviews. Proactive, not reactive.
                </p>
                <div className="price-line" style={{ fontSize: 15, marginTop: 16, color: "var(--muted)" }}>
                  Ongoing monthly partnership
                </div>
              </div>
              <div className="qcard">
                <h3>Fractional CTO</h3>
                <p>
                  Strategic technology leadership without the full-time salary. Architecture decisions,
                  vendor management, roadmap development, team oversight. We show up to the meetings that
                  matter.
                </p>
                <div className="price-line" style={{ fontSize: 15, marginTop: 16, color: "var(--muted)" }}>
                  Advisory, embedded, or leadership — scoped to how deep you need us
                </div>
              </div>
            </div>
            <div className="qcard reveal" style={{ marginTop: 22 }}>
              <h3>Venture Partner</h3>
              <p>
                For founders who want a technical co-founder, not a vendor. We invest our engineering in
                exchange for equity and build alongside you with real skin in the game. We&apos;re
                selective about who we partner with, because when we come in as a venture partner, our
                interests and yours are the same.
              </p>
              <div className="price-line" style={{ fontSize: 15, marginTop: 16, color: "var(--muted)" }}>
                Structure determined case-by-case
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap reveal">
          <span className="eyebrow center">The spark that reignites possibility</span>
          <h2 style={{ marginTop: 26 }}>
            Not sure where you fit? <em>Start with a conversation.</em>
          </h2>
          <p>
            Tell us where you are and where you&apos;ve always wanted to take it. The first conversation
            is just us understanding your situation well enough to give you something useful.
          </p>
          <Link href="/start" className="btn btn-primary">
            Start Your Journey <span className="arw">→</span>
          </Link>
        </div>
      </section>
    </RefreshShell>
  );
}
