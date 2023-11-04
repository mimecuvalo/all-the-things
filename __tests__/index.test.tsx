import { render, screen } from 'util/testing';

import Home from '@/pages';

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
