-- Le Ginn's Manicure — Quotation System Schema

-- ─── Customers ────────────────────────────────────────────────────────────────
create table if not exists public.customers (
  id         uuid primary key default gen_random_uuid(),
  company    text not null,
  contact    text not null,
  email      text not null,
  phone      text not null default '',
  created_at timestamptz not null default now()
);

-- ─── Quotes ───────────────────────────────────────────────────────────────────
create table if not exists public.quotes (
  id           uuid primary key default gen_random_uuid(),
  quote_number text not null unique,
  customer_id  uuid not null references public.customers(id) on delete cascade,
  date         date not null default current_date,
  status       text not null default 'Draft',
  notes        text not null default '',
  created_at   timestamptz not null default now(),

  constraint quotes_status_check
    check (status in ('Draft', 'Sent', 'Accepted', 'Rejected'))
);

-- ─── Quote Items ───────────────────────────────────────────────────────────────
create table if not exists public.quote_items (
  id         uuid primary key default gen_random_uuid(),
  quote_id   uuid not null references public.quotes(id) on delete cascade,
  service    text not null,
  qty        integer not null default 1 check (qty > 0),
  unit_price numeric(10, 2) not null default 0 check (unit_price >= 0),
  created_at timestamptz not null default now()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists quotes_customer_id_idx on public.quotes(customer_id);
create index if not exists quotes_status_idx       on public.quotes(status);
create index if not exists quotes_created_at_idx   on public.quotes(created_at desc);
create index if not exists items_quote_id_idx      on public.quote_items(quote_id);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Disabled for now (no user auth). Enable and add policies when auth is added.
alter table public.customers   disable row level security;
alter table public.quotes      disable row level security;
alter table public.quote_items disable row level security;
