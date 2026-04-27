import api from './api';

export const resultsService = {
  getExamResults: async (examId) => {
    const response = await api.get(`/results/exam/${examId}`);
    return response.data;
  },

  getStudentResult: async (resultId) => {
    const response = await api.get(`/results/${resultId}`);
    return response.data;
  },

  exportResults: async (examId, format = 'csv') => {
    const response = await api.get(`/results/export/${examId}?format=${format}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  updateMarks: async (resultId, marks) => {
    const response = await api.patch(`/results/${resultId}/marks`, { marks });
    return response.data;
  }
};
