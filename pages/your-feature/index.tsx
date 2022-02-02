import { Container } from '@mui/material';
import { FormattedMessage } from 'i18n';

/**
 * Provides a simple React component as an example React component to manipulate out-of-the-box.
 */
export default function YourFeature() {
  return (
    <Container>
      <h2>
        <FormattedMessage defaultMessage="Your Feature" />
      </h2>
      <ul>
        <li>
          <FormattedMessage defaultMessage="Rendering with React" />
        </li>
      </ul>
    </Container>
  );
}
