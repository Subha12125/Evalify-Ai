-- ============================================
-- Evalify AI - Seed Data
-- Demo faculty user and sample exam
-- ============================================

-- Insert demo faculty user
-- Password: "password123" (bcrypt hashed)
INSERT INTO users (id, email, password, name, role) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'faculty@evalify.ai',
  '$2a$12$LJ3a4PkF0VZx0Mz0M0Z0M.5L8X5Y5Z5A5B5C5D5E5F5G5H5I5J5',
  'Demo Faculty',
  'faculty'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample exam
INSERT INTO exams (id, title, subject, total_marks, questions, rubric, status, created_by) VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Midterm Exam - Data Structures',
  'Data Structures & Algorithms',
  100,
  '[
    {"text": "Explain the difference between a stack and a queue. Give real-world examples of each.", "marks": 10},
    {"text": "Write a function to reverse a linked list. What is the time and space complexity?", "marks": 15},
    {"text": "Explain binary search tree operations: insert, delete, and search with examples.", "marks": 20},
    {"text": "What is a hash table? Explain collision resolution techniques.", "marks": 15},
    {"text": "Compare BFS and DFS graph traversal algorithms. When would you use each?", "marks": 15},
    {"text": "Explain the concept of dynamic programming with the Fibonacci sequence example.", "marks": 25}
  ]'::jsonb,
  'Evaluate based on: correctness of concepts, code quality, proper examples, time/space complexity analysis, and clarity of explanation. Partial marks allowed for partially correct answers.',
  'created',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
) ON CONFLICT DO NOTHING;

-- Insert sample students
INSERT INTO students (id, roll_number, name, exam_id) VALUES
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'CS2024001', 'Alice Johnson', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'CS2024002', 'Bob Smith', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
  ('e5f6a7b8-c9d0-1234-efab-345678901234', 'CS2024003', 'Charlie Davis', 'b2c3d4e5-f6a7-8901-bcde-f12345678901')
ON CONFLICT DO NOTHING;
