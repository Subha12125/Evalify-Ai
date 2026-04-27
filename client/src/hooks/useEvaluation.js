import { useCallback } from 'react';
import { useEvaluationStore } from '../store/evaluationStore';
import { evaluationService } from '../services/evaluation.service';

export const useEvaluation = () => {
  const { 
    evaluations, 
    progress, 
    isEvaluating, 
    error,
    setEvaluations,
    setProgress,
    setEvaluating,
    setError,
    updateEvaluationStatus
  } = useEvaluationStore();

  const startEvaluation = useCallback(async (examId, files) => {
    setEvaluating(true);
    setProgress(0);
    try {
      const data = await evaluationService.startEvaluation(examId, files);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Evaluation failed to start');
      throw err;
    } finally {
      setEvaluating(false);
    }
  }, [setEvaluating, setProgress, setError]);

  const fetchResults = useCallback(async (examId) => {
    setEvaluating(true);
    try {
      const data = await evaluationService.getEvaluationResults(examId);
      setEvaluations(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch results');
    } finally {
      setEvaluating(false);
    }
  }, [setEvaluating, setEvaluations, setError]);

  return {
    evaluations,
    progress,
    isEvaluating,
    error,
    startEvaluation,
    fetchResults,
    updateEvaluationStatus
  };
};
