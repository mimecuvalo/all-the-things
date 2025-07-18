import { render, screen } from 'util/testing';

import Home from 'app/[lang]/page';

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Home />);

    const heading = screen.getAllByRole('heading', {
      name: /All The Things/i,
    });

    expect(heading[0]).toBeInTheDocument();
  });
});
