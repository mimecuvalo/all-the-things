import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from 'styles/index.module.css';
import { defineMessages, useIntl } from 'i18n';
import { Link } from 'components';

const messages = defineMessages({
  greeting: { id: 'logo-id', defaultMessage: 'logo' },
});

export default function HomeContent() {
  const intl = useIntl();
  const [isLoaded, setIsLoaded] = useState(false);

  const logoAltText = intl.formatMessage(messages.greeting);

  useEffect(() => setIsLoaded(true), []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <img
          src="/favicon.jpg"
          className={classNames(styles.nightlight, isLoaded && styles.loaded)}
          alt={logoAltText}
          width={72}
          height={72}
        />
        <h1 className={styles.title}>
          <Link href="https://github.com/mimecuvalo/all-the-things" target="_blank">
            All. <u>The</u>.{' '}
            <u>
              <em>Things</em>
            </u>
            .
          </Link>
        </h1>
      </main>
    </div>
  );
}
