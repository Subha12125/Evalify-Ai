const supabase = require('../config/supabase');

const EvaluationModel = {
  /**
   * Create a new evaluation record.
   */
  async create({ examId, studentId, status = 'pending' }) {
    const { data, error } = await supabase
      .from('evaluations')
      .insert({
        exam_id: examId,
        student_id: studentId,
        status,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update evaluation with results.
   */
  async updateWithResults(evaluationId, { results, totalMarks, feedback, status }) {
    const { data, error } = await supabase
      .from('evaluations')
      .update({
        results,
        total_marks_awarded: totalMarks,
        feedback,
        status,
        evaluated_at: new Date().toISOString(),
      })
      .eq('id', evaluationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get evaluations for an exam.
   */
  async findByExam(examId) {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*, students(*)')
      .eq('exam_id', examId)
      .order('created_at');

    if (error) throw error;
    return data;
  },

  /**
   * Get single evaluation.
   */
  async findById(evaluationId) {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*, students(*), exams(*)')
      .eq('id', evaluationId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Count evaluations by status for an exam.
   */
  async countByStatus(examId) {
    const { data, error } = await supabase
      .from('evaluations')
      .select('status')
      .eq('exam_id', examId);

    if (error) throw error;

    const counts = { pending: 0, processing: 0, completed: 0, failed: 0 };
    data.forEach((e) => {
      counts[e.status] = (counts[e.status] || 0) + 1;
    });
    return counts;
  },
};

module.exports = EvaluationModel;
