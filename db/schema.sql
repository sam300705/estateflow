create extension if not exists pgcrypto;

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  email text not null,
  full_name text not null,
  role text not null default 'agent' check (role in ('owner','manager','agent')),
  created_at timestamptz not null default now(),
  unique (organization_id, email)
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  owner_id uuid references users(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  source text,
  preferred_location text,
  property_type text,
  budget_inr bigint not null default 0 check (budget_inr >= 0),
  stage text not null default 'New' check (stage in ('New','Contacted','Qualified','Visit Scheduled','Negotiation','Won','Lost')),
  priority text not null default 'Warm' check (priority in ('Hot','Warm','Cold')),
  next_follow_up_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lead_activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  actor_id uuid references users(id) on delete set null,
  activity_type text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index leads_org_stage_idx on leads(organization_id, stage);
create index leads_org_follow_up_idx on leads(organization_id, next_follow_up_at);
create index lead_activities_lead_created_idx on lead_activities(lead_id, created_at desc);
