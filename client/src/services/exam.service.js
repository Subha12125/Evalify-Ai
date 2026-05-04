import api from './api';

export const examService = {
  getExams: async () => {
    const response = await api.get('/exams');
    return response.data;
  },

  getExamById: async (id) => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  },

  createExam: async ({ title, subject, totalMarks, questionPaperFile, rubricFile }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('totalMarks', totalMarks);
    if (questionPaperFile) {
      formData.append('questionPaper', questionPaperFile);
    }
    if (rubricFile) {
      formData.append('rubric', rubricFile);
    }
    const response = await api.post('/exams', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateExam: async (id, examData) => {
    const response = await api.patch(`/exams/${id}`, examData);
    return response.data;
  },

  deleteExam: async (id) => {
    const response = await api.delete(`/exams/${id}`);
    return response.data;
  }
};
