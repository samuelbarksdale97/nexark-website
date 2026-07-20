import { RefreshShell } from "@/components/refresh/RefreshShell";
import { Assessment } from "@/components/refresh/Assessment";

export const metadata = {
  title: "AI Readiness Assessment | Nexark",
  description:
    "Two minutes tells you where you stand — and whether Nexark is the right team to transform how your business runs or build what you have in mind.",
};

export default function StartPage() {
  return (
    <RefreshShell active="start">
      <section className="asmt-band" data-nav="dark">
        <div className="wrap">
          <Assessment />
        </div>
      </section>
    </RefreshShell>
  );
}
