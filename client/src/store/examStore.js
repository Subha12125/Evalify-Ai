import { create } from 'zustand';

export const useExamStore = create((set) => ({
  exams: [],
  currentExam: null,
  loading: false,
  error: null,

  setExams: (exams) => set({ exams }),
  setCurrentExam: (exam) => set({ currentExam: exam }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addExam: (exam) => set((state) => ({ exams: [exam, ...state.exams] })),
  
  updateExam: (id, updatedExam) => set((state) => ({
    exams: state.exams.map((e) => e.id === id ? { ...e, ...updatedExam } : e),
    currentExam: state.currentExam?.id === id ? { ...state.currentExam, ...updatedExam } : state.currentExam
  })),

  deleteExam: (id) => set((state) => ({
    exams: state.exams.filter((e) => e.id !== id),
    currentExam: state.currentExam?.id === id ? null : state.currentExam
  }))
}));
