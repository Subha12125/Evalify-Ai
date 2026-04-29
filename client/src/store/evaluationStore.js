import { create } from 'zustand';

export const useEvaluationStore = create((set) => ({
  evaluations: [
    { id: '101', name: 'Alex Harrison', rollNo: 'CS2024-001', score: 94, totalMarks: 100, accuracy: 98, status: 'completed' },
    { id: '102', name: 'Sarah Miller', rollNo: 'CS2024-002', score: 82, totalMarks: 100, accuracy: 92, status: 'completed' },
    { id: '103', name: 'James Wilson', rollNo: 'CS2024-003', score: 45, totalMarks: 100, accuracy: 88, status: 'failed' },
    { id: '104', name: 'Emily Chen', rollNo: 'CS2024-004', score: 0, totalMarks: 100, accuracy: 0, status: 'evaluating' },
  ],
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
