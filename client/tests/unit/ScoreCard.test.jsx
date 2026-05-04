import { render, screen } from '@testing-library/react';
import ScoreCard from '../../src/components/evaluation/ScoreCard';

describe('ScoreCard Component', () => {
  it('renders the label, value, and icon correctly', () => {
    render(<ScoreCard label="Total Exams" value="120" icon="description" />);
    
    expect(screen.getByText('Total Exams')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders subValue correctly and applies positive color if it includes "+"', () => {
    render(<ScoreCard label="Average" value="85%" subValue="+5% from last month" icon="trending_up" />);
    
    const subValueEl = screen.getByText('+5% from last month');
    expect(subValueEl).toBeInTheDocument();
    expect(subValueEl).toHaveClass('text-emerald-500');
  });

  it('renders subValue with default color if it does not include "+"', () => {
    render(<ScoreCard label="Average" value="85%" subValue="Same as last month" icon="trending_up" />);
    
    const subValueEl = screen.getByText('Same as last month');
    expect(subValueEl).toBeInTheDocument();
    expect(subValueEl).toHaveClass('text-on-surface-variant');
  });

  it('applies the correct color class based on the color prop', () => {
    const { container } = render(<ScoreCard label="Failed" value="2" icon="error" color="error" />);
    
    // Check if the icon container has the error classes
    const iconContainer = container.querySelector('.bg-error\\/10');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders without background when noBg is true', () => {
    const { container } = render(<ScoreCard label="Verified" value="100%" icon="verified" color="success" noBg={true} />);
    
    // Check that it doesn't have bg-success/10
    const iconContainer = container.querySelector('.text-success');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).not.toHaveClass('bg-success/10');
  });
});
