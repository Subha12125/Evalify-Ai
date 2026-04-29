import { render, screen } from '@testing-library/react';
import StatusBadge from '../../src/components/evaluation/StatusBadge';

describe('StatusBadge Component', () => {
  it('renders correctly with pending status', () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('schedule')).toBeInTheDocument();
  });

  it('renders correctly with evaluating status and applies animate-pulse', () => {
    const { container } = render(<StatusBadge status="evaluating" />);
    expect(screen.getByText('Evaluating')).toBeInTheDocument();
    expect(screen.getByText('auto_awesome')).toBeInTheDocument();
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('animate-pulse');
    expect(badge).toHaveClass('bg-primary/10');
  });

  it('renders correctly with completed status', () => {
    const { container } = render(<StatusBadge status="completed" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('check_circle')).toBeInTheDocument();
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-success/10');
    expect(badge).toHaveClass('text-success');
  });

  it('renders correctly with failed status', () => {
    const { container } = render(<StatusBadge status="failed" />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-error/10');
    expect(badge).toHaveClass('text-error');
  });

  it('falls back to pending styles for unknown status', () => {
    const { container } = render(<StatusBadge status="unknown_status" />);
    expect(screen.getByText('Unknown_status')).toBeInTheDocument();
    expect(screen.getByText('help')).toBeInTheDocument();
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-surface-container-highest');
  });

  it('handles null or undefined status gracefully', () => {
    const { container } = render(<StatusBadge />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('help')).toBeInTheDocument();
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-surface-container-highest');
  });
});
