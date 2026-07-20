-- AI Readiness Assessment submissions.
-- Written by /api/readiness (server-side, service_role key) — RLS stays ON with no public policy,
-- so only the service role can read or write. The insert is best-effort: if this table is missing
-- the route still succeeds via the email channel, so applying this migration is not release-blocking.

create table if not exists public.readiness_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  verdict     text not null check (verdict in ('ready', 'not_yet')),
  score       int  not null check (score between 0 and 15),
  hard_flag   boolean not null default false,
  track       text,                       -- 'transform' | 'build'
  answers     jsonb not null default '{}'::jsonb,
  name        text,
  email       text not null,
  phone       text
);

create index if not exists readiness_submissions_created_at_idx
  on public.readiness_submissions (created_at desc);
create index if not exists readiness_submissions_verdict_idx
  on public.readiness_submissions (verdict);

alter table public.readiness_submissions enable row level security;
-- No policies: the service_role key bypasses RLS, and nothing else should touch this table.
