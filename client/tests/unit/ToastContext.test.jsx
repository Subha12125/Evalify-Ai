import { render, screen, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../../src/context/ToastContext';
import { useEffect } from 'react';

// A mock component to consume the context
const MockComponent = ({ toastMessage, toastType }) => {
  const { addToast } = useToast();
  
  useEffect(() => {
    if (toastMessage) {
      addToast(toastMessage, toastType);
    }
  }, [addToast, toastMessage, toastType]);

  return <div data-testid="mock-component">Mock</div>;
};

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides addToast function to children', () => {
    render(
      <ToastProvider>
        <MockComponent />
      </ToastProvider>
    );
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });

  it('shows a toast message when addToast is called', () => {
    render(
      <ToastProvider>
        <MockComponent toastMessage="Test Notification" />
      </ToastProvider>
    );
    
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
  });

  it('removes toast message after 3000ms', () => {
    render(
      <ToastProvider>
        <MockComponent toastMessage="Disappearing Toast" />
      </ToastProvider>
    );
    
    expect(screen.getByText('Disappearing Toast')).toBeInTheDocument();
    
    // Fast forward 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    
    expect(screen.queryByText('Disappearing Toast')).not.toBeInTheDocument();
  });

  it('throws an error if useToast is used outside of ToastProvider', () => {
    // Suppress console.error for the expected error
    const originalError = console.error;
    console.error = vi.fn();
    
    expect(() => render(<MockComponent />)).toThrow('useToast must be used within ToastProvider');
    
    console.error = originalError;
  });
});
