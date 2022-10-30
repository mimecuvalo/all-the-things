import { Container, List, ListItem, Typography } from 'components';

import { F } from 'i18n';

/**
 * Provides a simple React component as an example React component to manipulate out-of-the-box.
 */
export default function YourFeature() {
  return (
    <Container>
      <Typography variant="h2">
        <F defaultMessage="Your Feature" />
      </Typography>
      <List>
        <ListItem>
          <F defaultMessage="Rendering with React" />
        </ListItem>
      </List>
    </Container>
  );
}
