import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateExam from '../pages/CreateExam';
import Results from '../pages/Results';
import Exams from '../pages/Exams';
import Settings from '../pages/Settings';
import Pricing from '../pages/Pricing';
import EvaluationProgress from '../pages/EvaluationProgress';
import ExamDetail from '../pages/ExamDetail';
import Layout from '../components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/create-exam',
        element: <CreateExam />,
      },
      {
        path: '/results',
        element: <Results />,
      },
      {
        path: '/exams',
        element: <Exams />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
      },
      {
        path: '/evaluation-progress',
        element: <EvaluationProgress />,
      },
      {
        path: '/exams/:id',
        element: <ExamDetail />,
      },
    ],
  },
]);
