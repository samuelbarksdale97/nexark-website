import Link from "next/link";
import { RefreshShell } from "@/components/refresh/RefreshShell";
import { ScrollHero } from "@/components/refresh/ScrollHero";
import { SystemStack } from "@/components/refresh/SystemStack";
import { ArcWheel } from "@/components/refresh/ArcWheel";
import { Roadmap } from "@/components/refresh/Roadmap";

export default function Home() {
  return (
    <RefreshShell active="home">
      {/* DARK — hero: the engine assembles beneath the human, then recedes */}
      <ScrollHero />

      {/* DARK — the layers under the moment: what's actually running */}
      <SystemStack
        slides={[
          { key: "clip-scan", src: "/refresh/clips/clip-scan.jpg", alt: "A guest taps a phone at the door and is recognized", label: "Membership · entry" },
          { key: "clip-property", src: "/refresh/clips/clip-property.jpg", alt: "A property manager walking a vacant unit", label: "Property · compliance" },
          { key: "clip-restaurant", src: "/refresh/clips/clip-restaurant.jpg", alt: "A bartender and server at close", label: "Restaurant · close-out" },
          { key: "clip-ticketing", src: "/refresh/clips/clip-ticketing.jpg", alt: "A door host fastening a wristband", label: "Nightlife · door" },
          { key: "clip-yacht", src: "/refresh/clips/clip-yacht.jpg", alt: "A charter captain at the helm", label: "Charter · dispatch" },
        ]}
        eyebrow="Under the hood"
        heading="Every calm moment has"
        em="layers underneath."
        body="A guest arrives and is recognized. The visit is recorded, the payment settles, the books reconcile, and the summary reaches you. One tap at the door, four systems agreeing behind it — and nobody standing over any of them."
        cta={{ label: "See what we build", href: "/solutions" }}
      />

      {/* LIGHT — Nex·ARK → your next ARC: the industries riding a literal arc */}
      <ArcWheel />

      {/* THESIS + 3 CARDS */}
      <section className="band" data-nav="dark">
        <span className="connector" />
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow muted">The difference</span>
            <h2>
              A tool isn&apos;t the same as <em>an advantage.</em>
            </h2>
          </div>
          <div className="benefits">
            <div className="bcard reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
              </div>
              <h3>Runs without you</h3>
              <p>The busywork handles itself, so your team does the work only they can do.</p>
            </div>
            <div className="bcard reveal d1">
              <div className="ic">
                <svg viewBox="0 0 24 24"><path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" /><path d="M3 12l9 4.5L21 12M3 16.5 12 21l9-4.5" /></svg>
              </div>
              <h3>One source of truth</h3>
              <p>Every tool agrees. Everything your business knows, in one place.</p>
            </div>
            <div className="bcard reveal d2">
              <div className="ic">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              </div>
              <h3>Answers in seconds</h3>
              <p>Ask your business a question. Get an answer from your real data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      {/* HOW IT WORKS — a sequence, rendered as one */}
      <Roadmap />

      {/* OWN vs USE */}
      <section className="band" data-nav="dark">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow muted">Own it</span>
            <h2 style={{ fontSize: "clamp(30px,3.4vw,48px)", marginTop: 18 }}>
              Built around your business — <em>not the other way around.</em>
            </h2>
            <ul className="checklist">
              <li><span className="ck">✓</span> Off-the-shelf tools give your competitors the same thing.</li>
              <li><span className="ck">✓</span> We turn how you work into an advantage.</li>
              <li><span className="ck">✓</span> The system fits your operation, not a template.</li>
              <li><span className="ck">✓</span> You own the outcome.</li>
            </ul>
          </div>
          <div className="split-visual reveal d1" />
        </div>
      </section>

      {/* PROOF */}
      <section className="band tint" data-nav="dark">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow">The work</span>
            <h2>
              Outcomes, <em>not dashboards.</em>
            </h2>
          </div>
          <div className="cases">
            <div className="case reveal">
              <span className="tag">Membership Platform</span>
              <h3>A neighborhood bar</h3>
              <p>Decades of loyalty, no way to capture it. Now: a membership platform that turned goodwill into recurring revenue.</p>
            </div>
            <div className="case reveal d1">
              <span className="tag">CRM + Apple Wallet</span>
              <h3>An entertainment venue</h3>
              <p>Regulars known by name — until turnover. Now: a CRM where every relationship belongs to the business.</p>
            </div>
            <div className="case reveal d2">
              <span className="tag">Operations Portal</span>
              <h3>A charter boat company</h3>
              <p>Two cities run on spreadsheets and texts. Now: an operations portal that dispatches and confirms itself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OLD WAY vs NEXARK WAY */}
      <section className="band" data-nav="dark">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow muted">The choice</span>
            <h2>
              The old way, and <em>the Nexark way.</em>
            </h2>
          </div>
          <div className="compare">
            <div className="col before reveal">
              <h4>The old way</h4>
              <ul>
                <li>Generic tools bolted together</li>
                <li>Built around whoever was free</li>
                <li>You&apos;re the glue holding it together</li>
                <li>Works on paper</li>
              </ul>
            </div>
            <div className="col after reveal d1">
              <h4>The Nexark way</h4>
              <ul>
                <li>Built around how you operate</li>
                <li>Runs without you in the middle</li>
                <li>One source of truth</li>
                <li>Works in practice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="band tint" data-nav="dark">
        <div className="wrap">
          <div className="sec-head wide reveal" style={{ textAlign: "center", margin: "0 auto 56px" }}>
            <span className="eyebrow center">Questions</span>
            <h2 style={{ marginTop: 18 }}>
              Got questions? <em>We&apos;ve got answers.</em>
            </h2>
          </div>
          <div className="faq reveal">
            <details open>
              <summary>How long does it take?</summary>
              <p>Most audits run one to four weeks. Builds happen in focused sprints after that — working pieces in weeks, not quarters.</p>
            </details>
            <details>
              <summary>Do I need to know exactly what I need?</summary>
              <p>No. Most clients start with the audit because they don&apos;t. We find the real problem before anyone builds anything.</p>
            </details>
            <details>
              <summary>What if I already have tools I like?</summary>
              <p>Good. We build on top of what you use and make it all work together.</p>
            </details>
            <details>
              <summary>Who owns what you build?</summary>
              <p>You do. The system, the data, the advantage — it&apos;s yours.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" data-nav="dark">
        <div className="wrap reveal">
          <span className="eyebrow center">The spark that reignites possibility</span>
          <h2 style={{ marginTop: 26 }}>
            What&apos;s the next generation of <em>your business?</em>
          </h2>
          <p>Tell us where you are and where you want to go.</p>
          <Link href="/start" className="btn btn-primary">
            Start Your Journey <span className="arw">→</span>
          </Link>
        </div>
      </section>
    </RefreshShell>
  );
}
