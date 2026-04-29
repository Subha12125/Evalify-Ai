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

  createExam: async (examData) => {
    const response = await api.post('/exams', examData);
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
