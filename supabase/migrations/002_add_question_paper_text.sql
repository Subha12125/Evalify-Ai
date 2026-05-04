-- Add question_paper_text column to exams table
-- Stores extracted text from uploaded question paper PDF
ALTER TABLE exams ADD COLUMN IF NOT EXISTS question_paper_text TEXT DEFAULT '';
