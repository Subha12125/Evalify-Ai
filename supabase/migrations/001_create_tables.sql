-- ============================================
-- Evalify AI - Database Schema
-- Migration: Create all core tables
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'faculty' CHECK (role IN ('faculty', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for login lookups
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- 2. EXAMS TABLE
-- ============================================
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  total_marks INTEGER NOT NULL CHECK (total_marks > 0),
  questions JSONB DEFAULT '[]'::jsonb,
  rubric TEXT DEFAULT '',
  status VARCHAR(50) DEFAULT 'created' CHECK (status IN ('created', 'evaluating', 'completed', 'failed')),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user's exams
CREATE INDEX idx_exams_created_by ON exams(created_by);
CREATE INDEX idx_exams_status ON exams(status);

-- ============================================
-- 3. STUDENTS TABLE
-- ============================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roll_number VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(roll_number, exam_id)
);

-- Index for exam lookups
CREATE INDEX idx_students_exam_id ON students(exam_id);
CREATE INDEX idx_students_roll ON students(roll_number);

-- ============================================
-- 4. EVALUATIONS TABLE
-- ============================================
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  results JSONB,
  total_marks_awarded NUMERIC(10, 2) DEFAULT 0,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  evaluated_at TIMESTAMPTZ
);

-- Indexes for evaluation queries
CREATE INDEX idx_evaluations_exam_id ON evaluations(exam_id);
CREATE INDEX idx_evaluations_student_id ON evaluations(student_id);
CREATE INDEX idx_evaluations_status ON evaluations(status);

-- ============================================
-- 5. RESULTS TABLE
-- ============================================
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  question_results JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_marks_awarded NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_max_marks NUMERIC(10, 2) NOT NULL DEFAULT 0,
  overall_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for result queries
CREATE INDEX idx_results_exam_id ON results(exam_id);
CREATE INDEX idx_results_student_id ON results(student_id);
CREATE INDEX idx_results_evaluation_id ON results(evaluation_id);

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Users: can read own row
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

-- Exams: creator can do everything
CREATE POLICY "Users can CRUD own exams"
  ON exams FOR ALL
  USING (created_by::text = auth.uid()::text);

-- Students: accessible if user owns the exam
CREATE POLICY "Users can access students of own exams"
  ON students FOR ALL
  USING (
    exam_id IN (
      SELECT id FROM exams WHERE created_by::text = auth.uid()::text
    )
  );

-- Evaluations: accessible if user owns the exam
CREATE POLICY "Users can access evaluations of own exams"
  ON evaluations FOR ALL
  USING (
    exam_id IN (
      SELECT id FROM exams WHERE created_by::text = auth.uid()::text
    )
  );

-- Results: accessible if user owns the exam
CREATE POLICY "Users can access results of own exams"
  ON results FOR ALL
  USING (
    exam_id IN (
      SELECT id FROM exams WHERE created_by::text = auth.uid()::text
    )
  );

-- ============================================
-- 7. SERVICE ROLE BYPASS
-- Allow backend (service key) full access
-- ============================================
CREATE POLICY "Service role full access users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access exams"
  ON exams FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access students"
  ON students FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access evaluations"
  ON evaluations FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access results"
  ON results FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 8. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_exams
  BEFORE UPDATE ON exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_students
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
