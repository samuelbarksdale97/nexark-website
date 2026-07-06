import Link from "next/link";
import { RefreshShell } from "@/components/refresh/RefreshShell";

export default function Home() {
  return (
    <RefreshShell active="home">
      {/* HERO */}
      <section className="hero hero-home">
        <div className="hero-bg" style={{ backgroundImage: "url('/refresh/assets/hero-a.png')" }} />
        <div className="hero-scrim" />
        <div className="rail">
          <div>Technology</div>
          <div>People</div>
          <div>Transformation</div>
        </div>
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">Reigniting what&apos;s possible</span>
            <h1>
              The transformation engine for your <em>next generation.</em>
            </h1>
            <p className="lede">
              We combine strategy, software, and intelligent systems to engineer the journey from
              where your business is to where it&apos;s always wanted to be.
            </p>
            <div className="hero-actions">
              <Link href="/start" className="btn btn-primary">
                Start Your Journey <span className="arw">→</span>
              </Link>
              <Link href="/solutions" className="btn btn-ghost">
                See Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVERY BUSINESS */}
      <section className="band" id="about">
        <span className="connector" />
        <div className="wrap band-narrow">
          <div className="sec-head reveal">
            <span className="eyebrow muted">Possibility → Transformation</span>
            <h2>
              Every business has a <em>next generation.</em>
            </h2>
          </div>
          <p className="lead-para reveal d1">
            The current generation of your business is however it runs today: the tools you picked up
            along the way, the processes that grew over time, the ceiling you keep bumping into. It
            works. But you know it could work differently.
          </p>
          <p className="lead-para reveal d2">
            Your <strong>next generation</strong> is what your business becomes when those limits get
            removed — when the technology fits how you actually operate, when the systems compound
            instead of just keeping up, when the thing you&apos;ve been describing in meetings for
            years finally exists.
          </p>
          <p className="lead-para reveal d3">
            The gap between the two is closer than it feels. You just need the right engine to close
            it.
          </p>
        </div>
      </section>

      {/* WHO WE BUILD WITH */}
      <section className="band tint" id="work">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow">Centered on people</span>
            <h2>
              We build around the people, <em>not the org chart.</em>
            </h2>
          </div>
          <div className="people">
            <div className="person reveal">
              <div className="num">01</div>
              <h3>Founders</h3>
              <p>You saw something before anyone else did. We build the engine that makes it real.</p>
            </div>
            <div className="person reveal d1">
              <div className="num">02</div>
              <h3>Operators</h3>
              <p>You keep it all running. We take the weight off the parts that shouldn&apos;t need you.</p>
            </div>
            <div className="person reveal d2">
              <div className="num">03</div>
              <h3>Innovators</h3>
              <p>You see the next move. We turn the idea you&apos;ve been sitting on into something people can use.</p>
            </div>
            <div className="person reveal d3">
              <div className="num">04</div>
              <h3>Builders</h3>
              <p>You&apos;ve outgrown the tools you started with. We build the ones that fit how you actually work.</p>
            </div>
            <div className="person reveal d4">
              <div className="num">05</div>
              <h3>Dreamers</h3>
              <p>You&apos;ve pictured what this could become. We engineer the path from possibility to transformation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="band">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}
          >
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow muted">The work</span>
              <h2 style={{ marginTop: 20 }}>
                Businesses we&apos;ve taken to their <em>next generation.</em>
              </h2>
            </div>
            <Link href="/#work" style={{ color: "var(--amber)", fontSize: 14, letterSpacing: "0.06em" }}>
              See our work →
            </Link>
          </div>
          <div className="cases">
            <div className="case reveal">
              <span className="tag">Membership Platform</span>
              <h3>A neighborhood bar</h3>
              <p>
                Their current generation was decades of loyalty with no system to capture it. Regulars
                showed up because of relationships that lived in people&apos;s heads. Their next
                generation is a digital membership platform that turned goodwill into recurring revenue
                and made every relationship permanent.
              </p>
            </div>
            <div className="case reveal d1">
              <span className="tag">CRM + Apple Wallet</span>
              <h3>An entertainment venue</h3>
              <p>
                Their current generation was a staff that knew every regular by name — but that
                knowledge walked out the door with turnover. Their next generation is a membership CRM
                with Apple Wallet integration where every relationship belongs to the business,
                regardless of who&apos;s working any given night.
              </p>
            </div>
            <div className="case reveal d2">
              <span className="tag">Operations Portal</span>
              <h3>A charter boat company</h3>
              <p>
                Their current generation was driver onboarding, maintenance scheduling, and bookings
                across two cities run on spreadsheets and manual SMS. Their next generation is a custom
                operations portal with automated dispatch, real-time driver workflows, and an SMS
                system that handles confirmations without anyone touching it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE ENGINE WORKS */}
      <section className="band tint">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow">The engine</span>
            <h2>
              How we carry you <em>forward.</em>
            </h2>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="idx">01</div>
              <h3>Learn</h3>
              <div className="sub">We learn your business before we touch anything.</div>
              <p>
                We map your current generation: tools, processes, revenue model, team structure, where
                time is going. We figure out what your business actually needs to get to the next one —
                usually different from what you&apos;d ask for if we just took an order, because
                we&apos;re looking at the full picture.
              </p>
            </div>
            <div className="step reveal d1">
              <div className="idx">02</div>
              <h3>Build</h3>
              <div className="sub">We build the technology that moves you forward.</div>
              <p>
                Custom software, intelligent systems, and automation engineered around how your
                operation actually runs. We sit on top of what you already use. Your existing tools
                start working together. Your team does more with the same resources.
              </p>
            </div>
            <div className="step reveal d2">
              <div className="idx">03</div>
              <h3>Partner</h3>
              <div className="sub">We stay in your corner.</div>
              <p>
                A transformation engine that shuts off after delivery isn&apos;t an engine. Your
                business evolves, and the technology has to evolve with it — ongoing optimization,
                strategic counsel, and the kind of partnership where your next generation keeps getting
                refined as you grow into it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNINGS */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head wide reveal">
            <span className="eyebrow muted">What we&apos;ve learned</span>
            <h2>
              What doing this <em>teaches you.</em>
            </h2>
          </div>
          <div className="learn">
            <div className="lesson reveal">
              <h3>You have to be the one driving it.</h3>
              <p>
                We can build the most capable engine in the world. It only produces results when
                you&apos;re behind the wheel. The businesses that move fastest into their next
                generation are the ones that show up ready to own the outcome. We bring the technology
                and the methodology. You bring the decisions.
              </p>
            </div>
            <div className="lesson reveal d1">
              <h3>Most businesses run on a design nobody chose.</h3>
              <p>
                The tools accumulated. The processes grew around whoever was available. Over time, it
                all started to feel permanent. Anything that was assembled by default can be reassembled
                with intention.
              </p>
            </div>
            <div className="lesson reveal d2">
              <h3>The technology has to fit how you actually operate.</h3>
              <p>
                We&apos;ve seen what happens when you force a business into someone else&apos;s
                framework. It works on paper. It falls apart in practice. We build around you.
              </p>
            </div>
            <div className="lesson reveal d3">
              <h3>Speed of learning beats speed of building.</h3>
              <p>
                We work in focused sprints. Build, measure, adjust. The clients who reach their next
                generation fastest are the ones who learn from each cycle and use it to inform the next
                one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap reveal">
          <span className="eyebrow center">The spark that reignites possibility</span>
          <h2 style={{ marginTop: 26 }}>
            What&apos;s the next generation of <em>your business?</em>
          </h2>
          <p>
            That&apos;s the question every engagement starts with. Tell us where you are and where
            you&apos;ve always wanted to take it — the first conversation is just us understanding your
            situation well enough to give you something useful.
          </p>
          <Link href="/start" className="btn btn-primary">
            Start a Conversation <span className="arw">→</span>
          </Link>
        </div>
      </section>
    </RefreshShell>
  );
}
