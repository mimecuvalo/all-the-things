import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { muiTheme, createEmotionCache } from 'styles';
import { StrictMode } from 'react';

const HOSTNAME = 'www.example.com';
const TITLE = 'Next.js Example';

export default class MyDocument extends Document {
  // Based off of: https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
  
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });
  
    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
  
    return {
      ...initialProps,
      emotionStyleTags,
    };
  }

  render(): JSX.Element {
    const locale = 'en';

    return (
      <StrictMode>
        <Html lang={locale}>
          <Head>
            <meta charSet="utf-8" />
            <meta name="theme-color" content={muiTheme.palette.primary.main} />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="author" href={`/humans.txt`} />
            <link rel="icon" href={`/favicon.ico`} />
            <link rel="apple-touch-icon" href={`/favicon.ico`} />
            <link rel="search" href="/api/opensearch" type="application/opensearchdescription+xml" title={TITLE} />
            <meta name="description" content="website created using all-the-things." />
            <meta name="generator" content="all-the-things. https://github.com/mimecuvalo/all-the-things" />
            <OpenGraphMetadata title={TITLE} />
            <StructuredMetaData title={TITLE} />
            {/*
              manifest.json provides metadata used when your web app is added to the
              homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/
            */}
            <link rel="manifest" href={`/manifest.json`} />
            {/* Inject MUI styles first to match with the prepend: true configuration. */}
            {this.props.emotionStyleTags}
          </Head>
          <body>
            <Main />

            {/* <ConfigurationScript
              appTime={appTime}
              appVersion={appVersion}
              csrfToken={csrfToken}
              defaultLocale={defaultLocale}
              experiments={experiments}
              locale={locale}
              locales={locales}
              user={user}
            /> */}

            <WindowErrorScript />

            {/* <script
              dangerouslySetInnerHTML={{
                __html: `window.__APOLLO_STATE__ = ${JSON.stringify(apolloStateFn()).replace(/</g, '\\u003c')};`,
              }}
            /> */}

            <NextScript />
          </body>
        </Html>
      </StrictMode>
    );
  }
}

// This needs to be filled out by the developer to provide content for the site.
// Learn more here: http://ogp.me/
function OpenGraphMetadata({ title }) {
  // TODO(mime): combine with url_factory code.
  const url = `https://${HOSTNAME}`;

  return (
    <>
      <meta property="og:title" content="page title" />
      <meta property="og:description" content="page description" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={`${url}/favicon.ico`} />
    </>
  );
}

// This needs to be filled out by the developer to provide content for the site.
// Learn more here: https://developers.google.com/search/docs/guides/intro-structured-data
function StructuredMetaData({ title }) {
  // TODO(mime): combine with url_factory code.
  const url = `https://${HOSTNAME}`;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
        {
          "@context": "http://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${url}"
          },
          "headline": "page title",
          "image": [
            "https://example.com/photos/16x9/photo.jpg"
           ],
          "datePublished": "2015-02-05T08:00:00+08:00",
          "dateModified": "2015-02-05T09:20:00+08:00",
          "author": {
            "@type": "Person",
            "name": "John Doe"
          },
           "publisher": {
            "@type": "Organization",
            "name": "${title}",
            "logo": {
              "@type": "ImageObject",
              "url": "${url}favicon.ico"
            }
          },
          "description": "page description"
        }
        `,
      }}
    />
  );
}

// Passes key initial, bootstrap data to the client.
function ConfigurationScript({
  appTime,
  appVersion,
  csrfToken,
  defaultLocale,
  experiments,
  locale,
  locales,
  nonce,
  user,
}) {
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `
          window.configuration = {
            appTime: ${appTime},
            appVersion: '${appVersion}',
            auth0_client_id: '${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}',
            auth0_domain: '${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}',
            csrf: '${csrfToken}',
            defaultLocale: '${defaultLocale}',
            experiments: ${JSON.stringify(experiments)},
            locale: '${locale}',
            locales: '${locales}',
            user: ${JSON.stringify(user)},
          };
        `,
      }}
    />
  );
}

// If there is an error that occurs upon page load, i.e. when executing the initial app code,
// then we send the error up to the server via this mechanism.
// Once the app is loaded, then the rest of error reporting goes through error.js -> logError.
function WindowErrorScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        var hasGlobalErrorFired = false;
        window.onerror = function(message, file, line, column, error) {
          if (hasGlobalErrorFired) {
            return;
          }
          hasGlobalErrorFired = true;

          var data = {
            random: Math.random(),
            context: navigator.userAgent,
            message: message,
            file: file,
            line: line,
            column: column,
            url: window.location.href
          };
          var img = new Image();
          img.src = '/api/report-error?data=' + encodeURIComponent(JSON.stringify(data));
        };`,
      }}
    />
  );
}
