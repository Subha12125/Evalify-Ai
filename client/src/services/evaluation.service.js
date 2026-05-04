import api from './api';

export const evaluationService = {
  startEvaluation: async (examId, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('answerSheets', file.originalFile);
    });
    formData.append('examId', examId);
    
    const response = await api.post('/evaluate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getEvaluationStatus: async (examId) => {
    const response = await api.get(`/evaluate/status/${examId}`);
    return response.data;
  },

  getEvaluationResults: async (examId) => {
    const response = await api.get(`/results/${examId}`);
    return response.data;
  },
};
