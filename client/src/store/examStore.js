import { create } from 'zustand';

export const useExamStore = create((set) => ({
  exams: [
    { id: '1', title: 'Advanced Algorithms Final', batch: 'CS-2024-A', date: '2024-04-20', status: 'completed', totalStudents: 142, completedStudents: 142 },
    { id: '2', title: 'Neural Networks Intro', batch: 'AI-Lab-1', date: '2024-04-18', status: 'evaluating', totalStudents: 45, completedStudents: 12 },
    { id: '3', title: 'Data Structures Midterm', batch: 'CS-2023-B', date: '2023-11-15', status: 'completed', totalStudents: 128, completedStudents: 128 },
  ],
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
