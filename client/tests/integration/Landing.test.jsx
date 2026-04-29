import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../../src/pages/Landing';
import { ToastProvider } from '../../src/context/ToastContext';

describe('Landing Page Integration', () => {
  const renderLanding = () => {
    return render(
      <BrowserRouter>
        <ToastProvider>
          <Landing />
        </ToastProvider>
      </BrowserRouter>
    );
  };

  it('renders the landing page with correct hero title', () => {
    renderLanding();
    expect(screen.getByText('Evaluate Exams with')).toBeInTheDocument();
    expect(screen.getByText('AI Precision')).toBeInTheDocument();
  });

  it('renders all three core features', () => {
    renderLanding();
    expect(screen.getByText('Fast Batch Upload')).toBeInTheDocument();
    expect(screen.getByText('Human-Grade OCR')).toBeInTheDocument();
    expect(screen.getByText('Deep Performance Analytics')).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    renderLanding();
    const startEvaluatingFree = screen.getAllByText(/Start Evaluating Free/i)[0];
    expect(startEvaluatingFree).toBeInTheDocument();
    
    const watchDemo = screen.getByText('Watch Demo');
    expect(watchDemo).toBeInTheDocument();
  });

  it('Watch Demo button triggers a toast notification', () => {
    renderLanding();
    const watchDemoBtn = screen.getByText('Watch Demo');
    
    fireEvent.click(watchDemoBtn);
    
    expect(screen.getByText('Opening video player...')).toBeInTheDocument();
  });
});
