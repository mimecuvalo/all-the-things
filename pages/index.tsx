import 'styles/layout.css';
import styles from 'styles/index.module.css';

import Image from 'next/image';
import Head from 'next/head';
import gql from 'graphql-tag';
import loadIntlMessages from 'i18n/messages';
import { useQuery } from '@apollo/client';
import { Experiment, Variant } from 'components/Experiment';
import { F, defineMessages, useIntl } from 'i18n';
import type { GetStaticPropsContext } from 'next';
import { Link, Typography } from 'components';
import { addApolloState, initializeApollo } from 'app/apollo';
import { animated, useSpring } from 'react-spring';

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

  // This uses React Spring: https://www.react-spring.io/
  // Gives you some great animation easily for your app.
  const springProps = useSpring({
    opacity: 1,
    bottom: 50,
    from: { opacity: 0, bottom: 100 },
  });

  const { data } = useQuery(HELLO_AND_ECHO_QUERY, {
    variables: { str: '/' },
  });

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return <div>Running offline with service worker.</div>;
  }

  const logoAltText = intl.formatMessage(messages.greeting);

  return (
    <main className={styles.main}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Next.js: All The Things" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <animated.div style={{ position: 'relative', ...springProps }}>
        <Image src="/favicon.jpg" alt={logoAltText} width={72} height={72} />
      </animated.div>

      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
        <br />
        <Typography variant="h1" className={styles.title}>
          (with{' '}
          <Link href="https://github.com/mimecuvalo/all-the-things" target="_blank">
            All The Things
          </Link>
          )
        </Typography>
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
              // @ts-ignore not sure why this isn't typed right...
              itemCount: 5000,
            }}
          />
        </p>
        <p>
          <F
            defaultMessage="i18n html test: <a>visit our website</a> and <cta>see the world</cta>"
            values={{
              a: (msg: string) => (
                <Link className="external-link" target="_blank" href="https://www.example.com/">
                  {msg}
                </Link>
              ),
              cta: (msg: string) => <strong>{msg}</strong>,
            }}
          />
        </p>
        <p>
          and <Link href="https://github.com/mimecuvalo/all-the-things">much more</Link>!
        </p>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 14 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
        </a>
      </div>
    </main>
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
  } catch (ex) {
    return {
      props: {
        intlMessages: await loadIntlMessages(ctx),
      },
    };
  }
}
