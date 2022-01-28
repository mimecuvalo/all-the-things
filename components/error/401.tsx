import { F, defineMessages, useIntl } from 'i18n';

import {Message, Emoji} from './error.styles';

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
        401: <F defaultMessage="unauthorized" />
      </h1>
      <div>
        <F defaultMessage="i'm sorry, dave. i'm afraid i can't do that." />
        <br />
        <F
          defaultMessage="try <a>logging in</a>."
          values={{
            a: (msg) => (
              <a href="/api/auth/login">
                {msg}
              </a>
            ),
          }}
        />
      </div>
    </Message>
  );
}
