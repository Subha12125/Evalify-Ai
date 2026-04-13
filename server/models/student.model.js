const supabase = require('../config/supabase');

const StudentModel = {
  /**
   * Create or update student record.
   */
  async upsert({ rollNumber, name, examId }) {
    const { data, error } = await supabase
      .from('students')
      .upsert(
        {
          roll_number: rollNumber,
          name,
          exam_id: examId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'roll_number,exam_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Find all students for an exam.
   */
  async findByExam(examId) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('exam_id', examId)
      .order('roll_number');

    if (error) throw error;
    return data;
  },

  /**
   * Find student by roll number and exam.
   */
  async findByRollAndExam(rollNumber, examId) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('roll_number', rollNumber)
      .eq('exam_id', examId)
      .single();

    if (error) throw error;
    return data;
  },
};

module.exports = StudentModel;
