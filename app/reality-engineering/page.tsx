import type { Metadata } from "next";
import Link from "next/link";
import { RefreshShell } from "@/components/refresh/RefreshShell";
import { getManifest } from "@/lib/re/corpus";
import { RE_SEO } from "@/lib/re/seo";

export const metadata: Metadata = {
  title: RE_SEO["/reality-engineering"].title,
  description: RE_SEO["/reality-engineering"].description,
};

/**
 * The front door of Reality Engineering as a public discipline.
 * Copy is verbatim from the canon's website/landing_page_copy.md (v0.1) — the corpus is
 * finished, verified language; this page gives it a stage, it does not rewrite it.
 * One hero effect (the state-transition drawing); everything else is disciplined quiet.
 */
export default function RealityEngineering() {
  const { corpusVersion, corpusDate } = getManifest();

  return (
    <RefreshShell active="re">
      <main className="re re-landing">
        {/* HERO — the discipline, stated. The one over-invested moment: the bridge draws. */}
        <section className="re-hero" data-nav="light">
          <div className="wrap">
            <p className="re-kicker">
              A public discipline · Canon v{corpusVersion} · {corpusDate}
            </p>
            <h1>
              The discipline of moving from the reality you have to{" "}
              <em>the reality you are trying to create.</em>
            </h1>

            <figure className="re-transit" role="img" aria-label="Diagram: a line drawn from a point labeled current reality to a star labeled desired reality, crossing a span labeled the engineered bridge.">
              <svg viewBox="0 0 960 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <circle className="rt-now" cx="70" cy="60" r="7" />
                <path
                  className="rt-bridge"
                  d="M 84 60 C 260 60, 300 24, 480 24 C 660 24, 700 60, 862 60"
                />
                <g className="rt-star">
                  <path d="M 890 40 L 895.5 54.5 L 910 60 L 895.5 65.5 L 890 80 L 884.5 65.5 L 870 60 L 884.5 54.5 Z" />
                </g>
              </svg>
              <figcaption>
                <span>Current reality</span>
                <span className="rt-mid">The engineered bridge</span>
                <span className="rt-goal">Desired reality</span>
              </figcaption>
            </figure>

            <p className="re-def">
              Reality Engineering is the intentional practice of exploring, engaging, and evolving
              the systems, environments, technologies, relationships, and feedback loops that shape
              the reality people experience and the outcomes they can create.
            </p>
            <p className="re-line">
              <strong>Human agency is the center. AI is the amplifier.</strong>
            </p>
            <div className="re-cta">
              <Link className="btn re-btn-ink" href="/reality-engineering/foundations">
                Start with the Foundations <span className="arw">→</span>
              </Link>
              <Link className="btn re-btn-quiet" href="/reality-engineering/start">
                Explore the full canon
              </Link>
            </div>
          </div>
        </section>

        {/* THE PROBLEM — every reality has a system behind it */}
        <section className="re-band" data-nav="light">
          <div className="wrap">
            <h2>Every reality has a system behind it</h2>
            <div className="re-triptych">
              <div className="re-card">
                <b>A business</b>
                <p>
                  lives inside workflows, tools, incentives, decisions, information, habits,
                  relationships, and customer experiences.
                </p>
              </div>
              <div className="re-card">
                <b>A person</b>
                <p>
                  lives inside environments, beliefs, responsibilities, routines, access, feedback,
                  and choices.
                </p>
              </div>
              <div className="re-card">
                <b>A creative vision</b>
                <p>
                  lives inside the limits of production, language, technology, resources, and what
                  an audience is able to experience.
                </p>
              </div>
            </div>
            <div className="re-beats">
              <p>Some of those systems were designed.</p>
              <p>Many were inherited.</p>
              <p>Others formed by accident and became normal because nobody stopped to question them.</p>
            </div>
            <p className="re-close">Reality Engineering begins by making the system visible.</p>
          </div>
        </section>

        {/* THE MODEL */}
        <section className="re-band re-band-model" data-nav="light">
          <div className="wrap">
            <h2>The model</h2>
            <p className="re-modelline" aria-hidden="true">
              <span>Current Reality</span>
              <span className="re-arrow">→</span>
              <span className="re-gold">Engineered Bridge</span>
              <span className="re-arrow">→</span>
              <span>Desired Reality</span>
            </p>
            <div className="re-triptych">
              <div className="re-card">
                <b>Current Reality</b>
                <p>
                  What is true now? What do people experience? What systems keep producing the
                  outcome?
                </p>
              </div>
              <div className="re-card re-card-bridge">
                <b>Engineered Bridge</b>
                <p>
                  What coordinated changes in people, process, environment, technology, information,
                  relationships, and feedback can responsibly move the state?
                </p>
              </div>
              <div className="re-card">
                <b>Desired Reality</b>
                <p>
                  What should become possible? For whom? What must remain human? How will we know
                  the change is real?
                </p>
              </div>
            </div>
            <div className="re-beats">
              <p>The bridge is not one AI output, app, strategy deck, or inspirational idea.</p>
              <p className="re-close">
                It is the system that allows a worthy future to enter contact with the world.
              </p>
            </div>
          </div>
        </section>

        {/* WHY NOW */}
        <section className="re-band" data-nav="light">
          <div className="wrap re-narrow">
            <h2>Why now</h2>
            <p>Artificial intelligence has shortened the distance between imagination and execution.</p>
            <p>
              A person can research, visualize, write, design, code, simulate, communicate, and
              automate with capabilities that once required more time, more money, or a larger
              institution.
            </p>
            <p>That creates possibility.</p>
            <p>It also creates cost and danger.</p>
            <p>
              The same technology can distribute capability or concentrate power. It can make truth
              easier to explain or easier to counterfeit. It can remove burden or quietly move it to
              someone else. It can expand human agency or make people more dependent on systems they
              cannot question.
            </p>
            <p>The central question is no longer only what AI can create.</p>
            <p className="re-bigq">
              What reality are we creating, for whom, at whose cost, and can we call it good?
            </p>
            <p className="re-more">
              <Link href="/reality-engineering/why-now">Read Why Now →</Link>
            </p>
          </div>
        </section>

        {/* THE METHOD */}
        <section className="re-band re-band-method" data-nav="light">
          <div className="wrap">
            <h2>The method</h2>
            <p className="re-methodline">
              Explore <span className="re-arrow">→</span> Engage <span className="re-arrow">→</span>{" "}
              Evolve
            </p>
            <div className="re-triptych">
              <div className="re-card">
                <b>Explore</b>
                <p>
                  Understand the reality before attempting to change it. Name the burden, current
                  state, desired state, constraints, evidence, stakeholders, and human boundary.
                </p>
              </div>
              <div className="re-card">
                <b>Engage</b>
                <p>
                  Build the smallest useful intervention and put it into responsible contact with
                  real people, behavior, culture, edge cases, and consequence.
                </p>
              </div>
              <div className="re-card">
                <b>Evolve</b>
                <p>
                  Use what contact reveals to improve the system, reconsider the desired state,
                  preserve what works, repair harm, and begin the next cycle.
                </p>
              </div>
            </div>
            <div className="re-beats">
              <p>Reality Engineering is a contact sport.</p>
              <p>
                A system is not proven because it looks good in a diagram. Reality has to answer
                back.
              </p>
            </div>
            <p className="re-more">
              <Link href="/reality-engineering/method">See the Method Specification →</Link>
            </p>
          </div>
        </section>

        {/* THE GOODNESS CONSTRAINT — the governing question gets the dark room */}
        <section className="re-band re-dark" data-nav="dark">
          <div className="wrap re-narrow">
            <h2>The Goodness Constraint</h2>
            <p>A system can reach its goal and still be a failure.</p>
            <p>It can increase efficiency by degrading dignity.</p>
            <p>It can improve conversion through manipulation.</p>
            <p>It can save labor by transferring the burden to people with less power.</p>
            <p>It can create a beautiful generated world by destroying trust in what people see.</p>
            <p>Reality Engineering places one question above capability:</p>
            <p className="re-bigq re-bigq-gold">Can we call what we created good?</p>
            <p>
              Good requires more than intention. It requires truth, meaningful agency, dignity,
              consent or legitimate authority, responsibility, proportionality, shared benefit,
              stewardship, and the ability to detect and repair harm.
            </p>
            <p className="re-more">
              <Link href="/reality-engineering/good">Read the Goodness Constraint →</Link>
            </p>
          </div>
        </section>

        {/* HOPE */}
        <section className="re-band" data-nav="light">
          <div className="wrap re-narrow">
            <h2>Hope with a method</h2>
            <p>Hope is not certainty that the future will work out.</p>
            <p>It is not denial of what is difficult.</p>
            <p className="re-pull">
              Hope is the disciplined willingness to orient toward a future good that is not
              guaranteed, imagine and build pathways toward it, and continue acting while reality is
              still incomplete.
            </p>
            <p>
              Reality Engineering gives hope a structure: truth, a desired good, agency, pathways,
              action, feedback, endurance, and community.
            </p>
            <p>A better reality is not inevitable.</p>
            <p className="re-close">It remains buildable.</p>
            <p className="re-more">
              <Link href="/reality-engineering/hope">Read On Hope →</Link>
            </p>
          </div>
        </section>

        {/* CONSCIOUS REALITY */}
        <section className="re-band" data-nav="light">
          <div className="wrap re-narrow">
            <h2>Conscious reality</h2>
            <p>
              People can share the same physical world and experience very different sets of
              possibilities.
            </p>
            <p>
              Conscious reality is the portion of reality a person or organization can perceive,
              interpret, remember, navigate, and influence from where they stand.
            </p>
            <p>
              A system changes conscious reality when it changes what can be seen, remembered,
              attempted, measured, coordinated, or improved.
            </p>
            <p>That does not mean thought alone controls material reality.</p>
            <p>It means people can only act from the reality they can access.</p>
            <p>
              Reality Engineering improves the map, changes the systems around the traveler, and
              tests whether the path is real.
            </p>
            <p className="re-more">
              <Link href="/reality-engineering/conscious-reality">
                Read Conscious Reality and Success →
              </Link>
            </p>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="re-band" data-nav="light">
          <div className="wrap">
            <h2>Where Reality Engineering is applied</h2>
            <div className="re-apps">
              <div className="re-card">
                <b>Personal</b>
                <p>
                  Change the environments, information, habits, relationships, feedback, and systems
                  shaping what a person can see and sustain—without reducing a human life to
                  optimization.
                </p>
              </div>
              <div className="re-card">
                <b>Organizational</b>
                <p>
                  Make hidden work visible, connect information to action, preserve knowledge,
                  clarify decision rights, improve customer experience, and build new capability.
                </p>
              </div>
              <div className="re-card">
                <b>Experiential and media</b>
                <p>
                  Turn a human vision into an experience an audience can encounter through story,
                  design, software, physical space, or AI-enhanced filmmaking—without confusing
                  imagination with evidence.
                </p>
              </div>
              <div className="re-card">
                <b>Economic</b>
                <p>
                  Help individuals and small organizations gain practical capability, build assets,
                  create options, and participate more fully without pretending structural barriers
                  have disappeared.
                </p>
              </div>
              <div className="re-card">
                <b>Community</b>
                <p>
                  Build shared memory, trust, coordination, learning, access, and infrastructure
                  that allow people to shape reality together.
                </p>
              </div>
            </div>
            <p className="re-more">
              <Link href="/reality-engineering/applications">Explore Applications →</Link>
            </p>
          </div>
        </section>

        {/* AI FILMMAKING */}
        <section className="re-band" data-nav="light">
          <div className="wrap re-narrow">
            <h2>AI filmmaking is an application, not the definition</h2>
            <p>An AI-enhanced film can make Reality Engineering visible.</p>
            <p>
              A real human performance can be placed inside a newly constructed world through
              generation, editing, sound, continuity, and creative direction.
            </p>
            <div className="re-beats">
              <p>AI creates assets.</p>
              <p>
                Reality Engineering coordinates the state transition, preserves the human anchor,
                governs the truth boundary, and evaluates what the audience actually experiences.
              </p>
            </div>
            <p>
              The same discipline can be applied to a business workflow, a customer platform, a
              personal operating system, a community, or a new product.
            </p>
            <p className="re-close">Different medium. Same responsibility.</p>
            <p className="re-more">
              <Link href="/reality-engineering/papers/on-ai-filmmaking-as-reality-engineering">
                Read the AI Filmmaking paper →
              </Link>{" "}
              <Link href="/reality-engineering/cases/ai-enhanced-promotional-film">
                View the first case →
              </Link>
            </p>
          </div>
        </section>

        {/* WHAT IT IS NOT */}
        <section className="re-band re-band-not" data-nav="light">
          <div className="wrap re-narrow">
            <h2>What Reality Engineering is not</h2>
            <ul className="re-notlist">
              <li>
                Reality Engineering is not manifestation. It does not claim that thought alone
                controls the world.
              </li>
              <li>
                It is not AI filmmaking, automation, software, consulting, or personal development
                renamed. Those can be applications or neighboring practices.
              </li>
              <li>It is not a promise that every desired state is achievable.</li>
              <li>It is not permission to engineer other people’s behavior for private gain.</li>
              <li>
                It is not a belief that everything meaningful should be measured or optimized.
              </li>
            </ul>
            <p className="re-close">
              Reality Engineering works inside constraints. It expects the world to answer back.
            </p>
            <p className="re-more">
              <Link href="/reality-engineering/papers/on-the-limits-of-engineering">
                Read On the Limits of Engineering →
              </Link>
            </p>
          </div>
        </section>

        {/* SPIRITUAL ORIGIN */}
        <section className="re-band" data-nav="light">
          <div className="wrap re-narrow">
            <h2>A public discipline with a spiritual origin</h2>
            <p>
              The public method is grounded in observable systems, evidence, human consequence, and
              explicit ethical commitments.
            </p>
            <p>
              Sam Barksdale’s spiritual interpretation is developed separately in{" "}
              <em>The Echo of God</em>.
            </p>
            <p>
              The theological companion understands humanity as image-bearers, AI as a second-order
              reflection of what humans encode, and technological creation as carrying sacred
              responsibility.
            </p>
            <p>It does not equate AI with God, divinity, consciousness, or the Holy Spirit.</p>
            <p>Agreement with the theology is not required to practice the discipline.</p>
            <p>The practical obligation remains shared:</p>
            <p className="re-close">
              Build with intention toward a reality that benefits human beings and the world they
              share.
            </p>
            <p className="re-more">
              <Link href="/reality-engineering/echo-of-god">Read The Echo of God →</Link>
            </p>
          </div>
        </section>

        {/* READING PATHS */}
        <section className="re-band re-band-paths" data-nav="light">
          <div className="wrap">
            <h2>Read the canon your way</h2>
            <div className="re-paths">
              <div className="re-path">
                <b>Start here</b>
                <ul>
                  <li><Link href="/reality-engineering/foundations">Foundations of Reality Engineering</Link></li>
                  <li><Link href="/reality-engineering/constitution">The Constitution</Link></li>
                  <li><Link href="/reality-engineering/why-now">Why Now</Link></li>
                  <li><Link href="/reality-engineering/hope">On Hope</Link></li>
                </ul>
              </div>
              <div className="re-path">
                <b>Apply it</b>
                <ul>
                  <li><Link href="/reality-engineering/method">The Method Specification</Link></li>
                  <li><Link href="/reality-engineering/good">The Goodness Constraint</Link></li>
                  <li><Link href="/reality-engineering/applications">Applications and Casebook</Link></li>
                  <li><Link href="/reality-engineering/evidence/case-standard">Case Study Standard</Link></li>
                </ul>
              </div>
              <div className="re-path">
                <b>Challenge it</b>
                <ul>
                  <li><Link href="/reality-engineering/evidence/standard">The Evidence Standard</Link></li>
                  <li><Link href="/reality-engineering/evidence/sources">Source Register</Link></li>
                  <li><Link href="/reality-engineering/evidence/claims">Claims Ledger</Link></li>
                  <li><Link href="/reality-engineering/papers">Federalist Papers</Link></li>
                  <li><Link href="/reality-engineering/history">Development and Provenance</Link></li>
                </ul>
              </div>
              <div className="re-path">
                <b>Explore the spiritual origin</b>
                <ul>
                  <li><Link href="/reality-engineering/echo-of-god">The Echo of God</Link></li>
                  <li><Link href="/reality-engineering/good">The Goodness Constraint</Link></li>
                  <li><Link href="/reality-engineering/hope">On Hope</Link></li>
                </ul>
              </div>
            </div>
            <p className="re-more">
              <Link href="/reality-engineering/start">Open the complete reading guide →</Link>{" "}
              <a href="/downloads/reality-engineering-canon-v0.1.zip" download>
                Download Canon v{corpusVersion} (ZIP) →
              </a>
            </p>
          </div>
        </section>

        {/* NEXARK RELATIONSHIP + CLOSING — one dark room, flowing into the footer */}
        <section className="re-band re-dark re-band-nexark" data-nav="dark">
          <div className="wrap re-narrow">
            <h2>Nexark’s relationship to the discipline</h2>
            <p>
              Nexark practices Reality Engineering by helping organizations understand the reality
              they operate inside, define what they are trying to make possible, and build the
              software, automation, AI workflows, information systems, media, and experiences that
              form the bridge.
            </p>
            <p>Nexark did not invent the human act of changing reality.</p>
            <p>
              It is formalizing a discipline for doing that work consciously, responsibly, and with
              the tools now available.
            </p>
            <p className="re-together">Engineering Reality, Together.</p>
            <div className="re-cta">
              <Link className="btn re-btn-gold" href="/">
                Explore Nexark <span className="arw">→</span>
              </Link>
              <Link className="btn re-btn-ghost" href="/reality-engineering/start">
                Read the full canon
              </Link>
            </div>

            <div className="re-closing">
              <p>Begin with the reality you are actually living in.</p>
              <p>Tell the truth about the systems producing it.</p>
              <p>Name a future worth creating.</p>
              <p>Build the smallest real bridge.</p>
              <p>Listen when reality answers.</p>
              <p>Keep the human being at the center.</p>
              <p>And before the system becomes the new normal, ask:</p>
              <p className="re-bigq re-bigq-gold">Can we call what we created good?</p>
            </div>
          </div>
        </section>
      </main>
    </RefreshShell>
  );
}
