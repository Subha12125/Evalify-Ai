# Supabase Database Configuration

This directory contains the database schema and seed data for the Evalify AI platform, managed through Supabase.

## Project Structure

- `migrations/`: Contains SQL migration files to set up the database schema.
  - [001_create_tables.sql](migrations/001_create_tables.sql): Initial schema setup including tables for users, exams, students, evaluations, and results.
- `seed/`: Contains SQL files for populating the database with initial or test data.
  - `seed.sql`: Sample data for development and testing.

## Database Schema Overview

The database consists of the following core tables:

1.  **users**: Stores faculty and admin account information.
2.  **exams**: Contains exam details, question patterns, and marking rubrics.
3.  **students**: Maps students to specific exams using roll numbers.
4.  **evaluations**: Tracks the status and raw AI feedback for student answer sheets.
5.  **results**: Stores the final processed marks and structured feedback.

## Local Development Setup

To set up the database locally using the Supabase CLI:

1.  **Initialize Supabase** (if not already done):
    ```bash
    supabase init
    ```

2.  **Start Supabase services**:
    ```bash
    supabase start
    ```

3.  **Apply Migrations**:
    The CLI automatically applies files in the `migrations/` directory when starting, or you can run:
    ```bash
    supabase db reset
    ```

4.  **Seed Data**:
    Data from `supabase/seed.sql` (mapped to our `seed/seed.sql`) is automatically inserted during a reset.

## Authentication

The system uses Supabase Auth. Ensure the `users` table remains synchronized if you implement custom triggers, or use Supabase's built-in `auth.users` table for production environments.

## Deployment

When deploying to a remote Supabase project:
```bash
supabase db push
```