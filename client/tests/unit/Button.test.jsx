import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/ui/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('px-5 py-2.5'); // md size
  });

  it('applies the correct variant class', () => {
    render(<Button variant="outline">Outline Btn</Button>);
    const button = screen.getByRole('button', { name: /outline btn/i });
    expect(button).toHaveClass('border-2 border-outline-variant text-on-surface');
  });

  it('applies the correct size class', () => {
    render(<Button size="lg">Large Btn</Button>);
    const button = screen.getByRole('button', { name: /large btn/i });
    expect(button).toHaveClass('px-7 py-3.5 text-base');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByRole('button', { name: /clickable/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is passed', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows a loading spinner and is disabled when loading prop is passed', () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('progress_activity')).toBeInTheDocument();
    expect(screen.getByText('progress_activity')).toHaveClass('animate-spin');
  });

  it('renders an icon when icon prop is passed', () => {
    render(<Button icon="download">Download</Button>);
    expect(screen.getByText('download')).toBeInTheDocument();
    expect(screen.getByText('download')).toHaveClass('material-symbols-outlined');
  });
});
