import { RefreshShell } from "@/components/refresh/RefreshShell";
import { StartForm } from "@/components/refresh/StartForm";

export default function StartPage() {
  return (
    <RefreshShell active="start">
      {/* HERO */}
      <section className="hero hero-page">
        <div className="hero-bg" style={{ backgroundImage: "url('/refresh/assets/hero-c.png')" }} />
        <div className="hero-scrim" />
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">Start your journey</span>
            <h1>
              Let&apos;s find your <em>next generation.</em>
            </h1>
            <p className="lede">
              Tell us where you are and where you&apos;ve always wanted to take it. The first
              conversation is just us understanding your situation well enough to give you something
              useful.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="band" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <StartForm />
        </div>
      </section>
    </RefreshShell>
  );
}
