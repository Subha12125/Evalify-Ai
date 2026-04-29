const supabase = require('../config/supabase');

const ExamModel = {
  /**
   * Create a new exam record.
   */
  async create({ title, subject, totalMarks, questions, rubric, createdBy }) {
    const { data, error } = await supabase
      .from('exams')
      .insert({
        title,
        subject,
        total_marks: totalMarks,
        questions,
        rubric,
        created_by: createdBy,
        status: 'created',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get all exams for a user.
   */
  async findByUser(userId) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Get single exam by ID.
   */
  async findById(examId) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', examId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update exam status.
   */
  async updateStatus(examId, status) {
    const { data, error } = await supabase
      .from('exams')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', examId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete an exam.
   */
  async delete(examId) {
    const { error } = await supabase.from('exams').delete().eq('id', examId);
    if (error) throw error;
    return true;
  },
};

module.exports = ExamModel;
