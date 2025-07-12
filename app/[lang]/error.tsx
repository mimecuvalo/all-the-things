'use client';

import { useEffect } from 'react';
import { captureException, flush } from '@sentry/nextjs';
import { Emoji, Message } from 'components/error/error.styles';
import { F, defineMessages, useIntl } from 'i18n';
import { Typography } from 'components';

const messages = defineMessages({
  monkeys: { defaultMessage: 'see no evil, hear no evil, speak no evil monkeys' },
});

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const intl = useIntl();
  const emojiAriaLabel = intl.formatMessage(messages.monkeys);

  useEffect(() => {
    // Log the error to Sentry
    captureException(error);
    flush(2000);
  }, [error]);

  return (
    <Message>
      <Emoji role="img" aria-label={emojiAriaLabel}>
        🙈 🙉 🙊
      </Emoji>
      <Typography variant="h1">
        <span className="notranslate">500:</span> <F defaultMessage="internal server error" />
      </Typography>
      <div>
        <F defaultMessage="it's not you, it's us. our server is monkeying around." />
        <br />
        <F defaultMessage="we've logged this error and we'll fix it soon." />
        <br />
        <br />
        <button
          onClick={() => reset()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <F defaultMessage="Try again" />
        </button>
      </div>
    </Message>
  );
}
