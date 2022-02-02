import { Emoji, Message } from './error.styles';
import { FormattedMessage, defineMessages, useIntl } from 'i18n';

import Link from 'next/link';

const messages = defineMessages({
  personGesturingNo: { defaultMessage: 'person gesturing no' },
});

export default function Unauthorized() {
  const intl = useIntl();
  const emojiAriaLabel = intl.formatMessage(messages.personGesturingNo);

  return (
    <Message>
      <Emoji role="img" aria-label={emojiAriaLabel}>
        🙅
      </Emoji>
      <h1>
        <span className="notranslate">401:</span> <FormattedMessage defaultMessage="unauthorized" />
      </h1>
      <div>
        <FormattedMessage defaultMessage="i'm sorry, dave. i'm afraid i can't do that." />
        <br />
        <FormattedMessage
          defaultMessage="try <a>logging in</a>."
          values={{
            a: (msg: string) => (
              <Link href="/api/auth/login" passHref>
                <a>{msg}</a>
              </Link>
            ),
          }}
        />
      </div>
    </Message>
  );
}
