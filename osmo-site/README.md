# OSMO Recovery — Landing Page MVP

Premium French D2C landing site for OSMO Recovery, a lemon-flavored electrolyte supplement targeting adults 25-45.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (animations)
- **Supabase** (email + intent capture)

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/Geof8/Osmo.git
cd Osmo/osmo-site
npm install
```

### 2. Supabase Configuration

Create a Supabase project at [supabase.com](https://supabase.com), then run this SQL in the SQL Editor:

```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  phone text,
  source text,
  created_at timestamp with time zone default now()
);
```

Enable Row Level Security and add an insert policy:

```sql
alter table waitlist enable row level security;
create policy "Allow anonymous inserts" on waitlist for insert with check (true);
```

### 3. Environment Variables

Copy `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Vercel

```bash
npx vercel
```

Set environment variables in Vercel dashboard under Settings > Environment Variables.

## Pages

- `/` — Homepage (hero, empathy, how it works, ingredients, founders, closing CTA)
- `/produit` — Product page (product hero, benefits, formulation, usage, FAQ teaser)
- `/faq` — Full FAQ (accordion, 3 sections)

## Domain

Configure `osmolab.fr` in Vercel dashboard under Settings > Domains.
