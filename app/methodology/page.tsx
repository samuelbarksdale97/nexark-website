import Link from "next/link";
import { RefreshShell } from "@/components/refresh/RefreshShell";

export default function MethodologyPage() {
  return (
    <RefreshShell active="methodology">
      {/* HERO */}
      <section className="hero hero-page">
        <div className="hero-bg" style={{ backgroundImage: "url('/refresh/assets/page-methodology.png')" }} />
        <div className="hero-scrim" />
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">The spark that reignites possibility</span>
            <h1>
              You say success is engineered. <em>Here&apos;s what we mean by that.</em>
            </h1>
          </div>
        </div>
      </section>

      {/* NARRATIVE */}
      <section className="band">
        <span className="connector" />
        <div className="wrap band-narrow">
          <p className="lead-para reveal">
            Most businesses we work with are running on systems nobody designed on purpose. The CRM was
            picked three years ago because someone found it on a Google search. The workflows grew
            around whoever was available, not around what actually needed to happen. The tools
            don&apos;t talk to each other, so the team fills the gaps manually.
          </p>
          <p className="lead-para reveal d1">
            Over time, everyone just accepted it as how things work. That&apos;s the current
            generation.
          </p>
          <p className="lead-para reveal d2">
            From our experience, that&apos;s exactly where the opportunity lives. Because if the way
            your business runs today was assembled by default — by circumstance, by decisions that just
            accumulated — then it can be taken apart and put back together with intention.{" "}
            <strong>The next generation of your business starts with seeing that clearly.</strong>
          </p>
        </div>
      </section>

      {/* FOUR MOVES */}
      <section className="band tint">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow">How we work</span>
            <h2>
              Reality first. <em>Then the build.</em>
            </h2>
          </div>
          <div className="steps four">
            <div className="step reveal">
              <div className="idx">01</div>
              <h3>See it clearly</h3>
              <p>
                Before we recommend anything, we map how your business actually operates today — not how
                the org chart says it does. The real workflows, the real handoffs, the real places time
                and money leak out.
              </p>
            </div>
            <div className="step reveal d1">
              <div className="idx">02</div>
              <h3>Name the dream</h3>
              <p>
                We ask where you want this to go. That destination becomes the anchor. Every decision
                after it is measured against whether it moves you closer to the business you&apos;ve
                always wanted to run.
              </p>
            </div>
            <div className="step reveal d2">
              <div className="idx">03</div>
              <h3>Engineer the path</h3>
              <p>
                We build the technology that closes the gap — custom software and intelligent systems
                shaped around how you actually operate, sequenced so the highest-leverage wins come
                first.
              </p>
            </div>
            <div className="step reveal d3">
              <div className="idx">04</div>
              <h3>Stay in your corner</h3>
              <p>
                Your business keeps evolving, so the technology has to as well. We stay on to refine,
                optimize, and extend — the partnership is where the compounding happens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow muted">What we believe</span>
            <h2>
              The principles underneath <em>the work.</em>
            </h2>
          </div>
          <div className="learn">
            <div className="lesson reveal">
              <h3>You have to be the one driving it.</h3>
              <p>
                We bring the technology and the methodology. You bring the decisions. The engine only
                produces results when the person who owns the outcome is behind the wheel.
              </p>
            </div>
            <div className="lesson reveal d1">
              <h3>Anything assembled by default can be rebuilt with intention.</h3>
              <p>
                The way your business runs today wasn&apos;t chosen — it accumulated. That&apos;s not a
                failure. It&apos;s the opening. What grew by circumstance can be redesigned on purpose.
              </p>
            </div>
            <div className="lesson reveal d2">
              <h3>The technology has to fit how you actually operate.</h3>
              <p>
                Forcing a business into someone else&apos;s framework works on paper and falls apart in
                practice. We build around you, not the other way around.
              </p>
            </div>
            <div className="lesson reveal d3">
              <h3>Speed of learning beats speed of building.</h3>
              <p>
                We work in focused sprints — build, measure, adjust. The businesses that reach their
                next generation fastest are the ones that learn from each cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap reveal">
          <span className="eyebrow center">Reigniting what&apos;s possible</span>
          <h2 style={{ marginTop: 26 }}>
            Ready to see your business <em>clearly?</em>
          </h2>
          <p>
            The first conversation is just us understanding where you are and where you&apos;ve always
            wanted to take it — well enough to give you something useful.
          </p>
          <Link href="/start" className="btn btn-primary">
            Start Your Journey <span className="arw">→</span>
          </Link>
        </div>
      </section>
    </RefreshShell>
  );
}
