import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';
import classNames from 'classnames';
import styles from 'styles/index.module.css';
import { F, defineMessages, useIntl } from 'i18n';
import { Link } from 'components';
import { rpc } from 'lib/rpc';

const messages = defineMessages({
  greeting: { id: 'logo-id', defaultMessage: 'logo' },
});

export default function HomeContent() {
  const intl = useIntl();
  const path = useLocation({ select: (l) => l.pathname });
  const [isLoaded, setIsLoaded] = useState(false);

  const { data } = useQuery({
    queryKey: ['echo', path],
    queryFn: async () => {
      const res = await rpc.api.echo.$get({ query: { str: path } });
      if (!res.ok) throw new Error('echo request failed');
      return res.json();
    },
  });

  const logoAltText = intl.formatMessage(messages.greeting);

  useEffect(() => setIsLoaded(true), []);

  return (
    <div className={styles.page}>
      <img
        src="/favicon.jpg"
        className={classNames(styles.nightlight, isLoaded && styles.loaded)}
        alt={logoAltText}
        width={72}
        height={72}
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="https://github.com/mimecuvalo/all-the-things" target="_blank">
            All. <u>The</u>.{' '}
            <u>
              <em>Things</em>
            </u>
            .
          </Link>
        </h1>

        <div className={styles.allTheThingsInfo}>
          <h2>
            <F defaultMessage="Feature test" />
          </h2>
          <ul>
            <li>
              <F
                defaultMessage="RPC variables test (current url path): {url}"
                values={{ url: data?.exampleField || '[loading]' }}
              />
            </li>
            <li>
              <F
                defaultMessage="i18n pluralization test: {itemCount, plural, =0 {no items} one {# item} other {# items}}."
                values={{ itemCount: 5000 }}
              />
            </li>
            <li>
              <F
                defaultMessage="i18n html test: <a>visit our website</a> and <cta>see the world</cta>"
                values={{
                  a: (msg) => <Link href="/your-feature">{msg}</Link>,
                  cta: (msg) => <strong>{msg}</strong>,
                }}
              />
            </li>
            <li>
              and <Link href="https://github.com/mimecuvalo/all-the-things">much more</Link>!
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
