import styles from 'styles/index.module.css';

import Image from 'components/Image';
import Head from 'next/head';
import gql from 'graphql-tag';
import loadIntlMessages from 'i18n/messages';
import { useQuery } from '@apollo/client';
import { Experiment, Variant } from 'components/Experiment';
import { F, defineMessages, useIntl } from 'i18n';
import type { GetStaticPropsContext } from 'next';
import { Link, Typography } from 'components';
import { addApolloState, initializeApollo } from '@/application/apollo';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

// For things like "alt" text and other strings not in JSX.
const messages = defineMessages({
  greeting: { id: 'logo-id', defaultMessage: 'logo' },
});

// This is an GraphQL query for the Home component which passes the query result to the props.
// It's a more complex example that lets you grab the props value of the component you're looking at.
const HELLO_AND_ECHO_QUERY = gql`
  query helloAndEchoQueries($str: String!) {
    echoExample(str: $str) {
      exampleField
    }

    hello
  }
`;

export default function Home() {
  const intl = useIntl();
  const [isLoaded, setIsLoaded] = useState(false);
  const { data } = useQuery(HELLO_AND_ECHO_QUERY, {
    variables: { str: '/' },
  });

  const logoAltText = intl.formatMessage(messages.greeting);

  useEffect(() => setIsLoaded(true), []);

  return (
    <div className={styles.page}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Next.js: All The Things" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <Image
        src="/favicon.jpg"
        className={classNames(styles.nightlight, isLoaded && styles.loaded)}
        alt={logoAltText}
        width={72}
        height={72}
      />

      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <Typography variant="h1" className={styles.title}>
          (with{' '}
          <Link href="https://github.com/mimecuvalo/all-the-things" target="_blank">
            All. <u>The</u>.{' '}
            <u>
              <em>Things</em>
            </u>
            .
          </Link>
          )
        </Typography>
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className={styles.logo} src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>

        <div className={styles.allTheThingsInfo}>
          <Typography variant="h2">
            <F defaultMessage="All The Things Feature test" />
          </Typography>
          <p>
            <F
              defaultMessage="GraphQL variables test (current url path): {url}"
              values={{
                url: data?.echoExample.exampleField || '[loading]',
              }}
            />
          </p>
          <p>
            <Experiment name="my-experiment">
              <Variant name="on">
                <F defaultMessage="Experiment enabled." />
              </Variant>
              <Variant name="off">
                <F defaultMessage="Experiment disabled" />
              </Variant>
            </Experiment>
          </p>
          <p>
            <F
              defaultMessage="i18n pluralization test: {itemCount, plural, =0 {no items} one {# item} other {# items}}."
              values={{
                itemCount: 5000,
              }}
            />
          </p>
          <p>
            <F
              defaultMessage="i18n html test: <a>visit our website</a> and <cta>see the world</cta>"
              values={{
                a: (msg) => (
                  <Link className="external-link" target="_blank" href="https://www.example.com/">
                    {msg}
                  </Link>
                ),
                cta: (msg) => <strong>{msg}</strong>,
              }}
            />
          </p>
          <p>
            and <Link href="https://github.com/mimecuvalo/all-the-things">much more</Link>!
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: HELLO_AND_ECHO_QUERY,
      variables: { str: '/' },
    });

    return addApolloState(apolloClient, {
      props: {
        intlMessages: await loadIntlMessages(ctx),
      },
    });
  } catch {
    return {
      props: {
        intlMessages: await loadIntlMessages(ctx),
      },
    };
  }
}
