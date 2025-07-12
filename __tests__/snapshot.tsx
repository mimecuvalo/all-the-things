import Home from '../app/page';
import { render } from 'util/testing';

it('renders homepage unchanged', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
