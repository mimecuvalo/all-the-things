import styles from 'styles/index.module.css';

import { Link, List, ListItem, Typography } from 'components';
import { F } from 'i18n';

/**
 * Provides a simple React component as an example React component to manipulate out-of-the-box.
 */
export default function YourFeature() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography variant="h2">
          <F defaultMessage="Your Feature" />
        </Typography>
        <List>
          <ListItem>
            <Link href="/">
              <F defaultMessage="Go back" />
            </Link>
          </ListItem>
        </List>
      </main>
    </div>
  );
}
