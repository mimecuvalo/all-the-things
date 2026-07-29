import { render, screen } from 'util/testing';

import HomeContent from 'components/pages/HomeContent';

describe('HomeContent', () => {
  it('renders a heading', () => {
    render(<HomeContent />);

    expect(screen.getByRole('heading', { name: /All\. The\. Things\./i })).toBeInTheDocument();
  });
});
