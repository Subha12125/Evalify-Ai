const supabase = require('../config/supabase');

const ResultModel = {
  /**
   * Store evaluation result for a student.
   */
  async create({ examId, studentId, evaluationId, questionResults, totalMarksAwarded, totalMaxMarks, overallFeedback }) {
    const { data, error } = await supabase
      .from('results')
      .insert({
        exam_id: examId,
        student_id: studentId,
        evaluation_id: evaluationId,
        question_results: questionResults,
        total_marks_awarded: totalMarksAwarded,
        total_max_marks: totalMaxMarks,
        overall_feedback: overallFeedback,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get all results for an exam.
   */
  async findByExam(examId) {
    const { data, error } = await supabase
      .from('results')
      .select('*, students(*)')
      .eq('exam_id', examId)
      .order('created_at');

    if (error) throw error;
    return data;
  },

  /**
   * Get result by student and exam.
   */
  async findByStudentAndExam(studentId, examId) {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('student_id', studentId)
      .eq('exam_id', examId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get single result by ID.
   */
  async findById(resultId) {
    const { data, error } = await supabase
      .from('results')
      .select('*, students(*), exams(*)')
      .eq('id', resultId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get summary stats for an exam.
   */
  async getExamStats(examId) {
    const { data, error } = await supabase
      .from('results')
      .select('total_marks_awarded, total_max_marks')
      .eq('exam_id', examId);

    if (error) throw error;

    if (!data.length) return null;

    const marks = data.map((r) => r.total_marks_awarded);
    return {
      totalStudents: data.length,
      average: marks.reduce((a, b) => a + b, 0) / marks.length,
      highest: Math.max(...marks),
      lowest: Math.min(...marks),
      maxMarks: data[0].total_max_marks,
    };
  },
};

module.exports = ResultModel;
