import api from './api';

export const evaluationService = {
  startEvaluation: async (examId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    
    const response = await api.post(`/evaluations/start/${examId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getEvaluationStatus: async (evaluationId) => {
    const response = await api.get(`/evaluations/status/${evaluationId}`);
    return response.data;
  },

  getEvaluationResults: async (examId) => {
    const response = await api.get(`/evaluations/results/${examId}`);
    return response.data;
  },

  submitFeedback: async (resultId, feedback) => {
    const response = await api.post(`/evaluations/feedback/${resultId}`, feedback);
    return response.data;
  }
};
