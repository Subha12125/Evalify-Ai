# 🗄️ Supabase — Evalify AI

This directory contains all Supabase-related configuration, database schema migrations, and storage setup for the **Evalify AI** project.

---

## 📁 Folder Structure

```
supabase/
├── config.toml          # Supabase CLI project configuration
├── migrations/          # Versioned SQL migration files (applied in order)
│   └── <timestamp>_<name>.sql
└── seed.sql             # (Optional) Seed data for local development
```

---

## 🧱 Database Schema Overview

Evalify AI uses **PostgreSQL** (via Supabase) to persist all application data. The schema is managed through versioned migration files located in `supabase/migrations/`.

### Core Tables

| Table | Description |
|---|---|
| `users` | Authenticated faculty/teacher accounts |
| `exams` | Exam records including title, subject, and total marks |
| `students` | Student profiles linked to exams |
| `answer_sheets` | Uploaded answer sheet references (PDF/image paths in Supabase Storage) |
| `results` | AI-generated marks and feedback per student per exam |

---

## 🔒 Row Level Security (RLS)

All tables have **Row Level Security** enabled. Policies ensure that:

- Faculty can only access their own exams and results.
- Students' answer sheets are accessible only by the exam owner.
- Service role key (used by the backend) bypasses RLS for trusted server-side operations.

---

## 🗂️ Supabase Storage

Supabase Storage is used to archive uploaded PDFs and scanned images.

### Buckets

| Bucket | Contents |
|---|---|
| `answer-sheets` | Student answer sheet PDFs / scanned images |
| `question-papers` | Question paper PDFs uploaded per exam |
| `rubrics` | Grading rubric files uploaded per exam |

> Storage access is controlled via Supabase Storage policies — only authenticated users with a valid JWT can upload or retrieve files.

---

## ⚙️ Local Development Setup

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (required to run Supabase locally)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

### 1. Install Supabase CLI

```bash
npm install -g supabase
# or
brew install supabase/tap/supabase
```

### 2. Start Local Supabase

```bash
supabase start
```

This spins up a local Postgres instance, Supabase Studio, and all services defined in `config.toml`.

### 3. Apply Migrations

```bash
supabase db reset
```

This recreates the local database from scratch and applies all migration files in `supabase/migrations/` in chronological order.

### 4. Access Local Studio

Once running, Supabase Studio is available at:

```
http://localhost:54323
```

---

## ☁️ Connecting to a Remote Supabase Project

### 1. Log in to Supabase CLI

```bash
supabase login
```

### 2. Link Your Project

```bash
supabase link --project-ref <your-project-ref>
```

> Your project ref is found in your Supabase dashboard URL:  
> `https://supabase.com/dashboard/project/<your-project-ref>`

### 3. Push Migrations to Remote

```bash
supabase db push
```

---

## 🌱 Environment Variables

The backend (`server/`) connects to Supabase using these environment variables. Set them in `server/.env`:

```env
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_KEY=<your-service-role-key>
```

> ⚠️ **Never expose your `SUPABASE_SERVICE_KEY` on the client side.** It is only used server-side to bypass RLS for trusted operations.

The frontend (`client/`) uses the **anon/public key** via:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

---

## 🛠️ Creating a New Migration

When you need to modify the schema, generate a new migration file:

```bash
supabase migration new <migration_name>
# Example:
supabase migration new add_feedback_column_to_results
```

Edit the generated file in `supabase/migrations/`, then apply it locally:

```bash
supabase db reset
```

---

## 📄 Useful CLI Commands

| Command | Description |
|---|---|
| `supabase start` | Start local Supabase services |
| `supabase stop` | Stop local Supabase services |
| `supabase db reset` | Wipe and re-apply all migrations locally |
| `supabase db push` | Push local migrations to the linked remote project |
| `supabase db diff` | Show schema diff between local and remote |
| `supabase migration list` | List all applied migrations |
| `supabase status` | Show status and local service URLs |

---

## 🔗 Related Documentation

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Database Migrations](https://supabase.com/docs/guides/deployment/database-migrations)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

*Part of the [Evalify AI](https://github.com/sameerambastha9abcd-rgb/Evalify-Ai) project — automated exam grading powered by Google Gemini and Supabase.*