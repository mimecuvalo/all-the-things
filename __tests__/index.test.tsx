import { render, screen } from 'util/testing';

import YourFeature from 'components/pages/YourFeature';

describe('YourFeature', () => {
  it('renders a heading', () => {
    render(<YourFeature />);

    expect(screen.getByRole('heading', { name: /Your Feature/i })).toBeInTheDocument();
  });
});
