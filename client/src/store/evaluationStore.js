import { create } from 'zustand';

export const useEvaluationStore = create((set) => ({
  evaluations: [],
  currentEvaluation: null,
  progress: 0,
  isEvaluating: false,
  error: null,

  setEvaluations: (evaluations) => set({ evaluations }),
  setProgress: (progress) => set({ progress }),
  setEvaluating: (isEvaluating) => set({ isEvaluating }),
  setError: (error) => set({ error }),
  
  updateEvaluationStatus: (id, status) => set((state) => ({
    evaluations: state.evaluations.map((ev) => ev.id === id ? { ...ev, status } : ev)
  }))
}));
