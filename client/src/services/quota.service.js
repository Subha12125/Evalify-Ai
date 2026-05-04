import api from './api';

export const quotaService = {
  getQuota: async () => {
    const response = await api.get('/quota');
    return response.data;
  },

  applyPromo: async (code) => {
    const response = await api.post('/quota/promo', { code });
    return response.data;
  },
};
